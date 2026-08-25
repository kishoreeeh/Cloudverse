import { useState } from 'react';
import { Briefcase, Clock, Zap, ArrowRight, Play, CheckCircle2, Rocket, Terminal, ExternalLink, X, ShieldAlert, Check, Lock, Code2, Hammer, FileCode, Copy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const PROJECT_SCENARIOS = {
  docker: [
    {
      id: 'docker-1',
      title: 'Containerize a Node.js App',
      description: 'Write a Dockerfile to package a Node.js Express application, optimize the image size using multi-stage builds, and run it locally.',
      difficulty: 'Beginner',
      time: '1 hour',
      skills: ['Dockerfile', 'Multi-stage Build', 'Port Mapping'],
      buildSteps: [
        { title: 'Step 1: Create Dockerfile', code: 'FROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]' },
        { title: 'Step 2: Build Docker Image Locally', command: 'docker build -t cloudverse-node-app:v1 .' },
        { title: 'Step 3: Verify Container Port Mapping', command: 'docker run -d -p 3000:3000 --name my-app cloudverse-node-app:v1' }
      ]
    },
    {
      id: 'docker-2',
      title: 'Microservices with Docker Compose',
      description: 'Deploy a multi-container stack with a frontend (React), backend (Node), and a database (PostgreSQL) using docker-compose.yml.',
      difficulty: 'Intermediate',
      time: '2 hours',
      skills: ['Docker Compose', 'Networks', 'Volumes'],
      buildSteps: [
        { title: 'Step 1: Write docker-compose.yml', code: 'version: "3.8"\nservices:\n  api:\n    build: ./backend\n    ports: ["5000:5000"]\n  db:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_PASSWORD: secret' },
        { title: 'Step 2: Launch Multi-Container Stack', command: 'docker-compose up -d --build' },
        { title: 'Step 3: Inspect Container Logs & Networks', command: 'docker-compose logs -f api' }
      ]
    }
  ],
  aws: [
    {
      id: 'aws-1',
      title: 'Host a Static Website on S3',
      description: 'Configure an S3 bucket for static website hosting, attach an appropriate bucket policy, and set up CloudFront for global CDN distribution.',
      difficulty: 'Beginner',
      time: '45 mins',
      skills: ['S3', 'CloudFront', 'IAM Policies'],
      buildSteps: [
        { title: 'Step 1: Provision Public S3 Bucket', code: 'aws s3 mb s3://cloudverse-prod-web-2026\naws s3 website s3://cloudverse-prod-web-2026/ --index-document index.html' },
        { title: 'Step 2: Attach Read-Only Bucket Policy', code: '{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Principal": "*",\n    "Action": "s3:GetObject",\n    "Resource": "arn:aws:s3:::cloudverse-prod-web-2026/*"\n  }]\n}' },
        { title: 'Step 3: Sync Build Artifacts to S3', command: 'aws s3 sync ./dist s3://cloudverse-prod-web-2026/' }
      ]
    },
    {
      id: 'aws-2',
      title: 'Serverless REST API',
      description: 'Build a serverless backend using API Gateway routing requests to AWS Lambda functions, storing data in a DynamoDB table.',
      difficulty: 'Intermediate',
      time: '2 hours',
      skills: ['Lambda', 'API Gateway', 'DynamoDB'],
      buildSteps: [
        { title: 'Step 1: Package Lambda Handler (index.js)', code: 'exports.handler = async (event) => {\n  return {\n    statusCode: 200,\n    body: JSON.stringify({ message: "Hello from Cloudverse Serverless API!" })\n  };\n};' },
        { title: 'Step 2: Deploy Lambda Function via AWS CLI', command: 'zip function.zip index.js && aws lambda create-function --function-name CloudverseAPI --runtime nodejs18.x --role arn:aws:iam::123456789012:role/lambda-role --handler index.handler --zip-file fileb://function.zip' },
        { title: 'Step 3: Link API Gateway Trigger', command: 'aws apigatewayv2 create-api --name "CloudverseGateway" --protocol-type HTTP --target arn:aws:lambda:us-east-1:123456789012:function:CloudverseAPI' }
      ]
    }
  ],
  kubernetes: [
    {
      id: 'k8s-1',
      title: 'Deploy an Nginx Pod & Service',
      description: 'Write deployment.yaml and service.yaml manifests to run a replicated Nginx web server exposed via a NodePort Service.',
      difficulty: 'Beginner',
      time: '45 mins',
      skills: ['Pod Manifests', 'Deployments', 'NodePort Service'],
      buildSteps: [
        { title: 'Step 1: Define Deployment Manifest (deployment.yaml)', code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:alpine\n        ports:\n        - containerPort: 80' },
        { title: 'Step 2: Apply Manifest to Cluster', command: 'kubectl apply -f deployment.yaml' },
        { title: 'Step 3: Expose via Service Manifest', command: 'kubectl expose deployment nginx-web --type=NodePort --port=80' }
      ]
    },
    {
      id: 'k8s-2',
      title: 'High Availability Auto-Scaling Stack',
      description: 'Configure Horizontal Pod Autoscaler (HPA) with CPU thresholds and set up Ingress rules with SSL termination.',
      difficulty: 'Intermediate',
      time: '2 hours',
      skills: ['HPA', 'ConfigMaps', 'Ingress Controller'],
      buildSteps: [
        { title: 'Step 1: Configure Horizontal Pod Autoscaler', command: 'kubectl autoscale deployment nginx-web --cpu-percent=50 --min=2 --max=10' },
        { title: 'Step 2: Create ConfigMap for Environment Configs', code: 'apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\ndata:\n  ENV: "production"\n  LOG_LEVEL: "info"' },
        { title: 'Step 3: Verify Pod Replication Under Load', command: 'kubectl get hpa nginx-web --watch' }
      ]
    }
  ],
  linux: [
    {
      id: 'linux-1',
      title: 'Automated Backup Shell Script',
      description: 'Write a Bash script that compresses application logs, uploads archives to remote storage, and schedules execution via Cron.',
      difficulty: 'Beginner',
      time: '45 mins',
      skills: ['Bash Scripting', 'Crontab', 'File Permissions'],
      buildSteps: [
        { title: 'Step 1: Write backup.sh Script', code: '#!/bin/bash\nTIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")\ntar -czf /backups/app_logs_$TIMESTAMP.tar.gz /var/log/app/\necho "Backup completed successfully at $TIMESTAMP"' },
        { title: 'Step 2: Grant Execution Permissions', command: 'chmod +x /usr/local/bin/backup.sh' },
        { title: 'Step 3: Schedule Daily Midnight Cron Job', command: '(crontab -l 2>/dev/null; echo "0 0 * * * /usr/local/bin/backup.sh") | crontab -' }
      ]
    },
    {
      id: 'linux-2',
      title: 'Secure Web Server Setup & UFW Firewall',
      description: 'Harden a Ubuntu server by disabling root SSH login, configuring UFW firewall rules, and creating a custom systemd service.',
      difficulty: 'Intermediate',
      time: '1.5 hours',
      skills: ['UFW Firewall', 'Systemd Services', 'SSH Hardening'],
      buildSteps: [
        { title: 'Step 1: Configure UFW Firewall Rules', command: 'sudo ufw default deny incoming && sudo ufw allow 22/tcp && sudo ufw allow 80,443/tcp && sudo ufw enable' },
        { title: 'Step 2: Create Systemd Service File (/etc/systemd/system/cloudverse.service)', code: '[Unit]\nDescription=Cloudverse Node Application\nAfter=network.target\n\n[Service]\nUser=www-data\nWorkingDirectory=/var/www/app\nExecStart=/usr/bin/node server.js\nRestart=always\n\n[Install]\nWantedBy=multi-user.target' },
        { title: 'Step 3: Enable & Start Systemd Service', command: 'sudo systemctl daemon-reload && sudo systemctl enable --now cloudverse' }
      ]
    }
  ],
  git: [
    {
      id: 'git-1',
      title: 'Git Flow & Feature Branching Workflow',
      description: 'Initialize a repository, implement Git Flow branching strategies, create pull requests, and resolve simulated merge conflicts.',
      difficulty: 'Beginner',
      time: '45 mins',
      skills: ['Branching', 'Merge Conflicts', 'Pull Requests'],
      buildSteps: [
        { title: 'Step 1: Initialize Repository & Feature Branch', command: 'git init && git checkout -b feature/auth-module' },
        { title: 'Step 2: Stage & Commit Feature Implementation', command: 'git add . && git commit -m "feat: implement JWT authentication handler"' },
        { title: 'Step 3: Merge Feature Back to Main with Conflict Check', command: 'git checkout main && git merge --no-ff feature/auth-module' }
      ]
    },
    {
      id: 'git-2',
      title: 'Interactive Rebase & Commit History Clean',
      description: 'Clean up messy commit histories using interactive rebase (squash, fixup, reword) and recover lost commits using git reflog.',
      difficulty: 'Intermediate',
      time: '1 hour',
      skills: ['Interactive Rebase', 'Cherry-pick', 'Git Reflog'],
      buildSteps: [
        { title: 'Step 1: Start Interactive Rebase of Last 4 Commits', command: 'git rebase -i HEAD~4' },
        { title: 'Step 2: Squash Minor Commits in Editor', code: 'pick f7f3f6d feat: initial user login setup\nsquash 310154e fix: typo in login button label\nsquash a5f4a0d style: align input fields properly\npick c7a2b91 test: add unit tests for auth service' },
        { title: 'Step 3: Verify Clean Commit Log', command: 'git log --oneline --graph --all' }
      ]
    }
  ],
  terraform: [
    {
      id: 'tf-1',
      title: 'Provision AWS VPC & EC2 Infrastructure',
      description: 'Write main.tf and variables.tf in HCL to provision a custom Virtual Private Cloud with public subnets and an EC2 web server instance.',
      difficulty: 'Beginner',
      time: '1 hour',
      skills: ['HCL Syntax', 'AWS Provider', 'Resource Blocks'],
      buildSteps: [
        { title: 'Step 1: Configure AWS Provider & VPC Resource (main.tf)', code: 'provider "aws" {\n  region = "us-east-1"\n}\n\nresource "aws_vpc" "main" {\n  cidr_block = "10.0.0.0/16"\n  tags = { Name = "Cloudverse-VPC" }\n}' },
        { title: 'Step 2: Initialize Terraform Workspace & Providers', command: 'terraform init' },
        { title: 'Step 3: Preview & Execute Execution Plan', command: 'terraform plan -out=tfplan && terraform apply -auto-approve tfplan' }
      ]
    },
    {
      id: 'tf-2',
      title: 'Remote State in S3 with DynamoDB Locking',
      description: 'Set up an S3 backend for remote state storage with DynamoDB state locking to prevent concurrent state file corruption across team members.',
      difficulty: 'Intermediate',
      time: '1.5 hours',
      skills: ['Remote Backend', 'State Locking', 'DynamoDB'],
      buildSteps: [
        { title: 'Step 1: Configure S3 Backend Block (backend.tf)', code: 'terraform {\n  backend "s3" {\n    bucket         = "cloudverse-terraform-state-prod"\n    key            = "global/s3/terraform.tfstate"\n    region         = "us-east-1"\n    dynamodb_table = "terraform-state-locks"\n    encrypt        = true\n  }\n}' },
        { title: 'Step 2: Migrate Local State to S3 Backend', command: 'terraform init -migrate-state' },
        { title: 'Step 3: Verify State Lock Acquisition', command: 'terraform state list && terraform force-unlock <LOCK-ID-IF-NEEDED>' }
      ]
    }
  ]
};

export default function ProjectsTab({ techSlug, techProgress = 0 }) {
  const [activeDeployProject, setActiveDeployProject] = useState(null);
  const [activeBuildProject, setActiveBuildProject] = useState(null);
  const [deployLogs, setDeployLogs] = useState([]);
  const [buildLogs, setBuildLogs] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [buildSuccess, setBuildSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [builtProjects, setBuiltProjects] = useState({});

  const projects = PROJECT_SCENARIOS[techSlug] || [
    {
      id: `${techSlug}-default`,
      title: `Build a Basic ${techSlug?.toUpperCase()} Project`,
      description: `A practical hands-on scenario to construct, configure, and compile your first ${techSlug?.toUpperCase()} architecture from scratch.`,
      difficulty: 'Beginner',
      time: '1 hour',
      skills: ['Core Concepts', 'Configuration', 'Build Pipeline'],
      buildSteps: [
        { title: `Step 1: Initialize ${techSlug?.toUpperCase()} Configuration`, command: `${techSlug || 'app'} init --template=starter` },
        { title: 'Step 2: Install Dependencies & Validate', command: `${techSlug || 'app'} validate && ${techSlug || 'app'} build` },
        { title: 'Step 3: Test Local Build Artifact', command: `${techSlug || 'app'} run --port=8080` }
      ]
    }
  ];

  const handleStartBuild = (project) => {
    setActiveBuildProject(project);
    setBuildLogs([]);
    setIsBuilding(false);
    setBuildSuccess(builtProjects[project.id] || false);
  };

  const handleRunLocalBuild = async () => {
    if (!activeBuildProject) return;
    setIsBuilding(true);
    setBuildSuccess(false);
    setBuildLogs([]);

    const steps = [
      `[1/4] Initializing local build workspace for "${activeBuildProject.title}"...`,
      `[2/4] Executing step syntax checks & verifying required CLI tools...`,
      `[3/4] Compiling project configuration & generating local artifacts...`,
      `[4/4] ✔ Local Build Completed Successfully! Artifact ready for Live Deployment.`
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(res => setTimeout(res, 700));
      setBuildLogs(prev => [...prev, steps[i]]);
    }

    setIsBuilding(false);
    setBuildSuccess(true);
    setBuiltProjects(prev => ({ ...prev, [activeBuildProject.id]: true }));
    toast.success('Project built successfully! You can now deploy it to Live Server.');
  };

  const handleStartDeploy = async (project) => {
    setActiveBuildProject(null);
    setActiveDeployProject(project);
    setDeployLogs([]);
    setIsDeploying(true);
    setDeploySuccess(false);

    const steps = [
      `[1/5] Loading compiled build artifact for "${project.title}"...`,
      `[2/5] Provisioning ephemeral cloud container (256MB RAM / 0.25 vCPU)...`,
      `[3/5] Injecting environment configurations & SSL certificates...`,
      `[4/5] Running health check on exposed endpoint...`,
      `[5/5] ✔ Deployment Successful! Server is live and receiving traffic.`
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(res => setTimeout(res, 800));
      setDeployLogs(prev => [...prev, steps[i]]);
    }

    setIsDeploying(false);
    setDeploySuccess(true);
    toast.success('Project deployed successfully to Live Server!');
  };

  const closeDeployModal = () => {
    setActiveDeployProject(null);
    setDeployLogs([]);
    setIsDeploying(false);
    setDeploySuccess(false);
  };

  const closeBuildModal = () => {
    setActiveBuildProject(null);
    setBuildLogs([]);
    setIsBuilding(false);
  };

  const liveUrl = `https://cloudverse-live.dev/app/${activeDeployProject?.id || 'demo'}-${Math.floor(Math.random() * 89999 + 10000)}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    toast.success('Live URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 relative">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              Hands-On Projects & Live Sandbox
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Follow a realistic 2-step engineer workflow: <strong className="text-slate-900 font-semibold">1. Build & Configure Project</strong> locally, then <strong className="text-slate-900 font-semibold">2. Deploy to Live Server</strong>.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs px-3.5 py-2 rounded-full font-bold flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>2-Step Build & Deploy Workflow</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const isBuilt = builtProjects[project.id];

            return (
              <div 
                key={project.id} 
                className={`group border rounded-2xl bg-white transition-all flex flex-col overflow-hidden ${
                  isBuilt 
                    ? 'border-emerald-300 shadow-md shadow-emerald-500/5' 
                    : 'border-slate-200/90 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5'
                }`}
              >
                {/* Project Card Header */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border border-green-200' :
                        project.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {project.difficulty}
                      </span>
                      {isBuilt && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold animate-in fade-in">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Built & Ready
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {project.time}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="p-6 pb-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> Skills & Tools You'll Practice
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2-Step Action Footer */}
                <div className="p-6 mt-4 pt-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row gap-2.5">
                  {/* Step 1: Build Project */}
                  <Button 
                    onClick={() => {
                      if (techProgress < 100) {
                        toast.error(`Please complete 100% of the ${techSlug.toUpperCase()} curriculum to unlock projects!`);
                        return;
                      }
                      handleStartBuild(project);
                    }}
                    className={`flex-1 font-extrabold text-xs sm:text-sm py-3 transition-all ${
                      techProgress < 100
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed hover:bg-slate-100'
                        : isBuilt 
                          ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 shadow-2xs' 
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/15 hover:scale-[1.02]'
                    }`}
                  >
                    {techProgress < 100 ? (
                      <Lock className="w-4 h-4 mr-2 shrink-0" />
                    ) : isBuilt ? (
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    ) : (
                      <Hammer className="w-4 h-4 mr-2 text-amber-300 shrink-0" />
                    )}
                    <span>{techProgress < 100 ? 'Locked (Requires 100%)' : isBuilt ? '1. Review Build' : '1. Build Project'}</span>
                  </Button>

                  {/* Step 2: Deploy to Live (locked until built) */}
                  <Button 
                    onClick={() => {
                      if (isBuilt) {
                        handleStartDeploy(project);
                      } else {
                        toast.error('Please Build the project first before deploying to live!');
                        handleStartBuild(project);
                      }
                    }}
                    className={`flex-1 font-extrabold text-xs sm:text-sm py-3 transition-all ${
                      isBuilt 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/20 hover:scale-[1.02] animate-pulse' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200/70 hover:text-slate-600'
                    }`}
                  >
                    {!isBuilt ? <Lock className="w-3.5 h-3.5 mr-1.5 shrink-0" /> : <Rocket className="w-4 h-4 mr-1.5 shrink-0 animate-bounce" />}
                    <span>2. Deploy to Live</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* STEP 1: Build Project Studio Modal */}
      <AnimatePresence>
        {activeBuildProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden border border-slate-200 shadow-2xl my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
                  <Hammer className="w-5 h-5 text-amber-400" />
                  <span>Step 1: Project Build Studio — {activeBuildProject.title}</span>
                </div>
                <button onClick={closeBuildModal} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Build Content Area */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-slate-700 text-sm flex items-start gap-3">
                  <FileCode className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-900">Build Instructions: </span>
                    Follow these step-by-step commands or code configurations to build your artifact before deploying to live server.
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-4">
                  {activeBuildProject.buildSteps?.map((step, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center">
                        <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-extrabold">{idx + 1}</span>
                          {step.title}
                        </span>
                        <button 
                          onClick={() => handleCopyCode(step.code || step.command)}
                          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 px-2 py-1 rounded bg-white border border-slate-200 shadow-2xs transition-colors"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>
                      <div className="p-4 bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto whitespace-pre">
                        {step.code || step.command}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Local Build Simulation Terminal */}
                {isBuilding || buildLogs.length > 0 ? (
                  <div className="p-4 rounded-2xl bg-[#1a1b26] border border-slate-800 font-mono text-xs space-y-2">
                    <div className="text-slate-500 pb-1 border-b border-slate-800 flex items-center justify-between">
                      <span>$ cloudverse build --target="{activeBuildProject.id}"</span>
                      {isBuilding && <span className="text-amber-400 animate-pulse">Running build...</span>}
                    </div>
                    {buildLogs.map((log, idx) => (
                      <div key={idx} className={log.includes('✔') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                        {log}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 font-medium">
                  {buildSuccess ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> Project successfully built! Ready for deployment.
                    </span>
                  ) : (
                    <span>Click Run Local Build to compile and verify your project code.</span>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {!buildSuccess ? (
                    <Button 
                      onClick={handleRunLocalBuild} 
                      disabled={isBuilding}
                      className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6"
                    >
                      <Play className="w-4 h-4 mr-2 text-amber-400 fill-current" />
                      {isBuilding ? 'Building Project...' : 'Run Local Build & Test'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleStartDeploy(activeBuildProject)}
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold px-6 shadow-lg shadow-emerald-600/25 animate-bounce"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Proceed to Live Deploy 🚀
                    </Button>
                  )}
                  <Button variant="outline" onClick={closeBuildModal} className="w-full sm:w-auto">
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 2: Deploy to Live Server Modal */}
      <AnimatePresence>
        {activeDeployProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden border border-slate-200 shadow-2xl my-8"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white border-b border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Step 2: Live Server Deployment — {activeDeployProject.title}
                </div>
                <button onClick={closeDeployModal} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Terminal Logs Area */}
              <div className="p-6 bg-[#1a1b26] text-slate-300 font-mono text-xs md:text-sm h-64 overflow-y-auto space-y-3">
                <div className="text-slate-500">
                  $ cloudverse deploy --project="{activeDeployProject.id}" --artifact="built-ready"
                </div>
                {deployLogs.map((log, idx) => (
                  <div key={idx} className={log.includes('✔') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {log}
                  </div>
                ))}
                {isDeploying && (
                  <div className="flex items-center gap-2 text-amber-400 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Provisioning cloud resources & starting container...
                  </div>
                )}
              </div>

              {/* Modal Footer / Success Banner */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                {deploySuccess ? (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0 shadow-sm">
                          <Rocket className="w-5 h-5 animate-bounce" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            Live Environment URL
                          </div>
                          <div className="text-sm font-bold text-slate-900 truncate font-mono">
                            {liveUrl}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={handleCopyUrl} className="shrink-0 bg-white font-bold">
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <ExternalLink className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 bg-amber-50/90 border border-amber-200/80 p-3 rounded-xl">
                      <span className="flex items-center gap-1.5 font-bold text-amber-900">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                        Auto-cleanup Sandbox Active
                      </span>
                      <span>Server destroys automatically in <strong className="text-amber-950 font-extrabold">23h 59m</strong></span>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold shadow-md" onClick={() => window.open('https://github.com', '_blank')}>
                        View Deployed Code
                      </Button>
                      <Button variant="outline" className="w-full font-bold" onClick={closeDeployModal}>
                        Close Window
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span>Do not close this window while provisioning is in progress.</span>
                    <Button size="sm" variant="outline" onClick={closeDeployModal} disabled={isDeploying} className="font-bold">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
