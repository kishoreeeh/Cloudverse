import { useState } from 'react';
import { Layers, Database, Server, Globe, Shield, ArrowRight, ServerCrash, Cpu, Terminal, FileCode, HardDrive, Cloud, GitBranch } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const SCENARIOS = {
  aws: [
    {
      id: 'web-tier',
      title: '3-Tier Web Architecture',
      description: 'A classic, highly available web architecture deploying across multiple availability zones.',
      components: [
        { id: 'alb', name: 'Application Load Balancer (ALB)', type: 'network', icon: Globe, description: 'The ALB acts as the single point of contact for clients. It securely handles incoming HTTP/HTTPS traffic from the internet and intelligently distributes it across multiple healthy EC2 instances in different Availability Zones to prevent downtime.' },
        { id: 'ec2', name: 'EC2 Auto Scaling Group', type: 'compute', icon: Server, description: 'Amazon EC2 provides secure, resizable compute capacity. This Auto Scaling Group automatically launches new EC2 instances during high traffic spikes (scale out) and terminates them during low traffic (scale in) to save costs.' },
        { id: 'rds', name: 'RDS Multi-AZ Database', type: 'database', icon: Database, description: 'Amazon RDS manages the relational database (like MySQL or PostgreSQL). "Multi-AZ" means it automatically maintains a synchronous standby replica in a different data center. If the primary database fails, it instantly fails over to the standby without data loss.' }
      ]
    }
  ],
  docker: [
    {
      id: 'docker-compose',
      title: 'Docker Compose Stack',
      description: 'A multi-container Docker application environment.',
      components: [
        { id: 'nginx', name: 'Nginx Reverse Proxy', type: 'network', icon: Globe, description: 'Nginx runs in its own container and acts as a reverse proxy. It receives all external web requests on port 80/443 and securely forwards them to the internal Node.js API container, completely hiding the backend from direct internet access.' },
        { id: 'api', name: 'Node.js API Container', type: 'compute', icon: Cpu, description: 'This container holds the actual application code (Node.js/Express). Because it is containerized, it contains its own isolated operating system, dependencies, and runtime, ensuring that "it works on my machine" means it will work everywhere.' },
        { id: 'redis', name: 'Redis Cache Container', type: 'database', icon: Database, description: 'A lightning-fast in-memory data store running in a separate container. The Node.js API uses it to temporarily cache frequent database queries or store user session data, drastically reducing response times for users.' }
      ]
    }
  ],
  kubernetes: [
    {
      id: 'k8s-cluster',
      title: 'Kubernetes Cluster Traffic Flow',
      description: 'How external traffic routes into a Kubernetes cluster to reach Pods.',
      components: [
        { id: 'ingress', name: 'Ingress Controller', type: 'network', icon: Globe, description: 'The Ingress Controller is the gateway to your Kubernetes cluster. It manages external access, handles SSL/TLS termination, and uses routing rules to direct traffic to the correct internal Services based on the URL path.' },
        { id: 'service', name: 'ClusterIP Service', type: 'network', icon: Layers, description: 'Because Pods are ephemeral and their IP addresses change constantly, the Service acts as a stable, internal load balancer. It provides a single static IP and DNS name to reliably route traffic to the healthy application Pods behind it.' },
        { id: 'pod', name: 'Application Pods', type: 'compute', icon: Server, description: 'Pods are the smallest deployable units in Kubernetes. Each Pod represents a single instance of a running process (like your Docker container). Kubernetes constantly monitors them and automatically restarts them if they crash.' }
      ]
    }
  ],
  linux: [
    {
      id: 'linux-os',
      title: 'Linux OS Architecture',
      description: 'The fundamental layers of the Linux operating system.',
      components: [
        { id: 'user', name: 'User Space / Shell', type: 'compute', icon: Terminal, description: 'This is where you (the user) interact with the system. It contains the Bash shell, GUI, and all your applications (like web browsers or text editors). Applications here cannot access hardware directly; they must ask the Kernel.' },
        { id: 'kernel', name: 'Linux Kernel', type: 'compute', icon: Cpu, description: 'The Kernel is the heart of the OS. It sits between user applications and the physical hardware. It manages memory, allocates CPU time, handles file permissions, and ensures no application crashes the entire system.' },
        { id: 'hardware', name: 'Physical Hardware', type: 'database', icon: HardDrive, description: 'The actual physical components of the machine: the CPU, RAM, Hard Drives, and Network Cards. The Linux Kernel translates software requests into electrical signals that the physical hardware can understand.' }
      ]
    }
  ],
  git: [
    {
      id: 'git-flow',
      title: 'Git Version Control Flow',
      description: 'How files move through the Git version control lifecycle.',
      components: [
        { id: 'working', name: 'Working Directory', type: 'compute', icon: FileCode, description: 'This is your local folder on your computer where you write and edit code. Files here are untracked or modified. They are not safely saved in Git\'s history until you add and commit them.' },
        { id: 'staging', name: 'Staging Area (Index)', type: 'network', icon: Layers, description: 'Also known as the "Index", this is a temporary holding area. When you run "git add", you move files here. It allows you to carefully select exactly which file changes should be grouped together into your next commit.' },
        { id: 'repo', name: 'Local / Remote Repository', type: 'database', icon: GitBranch, description: 'The Repository is the permanent database of all your commits. When you run "git commit", changes move from the Staging Area to the Local Repo. Running "git push" synchronizes this history to a Remote Repo like GitHub.' }
      ]
    }
  ],
  terraform: [
    {
      id: 'terraform-arch',
      title: 'Terraform IaC Workflow',
      description: 'How Terraform provisions infrastructure in the cloud.',
      components: [
        { id: 'cli', name: 'Terraform CLI (.tf files)', type: 'compute', icon: Terminal, description: 'You write infrastructure requirements in HashiCorp Configuration Language (HCL) within .tf files. The Terraform CLI reads these files and calculates exactly what needs to be created, modified, or destroyed.' },
        { id: 'state', name: 'State File (.tfstate)', type: 'database', icon: Database, description: 'The State File is Terraform\'s memory. It maps the resources defined in your code to the actual real-world resources in the cloud. It is crucial for Terraform to know what already exists before making changes.' },
        { id: 'cloud', name: 'Cloud Provider API', type: 'network', icon: Cloud, description: 'Terraform does not create infrastructure directly; it talks to the Cloud Provider (like AWS, Azure, or Google Cloud) via their APIs. Terraform translates your code into API requests to provision servers, databases, and networks.' }
      ]
    }
  ]
};

export default function ArchitectureTab({ techSlug }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const scenarios = SCENARIOS[techSlug] || [
    {
      id: 'generic',
      title: 'Generic Cloud Architecture',
      description: 'A standard cloud application layout.',
      components: [
        { id: 'lb', name: 'Load Balancer', type: 'network', icon: Globe, description: 'Distributes traffic.' },
        { id: 'app', name: 'Application Server', type: 'compute', icon: Server, description: 'Runs application code.' },
        { id: 'db', name: 'Database Server', type: 'database', icon: Database, description: 'Stores persistent data.' }
      ]
    }
  ];

  const currentScenario = scenarios[activeScenario];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-600" />
            Architecture Scenario Explorer
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Explore interactive architecture diagrams for {techSlug?.toUpperCase() || 'Cloud'} deployments.
          </p>
        </div>

        {/* Scenarios List */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {scenarios.map((scenario, idx) => (
            <button
              key={scenario.id}
              onClick={() => { setActiveScenario(idx); setSelectedComponent(null); }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border ${
                activeScenario === idx 
                  ? 'bg-purple-50 text-purple-700 border-purple-200 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-8 min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full max-w-2xl mx-auto justify-between">
              {currentScenario.components.map((comp, index) => {
                const Icon = comp.icon;
                const isSelected = selectedComponent?.id === comp.id;
                
                return (
                  <div key={comp.id} className="flex items-center gap-4 sm:gap-8 relative">
                    <button
                      onClick={() => setSelectedComponent(comp)}
                      className={`flex flex-col items-center gap-3 p-4 w-32 rounded-2xl transition-all border-2 bg-white ${
                        isSelected 
                          ? 'border-purple-500 shadow-md scale-105' 
                          : 'border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 text-center leading-tight">
                        {comp.name}
                      </span>
                    </button>
                    
                    {index < currentScenario.components.length - 1 && (
                      <div className="hidden sm:flex flex-col items-center text-slate-400">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
            <h3 className="font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">
              {selectedComponent ? 'Component Details' : 'Scenario Details'}
            </h3>
            
            {selectedComponent ? (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <selectedComponent.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                      {selectedComponent.type}
                    </div>
                    <div className="font-bold text-slate-900">{selectedComponent.name}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedComponent.description}
                </p>
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedComponent(null)}>
                    Clear Selection
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <h4 className="font-bold text-slate-900">{currentScenario.title}</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {currentScenario.description}
                  </p>
                </div>
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100">
                  <span className="font-bold">Tip:</span> Click on any component in the diagram to view its details and role in the architecture.
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
