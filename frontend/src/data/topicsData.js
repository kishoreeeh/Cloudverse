// Comprehensive DevOps & Cloud Learning Data for CloudVerse (Basic to Pro Roadmap)

export const technologiesData = {
  aws: {
    id: 'aws',
    slug: 'aws',
    title: 'Amazon Web Services',
    shortName: 'AWS',
    description: 'Master enterprise cloud infrastructure, compute, networking, security, and cloud automation from Basic to Pro.',
    icon: 'Cloud',
    color: '#FF9900',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    officialDocUrl: 'https://docs.aws.amazon.com/',
    topics: [
      {
        id: 'cloud-fundamentals',
        slug: 'cloud-fundamentals',
        title: '1. Cloud Fundamentals & AWS Infrastructure',
        level: 'BASIC',
        category: 'Foundations',
        summary: 'Core cloud computing models (IaaS, PaaS, SaaS) and AWS Global Regions & Availability Zones.',
        docUrl: 'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/global-infrastructure.html',
        youtubeEmbedId: 'ulprqHHWlng',
        whatIsIt: `Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. AWS Global Infrastructure is built around AWS Regions and Availability Zones (AZs).`,
        whyIsItUsed: `Replaces expensive upfront data center hardware investments with elastic, globally distributed cloud infrastructure.`,
        features: [
          'AWS Regions (geographical locations worldwide)',
          'Availability Zones (isolated data centers with high-speed fiber interlinks)',
          'Edge Locations for AWS CloudFront Content Delivery Network (CDN)',
          'Shared Responsibility Model (AWS manages physical security; customer manages data/config)'
        ],
        advantages: [
          'Trade capital expense for variable operating expense',
          'Massive economies of scale',
          'Stop guessing infrastructure capacity needs',
          'Deploy globally in minutes'
        ],
        useCase: `A global SaaS company deploys across AWS Regions in N. Virginia, Frankfurt, and Tokyo to achieve low-latency user access and compliance with data residency laws.`,
        workingExplanation: `AWS divides global data centers into isolated Availability Zones connected via ultra-low latency optical networking. Distributing apps across multi-AZs ensures high availability.`,
        usageSteps: [
          'Sign up for AWS Free Tier account.',
          'Open AWS Management Console and select your primary AWS Region.',
          'Review AWS Support Plans and Billing Dashboard.'
        ],
        commands: `# Check current AWS Identity & Region via CLI
aws sts get-caller-identity
aws configure get region`,
        bestPractices: [
          'Enable Multi-Factor Authentication (MFA) on AWS Root Account.',
          'Use AWS Organizations to separate dev, staging, and production workloads.'
        ],
        interviewQuestions: [
          {
            question: 'What is the AWS Shared Responsibility Model?',
            answer: 'AWS is responsible for security OF the cloud (physical data centers, host OS, hypervisors, hardware). The customer is responsible for security IN the cloud (IAM policies, data encryption, firewall rules, OS patches).'
          }
        ],
        quiz: [
          {
            question: 'What consists of one or more discrete data centers with redundant power and networking in an AWS Region?',
            options: ['Edge Location', 'Availability Zone (AZ)', 'Data Bucket', 'VPC Hub'],
            answerIndex: 1,
            explanation: 'An Availability Zone (AZ) is one or more discrete data centers within an AWS Region.'
          }
        ]
      },
      {
        id: 'iam',
        slug: 'iam',
        title: '2. Identity & Access Management (IAM)',
        level: 'BASIC',
        category: 'Security',
        summary: 'Centralized access control, identity authorization, and security permissions for AWS services.',
        docUrl: 'https://docs.aws.amazon.com/iam/',
        youtubeEmbedId: 'aISrD7W3b30',
        whatIsIt: `AWS IAM enables you to manage access to AWS services and resources securely.`,
        whyIsItUsed: `IAM enforces the Principle of Least Privilege so engineers and apps only access exact authorized resources.`,
        features: [
          'IAM Users, Groups, Roles, and Service Principals',
          'JSON Policy Documents (Identity & Resource-Based)',
          'Multi-Factor Authentication (MFA)',
          'AWS STS for temporary security credentials'
        ],
        advantages: ['Zero-trust security model', 'No additional cost for IAM entities'],
        useCase: `EC2 instances assume an IAM Role with S3 Read-Only permissions without storing secret keys on disk.`,
        workingExplanation: `IAM evaluates all JSON policies attached to principals. Explicit DENY overrides any ALLOW statement.`,
        usageSteps: ['Create IAM Roles for AWS Services', 'Attach managed policies', 'Enforce MFA policies'],
        commands: `aws iam list-users\naws iam create-user --user-name dev-user`,
        bestPractices: ['Never use root account for daily tasks.', 'Use IAM Roles instead of long-lived access keys.'],
        interviewQuestions: [
          {
            question: 'Difference between IAM User and IAM Role?',
            answer: 'IAM User has static long-lived credentials. IAM Role has temporary credentials assumed by users or services.'
          }
        ],
        quiz: [
          {
            question: 'Which statement is true regarding IAM policy evaluation?',
            options: ['Explicit DENY overrides ALLOW', 'ALLOW overrides DENY', 'Default access is ALLOW', 'Resource policy overrides DENY'],
            answerIndex: 0,
            explanation: 'An explicit DENY statement always overrides any ALLOW.'
          }
        ]
      },
      {
        id: 'ec2',
        slug: 'ec2',
        title: '3. Elastic Compute Cloud (EC2)',
        level: 'BASIC',
        category: 'Compute',
        summary: 'Resizable virtual servers in the AWS cloud with full root administrative access.',
        docUrl: 'https://docs.aws.amazon.com/ec2/',
        youtubeEmbedId: 'lZ3bPUKo5ZC',
        whatIsIt: `Amazon EC2 provides scalable computing capacity in the AWS Cloud without hardware overhead.`,
        whyIsItUsed: `Allows launching Linux or Windows virtual servers on demand with complete OS control.`,
        features: ['AMIs for OS blueprints', 'Instance Types', 'EBS Storage Volumes', 'Security Groups'],
        advantages: ['Complete OS root access', 'Pay-as-you-go elastic billing'],
        useCase: `Running web servers, background workers, and database instances.`,
        workingExplanation: `AWS Nitro hypervisor provisions virtual CPU & RAM on host machines bound to EBS root disks.`,
        usageSteps: ['Launch Instance -> Select AMI', 'Choose Instance Type', 'Attach Key Pair & Security Group'],
        commands: `ssh -i key.pem ubuntu@ec2-public-ip\nsudo systemctl start nginx`,
        bestPractices: ['Use IMDSv2 for security', 'Place EC2 in private subnets with Load Balancers.'],
        interviewQuestions: [
          {
            question: 'Stopping vs Terminating an EC2 instance?',
            answer: 'Stopping performs shutdown (EBS data persists, compute charges stop). Terminating permanently deletes the VM.'
          }
        ],
        quiz: [
          {
            question: 'Which EC2 purchase option offers up to 90% discount for fault-tolerant workloads?',
            options: ['On-Demand', 'Spot Instances', 'Reserved', 'Dedicated Host'],
            answerIndex: 1,
            explanation: 'Spot Instances offer unused capacity at up to 90% savings.'
          }
        ]
      },
      {
        id: 's3',
        slug: 's3',
        title: '4. Simple Storage Service (S3)',
        level: 'BASIC',
        category: 'Storage',
        summary: 'Scalable, durable 99.999999999% object storage for unstructured data and backups.',
        docUrl: 'https://docs.aws.amazon.com/s3/',
        youtubeEmbedId: 'e-kSGNzu0vM',
        whatIsIt: `Amazon S3 stores data as objects within buckets with high availability and security.`,
        whyIsItUsed: `Infinite scale storage for assets, data lakes, static sites, and backups.`,
        features: ['Storage Classes (Standard, Glacier)', 'Versioning & Lifecycle Rules', 'Bucket Policies'],
        advantages: ['11 9s durability', 'Unlimited scale'],
        useCase: `Storing media files and lifecycle archiving to Glacier Deep Archive.`,
        workingExplanation: `S3 stores Objects (Key, Value, Metadata) across multiple data centers in a region.`,
        usageSteps: ['Create Bucket', 'Set Encryption & Versioning', 'Upload via AWS CLI'],
        commands: `aws s3 mb s3://my-app-bucket-2026\naws s3 sync ./dist s3://my-app-bucket-2026`,
        bestPractices: ['Block Public Access by default', 'Use Lifecycle Rules for cost saving.'],
        interviewQuestions: [
          {
            question: 'What is 11 9s durability?',
            answer: 'It means 99.999999999% probability that an object will not be lost in a given year.'
          }
        ],
        quiz: [
          {
            question: 'What is the durability rating of Amazon S3?',
            options: ['99.9%', '99.999999999% (11 9s)', '99%', '95%'],
            answerIndex: 1,
            explanation: 'S3 standard is engineered for 11 9s of data durability.'
          }
        ]
      },
      {
        id: 'vpc',
        slug: 'vpc',
        title: '5. Virtual Private Cloud (VPC)',
        level: 'INTERMEDIATE',
        category: 'Networking',
        summary: 'Isolated virtual network environment for hosting secure enterprise cloud infrastructure.',
        docUrl: 'https://docs.aws.amazon.com/vpc/',
        youtubeEmbedId: 'g2JOHLHh4fI',
        whatIsIt: `AWS VPC lets you provision a logically isolated section of the AWS Cloud.`,
        whyIsItUsed: `Provides full control over IP address ranges, subnets, route tables, and gateways.`,
        features: ['CIDR IPv4/IPv6 blocks', 'Public & Private Subnets', 'Internet & NAT Gateways'],
        advantages: ['Isolated private subnets for databases', 'Custom routing'],
        useCase: `Building 3-tier enterprise architecture (Public ALB, Private App, Isolated DB).`,
        workingExplanation: `Subnets divide CIDR blocks into AZs. Route tables direct traffic to IGW or NAT Gateway.`,
        usageSteps: ['Create VPC (10.0.0.0/16)', 'Create Subnets', 'Attach Internet Gateway'],
        commands: `aws ec2 create-vpc --cidr-block 10.0.0.0/16\naws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24`,
        bestPractices: ['Deploy subnets across multi-AZs.', 'Enable VPC Flow Logs.'],
        interviewQuestions: [
          {
            question: 'Difference between Public and Private Subnet?',
            answer: 'Public Subnet has a route directly to an Internet Gateway (0.0.0.0/0 -> IGW). Private Subnet routes via NAT Gateway or has no internet route.'
          }
        ],
        quiz: [
          {
            question: 'Which component allows outbound internet access for instances in a private subnet?',
            options: ['Internet Gateway', 'NAT Gateway', 'VPC Router', 'Egress IGW'],
            answerIndex: 1,
            explanation: 'NAT Gateway enables outbound internet traffic while blocking unsolicited inbound connections.'
          }
        ]
      },
      {
        id: 'security-groups-nacls',
        slug: 'security-groups-nacls',
        title: '6. Security Groups & NACLs',
        level: 'INTERMEDIATE',
        category: 'Security & Networking',
        summary: 'Stateful instance-level firewalls and stateless subnet-level network access control lists.',
        docUrl: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html',
        youtubeEmbedId: '3qE3T-j_9gM',
        whatIsIt: `Security Groups act as virtual firewalls at the EC2 instance level (stateful). NACLs act as firewalls at the subnet level (stateless).`,
        whyIsItUsed: `Defends cloud resources against unauthorized port intrusion and malicious IP traffic.`,
        features: ['Stateful Security Groups', 'Stateless NACLs with rule numbers', 'Inbound & Outbound rules'],
        advantages: ['Layered defense-in-depth networking security'],
        useCase: `Restricting database port 5432 to allow connections ONLY from App Server Security Group.`,
        workingExplanation: `Security Groups automatically allow return traffic (stateful). NACLs require explicit inbound AND outbound allow rules (stateless).`,
        usageSteps: ['Create Security Group', 'Add Inbound Rule (Port 80/443)', 'Associate with EC2'],
        commands: `aws ec2 authorize-security-group-ingress --group-id sg-xxx --protocol tcp --port 80 --cidr 0.0.0.0/0`,
        bestPractices: ['Never allow 0.0.0.0/0 on SSH Port 22.', 'Reference Security Groups instead of IP addresses.'],
        interviewQuestions: [
          {
            question: 'Stateful vs Stateless firewall in AWS?',
            answer: 'Security Groups are stateful (inbound allowed = response automatically allowed). NACLs are stateless (response must be explicitly allowed outbound).'
          }
        ],
        quiz: [
          {
            question: 'Security Groups operate at which level?',
            options: ['Subnet Level', 'Instance/NIC Level', 'VPC Level', 'Region Level'],
            answerIndex: 1,
            explanation: 'Security Groups operate at the network interface / EC2 instance level.'
          }
        ]
      },
      {
        id: 'alb-auto-scaling',
        slug: 'alb-auto-scaling',
        title: '7. Load Balancing & Auto Scaling',
        level: 'INTERMEDIATE',
        category: 'High Availability',
        summary: 'Distribute incoming traffic with ALB and scale EC2 capacity automatically with ASG.',
        docUrl: 'https://docs.aws.amazon.com/autoscaling/',
        youtubeEmbedId: '7XqPmsRjAxs',
        whatIsIt: `Application Load Balancer (ALB) routes HTTP/HTTPS traffic. Auto Scaling Groups (ASG) adjust compute capacity automatically.`,
        whyIsItUsed: `Ensures high availability, fault tolerance, and automatic elasticity under heavy traffic spikes.`,
        features: ['Path-based and host-based ALB routing', 'Health Check probes', 'Dynamic & Target Tracking Scaling'],
        advantages: ['Automatic self-healing of failed instances', 'Zero downtime deployments'],
        useCase: `E-commerce store scaling from 5 to 50 EC2 instances during Black Friday sale automatically.`,
        workingExplanation: `ALB checks target instance health. ASG monitors CPU metrics and launches new instances if target metrics are exceeded.`,
        usageSteps: ['Create Target Group', 'Configure ALB Listener (Port 80/443)', 'Attach ASG to Target Group'],
        commands: `aws autoscaling set-desired-capacity --auto-scaling-group-name my-asg --desired-capacity 5`,
        bestPractices: ['Always deploy ALB across multiple Availability Zones.'],
        interviewQuestions: [
          {
            question: 'Difference between ALB and NLB?',
            answer: 'ALB operates at Layer 7 (HTTP/HTTPS) with path-based routing. NLB operates at Layer 4 (TCP/UDP) for ultra-low latency million RPS.'
          }
        ],
        quiz: [
          {
            question: 'Which Load Balancer type operates at OSI Layer 7?',
            options: ['Network Load Balancer', 'Application Load Balancer', 'Classic Load Balancer', 'Gateway Balancer'],
            answerIndex: 1,
            explanation: 'Application Load Balancer (ALB) operates at Layer 7.'
          }
        ]
      },
      {
        id: 'rds-dynamodb',
        slug: 'rds-dynamodb',
        title: '8. AWS Databases: RDS & DynamoDB',
        level: 'INTERMEDIATE',
        category: 'Database',
        summary: 'Managed relational SQL databases (RDS/Aurora) and single-digit millisecond NoSQL (DynamoDB).',
        docUrl: 'https://docs.aws.amazon.com/rds/',
        youtubeEmbedId: 'r-j8t9fG4uE',
        whatIsIt: `AWS RDS automates PostgreSQL/MySQL setup and backups. DynamoDB is a fully managed NoSQL key-value database.`,
        whyIsItUsed: `Eliminates database administrative overhead like patching, multi-AZ replication, and scaling.`,
        features: ['RDS Multi-AZ failover & Read Replicas', 'DynamoDB serverless auto-scaling', 'Point-in-time recovery'],
        advantages: ['Automated backups & OS patching', 'Sub-10ms latency'],
        useCase: `Storing user profiles in DynamoDB and financial transactions in Multi-AZ PostgreSQL RDS.`,
        workingExplanation: `RDS Multi-AZ synchronously replicates data to a standby instance in a different AZ. DynamoDB partitions data automatically across SSD clusters.`,
        usageSteps: ['Provision RDS instance in private subnet group', 'Enable Automated Backups', 'Connect via app driver'],
        commands: `aws rds describe-db-instances\naws dynamodb list-tables`,
        bestPractices: ['Never expose database ports to public internet.', 'Enable Encryption at Rest via KMS.'],
        interviewQuestions: [
          {
            question: 'Multi-AZ RDS vs Read Replicas?',
            answer: 'Multi-AZ is for High Availability and synchronous disaster recovery (standby DB cannot be queried). Read Replicas are for scaling read traffic asynchronously.'
          }
        ],
        quiz: [
          {
            question: 'Which AWS database service provides serverless NoSQL key-value storage?',
            options: ['Amazon RDS', 'Amazon Aurora', 'Amazon DynamoDB', 'Amazon Redshift'],
            answerIndex: 2,
            explanation: 'Amazon DynamoDB is a serverless NoSQL key-value database.'
          }
        ]
      },
      {
        id: 'ecs-eks',
        slug: 'ecs-eks',
        title: '9. Container Orchestration: ECS & EKS',
        level: 'PRO',
        category: 'Containers & DevOps',
        summary: 'Run production container workloads with AWS ECS and Managed Kubernetes (EKS).',
        docUrl: 'https://docs.aws.amazon.com/eks/',
        youtubeEmbedId: 'T85bT0r8-xY',
        whatIsIt: `AWS ECS is AWS's native container service. EKS is managed Kubernetes service. AWS Fargate provides serverless compute for both.`,
        whyIsItUsed: `Orchestrates hundreds of Docker containers with automated deployment, scaling, and load balancing.`,
        features: ['AWS Fargate serverless execution', 'Task Definitions & Pod Specifications', 'IAM for Tasks/Pods'],
        advantages: ['No server management with Fargate', 'Native Kubernetes API compatibility with EKS'],
        useCase: `Deploying microservices infrastructure using EKS with Karpenter auto-scaling.`,
        workingExplanation: `ECS/EKS schedulers place container tasks on EC2 worker nodes or serverless Fargate capacity.`,
        usageSteps: ['Create ECS/EKS Cluster', 'Define Task Definition / Helm Chart', 'Deploy Service'],
        commands: `aws ecs list-clusters\naws eks update-kubeconfig --name my-eks-cluster`,
        bestPractices: ['Use Fargate to eliminate worker node management.', 'Assign IAM Roles to Tasks/ServiceAccounts.'],
        interviewQuestions: [
          {
            question: 'What is AWS Fargate?',
            answer: 'AWS Fargate is a serverless compute engine for ECS and EKS that allows running containers without managing EC2 instances.'
          }
        ],
        quiz: [
          {
            question: 'Which service allows running containers on ECS without provisioning EC2 instances?',
            options: ['AWS EC2 Spot', 'AWS Fargate', 'AWS Lambda', 'AWS Batch'],
            answerIndex: 1,
            explanation: 'AWS Fargate is the serverless compute engine for containers.'
          }
        ]
      },
      {
        id: 'lambda-serverless',
        slug: 'lambda-serverless',
        title: '10. AWS Lambda & Serverless Architecture',
        level: 'PRO',
        category: 'Serverless',
        summary: 'Run code in response to events without provisioning or managing servers.',
        docUrl: 'https://docs.aws.amazon.com/lambda/',
        youtubeEmbedId: 'eOBq__h4OJ4',
        whatIsIt: `AWS Lambda is an event-driven serverless compute service. You pay only for compute time consumed.`,
        whyIsItUsed: `Zero server administration, continuous scaling, and millisecond billing.`,
        features: ['Supports Node.js, Python, Java, Go, Docker', 'Triggers from S3, DynamoDB, API Gateway', '15-minute max execution time'],
        advantages: ['Zero idle cost', 'Automatic scaling per event'],
        useCase: `Processing uploaded image thumbnails in S3 automatically via Lambda function.`,
        workingExplanation: `Event triggers create micro-containers running function handler code, scaling concurrently up to thousands of executions.`,
        usageSteps: ['Write Lambda Function Code', 'Set Trigger (e.g. S3 ObjectCreated)', 'Test Execution'],
        commands: `aws lambda list-functions\naws lambda invoke --function-name my-func output.txt`,
        bestPractices: ['Keep Lambda function packages lightweight.', 'Store secrets in AWS Secrets Manager.'],
        interviewQuestions: [
          {
            question: 'What is Lambda Cold Start?',
            answer: 'Cold start is the latency experienced when Lambda provisions a new execution container for an initial request.'
          }
        ],
        quiz: [
          {
            question: 'What is the maximum execution timeout for an AWS Lambda function?',
            options: ['5 minutes', '15 minutes', '1 hour', 'Unlimited'],
            answerIndex: 1,
            explanation: 'AWS Lambda functions have a maximum timeout limit of 15 minutes.'
          }
        ]
      },
      {
        id: 'cloudwatch-cloudtrail',
        slug: 'cloudwatch-cloudtrail',
        title: '11. Monitoring: CloudWatch & CloudTrail',
        level: 'PRO',
        category: 'Observability',
        summary: 'System metrics, log management with CloudWatch, and API audit logging with CloudTrail.',
        docUrl: 'https://docs.aws.amazon.com/cloudwatch/',
        youtubeEmbedId: 'r2Q94s4zRmo',
        whatIsIt: `CloudWatch monitors application metrics and logs. CloudTrail logs all AWS API actions for security auditing.`,
        whyIsItUsed: `Essential for observability, troubleshooting, security audits, and automated alarms.`,
        features: ['CloudWatch Alarms & Dashboards', 'Log Groups & Insights', 'CloudTrail API Governance'],
        advantages: ['Full visibility into cloud environment', 'Compliance auditing'],
        useCase: `Setting a CloudWatch Alarm to trigger SNS notification if EC2 CPU exceeds 85% for 5 minutes.`,
        workingExplanation: `Agents stream system metrics and logs to CloudWatch. CloudTrail records every AWS API call into encrypted S3 buckets.`,
        usageSteps: ['Create CloudWatch Log Group', 'Set Alarm Threshold', 'Enable CloudTrail for multi-region'],
        commands: `aws logs describe-log-groups\naws cloudtrail describe-trails`,
        bestPractices: ['Enable CloudTrail in all regions.', 'Use CloudWatch Logs Insights for fast querying.'],
        interviewQuestions: [
          {
            question: 'CloudWatch vs CloudTrail?',
            answer: 'CloudWatch monitors performance metrics, logs, and system health. CloudTrail records WHO did WHAT API action in AWS for security audit.'
          }
        ],
        quiz: [
          {
            question: 'Which service tracks and records API activity across your AWS infrastructure?',
            options: ['CloudWatch', 'CloudTrail', 'Config', 'IAM'],
            answerIndex: 1,
            explanation: 'AWS CloudTrail records API calls and user activity across AWS.'
          }
        ]
      },
      {
        id: 'cloudfront-route53',
        slug: 'cloudfront-route53',
        title: '12. Route 53 DNS & CloudFront CDN',
        level: 'PRO',
        category: 'Edge & Networking',
        summary: 'Global DNS management with Route 53 and lightning-fast CDN content delivery via CloudFront.',
        docUrl: 'https://docs.aws.amazon.com/cloudfront/',
        youtubeEmbedId: 'R88Vn4a7X9w',
        whatIsIt: `Amazon Route 53 is a highly available cloud DNS service. CloudFront is a global Content Delivery Network (CDN).`,
        whyIsItUsed: `Delivers low-latency static/dynamic web content globally using 400+ Edge Locations.`,
        features: ['Route 53 Routing Policies (Latency, Geolocation, Failover)', 'CloudFront Edge Caching & SSL', 'WAF Protection'],
        advantages: ['100% SLA for Route 53 DNS', 'Reduced origin load via CDN edge caching'],
        useCase: `Hosting a React web app in S3 accelerated globally with CloudFront CDN and Route 53 custom domain.`,
        workingExplanation: `Route 53 resolves domain queries. CloudFront caches assets at edge locations closest to users.`,
        usageSteps: ['Create Route 53 Hosted Zone', 'Create CloudFront Distribution with S3 Origin', 'Attach ACM SSL Certificate'],
        commands: `aws route53 list-hosted-zones\naws cloudfront create-invalidation --distribution-id XXXX --paths "/*"`,
        bestPractices: ['Attach AWS WAF to CloudFront to block SQL injection and DDoS attacks.'],
        interviewQuestions: [
          {
            question: 'What Route 53 routing policy routes traffic based on lowest network latency?',
            answer: 'Latency-Based Routing policy routes DNS queries to the AWS region that provides the lowest latency for the user.'
          }
        ],
        quiz: [
          {
            question: 'What component provides content caching at 400+ global edge locations?',
            options: ['AWS Route 53', 'Amazon CloudFront', 'AWS Direct Connect', 'S3 Glacier'],
            answerIndex: 1,
            explanation: 'Amazon CloudFront is the global CDN service.'
          }
        ]
      }
    ]
  },
  docker: {
    id: 'docker',
    slug: 'docker',
    title: 'Docker',
    shortName: 'Docker',
    description: 'Build, ship, and run containerized apps from basic commands to production orchestration.',
    icon: 'Container',
    color: '#2496ED',
    topics: [
      {
        id: 'architecture',
        slug: 'architecture',
        title: '1. Docker Architecture & Fundamentals',
        level: 'BASIC',
        category: 'Fundamentals',
        summary: 'Client-Server architecture powered by Docker Daemon, REST API, Images, and Containers.',
        docUrl: 'https://docs.docker.com/get-started/overview/',
        youtubeEmbedId: '3c-iBn73dDE',
        whatIsIt: `Docker uses a client-server architecture. The Docker client communicates with dockerd daemon.`,
        whyIsItUsed: `Eliminates "it works on my machine" bugs by packaging application dependencies into isolated containers.`,
        features: ['Docker Engine & Daemon', 'Linux Namespaces (isolation)', 'Control Groups cgroups (resource limits)'],
        advantages: ['Super fast boot time', 'Consistent environments'],
        useCase: `Packaging microservices for local development and cloud deployment.`,
        workingExplanation: `Namespaces provide process isolation; cgroups limit CPU/RAM usage; OverlayFS manages layered file systems.`,
        usageSteps: ['Install Docker Desktop', 'Run test container: docker run hello-world'],
        commands: `docker version\ndocker system df`,
        bestPractices: ['Run non-root containers for security.'],
        interviewQuestions: [{ question: 'Containers vs VMs?', answer: 'VMs virtualize hardware and run full OS. Containers share host Linux kernel and virtualize OS.' }],
        quiz: [{ question: 'Which Linux feature limits container CPU/RAM?', options: ['Namespaces', 'cgroups', 'SELinux', 'Overlay'], answerIndex: 1, explanation: 'cgroups limits resources.' }]
      },
      {
        id: 'docker-cli',
        slug: 'docker-cli',
        title: '2. Essential Docker CLI & Container Lifecycle',
        level: 'BASIC',
        category: 'Operations',
        summary: 'Mastering docker run, exec, logs, ps, stop, and container debugging commands.',
        docUrl: 'https://docs.docker.com/engine/reference/commandline/cli/',
        youtubeEmbedId: 'fqMOX6JJhGo',
        whatIsIt: `The Docker CLI manages container states (Created, Running, Paused, Stopped, Exited).`,
        whyIsItUsed: `Essential command line tooling for running, inspecting, and troubleshooting containers.`,
        features: ['Interactive terminals (-it)', 'Port forwarding (-p 8080:80)', 'Background detached mode (-d)'],
        advantages: ['Instant container lifecycle control'],
        useCase: `Running an Nginx web server or Redis container locally for testing.`,
        workingExplanation: `docker run pulls the image if missing, creates a read-write container layer, and executes CMD.`,
        usageSteps: ['docker run -d -p 80:80 --name web nginx', 'docker exec -it web bash', 'docker logs -f web'],
        commands: `docker run -d -p 8080:80 nginx\ndocker exec -it container_id sh\ndocker logs -f --tail 100 container_id`,
        bestPractices: ['Use --rm flag for disposable temporary containers.'],
        interviewQuestions: [{ question: 'Difference between docker run and docker start?', answer: 'docker run creates and starts a new container from an image. docker start restarts an existing stopped container.' }],
        quiz: [{ question: 'Which flag runs a container in detached background mode?', options: ['-b', '-d', '-bg', '-detach'], answerIndex: 1, explanation: '-d runs container in background.' }]
      },
      {
        id: 'dockerfile',
        slug: 'dockerfile',
        title: '3. Dockerfile Instructions & Layer Caching',
        level: 'INTERMEDIATE',
        category: 'Build',
        summary: 'Automated script instructions to assemble efficient production-ready container images.',
        docUrl: 'https://docs.docker.com/engine/reference/builder/',
        youtubeEmbedId: 'gAkwW2tuIqE',
        whatIsIt: `A Dockerfile contains instructions (FROM, COPY, RUN, CMD) to build custom Docker images.`,
        whyIsItUsed: `Provides Infrastructure-as-Code for application environments with version controlled builds.`,
        features: ['Instructions FROM, WORKDIR, COPY, RUN, CMD', 'Layer caching optimization', '.dockerignore'],
        advantages: ['Repeatable container image builds'],
        useCase: `Building a Node.js API image for deployment to AWS ECS.`,
        workingExplanation: `Each instruction creates a read-only image layer cached for fast rebuilds.`,
        usageSteps: ['Create Dockerfile', 'Define FROM node:20-alpine', 'Build: docker build -t app:v1 .'],
        commands: `docker build -t my-app:1.0 .\ndocker history my-app:1.0`,
        bestPractices: ['Order Dockerfile lines from least changing to most changing to leverage build cache.'],
        interviewQuestions: [{ question: 'CMD vs ENTRYPOINT?', answer: 'ENTRYPOINT sets the fixed binary; CMD provides default overridable parameters.' }],
        quiz: [{ question: 'Which Dockerfile instruction sets the base image?', options: ['BASE', 'FROM', 'START', 'INIT'], answerIndex: 1, explanation: 'FROM sets base image.' }]
      },
      {
        id: 'multistage-builds',
        slug: 'multistage-builds',
        title: '4. Multi-Stage Builds for Production',
        level: 'INTERMEDIATE',
        category: 'Build',
        summary: 'Separate build dependencies from final runtime containers to create tiny 15MB production images.',
        docUrl: 'https://docs.docker.com/build/building/multi-stage/',
        youtubeEmbedId: 'wGz_c9umuPQ',
        whatIsIt: `Multi-stage builds allow using multiple FROM statements in a single Dockerfile to copy artifacts from build stages.`,
        whyIsItUsed: `Shrinks production image sizes by 90%+ by stripping SDKs, compilers, and source code.`,
        features: ['Multiple FROM stages', 'COPY --from=builder', 'Minimal Alpine/Distroless base runtime'],
        advantages: ['Tiny image size', 'Reduced attack surface & vulnerabilities'],
        useCase: `Building a React app using Node.js in Stage 1, then copying HTML/JS to Nginx Alpine in Stage 2.`,
        workingExplanation: `Only the final stage forms the resulting container image; intermediate build stages are discarded.`,
        usageSteps: ['Define stage 1: FROM node AS builder', 'Define stage 2: FROM nginx:alpine', 'COPY --from=builder /app/dist /usr/share/nginx/html'],
        commands: `docker build --target builder -t app:dev .\ndocker build -t app:prod .`,
        bestPractices: ['Use distroless or alpine for production final stage.'],
        interviewQuestions: [{ question: 'Why use multi-stage builds?', answer: 'To separate build-time compilers/SDKs from runtime assets, creating tiny and secure production images.' }],
        quiz: [{ question: 'How do you copy build artifacts from a previous stage in a Dockerfile?', options: ['COPY FROM stage', 'COPY --from=stage_name', 'MOVE stage', 'IMPORT stage'], answerIndex: 1, explanation: 'COPY --from=stage_name copies files from previous build stage.' }]
      },
      {
        id: 'docker-volumes',
        slug: 'docker-volumes',
        title: '5. Storage: Volumes & Bind Mounts',
        level: 'INTERMEDIATE',
        category: 'Storage',
        summary: 'Persist data beyond container lifecycle using Docker Volumes and Bind Mounts.',
        docUrl: 'https://docs.docker.com/storage/',
        youtubeEmbedId: 'P28l1Nnrj_k',
        whatIsIt: `Docker Volumes persist data generated by containers. Bind mounts mount host directories into containers.`,
        whyIsItUsed: `Containers are ephemeral (data is lost on exit). Volumes provide persistent data storage for databases.`,
        features: ['Named Docker Volumes', 'Bind Mounts for live dev reload', 'tmpfs in-memory mounts'],
        advantages: ['Database persistence (PostgreSQL/MySQL)', 'Hot reload in local dev'],
        useCase: `Persisting PostgreSQL database data across container restarts using named volumes.`,
        workingExplanation: `Volumes are managed by Docker in /var/lib/docker/volumes on host. Bind mounts point directly to host paths.`,
        usageSteps: ['Create volume: docker volume create db_data', 'Run container: docker run -v db_data:/var/lib/postgresql/data postgres'],
        commands: `docker volume create my_volume\ndocker volume ls\ndocker run -v $(pwd):/app node`,
        bestPractices: ['Use Volumes for production database storage; use Bind Mounts for local dev source code.'],
        interviewQuestions: [{ question: 'Volume vs Bind Mount?', answer: 'Volumes are managed by Docker in storage directory. Bind Mounts rely on exact host directory paths.' }],
        quiz: [{ question: 'Where are Docker managed volumes stored on host Linux?', options: ['/etc/docker', '/var/lib/docker/volumes', '/tmp/volumes', '/opt/docker'], answerIndex: 1, explanation: '/var/lib/docker/volumes stores managed volumes.' }]
      },
      {
        id: 'docker-compose',
        slug: 'docker-compose',
        title: '6. Docker Compose Multi-Container Setup',
        level: 'PRO',
        category: 'Orchestration',
        summary: 'Define and run multi-container applications using a declarative docker-compose.yml file.',
        docUrl: 'https://docs.docker.com/compose/',
        youtubeEmbedId: 'HG6yLjiyH7A',
        whatIsIt: `Docker Compose is a tool for defining and running multi-container Docker applications via YAML config.`,
        whyIsItUsed: `Launches full app stacks (Frontend + Backend + DB + Redis) with a single command: docker compose up.`,
        features: ['services, networks, volumes YAML blocks', 'depends_on health checks', 'environment variable interpolation'],
        advantages: ['Single command full stack startup', 'Automatic container networking'],
        useCase: `Running React frontend, Spring Boot backend, and MongoDB database together locally.`,
        workingExplanation: `Compose creates a shared default network and provisions all declared service containers simultaneously.`,
        usageSteps: ['Write docker-compose.yml', 'Run: docker compose up -d', 'Stop: docker compose down'],
        commands: `docker compose up -d --build\ndocker compose logs -f backend\ndocker compose down -v`,
        bestPractices: ['Use healthcheck condition in depends_on to ensure DB is ready before backend starts.'],
        interviewQuestions: [{ question: 'What command starts all services in background via Compose?', answer: 'docker compose up -d' }],
        quiz: [{ question: 'Which file format is used for Docker Compose configurations?', options: ['JSON', 'XML', 'YAML', 'TOML'], answerIndex: 2, explanation: 'Docker Compose uses YAML (.yml) format.' }]
      }
    ]
  },
  kubernetes: {
    id: 'kubernetes',
    slug: 'kubernetes',
    title: 'Kubernetes (K8s)',
    shortName: 'K8s',
    description: 'Production-grade container orchestration from basic Pods to Helm and GitOps deployment.',
    icon: 'Layers',
    color: '#326CE5',
    topics: [
      {
        id: 'architecture',
        slug: 'architecture',
        title: '1. Kubernetes Architecture & Components',
        level: 'BASIC',
        category: 'Architecture',
        summary: 'Control Plane (api-server, etcd, scheduler) and Worker Node (kubelet, kube-proxy, container runtime).',
        docUrl: 'https://kubernetes.io/docs/concepts/overview/components/',
        youtubeEmbedId: 'PH-2FfFD2PU',
        whatIsIt: `Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.`,
        whyIsItUsed: `Automates self-healing, rolling updates, auto-scaling, and service discovery across cluster nodes.`,
        features: ['Control Plane (kube-apiserver, etcd, kube-scheduler, kube-controller-manager)', 'Worker Nodes (kubelet, kube-proxy, CRI)'],
        advantages: ['Automatic self-healing', 'Zero-downtime rolling updates', 'Horizontal auto-scaling'],
        useCase: `Orchestrating 500+ microservice instances across multi-region cloud worker nodes.`,
        workingExplanation: `Control Plane maintains desired cluster state declared in etcd database and instructs worker node kubelets via API.`,
        usageSteps: ['Install kubectl CLI', 'Setup Minikube / K3s / EKS', 'Check cluster nodes: kubectl get nodes'],
        commands: `kubectl cluster-info\nkubectl get nodes -o wide`,
        bestPractices: ['Deploy at least 3 Control Plane nodes for High Availability etcd quorum.'],
        interviewQuestions: [{ question: 'Role of etcd in Kubernetes?', answer: 'etcd is a consistent, highly-available key-value store that holds all cluster state data and specifications.' }],
        quiz: [{ question: 'Which Kubernetes component maintains the single source of truth cluster state?', options: ['kubelet', 'etcd', 'kube-proxy', 'ingress'], answerIndex: 1, explanation: 'etcd stores cluster state.' }]
      },
      {
        id: 'pods-deployments',
        slug: 'pods-deployments',
        title: '2. Pods, Deployments & ReplicaSets',
        level: 'BASIC',
        category: 'Workloads',
        summary: 'Atomic unit of execution (Pods) and declarative rolling update management (Deployments).',
        docUrl: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/',
        youtubeEmbedId: 'r53mK66y11k',
        whatIsIt: `A Pod is the smallest deployable computing unit in K8s (contains 1 or more containers). Deployments manage ReplicaSets for declarative updates.`,
        whyIsItUsed: `Deployments ensure specified replica count of pods is always running with seamless rolling updates.`,
        features: ['Declarative YAML manifests', 'Rolling Updates & Rollbacks', 'ReplicaSet scaling'],
        advantages: ['Zero downtime app updates', 'Automatic pod replacement on node failure'],
        useCase: `Deploying 3 replicas of a web application with automated rolling deployment.`,
        workingExplanation: `Deployment controller manages ReplicaSet, which manages Pod instances on worker nodes.`,
        usageSteps: ['Write deployment.yaml', 'Apply: kubectl apply -f deployment.yaml', 'Check status: kubectl get pods'],
        commands: `kubectl apply -f deployment.yaml\nkubectl get deployments\nkubectl rollout undo deployment/web-app`,
        bestPractices: ['Never run bare Pods; always manage Pods via Deployments or StatefulSets.'],
        interviewQuestions: [{ question: 'What is a Pod?', answer: 'A Pod is the smallest execution unit in K8s, hosting one or more co-located containers sharing network IP and volumes.' }],
        quiz: [{ question: 'Which resource manages rolling updates and ReplicaSets in Kubernetes?', options: ['Pod', 'Deployment', 'Service', 'ConfigMap'], answerIndex: 1, explanation: 'Deployment controller manages rolling updates and ReplicaSets.' }]
      },
      {
        id: 'services-ingress',
        slug: 'services-ingress',
        title: '3. Networking: Services & Ingress',
        level: 'INTERMEDIATE',
        category: 'Networking',
        summary: 'Expose pods via ClusterIP, NodePort, LoadBalancer and Layer 7 HTTP routing via Ingress.',
        docUrl: 'https://kubernetes.io/docs/concepts/services-networking/service/',
        youtubeEmbedId: 'B4y0u1N3C68',
        whatIsIt: `Service provides a stable IP & DNS name for ephemeral Pods. Ingress manages external HTTP/HTTPS routing to Services.`,
        whyIsItUsed: `Pods IPs are temporary. Services provide persistent load-balanced endpoints; Ingress provides domain SSL routing.`,
        features: ['ClusterIP (internal)', 'NodePort (port on nodes)', 'LoadBalancer (cloud LB)', 'Ingress Controller (Nginx/Traefik)'],
        advantages: ['Stable internal DNS discovery', 'SSL termination at Ingress'],
        useCase: `Routing domain api.example.com to backend service and app.example.com to frontend service via Nginx Ingress.`,
        workingExplanation: `kube-proxy configures iptables/IPVS rules on nodes to route Service IPs to matching Pod selector IPs.`,
        usageSteps: ['Create Service YAML with app selectors', 'Create Ingress YAML with host rules', 'Apply to cluster'],
        commands: `kubectl get svc\nkubectl get ingress\nkubectl describe svc my-service`,
        bestPractices: ['Use ClusterIP internally and expose web apps via single Ingress Controller to save cloud LB costs.'],
        interviewQuestions: [{ question: 'ClusterIP vs NodePort vs LoadBalancer?', answer: 'ClusterIP is internal only. NodePort exposes port on node IPs (30000-32767). LoadBalancer provisions cloud provider LB.' }],
        quiz: [{ question: 'Which Service type is default and accessible only within the Kubernetes cluster?', options: ['NodePort', 'ClusterIP', 'LoadBalancer', 'ExternalName'], answerIndex: 1, explanation: 'ClusterIP is the default internal-only service type.' }]
      },
      {
        id: 'configmaps-secrets',
        slug: 'configmaps-secrets',
        title: '4. ConfigMaps, Secrets & Env Vars',
        level: 'INTERMEDIATE',
        category: 'Configuration',
        summary: 'Separate configuration artifacts and base64 encrypted passwords from container images.',
        docUrl: 'https://kubernetes.io/docs/concepts/configuration/secret/',
        youtubeEmbedId: 'MT41X_xE3r0',
        whatIsIt: `ConfigMaps store non-confidential configuration key-value pairs. Secrets store sensitive credentials (passwords, API keys).`,
        whyIsItUsed: `Decouples environment-specific configuration from application code and container images.`,
        features: ['Environment variable injection', 'Volume mount as configuration files', 'Secret encryption at rest in etcd'],
        advantages: ['Change config without rebuilding container image', 'Secure secret injection'],
        useCase: `Mounting database connection strings via ConfigMap and database passwords via Secret into backend Pods.`,
        workingExplanation: `K8s injects ConfigMap/Secret data into Pod containers as env variables or mounted tmpfs files.`,
        usageSteps: ['kubectl create configmap app-config --from-file=config.json', 'kubectl create secret generic db-pass --from-literal=password=secret123'],
        commands: `kubectl get configmaps\nkubectl get secrets\nkubectl describe secret db-pass`,
        bestPractices: ['Use External Secrets Operator or HashiCorp Vault for enterprise secret sync instead of plain base64 Secrets.'],
        interviewQuestions: [{ question: 'Are Kubernetes Secrets encrypted by default in etcd?', answer: 'No, Secrets are stored as base64 encoded strings by default unless EncryptionAtRest is enabled in kube-apiserver.' }],
        quiz: [{ question: 'How are Kubernetes Secrets encoded by default in YAML manifests?', options: ['AES-256', 'Base64', 'RSA-2048', 'SHA-256'], answerIndex: 1, explanation: 'Secrets are plain Base64 encoded by default.' }]
      },
      {
        id: 'volumes-pvc',
        slug: 'volumes-pvc',
        title: '5. Storage: PV, PVC & StorageClass',
        level: 'PRO',
        category: 'Storage',
        summary: 'Persistent storage provisioning using PersistentVolumes, Claims, and dynamic CSI drivers.',
        docUrl: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/',
        youtubeEmbedId: '0swOh5McWc8',
        whatIsIt: `PersistentVolume (PV) is cluster storage provisioned by admin. PersistentVolumeClaim (PVC) is request for storage by a user/pod.`,
        whyIsItUsed: `Allows stateful applications (Databases, Redis, ElasticSearch) to retain disk data if Pod restarts or moves nodes.`,
        features: ['StorageClasses for dynamic provisioning', 'Access Modes (ReadWriteOnce, ReadWriteMany)', 'CSI plugins'],
        advantages: ['Automated AWS EBS / GCP Persistent Disk attachment', 'Data retention across Pod restarts'],
        useCase: `Provisioning a 100GB EBS GP3 volume dynamically for a PostgreSQL StatefulSet database.`,
        workingExplanation: `CSI driver creates physical cloud storage volume when PVC is applied and attaches block device to node running Pod.`,
        usageSteps: ['Define PVC YAML specifying storage size (e.g. 20Gi)', 'Mount PVC in Pod specification under volumes'],
        commands: `kubectl get pv\nkubectl get pvc\nkubectl get storageclass`,
        bestPractices: ['Use ReadWriteOnce for single instance DBs; use StorageClasses for dynamic automatic provisioning.'],
        interviewQuestions: [{ question: 'PV vs PVC?', answer: 'PV is the actual storage resource in cluster. PVC is a request for storage of a specific size/access mode by a Pod.' }],
        quiz: [{ question: 'Which access mode allows a volume to be read and written by a single node at a time?', options: ['ReadWriteMany', 'ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteOncePod'], answerIndex: 1, explanation: 'ReadWriteOnce (RWO) mounts volume as read-write by a single node.' }]
      },
      {
        id: 'helm-gitops',
        slug: 'helm-gitops',
        title: '6. Helm Package Manager & GitOps (ArgoCD)',
        level: 'PRO',
        category: 'GitOps & Delivery',
        summary: 'Package K8s apps with Helm charts and automate continuous deployment using ArgoCD GitOps.',
        docUrl: 'https://helm.sh/docs/',
        youtubeEmbedId: 'jBACnBbnkS0',
        whatIsIt: `Helm is the package manager for Kubernetes (like apt or npm). ArgoCD is a declarative GitOps continuous delivery tool.`,
        whyIsItUsed: `Helm templates complex multi-manifest apps into single installable charts. ArgoCD syncs Git repos directly to clusters.`,
        features: ['Helm Chart templating & values.yaml', 'ArgoCD automated Git sync & drift detection', 'Rollback versions'],
        advantages: ['One-line app installation (e.g. helm install ingress-nginx)', 'Git repository as single source of truth'],
        useCase: `ArgoCD automatically detecting a new commit in Git repository and deploying updated Helm chart to Kubernetes.`,
        workingExplanation: `ArgoCD monitors Git commit hashes and compares cluster state against Git declarations, triggering automated sync.`,
        usageSteps: ['Install Helm CLI', 'Add repo: helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx', 'Install: helm install my-nginx ingress-nginx/ingress-nginx'],
        commands: `helm list\nhelm install my-release ./my-chart\nargocd app list`,
        bestPractices: ['Never edit live cluster resources manually with kubectl in production; use GitOps declarative sync.'],
        interviewQuestions: [{ question: 'What is GitOps?', answer: 'GitOps is an operational framework where Git repository is the single source of truth for infrastructure and app deployments, synced by automated controllers like ArgoCD.' }],
        quiz: [{ question: 'Which tool is known as the Package Manager for Kubernetes?', options: ['Docker', 'Helm', 'ArgoCD', 'Kubeadm'], answerIndex: 1, explanation: 'Helm is the package manager for Kubernetes.' }]
      }
    ]
  },
  linux: {
    id: 'linux',
    slug: 'linux',
    title: 'Linux Administration',
    shortName: 'Linux',
    description: 'Master Linux command line, permissions, process management, networking, and shell scripting.',
    icon: 'Terminal',
    color: '#FCC624',
    topics: [
      {
        id: 'cli-basics',
        slug: 'cli-basics',
        title: '1. Linux CLI Navigation & File Commands',
        level: 'BASIC',
        category: 'Basics',
        summary: 'Essential Linux terminal commands: ls, cd, pwd, mkdir, rm, cp, mv, cat, grep, find.',
        docUrl: 'https://www.linux.org/docs/',
        youtubeEmbedId: 'wBp0Rb-ZJak',
        whatIsIt: `Linux command line (shell) is a text-based interface for managing operating system files and utilities.`,
        whyIsItUsed: `All cloud servers and containers run Linux without GUIs. CLI proficiency is compulsory for DevOps engineers.`,
        features: ['File tree navigation (cd, pwd, ls)', 'File manipulation (touch, cp, mv, rm)', 'Searching (grep, find)'],
        advantages: ['Ultra fast remote server management over SSH'],
        useCase: `Searching system log files for HTTP 500 error codes using grep and awk.`,
        workingExplanation: `Shell interprets commands and invokes Linux kernel system calls (sys_open, sys_read).`,
        usageSteps: ['Open Linux terminal / SSH connection', 'Navigate to directory: cd /var/log', 'Search log file: grep -i "error" syslog'],
        commands: `ls -la /var/log\nfind / -name "*.conf" 2>/dev/null\ngrep -rn "ERROR" /var/log/nginx/`,
        bestPractices: ['Be extremely cautious with rm -rf commands, especially when running as root.'],
        interviewQuestions: [{ question: 'Difference between grep and find?', answer: 'find searches for file names/paths on disk. grep searches for text patterns inside file content.' }],
        quiz: [{ question: 'Which command prints the current working directory path in Linux?', options: ['cd', 'dir', 'pwd', 'path'], answerIndex: 2, explanation: 'pwd (print working directory) displays current directory.' }]
      },
      {
        id: 'permissions-ownership',
        slug: 'permissions-ownership',
        title: '2. File Permissions & Ownership (chmod / chown)',
        level: 'BASIC',
        category: 'Security',
        summary: 'Linux security model: Read (4), Write (2), Execute (1) permissions and chown user/group management.',
        docUrl: 'https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html',
        youtubeEmbedId: 'v=-rBLvUfJ3e0',
        whatIsIt: `Linux assigns permissions to User (u), Group (g), and Others (o) for Read (r=4), Write (w=2), and Execute (x=1).`,
        whyIsItUsed: `Prevents unauthorized users or compromised process accounts from reading or modifying system files.`,
        features: ['Numeric (chmod 755) and Symbolic (chmod +x) modes', 'chown user:group ownership assignment', 'SUID/SGID sticky bit'],
        advantages: ['Strict OS file security model'],
        useCase: `Securing SSH private keys (chmod 600 id_rsa) so SSH client allows connection.`,
        workingExplanation: `OS kernel verifies process UID/GID against file inode mode flags before permitting read/write/exec calls.`,
        usageSteps: ['Check file permissions: ls -l script.sh', 'Make executable: chmod +x script.sh', 'Change owner: sudo chown ubuntu:ubuntu script.sh'],
        commands: `chmod 755 script.sh\nchmod 600 ~/.ssh/id_rsa\nsudo chown -R www-data:www-data /var/www/html`,
        bestPractices: ['Never set 777 permissions in production; use minimum necessary permissions like 755 or 644.'],
        interviewQuestions: [{ question: 'What does permission 755 mean in numeric mode?', answer: '7 (rwx) for Owner, 5 (r-x) for Group, 5 (r-x) for Others.' }],
        quiz: [{ question: 'Which numeric permission code gives Owner full access (rwx) and Group/Others read-only access (r--)?', options: ['755', '744', '644', '700'], answerIndex: 1, explanation: '7 (rwx) + 4 (r--) + 4 (r--) = 744.' }]
      },
      {
        id: 'systemd-processes',
        slug: 'systemd-processes',
        title: '3. Process Management & Systemd',
        level: 'INTERMEDIATE',
        category: 'System Admin',
        summary: 'Managing background services with systemctl, checking processes with ps/top, and signal handling with kill.',
        docUrl: 'https://systemd.io/',
        youtubeEmbedId: 'm45nB1gN1pM',
        whatIsIt: `Systemd is the default init system in modern Linux distributions. systemctl controls background service daemons.`,
        whyIsItUsed: `Manages starting, stopping, enabling, and auto-restarting background services on server boot.`,
        features: ['systemctl start/stop/restart/status', 'ps aux and top/htop process tree monitoring', 'kill -9 signal termination'],
        advantages: ['Automatic daemon restart on crash'],
        useCase: `Configuring custom systemd service for a Node.js API to run persistently in background on server boot.`,
        workingExplanation: `PID 1 (systemd) launches unit files declared in /etc/systemd/system/ and monitors process PIDs.`,
        usageSteps: ['Create service unit: sudo nano /etc/systemd/system/myapp.service', 'Reload daemon: sudo systemctl daemon-reload', 'Start: sudo systemctl enable --now myapp'],
        commands: `sudo systemctl status nginx\nps aux | grep node\nsudo kill -9 <PID>`,
        bestPractices: ['Use SIGTERM (kill -15) first for graceful shutdown before resorting to SIGKILL (kill -9).'],
        interviewQuestions: [{ question: 'Difference between systemctl enable and systemctl start?', answer: 'start starts service immediately. enable configures service to launch automatically on server reboot.' }],
        quiz: [{ question: 'Which signal number corresponds to SIGKILL (forced process termination)?', options: ['15', '9', '2', '1'], answerIndex: 1, explanation: 'Signal 9 is SIGKILL.' }]
      },
      {
        id: 'shell-scripting',
        slug: 'shell-scripting',
        title: '4. Bash Shell Scripting & Automation',
        level: 'PRO',
        category: 'Automation',
        summary: 'Automate repetitive tasks with Bash scripts, variables, loops, conditionals, functions, and cron jobs.',
        docUrl: 'https://www.gnu.org/software/bash/manual/',
        youtubeEmbedId: 'tK9Oc6AEnR4',
        whatIsIt: `Bash scripting allows chaining Linux CLI commands into automated scripts with logic (if/else, loops, functions).`,
        whyIsItUsed: `Automates server backups, log cleanup, deployment scripts, and CI/CD pipeline steps.`,
        features: ['Shebang (#!/bin/bash)', 'Variables & Arguments ($1, $2)', 'Loops (for/while) and Conditionals (if [ ] )', 'Crontab scheduling'],
        advantages: ['Native execution without installing external runtimes'],
        useCase: `Writing a daily database backup script triggered at 2 AM via crontab (0 2 * * * /backup.sh).`,
        workingExplanation: `Bash shell reads script line-by-line, evaluates variable substitutions, and executes subshell processes.`,
        usageSteps: ['Create file: touch backup.sh', 'Add #!/bin/bash header', 'Make executable: chmod +x backup.sh', 'Add to crontab: crontab -e'],
        commands: `#!/bin/bash\nDATE=$(date +%Y-%m-%d)\necho "Backup started on $DATE"\ncrontab -l`,
        bestPractices: ['Set "set -euo pipefail" at top of Bash scripts so script exits instantly on any command error.'],
        interviewQuestions: [{ question: 'What does "set -e" do in a Bash script?', answer: 'It causes script to exit immediately if any command exits with a non-zero status code (error).' }],
        quiz: [{ question: 'Which line must be placed at the very first line of a Bash script?', options: ['#bash', '#!/bin/bash', '// bash', 'import bash'], answerIndex: 1, explanation: '#!/bin/bash (shebang) specifies the script interpreter.' }]
      }
    ]
  },
  git: {
    id: 'git',
    slug: 'git',
    title: 'Git Version Control',
    shortName: 'Git',
    description: 'Master version control from basic commits to advanced rebasing, conflict resolution, and branching strategies.',
    icon: 'Code',
    color: '#F05032',
    topics: [
      {
        id: 'git-basics',
        slug: 'git-basics',
        title: '1. Git Workflow & Essential Commands',
        level: 'BASIC',
        category: 'Basics',
        summary: 'Distributed version control workflow: git init, clone, add, commit, status, log, and push.',
        docUrl: 'https://git-scm.com/doc',
        youtubeEmbedId: 'HVsySz-h9r4',
        whatIsIt: `Git is a distributed version control system that tracks code changes across local and remote repositories.`,
        whyIsItUsed: `Enables multiple developers to work on the same codebase simultaneously without overwriting code.`,
        features: ['Working Directory, Staging Area (Index), and Local Repository', 'SHA-1/SHA-256 commit hashes', 'Git log timeline'],
        advantages: ['Complete offline history tracking', 'Blazing fast local branch operations'],
        useCase: `Tracking software changes and collaborating with team members via GitHub Pull Requests.`,
        workingExplanation: `Git stores code snapshots as Directed Acyclic Graphs (DAG) of commit objects containing tree hashes and author info.`,
        usageSteps: ['Initialize: git init', 'Stage files: git add .', 'Commit: git commit -m "Initial commit"', 'Push to remote: git push origin main'],
        commands: `git status\ngit add .\ngit commit -m "feat: add user login API"\ngit log --oneline --graph`,
        bestPractices: ['Write clear, descriptive imperative commit messages (e.g. "feat: add JWT auth").'],
        interviewQuestions: [{ question: 'What is the Staging Area in Git?', answer: 'The staging area (Index) is an intermediate file where changes are prepared before being committed into history.' }],
        quiz: [{ question: 'Which command moves modified files from working directory to staging area?', options: ['git commit', 'git add', 'git push', 'git stage-all'], answerIndex: 1, explanation: 'git add stages files for commit.' }]
      },
      {
        id: 'branching-merging',
        slug: 'branching-merging',
        title: '2. Branching, Merging & Conflict Resolution',
        level: 'INTERMEDIATE',
        category: 'Workflows',
        summary: 'Creating feature branches, performing fast-forward & 3-way merges, and resolving conflicts.',
        docUrl: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging',
        youtubeEmbedId: 'e2IbNHi4uCI',
        whatIsIt: `Git branches are lightweight pointers to specific commits. Merging combines changes from one branch into another.`,
        whyIsItUsed: `Allows developing new features or bug fixes in isolated branches without breaking the production main branch.`,
        features: ['git branch & checkout -b', 'Fast-Forward merge vs 3-Way merge commit', 'Conflict Markers (<<<<<<<, =======, >>>>>>>)'],
        advantages: ['Isolated feature development', 'Safe production branch protection'],
        useCase: `Creating feature/login branch, committing changes, opening Pull Request, and merging into main branch.`,
        workingExplanation: `Git finds common ancestor commit of 2 branches and performs 3-way merge, creating a new merge commit if divergent.`,
        usageSteps: ['Create branch: git checkout -b feature/payment', 'Commit work', 'Switch to main: git checkout main', 'Merge: git merge feature/payment'],
        commands: `git checkout -b feature/new-api\ngit branch -a\ngit merge feature/new-api`,
        bestPractices: ['Delete feature branches after merging into main.'],
        interviewQuestions: [{ question: 'What causes a Git merge conflict?', answer: 'When changes occur to the exact same line of code in the same file on two divergent branches being merged.' }],
        quiz: [{ question: 'Which command creates and immediately switches to a new branch?', options: ['git branch new-branch', 'git checkout -b new-branch', 'git merge -b new-branch', 'git init -b new-branch'], answerIndex: 1, explanation: 'git checkout -b creates and switches to new branch.' }]
      },
      {
        id: 'rebasing-advanced',
        slug: 'rebasing-advanced',
        title: '3. Git Rebase, Stash & History Cleanup',
        level: 'PRO',
        category: 'Advanced History',
        summary: 'Clean linear commit history with git rebase -i (squashing), git stash, and git cherry-pick.',
        docUrl: 'https://git-scm.com/docs/git-rebase',
        youtubeEmbedId: 'f1wnYdLEpgI',
        whatIsIt: `Rebasing moves or combines a sequence of commits to a new base commit, creating a linear history.`,
        whyIsItUsed: `Eliminates messy merge commits and allows squashing 10 WIP commits into 1 clean atomic commit before PR merge.`,
        features: ['Interactive rebase (git rebase -i HEAD~3)', 'git stash & stash pop', 'git cherry-pick <hash>'],
        advantages: ['Clean linear Git history', 'Ability to selectively pick specific commits'],
        useCase: `Squashing 5 temporary "WIP fix" commits into one single clean commit before merging into main.`,
        workingExplanation: `Rebase rewrites commit history by re-applying commits one by one on top of the target upstream tip.`,
        usageSteps: ['Interactive rebase: git rebase -i HEAD~4', 'Mark commits as "squash" or "fixup"', 'Force push feature branch: git push --force-with-lease'],
        commands: `git stash\ngit stash pop\ngit rebase -i HEAD~3\ngit cherry-pick a1b2c3d`,
        bestPractices: ['NEVER rebase commits that have already been pushed to public shared main branches.'],
        interviewQuestions: [{ question: 'Git Merge vs Git Rebase?', answer: 'Git merge preserves historical timeline by creating a 3-way merge commit. Git rebase rewrites history to create a clean linear sequence.' }],
        quiz: [{ question: 'Which command temporarily shelves uncommitted changes so you can switch branches cleanly?', options: ['git pause', 'git stash', 'git save', 'git hold'], answerIndex: 1, explanation: 'git stash temporarily shelves uncommitted changes.' }]
      }
    ]
  },
  terraform: {
    id: 'terraform',
    slug: 'terraform',
    title: 'Terraform Infrastructure as Code',
    shortName: 'Terraform',
    description: 'Master Infrastructure as Code (IaC) from HCL syntax to remote state locking, modules, and CI/CD pipelines.',
    icon: 'Sparkles',
    color: '#844FBA',
    topics: [
      {
        id: 'terraform-basics',
        slug: 'terraform-basics',
        title: '1. Terraform Fundamentals & HCL Syntax',
        level: 'BASIC',
        category: 'IaC Basics',
        summary: 'Declarative Infrastructure as Code syntax using HashiCorp Configuration Language (HCL).',
        docUrl: 'https://developer.hashicorp.com/terraform/docs',
        youtubeEmbedId: 'SLB_c_ayRMo',
        whatIsIt: `Terraform is an open-source Infrastructure as Code (IaC) tool that lets you define cloud resources in human-readable HCL files.`,
        whyIsItUsed: `Replaces manual cloud console clicking with version-controlled automated infrastructure provisioning.`,
        features: ['HCL Syntax (resource, provider, variable, output blocks)', 'Terraform CLI workflow (init, plan, apply, destroy)', 'Multi-Cloud provider ecosystem (AWS, Azure, GCP, K8s)'],
        advantages: ['Declarative desired state management', 'Cloud provider agnostic'],
        useCase: `Provisioning AWS VPC, EC2 instances, and S3 buckets automatically using main.tf script.`,
        workingExplanation: `Terraform calculates diff between current cloud state and HCL desired state code, generating execution plan.`,
        usageSteps: ['Write main.tf', 'Initialize providers: terraform init', 'Preview changes: terraform plan', 'Provision: terraform apply'],
        commands: `terraform init\nterraform plan\nterraform apply -auto-approve\nterraform destroy`,
        bestPractices: ['Always run terraform plan before executing terraform apply in production.'],
        interviewQuestions: [{ question: 'What does terraform init do?', answer: 'Initializes working directory, downloads required provider plugins (AWS, Azure), and sets up backend configuration.' }],
        quiz: [{ question: 'Which command previews the infrastructure changes Terraform will make before applying?', options: ['terraform preview', 'terraform plan', 'terraform test', 'terraform diff'], answerIndex: 1, explanation: 'terraform plan creates and previews execution plan.' }]
      },
      {
        id: 'state-backend',
        slug: 'state-backend',
        title: '2. Remote State & DynamoDB Locking',
        level: 'INTERMEDIATE',
        category: 'State Management',
        summary: 'Managing terraform.tfstate remotely in S3 with DynamoDB state locking to prevent concurrent state corruption.',
        docUrl: 'https://developer.hashicorp.com/terraform/language/state',
        youtubeEmbedId: 'V9aGk3vF50M',
        whatIsIt: `Terraform State (terraform.tfstate) maps HCL code resources to real-world cloud API resource IDs. Remote backends store state securely.`,
        whyIsItUsed: `Prevents team members from overwriting state simultaneously and keeps sensitive credentials out of Git repositories.`,
        features: ['S3 Remote Backend', 'DynamoDB State Locking', 'State Isolation'],
        advantages: ['Concurrent team collaboration', 'Encryption at rest for state secrets'],
        useCase: `Configuring S3 backend with DynamoDB locking so CI/CD pipeline and developers cannot run concurrent apply operations.`,
        workingExplanation: `When terraform plan/apply starts, Terraform acquires a lock ID in DynamoDB table and releases lock on completion.`,
        usageSteps: ['Create S3 bucket and DynamoDB table', 'Add backend "s3" block in provider.tf', 'Migrate state: terraform init -migrate-state'],
        commands: `terraform state list\nterraform state show aws_instance.web\nterraform force-unlock <LOCK_ID>`,
        bestPractices: ['NEVER commit local terraform.tfstate files containing raw passwords to Git; use S3 remote backend.'],
        interviewQuestions: [{ question: 'Why is state locking important in Terraform?', answer: 'State locking prevents multiple engineers or CI pipelines from running concurrent operations on the same state file, avoiding corruption.' }],
        quiz: [{ question: 'Which AWS service is commonly used with S3 backend to provide state locking for Terraform?', options: ['Amazon SQS', 'Amazon DynamoDB', 'AWS Secrets Manager', 'Amazon RDS'], answerIndex: 1, explanation: 'DynamoDB provides state locking for Terraform S3 backend.' }]
      },
      {
        id: 'modules-workspaces',
        slug: 'modules-workspaces',
        title: '3. Terraform Modules & Workspaces',
        level: 'PRO',
        category: 'Modular IaC',
        summary: 'Reusable IaC module architecture and multi-environment management (Dev, Staging, Prod).',
        docUrl: 'https://developer.hashicorp.com/terraform/language/modules',
        youtubeEmbedId: '7xngnvF54dc',
        whatIsIt: `Terraform Modules are self-contained packages of Terraform code that create reusable infrastructure blueprints.`,
        whyIsItUsed: `Eliminates duplicated code across Dev, Staging, and Production environments.`,
        features: ['Module input variables & output values', 'Terraform Registry modules', 'Terraform Workspaces (dev/prod isolation)'],
        advantages: ['DRY (Don\'t Repeat Yourself) infrastructure code', 'Standardized enterprise architecture patterns'],
        useCase: `Creating a reusable terraform-aws-vpc module used across 10 application teams with different CIDR inputs.`,
        workingExplanation: `Root module calls child modules passing input variables, which return outputs back to root execution context.`,
        usageSteps: ['Create modules/vpc folder', 'Call module in root main.tf', 'Pass input variables: module "vpc" { source = "./modules/vpc" }'],
        commands: `terraform workspace list\nterraform workspace new dev\nterraform workspace select prod`,
        bestPractices: ['Pin module source versions (e.g. version = "5.1.0") to prevent breaking upstream changes.'],
        interviewQuestions: [{ question: 'What is a Terraform Module?', answer: 'A module is a container for multiple resources configured together, used to create reusable, version-controlled infrastructure packages.' }],
        quiz: [{ question: 'Which keyword is used to call a child module in HCL code?', options: ['resource', 'module', 'package', 'import'], answerIndex: 1, explanation: 'The module block calls a child module.' }]
      }
    ]
  }
};

export const popularTopics = [
  {
    title: 'AWS VPC & Subnet Architecture',
    techSlug: 'aws',
    topicSlug: 'vpc',
    category: 'AWS • INTERMEDIATE',
    color: '#FF9900',
    desc: 'Learn public/private subnet routing, Internet Gateways, NAT Gateways, and security group isolation.'
  },
  {
    title: 'Dockerfile Multi-Stage Builds',
    techSlug: 'docker',
    topicSlug: 'multistage-builds',
    category: 'Docker • INTERMEDIATE',
    color: '#2496ED',
    desc: 'Separate build toolchains from production containers to shrink image sizes down to 15MB.'
  },
  {
    title: 'Kubernetes Deployments & Ingress',
    techSlug: 'kubernetes',
    topicSlug: 'services-ingress',
    category: 'K8s • INTERMEDIATE',
    color: '#326CE5',
    desc: 'Configure ClusterIP, NodePort, LoadBalancer services, and Nginx Ingress SSL routing.'
  },
  {
    title: 'Linux Permissions & Ownership',
    techSlug: 'linux',
    topicSlug: 'permissions-ownership',
    category: 'Linux • BASIC',
    color: '#FCC624',
    desc: 'Master numeric (755/644) and symbolic permissions with chmod, chown, and root sudo delegation.'
  },
  {
    title: 'Git Rebase vs Merge & Squashing',
    techSlug: 'git',
    topicSlug: 'rebasing-advanced',
    category: 'Git • PRO',
    color: '#F05032',
    desc: 'Clean up messy commit histories using git rebase -i, squash WIP commits, and resolve conflicts.'
  },
  {
    title: 'Terraform S3 & DynamoDB Remote State',
    techSlug: 'terraform',
    topicSlug: 'state-backend',
    category: 'Terraform • PRO',
    color: '#844FBA',
    desc: 'Setup remote S3 state backend with DynamoDB locking to prevent concurrent state corruption.'
  }
];
