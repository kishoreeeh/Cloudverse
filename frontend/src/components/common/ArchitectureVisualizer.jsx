import { useState } from 'react';
import Card from '@/components/ui/Card';
import { Layers, ShieldCheck, Cpu, Database, Cloud, Network, Server, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { cn } from '@/utils/cn';

const ARCHITECTURES = {
  aws: {
    title: 'AWS 3-Tier Enterprise VPC Architecture',
    subtitle: 'Public Subnet ALB ➔ Private App Subnet ➔ Isolated Database Subnet',
    nodes: [
      {
        id: 'igw',
        name: 'Internet Gateway (IGW)',
        type: 'Gateway',
        icon: Cloud,
        color: '#FF9900',
        desc: 'Connects VPC public subnets to the public internet.',
        security: 'Route: 0.0.0.0/0 -> igw-0123456789',
        cli: 'aws ec2 attach-internet-gateway --vpc-id vpc-xxx --internet-gateway-id igw-xxx'
      },
      {
        id: 'alb',
        name: 'Application Load Balancer (ALB)',
        type: 'Public Subnet (AZ-A & AZ-B)',
        icon: Network,
        color: '#2563eb',
        desc: 'Terminates TLS/SSL & balances HTTP/HTTPS requests across EC2 App instances.',
        security: 'Inbound: Port 80/443 from 0.0.0.0/0',
        cli: 'aws elbv2 create-load-balancer --name prod-alb --subnets subnet-pub1 subnet-pub2'
      },
      {
        id: 'ec2',
        name: 'Auto Scaling EC2 Cluster',
        type: 'Private Subnet (Compute)',
        icon: Server,
        color: '#10b981',
        desc: 'Hosts Dockerized microservice API servers running Spring Boot & Node.js.',
        security: 'Inbound: Port 8080 ONLY from ALB Security Group',
        cli: 'aws autoscaling set-desired-capacity --auto-scaling-group-name app-asg --desired-capacity 4'
      },
      {
        id: 'rds',
        name: 'Multi-AZ PostgreSQL RDS',
        type: 'Isolated Database Subnet',
        icon: Database,
        color: '#8b5cf6',
        desc: 'Synchronously replicated relational database across Availability Zones.',
        security: 'Inbound: Port 5432 ONLY from EC2 Security Group',
        cli: 'aws rds create-db-instance --db-instance-identifier prod-db --multi-az'
      }
    ]
  },
  kubernetes: {
    title: 'Kubernetes Ingress & Pod Traffic Architecture',
    subtitle: 'Client ➔ Ingress Controller ➔ ClusterIP Service ➔ Pod Replicas',
    nodes: [
      {
        id: 'ingress',
        name: 'Nginx Ingress Controller',
        type: 'Routing Layer',
        icon: Network,
        color: '#326CE5',
        desc: 'Layer 7 HTTP/HTTPS reverse proxy routing traffic by hostname & path.',
        security: 'TLS Certificate termination via Cert-Manager',
        cli: 'kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml'
      },
      {
        id: 'svc',
        name: 'ClusterIP Service',
        type: 'Internal Service Discovery',
        icon: Layers,
        color: '#f59e0b',
        desc: 'Stable virtual IP & DNS name (e.g. backend-svc.default.svc.cluster.local).',
        security: 'Internal pod-to-pod network policy',
        cli: 'kubectl get svc backend-svc -o wide'
      },
      {
        id: 'pods',
        name: 'Pod Replicas (Deployment)',
        type: 'Worker Containers',
        icon: Cpu,
        color: '#10b981',
        desc: '3 load-balanced Pod instances running application code.',
        security: 'Non-root container execution (runAsUser: 1000)',
        cli: 'kubectl get pods -l app=backend --watch'
      }
    ]
  }
};

export default function ArchitectureVisualizer({ initialType = 'aws' }) {
  const [activeArchKey, setActiveArchKey] = useState(initialType);
  const arch = ARCHITECTURES[activeArchKey] || ARCHITECTURES.aws;
  const [selectedNode, setSelectedNode] = useState(arch.nodes[0]);

  return (
    <Card className="p-6 bg-white border-slate-200/90 shadow-sm space-y-6">
      {/* Header Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Interactive Blueprint
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            {arch.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{arch.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {Object.keys(ARCHITECTURES).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveArchKey(key);
                setSelectedNode(ARCHITECTURES[key].nodes[0]);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold text-xs transition-all border",
                activeArchKey === key
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              )}
            >
              {key.toUpperCase()} Flow
            </button>
          ))}
        </div>
      </div>

      {/* Diagram Interactive Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-inner">
        {arch.nodes.map((node, idx) => {
          const isSelected = selectedNode.id === node.id;
          const NodeIcon = node.icon;

          return (
            <div key={node.id} className="flex flex-col md:flex-row items-center gap-3">
              <button
                onClick={() => setSelectedNode(node)}
                className={cn(
                  "w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-32 group",
                  isSelected
                    ? "bg-slate-800 border-emerald-500 shadow-lg scale-102"
                    : "bg-slate-950/60 border-slate-800 hover:bg-slate-800/80"
                )}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="p-2 rounded-lg text-white"
                    style={{ backgroundColor: `${node.color}30`, color: node.color }}
                  >
                    <NodeIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    Step {idx + 1}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-100 truncate group-hover:text-emerald-400 transition-colors">
                    {node.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium truncate block">
                    {node.type}
                  </span>
                </div>
              </button>

              {idx < arch.nodes.length - 1 && (
                <div className="hidden md:flex items-center text-emerald-500">
                  <ArrowRight className="w-4 h-4 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Card */}
      {selectedNode && (
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-900 text-emerald-400">
                <selectedNode.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-base text-slate-900">{selectedNode.name}</h4>
                <span className="text-xs text-slate-500 font-bold">{selectedNode.type}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" /> Component Role & Description:
              </span>
              <p className="text-slate-600 leading-relaxed font-normal">{selectedNode.desc}</p>
            </div>

            <div className="space-y-1">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Security & Isolation Rules:
              </span>
              <p className="text-slate-600 leading-relaxed font-normal bg-amber-50/60 border border-amber-200/60 p-2.5 rounded-xl text-amber-900 font-semibold">
                {selectedNode.security}
              </p>
            </div>
          </div>

          {/* CLI Snippet */}
          {selectedNode.cli && (
            <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs space-y-1 border border-slate-800">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Provisioning / Inspection Command:
              </span>
              <p className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">{selectedNode.cli}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
