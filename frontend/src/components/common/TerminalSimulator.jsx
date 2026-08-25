import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function TerminalSimulator({ defaultCategory = 'linux', initialCommand = '' }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'CloudVerse Interactive CLI Terminal v2.4' },
    { type: 'system', text: 'Type "help" to see available commands or click a preset exercise below.' },
    { type: 'output', text: 'System initialized. Ready for commands.' }
  ]);
  const [inputVal, setInputVal] = useState(initialCommand);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', text: `$ ${trimmed}` }];
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const subCmd = parts[1] ? parts[1].toLowerCase() : '';

    let output = '';

    if (mainCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (mainCmd === 'help') {
      output = `Available Commands:
  - Linux: ls, pwd, mkdir <dir>, cat <file>, chmod 755 <file>, systemctl status <service>, whoami, clear
  - Docker: docker ps, docker run <image>, docker build -t <tag> ., docker images
  - Git: git status, git commit -m "<msg>", git log, git branch, git add .
  - AWS: aws sts get-caller-identity, aws s3 ls, aws ec2 describe-instances`;
    } else if (mainCmd === 'pwd') {
      output = '/home/cloudverse/devops-lab';
    } else if (mainCmd === 'whoami') {
      output = 'cloudverse-devops-admin';
    } else if (mainCmd === 'ls') {
      output = 'Dockerfile  docker-compose.yml  main.tf  src/  package.json  README.md';
    } else if (mainCmd === 'mkdir') {
      output = `Directory '${parts[1] || 'new-dir'}' created successfully.`;
    } else if (mainCmd === 'cat') {
      if (parts[1] === 'Dockerfile') {
        output = `FROM node:20-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["npm", "run", "dev"]`;
      } else {
        output = `Viewing file content of ${parts[1] || 'README.md'}:\n# CloudVerse DevOps Environment\nSystem status: Healthy`;
      }
    } else if (mainCmd === 'chmod') {
      output = `Changed permissions of ${parts[2] || 'script.sh'} to mode ${parts[1] || '755'}.`;
    } else if (mainCmd === 'systemctl') {
      output = `● nginx.service - High Performance Web Server\n   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)\n   Active: active (running) since Fri 2026-07-24 16:00:00 UTC`;
    } else if (mainCmd === 'docker') {
      if (subCmd === 'ps') {
        output = `CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                  NAMES\n9f8e7d6c5b4a   nginx:alpine   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:80->80/tcp     web-server\n3a2b1c0d9e8f   redis:latest   "docker-entrypoint.s…"   10 minutes ago  Up 10 minutes  0.0.0.0:6379->6379/tcp cache-db`;
      } else if (subCmd === 'images') {
        output = `REPOSITORY    TAG       IMAGE ID       CREATED        SIZE\nnginx         alpine    9f8e7d6c5b4a   2 days ago     23.5MB\nredis         latest    3a2b1c0d9e8f   1 week ago     32.4MB\nnode          20-alpine 1a2b3c4d5e6f   2 weeks ago    178MB`;
      } else if (subCmd === 'run') {
        output = `Unable to find image '${parts[2] || 'nginx'}:latest' locally...\nLatest: Pulling from library/${parts[2] || 'nginx'}\nDigest: sha256:7f8e9d...\nStatus: Downloaded newer image.\nContainer launched successfully! ID: d4c3b2a10987`;
      } else if (subCmd === 'build') {
        output = `[+] Building 2.4s (6/6) FINISHED\n => [internal] load build definition from Dockerfile\n => [1/3] FROM node:20-alpine\n => [2/3] WORKDIR /app\n => [3/3] RUN npm ci\n => exporting to image cloudverse-app:latest\nSuccessfully tagged cloudverse-app:latest`;
      } else {
        output = `Docker Engine v26.0.0 running. Type "docker ps" or "docker build" to test.`;
      }
    } else if (mainCmd === 'git') {
      if (subCmd === 'status') {
        output = `On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\tmodified:   src/App.jsx\n\tmodified:   src/data/topicsData.js`;
      } else if (subCmd === 'commit') {
        output = `[main 4f8a2c1] ${trimmed.substring(13) || 'feat: update DevOps architecture'}\n 2 files changed, 45 insertions(+), 12 deletions(-)`;
      } else if (subCmd === 'log') {
        output = `* 4f8a2c1 (HEAD -> main, origin/main) feat: update DevOps architecture\n* a9b8c7d fix: AWS VPC subnet route table IGW\n* e5f6g7h docs: add Docker Compose guide`;
      } else if (subCmd === 'branch') {
        output = `* main\n  feature/aws-vpc\n  feature/docker-compose`;
      } else {
        output = `Git version 2.44.0. Type "git status" or "git log".`;
      }
    } else if (mainCmd === 'aws') {
      if (subCmd === 'sts') {
        output = `{\n  "UserId": "AKIAIOSFODNN7EXAMPLE",\n  "Account": "123456789012",\n  "Arn": "arn:aws:iam::123456789012:user/cloudverse-admin"\n}`;
      } else if (subCmd === 's3') {
        output = `2026-07-24 10:00:00 my-cloudverse-prod-media-bucket\n2026-07-24 11:30:00 my-cloudverse-terraform-state-bucket`;
      } else if (subCmd === 'ec2') {
        output = `{\n  "Reservations": [\n    {\n      "Instances": [\n        {\n          "InstanceId": "i-0123456789abcdef0",\n          "InstanceType": "t3.micro",\n          "State": { "Name": "running" },\n          "PublicIpAddress": "54.210.12.34"\n        }\n      ]\n    }\n  ]\n}`;
      } else {
        output = `aws-cli/2.15.0 Python/3.11 Linux/ubuntu. Type "aws s3 ls" or "aws sts get-caller-identity".`;
      }
    } else {
      output = `bash: command not found: ${trimmed}. Type "help" for a list of supported commands.`;
    }

    newHistory.push({ type: 'output', text: output });
    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? commandHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal('');
        }
      }
    }
  };

  const presets = [
    { label: 'Check Running Containers', cmd: 'docker ps' },
    { label: 'Git Status', cmd: 'git status' },
    { label: 'Verify AWS Caller Identity', cmd: 'aws sts get-caller-identity' },
    { label: 'Check Linux Systemd Service', cmd: 'systemctl status nginx' }
  ];

  const handleCopyHistory = () => {
    const text = history.map(h => h.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Terminal output copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-0 bg-slate-950 text-slate-100 border-slate-800 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Top Window Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="ml-2 font-bold text-slate-300 text-xs flex items-center gap-1.5">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            bash - cloudverse-terminal@sandbox
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([{ type: 'output', text: 'Terminal cleared.' }])}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Clear terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopyHistory}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copy terminal log"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Preset Command Shortcuts */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-400 font-sans text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => executeCommand(p.cmd)}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all whitespace-nowrap text-[11px] font-mono"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Terminal Main Body Log */}
      <div className="p-4 sm:p-5 max-h-[380px] overflow-y-auto space-y-2.5 leading-relaxed">
        {history.map((h, idx) => (
          <div key={idx} className={h.type === 'input' ? 'text-emerald-400 font-bold' : h.type === 'system' ? 'text-amber-300/90 text-xs' : 'text-slate-300'}>
            <pre className="whitespace-pre-wrap font-mono">{h.text}</pre>
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2 pt-2 text-emerald-400 font-bold">
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command (e.g. docker ps, git status, aws s3 ls)..."
            className="w-full bg-transparent text-slate-100 outline-none font-mono placeholder:text-slate-600 text-xs sm:text-sm"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </Card>
  );
}
