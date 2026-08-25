import { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const TERMINAL_SCENARIOS = {
  docker: [
    { cmd: 'docker run -d -p 80:80 nginx', output: 'Unable to find image \'nginx:latest\' locally\nlatest: Pulling from library/nginx\nDigest: sha256:...\nStatus: Downloaded newer image for nginx:latest\nCONTAINER ID: a1b2c3d4e5f6...' },
    { cmd: 'docker ps', output: 'CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                NAMES\na1b2c3d4e5f6   nginx     "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:80->80/tcp   web-server' }
  ],
  aws: [
    { cmd: 'aws s3 ls', output: '2023-10-01 10:00:00 my-production-bucket\n2023-10-05 14:30:00 my-staging-bucket' },
    { cmd: 'aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"', output: '{\n    "Reservations": [\n        {\n            "Instances": [\n                {\n                    "InstanceId": "i-1234567890abcdef0",\n                    "InstanceType": "t2.micro",\n                    "State": {\n                        "Name": "running"\n                    }\n                }\n            ]\n        }\n    ]\n}' }
  ]
};

export default function TerminalTab({ techSlug }) {
  const [history, setHistory] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const scenarios = TERMINAL_SCENARIOS[techSlug] || [
    { cmd: 'echo "Welcome to CloudVerse CLI!"', output: 'Welcome to CloudVerse CLI!' },
    { cmd: `${techSlug} --version`, output: `${techSlug} version 1.0.0` }
  ];

  const handleRunCommand = async (cmdText) => {
    if (!cmdText.trim()) return;
    
    const command = cmdText.trim();
    setInputValue('');
    setIsTyping(true);
    
    setHistory(prev => [...prev, { type: 'cmd', text: command }]);
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Check if it matches a known scenario
    const matchedScenario = scenarios.find(s => s.cmd === command);
    let outputText = matchedScenario 
      ? matchedScenario.output 
      : `bash: ${command.split(' ')[0]}: command not found`;
      
    // Special commands
    if (command === 'clear') {
      setHistory([]);
      setIsTyping(false);
      return;
    }
    
    setHistory(prev => [...prev, { type: 'output', text: outputText }]);
    
    if (command === scenarios[currentScenario]?.cmd) {
      setCurrentScenario(prev => prev + 1);
    }
    setIsTyping(false);
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRunCommand(inputValue);
    }
  };

  const runTutorialCommand = async () => {
    if (currentScenario >= scenarios.length) return;
    setInputValue(scenarios[currentScenario].cmd);
    setTimeout(() => {
       handleRunCommand(scenarios[currentScenario].cmd);
    }, 500);
  };

  const handleReset = () => {
    setHistory([]);
    setCurrentScenario(0);
    setIsTyping(false);
    setInputValue('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);
  
  // Auto focus input when clicking anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-blue-600" />
              Interactive CLI Sandbox
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Practice and visualize {techSlug?.toUpperCase()} commands in a simulated environment.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" /> Clear
            </Button>
            <Button size="sm" onClick={runTutorialCommand} disabled={isTyping || currentScenario >= scenarios.length}>
              <Play className="w-4 h-4 mr-2" /> Auto-type Next Command
            </Button>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-slate-800 shadow-2xl font-mono text-sm">
          {/* Mac-style Window Header */}
          <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-slate-400 text-xs flex-1 text-center pr-10">
              user@cloudverse: ~
            </span>
          </div>
          
          {/* Terminal Body */}
          <div 
            className="p-5 h-[400px] overflow-y-auto text-slate-300 space-y-4 cursor-text"
            onClick={handleTerminalClick}
          >
            <div className="text-emerald-400">
              Welcome to the {techSlug?.toUpperCase()} interactive sandbox.
              <br />
              Type commands manually or click "Auto-type Next Command" for the tutorial.
              <br />
              (Hint: type <strong>clear</strong> to reset the screen)
            </div>
            
            {history.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={item.type === 'cmd' ? 'text-white flex gap-2' : 'text-slate-400 whitespace-pre-wrap'}
              >
                {item.type === 'cmd' && <ChevronRight className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />}
                <span>{item.text}</span>
              </motion.div>
            ))}
            
            {isTyping ? (
              <div className="flex gap-2 items-center text-emerald-400">
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                <span className="animate-pulse">_</span>
              </div>
            ) : (
              <div className="flex gap-2 items-center text-emerald-400">
                <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-slate-600 font-mono"
                  placeholder={currentScenario < scenarios.length ? `Try typing: ${scenarios[currentScenario].cmd}` : "Type a command..."}
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            )}
            
            <div ref={bottomRef} />
          </div>
        </div>

      </div>
    </div>
  );
}
