// Comprehensive Quiz & Certification Practice Question Bank for CloudVerse

export const quizzesData = {
  aws: {
    title: 'AWS Certified Solutions Architect & SysOps Practice Exam',
    slug: 'aws',
    techTitle: 'Amazon Web Services',
    color: '#FF9900',
    icon: 'Cloud',
    description: 'Test your knowledge on AWS Compute, Storage, Security, Networking, IAM, and Cloud Architecture.',
    questions: [
      {
        id: 1,
        question: 'Which EC2 instance purchasing option offers up to 90% discount off On-Demand rates for stateless, fault-tolerant workloads?',
        options: ['Reserved Instances', 'Spot Instances', 'On-Demand Instances', 'Dedicated Hosts'],
        answerIndex: 1,
        topic: 'EC2',
        difficulty: 'Beginner',
        explanation: 'Spot Instances use unused AWS compute capacity at up to 90% savings over On-Demand, but can be reclaimed by AWS with a 2-minute notice.'
      },
      {
        id: 2,
        question: 'What is the durability rating of Amazon S3 Standard object storage?',
        options: ['99.9%', '99.99%', '99.999999999% (11 nines)', '99.5%'],
        answerIndex: 2,
        topic: 'S3',
        difficulty: 'Beginner',
        explanation: 'S3 Standard is engineered for 99.999999999% (11 9s) of object durability across multiple Availability Zones.'
      },
      {
        id: 3,
        question: 'In AWS IAM, what happens when a request matches both an explicit ALLOW policy and an explicit DENY policy?',
        options: ['Access is granted', 'Access is denied', 'AWS prompts for MFA', 'The ALLOW policy takes precedence'],
        answerIndex: 1,
        topic: 'IAM',
        difficulty: 'Intermediate',
        explanation: 'In AWS IAM policy evaluation, an explicit DENY statement always overrides any ALLOW statements.'
      },
      {
        id: 4,
        question: 'What makes an AWS VPC subnet a "Public Subnet"?',
        options: [
          'It has a route pointing 0.0.0.0/0 to an Internet Gateway (IGW)',
          'It contains an Elastic IP address',
          'It is connected to a NAT Gateway',
          'It has default Security Group rules open to all IPs'
        ],
        answerIndex: 0,
        topic: 'VPC',
        difficulty: 'Intermediate',
        explanation: 'A subnet is considered public if its associated route table contains a route to an Internet Gateway (IGW).'
      },
      {
        id: 5,
        question: 'Which AWS service provides automated threat detection by monitoring CloudTrail logs, VPC Flow Logs, and DNS logs using machine learning?',
        options: ['AWS Shield', 'AWS WAF', 'Amazon GuardDuty', 'AWS Inspector'],
        answerIndex: 2,
        topic: 'Security',
        difficulty: 'Intermediate',
        explanation: 'Amazon GuardDuty is an intelligent threat detection service that continuously monitors AWS accounts and workloads for malicious activity.'
      },
      {
        id: 6,
        question: 'What component enables EC2 instances in a private subnet to initiate outbound internet connections while preventing unsolicited inbound traffic?',
        options: ['Internet Gateway (IGW)', 'NAT Gateway', 'VPC Peering', 'Virtual Private Gateway'],
        answerIndex: 1,
        topic: 'Networking',
        difficulty: 'Intermediate',
        explanation: 'A NAT Gateway (Network Address Translation) allows instances in private subnets to connect to services outside the VPC but prevents external servers from initiating a connection.'
      },
      {
        id: 7,
        question: 'Which feature of Amazon S3 locks objects to prevent accidental deletion or overwriting for WORM compliance?',
        options: ['S3 Versioning', 'S3 Object Lock', 'S3 Inventory', 'S3 Replication'],
        answerIndex: 1,
        topic: 'Storage',
        difficulty: 'Advanced',
        explanation: 'S3 Object Lock uses Write Once Read Many (WORM) models to prevent objects from being deleted or overwritten for a specified retention period.'
      },
      {
        id: 8,
        question: 'What is the primary difference between Security Groups and Network ACLs (NACLs) in AWS?',
        options: [
          'Security Groups are stateless at subnet level; NACLs are stateful at instance level',
          'Security Groups are stateful at instance level; NACLs are stateless at subnet level',
          'Security Groups only allow Deny rules; NACLs only allow Allow rules',
          'There is no functional difference'
        ],
        answerIndex: 1,
        topic: 'VPC',
        difficulty: 'Advanced',
        explanation: 'Security Groups act as virtual firewalls at the instance (ENI) level and are stateful. NACLs act at the subnet level and are stateless (requiring return rules).'
      },
      {
        id: 9,
        question: 'Which AWS storage service provides a fully managed shared NFS file system accessible simultaneously by thousands of Linux EC2 instances?',
        options: ['Amazon EBS', 'Amazon EFS', 'Amazon S3', 'AWS Storage Gateway'],
        answerIndex: 1,
        topic: 'Storage',
        difficulty: 'Intermediate',
        explanation: 'Amazon Elastic File System (EFS) provides scalable, serverless, elastic NFS file storage for concurrent Linux compute instances.'
      },
      {
        id: 10,
        question: 'In AWS CloudFormation, which section defines the AWS resources to be created and configured?',
        options: ['Parameters', 'Outputs', 'Resources', 'Mappings'],
        answerIndex: 2,
        topic: 'IaC',
        difficulty: 'Beginner',
        explanation: 'The mandatory `Resources` section declares the AWS resources (e.g. EC2, S3, RDS) that CloudFormation provisions.'
      }
    ]
  },
  docker: {
    title: 'Docker Certified Associate (DCA) Practice Exam',
    slug: 'docker',
    techTitle: 'Docker',
    color: '#2496ED',
    icon: 'Container',
    description: 'Assess your skills on Docker Architecture, Dockerfile instructions, Multi-stage builds, Volumes, and Networking.',
    questions: [
      {
        id: 1,
        question: 'Which Linux kernel feature provides resource limit quotas (CPU, RAM, disk I/O) for Docker containers?',
        options: ['Namespaces', 'Control Groups (cgroups)', 'SELinux', 'Overlay2'],
        answerIndex: 1,
        topic: 'Architecture',
        difficulty: 'Beginner',
        explanation: 'Control groups (cgroups) allocate and limit hardware resource utilization for container processes.'
      },
      {
        id: 2,
        question: 'Which Dockerfile instruction sets the main container executable that cannot be overridden by command-line arguments?',
        options: ['CMD', 'RUN', 'ENTRYPOINT', 'EXPOSE'],
        answerIndex: 2,
        topic: 'Dockerfile',
        difficulty: 'Intermediate',
        explanation: 'ENTRYPOINT sets the default command executable. Arguments passed via `docker run` or `CMD` are appended as parameters to ENTRYPOINT.'
      },
      {
        id: 3,
        question: 'What happens when a Docker container is deleted without attaching a volume?',
        options: [
          'All data written to the container layer is permanently lost',
          'Data is automatically saved to Docker Hub',
          'Data persists in the host OS /tmp directory',
          'Docker prompts to export the image'
        ],
        answerIndex: 0,
        topic: 'Storage',
        difficulty: 'Beginner',
        explanation: 'Data written to a container writable layer is transient and destroyed when the container instance is removed unless stored in a Volume or Bind Mount.'
      },
      {
        id: 4,
        question: 'How does Multi-stage build improve Docker image optimization?',
        options: [
          'It allows compiling source code in a build stage and copying only the final binary into a tiny runtime image',
          'It runs multiple containers concurrently',
          'It automatically converts Linux images to Windows',
          'It encrypts container layers'
        ],
        answerIndex: 0,
        topic: 'Dockerfile',
        difficulty: 'Intermediate',
        explanation: 'Multi-stage builds let you use heavy build SDK tools in Stage 1, then copy only compiled artifacts into a lightweight Stage 2 runtime base image.'
      },
      {
        id: 5,
        question: 'Which default Docker network driver provides container-to-container communication on the same single host?',
        options: ['Overlay network', 'Bridge network', 'Macvlan network', 'Host network'],
        answerIndex: 1,
        topic: 'Networking',
        difficulty: 'Intermediate',
        explanation: 'The default `bridge` network driver creates a software bridge on the host (`docker0`) for containers on that host.'
      },
      {
        id: 6,
        question: 'Which command removes all stopped containers, unused networks, and dangling build cache in one command?',
        options: ['docker container clean', 'docker system prune -a', 'docker image clear', 'docker rm --all'],
        answerIndex: 1,
        topic: 'CLI',
        difficulty: 'Beginner',
        explanation: '`docker system prune -a` cleans up stopped containers, unused networks, dangling images, and build cache.'
      },
      {
        id: 7,
        question: 'What is the purpose of the `.dockerignore` file?',
        options: [
          'It excludes specified files and directories from being sent to the Docker daemon during build context evaluation',
          'It prevents containers from accessing the internet',
          'It lists forbidden Docker commands',
          'It deletes source code after build'
        ],
        answerIndex: 0,
        topic: 'Build',
        difficulty: 'Beginner',
        explanation: '`.dockerignore` prevents large or sensitive local files (e.g. `node_modules`, `.git`) from being sent to the build context.'
      },
      {
        id: 8,
        question: 'Which storage driver is recommended for modern Linux distributions running Docker Engine?',
        options: ['AUFS', 'devicemapper', 'overlay2', 'vfs'],
        answerIndex: 2,
        topic: 'Architecture',
        difficulty: 'Advanced',
        explanation: '`overlay2` is the preferred and default storage driver for modern Linux kernels, offering high performance and efficient layer handling.'
      },
      {
        id: 9,
        question: 'What is the key difference between Bind Mounts and Named Volumes in Docker?',
        options: [
          'Bind mounts depend on exact host file paths; Named Volumes are managed entirely by Docker in `/var/lib/docker/volumes/`',
          'Bind mounts are encrypted; Named Volumes are unencrypted',
          'Named Volumes can only store 1GB',
          'Bind mounts only work on Windows'
        ],
        answerIndex: 0,
        topic: 'Storage',
        difficulty: 'Intermediate',
        explanation: 'Named Volumes are managed by Docker storage subsystem, whereas Bind Mounts map directly to an arbitrary path on the host system.'
      },
      {
        id: 10,
        question: 'Which CLI flag attaches container port 80 to host port 8080?',
        options: ['-p 80:8080', '-p 8080:80', '-v 8080:80', '--port 8080'],
        answerIndex: 1,
        topic: 'CLI',
        difficulty: 'Beginner',
        explanation: 'The `-p hostPort:containerPort` syntax (`-p 8080:80`) maps host port 8080 to container port 80.'
      }
    ]
  },
  kubernetes: {
    title: 'Certified Kubernetes Administrator (CKA) Practice Exam',
    slug: 'kubernetes',
    techTitle: 'Kubernetes',
    color: '#6366F1',
    icon: 'Ship',
    description: 'Master Kubernetes Architecture, Pods, Deployments, Services, Ingress, ConfigMaps, and Storage.',
    questions: [
      {
        id: 1,
        question: 'Which Kubernetes Control Plane component watches for unscheduled Pods and assigns them to suitable worker nodes?',
        options: ['kube-apiserver', 'kube-controller-manager', 'kube-scheduler', 'kubelet'],
        answerIndex: 2,
        topic: 'Architecture',
        difficulty: 'Beginner',
        explanation: 'The `kube-scheduler` selects appropriate nodes for newly created or unscheduled Pods based on resource availability and constraints.'
      },
      {
        id: 2,
        question: 'What is the smallest deployable computing unit in Kubernetes?',
        options: ['Container', 'Pod', 'Deployment', 'Node'],
        answerIndex: 1,
        topic: 'Workloads',
        difficulty: 'Beginner',
        explanation: 'A Pod is the smallest deployable object in Kubernetes, encapsulating one or more co-located containers.'
      },
      {
        id: 3,
        question: 'Containers in the same Kubernetes Pod share which resources automatically?',
        options: [
          'Network IP address and Storage Volumes',
          'Separate IP addresses and CPU limits',
          'Unique hostnames and isolated IPC',
          'Independent DNS search domains'
        ],
        answerIndex: 0,
        topic: 'Pods',
        difficulty: 'Intermediate',
        explanation: 'Containers in a Pod share the network namespace (IP address and ports) and can share attached storage volumes.'
      },
      {
        id: 4,
        question: 'Which Kubernetes Service type exposes the service externally using a dedicated cloud provider Load Balancer?',
        options: ['ClusterIP', 'NodePort', 'LoadBalancer', 'ExternalName'],
        answerIndex: 2,
        topic: 'Networking',
        difficulty: 'Beginner',
        explanation: '`Type: LoadBalancer` provisions an external cloud load balancer (e.g. AWS ALB) pointing to NodePorts across cluster worker nodes.'
      },
      {
        id: 5,
        question: 'What API object manages HTTP and HTTPS routing from outside the cluster to internal Kubernetes Services based on domain/path rules?',
        options: ['Service', 'Ingress', 'ConfigMap', 'NetworkPolicy'],
        answerIndex: 1,
        topic: 'Networking',
        difficulty: 'Intermediate',
        explanation: 'An `Ingress` resource manages Layer 7 HTTP/HTTPS ingress routing, SSL termination, and host/path-based routing.'
      },
      {
        id: 6,
        question: 'Which probe determines if a container has initialized and is ready to accept user network traffic?',
        options: ['LivenessProbe', 'ReadinessProbe', 'StartupProbe', 'HealthProbe'],
        answerIndex: 1,
        topic: 'Workloads',
        difficulty: 'Intermediate',
        explanation: 'If a ReadinessProbe fails, Kubernetes removes the Pod IP address from endpoints of matching Services so no traffic is sent to it.'
      },
      {
        id: 7,
        question: 'What is the purpose of a PersistentVolumeClaim (PVC)?',
        options: [
          'A request for storage by a user/Pod that binds to a matching PersistentVolume (PV)',
          'A backup snapshot of etcd',
          'A temporary scratch RAM disk',
          'A network gateway rule'
        ],
        answerIndex: 0,
        topic: 'Storage',
        difficulty: 'Intermediate',
        explanation: 'A PVC is a user storage request specifying size and access mode (ReadWriteOnce/ReadWriteMany) that Kubernetes binds to a PV.'
      },
      {
        id: 8,
        question: 'Which command initiates a zero-downtime rolling update of a Deployment named `web-app` to image `nginx:1.25`?',
        options: [
          'kubectl set image deployment/web-app nginx=nginx:1.25',
          'kubectl update deployment web-app --image=nginx:1.25',
          'kubectl rollout replace deployment web-app nginx:1.25',
          'kubectl restart deployment web-app'
        ],
        answerIndex: 0,
        topic: 'CLI',
        difficulty: 'Intermediate',
        explanation: '`kubectl set image deployment/web-app containerName=newImage` updates the pod template and triggers a rolling update.'
      },
      {
        id: 9,
        question: 'How does ConfigMap differ from Secret in Kubernetes?',
        options: [
          'ConfigMaps store plain-text configuration data; Secrets store base64-encoded sensitive keys/passwords',
          'Secrets are encrypted on disk automatically without KMS',
          'ConfigMaps cannot be mounted as volumes',
          'Secrets only work in the kube-system namespace'
        ],
        answerIndex: 0,
        topic: 'Configuration',
        difficulty: 'Beginner',
        explanation: 'ConfigMaps store non-confidential configuration data. Secrets store sensitive information (e.g. passwords, TLS keys) encoded in base64.'
      },
      {
        id: 10,
        question: 'Which component stores all Kubernetes cluster state, configuration specs, and metadata?',
        options: ['etcd', 'kube-apiserver', 'CoreDNS', 'kube-proxy'],
        answerIndex: 0,
        topic: 'Architecture',
        difficulty: 'Intermediate',
        explanation: '`etcd` is a distributed, consistent key-value store containing all cluster state data.'
      }
    ]
  },
  linux: {
    title: 'Linux System Administration & RHCSA Practice Exam',
    slug: 'linux',
    techTitle: 'Linux',
    color: '#D97706',
    icon: 'Terminal',
    description: 'Test your Linux shell command proficiency, permissions, process monitoring, systemd, and cron syntax.',
    questions: [
      {
        id: 1,
        question: 'What numeric file permission code corresponds to `rwxr-xr--` (User: read/write/execute, Group: read/execute, Others: read)?',
        options: ['755', '754', '644', '777'],
        answerIndex: 1,
        topic: 'Permissions',
        difficulty: 'Beginner',
        explanation: '`rwx` = 4+2+1=7. `r-x` = 4+0+1=5. `r--` = 4+0+0=4. Hence `754`.'
      },
      {
        id: 2,
        question: 'Which Linux command streams real-time updates of log files as new lines are appended?',
        options: ['cat log.txt', 'tail -f log.txt', 'grep -r log.txt', 'head -n 50 log.txt'],
        answerIndex: 1,
        topic: 'CLI',
        difficulty: 'Beginner',
        explanation: '`tail -f` (follow) keeps the file handle open and outputs appended lines in real time.'
      },
      {
        id: 3,
        question: 'What is the purpose of the systemd service management command `systemctl enable nginx`?',
        options: [
          'It starts Nginx immediately for the current session',
          'It configures Nginx to automatically start at system boot time',
          'It tests Nginx configuration syntax',
          'It installs Nginx packages'
        ],
        answerIndex: 1,
        topic: 'Systemd',
        difficulty: 'Intermediate',
        explanation: '`systemctl enable` creates systemd symlinks so the service automatically launches when the OS boots up.'
      },
      {
        id: 4,
        question: 'Which cron expression runs a script every night at 2:30 AM?',
        options: ['30 2 * * *', '* 2 30 * *', '2 30 * * *', '0 2 30 * *'],
        answerIndex: 0,
        topic: 'Cron',
        difficulty: 'Intermediate',
        explanation: 'Cron format is `Minute Hour Day Month DayOfWeek`. `30 2 * * *` executes at minute 30, hour 2 (2:30 AM) every day.'
      },
      {
        id: 5,
        question: 'Which command changes ownership of a directory and all its recursive contents to user `ubuntu` and group `www-data`?',
        options: [
          'chmod -R ubuntu:www-data /var/www',
          'chown -R ubuntu:www-data /var/www',
          'chgrp -R ubuntu /var/www',
          'usermod -aG www-data ubuntu'
        ],
        answerIndex: 1,
        topic: 'Permissions',
        difficulty: 'Beginner',
        explanation: '`chown -R user:group directory` recursively updates both user owner and group owner.'
      },
      {
        id: 6,
        question: 'In Linux process management, what signal does `kill -9 <PID>` send?',
        options: ['SIGTERM (Graceful Termination)', 'SIGKILL (Forceful Immediate Kill)', 'SIGHUP (Reload Configuration)', 'SIGINT (Interrupt)'],
        answerIndex: 1,
        topic: 'Processes',
        difficulty: 'Intermediate',
        explanation: 'Signal 9 (`SIGKILL`) forcibly terminates a process immediately without allowing it to clean up resources or catch the signal.'
      },
      {
        id: 7,
        question: 'Which command searches for text patterns within files using Regular Expressions?',
        options: ['find', 'locate', 'grep', 'which'],
        answerIndex: 2,
        topic: 'CLI',
        difficulty: 'Beginner',
        explanation: '`grep` (Global Regular Expression Print) searches text files for matching regular expression patterns.'
      },
      {
        id: 8,
        question: 'What is the purpose of SSH key-based authentication via `~/.ssh/authorized_keys`?',
        options: [
          'It allows passwordless, cryptographic public-key authentication to remote servers',
          'It encrypts local files',
          'It manages root passwords',
          'It creates VPN tunnels'
        ],
        answerIndex: 0,
        topic: 'Security',
        difficulty: 'Intermediate',
        explanation: 'Placing a client public key in `~/.ssh/authorized_keys` enables secure passwordless SSH authentication.'
      },
      {
        id: 9,
        question: 'Which tool displays real-time system resource consumption including per-CPU utilization and process memory lists?',
        options: ['df -h', 'top / htop', 'netstat', 'uname -a'],
        answerIndex: 1,
        topic: 'Monitoring',
        difficulty: 'Beginner',
        explanation: '`top` and `htop` provide dynamic real-time views of running processes and system resource utilization.'
      },
      {
        id: 10,
        question: 'Which command displays filesystem disk space usage in human-readable format (MB/GB)?',
        options: ['du -sh', 'df -h', 'ls -lh', 'free -m'],
        answerIndex: 1,
        topic: 'CLI',
        difficulty: 'Beginner',
        explanation: '`df -h` (disk free, human-readable) displays total, used, and available disk space for mounted filesystems.'
      }
    ]
  },
  git: {
    title: 'Git Version Control & GitHub Flow Certification',
    slug: 'git',
    techTitle: 'Git',
    color: '#F05032',
    icon: 'GitBranch',
    description: 'Test your understanding of Git branching, interactive rebasing, merge strategies, cherry-picking, and reflog.',
    questions: [
      {
        id: 1,
        question: 'What is the main difference between `git merge` and `git rebase`?',
        options: [
          'git merge creates a merge commit preserving history; git rebase replays commits for a linear history',
          'git rebase deletes old branches automatically',
          'git merge only works on local branches',
          'git rebase is faster than git merge'
        ],
        answerIndex: 0,
        topic: 'Branching',
        difficulty: 'Intermediate',
        explanation: '`git merge` creates a new join commit preserving exact historical commit times. `git rebase` rewrites commits on top of another branch for a clean linear history.'
      },
      {
        id: 2,
        question: 'Which command allows you to temporarily save uncommitted local changes without making a commit, so you can switch branches?',
        options: ['git commit -m "temp"', 'git stash', 'git reset --soft', 'git checkout --force'],
        answerIndex: 1,
        topic: 'Workflows',
        difficulty: 'Beginner',
        explanation: '`git stash` takes dirty working directory changes and saves them on a stack of uncommitted changes.'
      },
      {
        id: 3,
        question: 'Which command copies a specific commit from one branch and applies it onto your active branch?',
        options: ['git merge --single', 'git cherry-pick <commit-hash>', 'git clone --commit', 'git rebase --pick'],
        answerIndex: 1,
        topic: 'Commits',
        difficulty: 'Intermediate',
        explanation: '`git cherry-pick <hash>` extracts the patch from a specified commit and applies it to current `HEAD`.'
      },
      {
        id: 4,
        question: 'What does `git reset --hard HEAD~1` do?',
        options: [
          'Undoes the last commit and discards all changes in working directory and staging area',
          'Undoes the last commit but keeps working directory changes intact',
          'Pushes the last commit to remote',
          'Deletes the active branch'
        ],
        answerIndex: 0,
        topic: 'Undoing Changes',
        difficulty: 'Intermediate',
        explanation: '`git reset --hard` resets HEAD, staging index, and working tree to the target commit, discarding all uncommitted changes.'
      },
      {
        id: 5,
        question: 'Which command displays the commit history as an ASCII graph showing branch merges?',
        options: ['git log --graph --oneline --all', 'git history --tree', 'git status --graph', 'git branch -v'],
        answerIndex: 0,
        topic: 'CLI',
        difficulty: 'Beginner',
        explanation: '`git log --graph --oneline --all` renders a compact, visual ASCII tree graph of all branch histories.'
      },
      {
        id: 6,
        question: 'Which Git tool records every movement of HEAD, enabling recovery of lost or deleted commits/branches?',
        options: ['git reflog', 'git fsck', 'git revert', 'git bisect'],
        answerIndex: 0,
        topic: 'Recovery',
        difficulty: 'Advanced',
        explanation: '`git reflog` tracks every update to local HEAD (checkout, rebase, reset), allowing recovery of detached or lost commits.'
      },
      {
        id: 7,
        question: 'What is the purpose of `git revert <commit-hash>`?',
        options: [
          'It creates a new commit that inverse-undoes the specified commit changes safely without rewriting history',
          'It deletes the commit from remote repository',
          'It resets local repository to initial commit',
          'It renames the commit message'
        ],
        answerIndex: 0,
        topic: 'Undoing Changes',
        difficulty: 'Intermediate',
        explanation: '`git revert` creates a new commit that reverses the exact changes of a previous commit, preserving shared branch history safely.'
      },
      {
        id: 8,
        question: 'Which command initiates a binary search through commit history to locate the exact commit that introduced a bug?',
        options: ['git search', 'git bisect', 'git debug', 'git trace'],
        answerIndex: 1,
        topic: 'Debugging',
        difficulty: 'Advanced',
        explanation: '`git bisect` performs a binary search between a known good commit and bad commit to isolate regression bugs.'
      },
      {
        id: 9,
        question: 'Which command downloads remote changes and merges them into the current branch in a single operation?',
        options: ['git fetch', 'git pull', 'git checkout', 'git sync'],
        answerIndex: 1,
        topic: 'Remote',
        difficulty: 'Beginner',
        explanation: '`git pull` runs `git fetch` followed by `git merge` (or `git rebase` if configured).'
      },
      {
        id: 10,
        question: 'In GitHub Flow, when should a Pull Request be opened?',
        options: [
          'After creating a feature branch and making initial commits to open discussion and code review',
          'Only after deploying to production',
          'Just before deleting the repository',
          'Only by team leads'
        ],
        answerIndex: 0,
        topic: 'GitHub Flow',
        difficulty: 'Beginner',
        explanation: 'In GitHub Flow, PRs are opened early on feature branches to encourage feedback, automated CI checks, and review before merging.'
      }
    ]
  },
  terraform: {
    title: 'HashiCorp Certified: Terraform Associate Practice Exam',
    slug: 'terraform',
    techTitle: 'Terraform',
    color: '#9333EA',
    icon: 'Blocks',
    description: 'Evaluate your knowledge on HCL syntax, Terraform State, Remote Backends, Providers, Modules, and CLI workflows.',
    questions: [
      {
        id: 1,
        question: 'Which Terraform CLI command initializes the working directory, downloads required provider plugins, and configures remote backends?',
        options: ['terraform plan', 'terraform init', 'terraform apply', 'terraform validate'],
        answerIndex: 1,
        topic: 'Workflow',
        difficulty: 'Beginner',
        explanation: '`terraform init` prepares the workspace by downloading provider binaries and initializing backend state configurations.'
      },
      {
        id: 2,
        question: 'What is the main function of the `terraform.tfstate` file?',
        options: [
          'It stores the mapping between declarative configuration resources and real-world managed cloud infrastructure',
          'It acts as an installation script',
          'It contains AWS root password credentials',
          'It generates documentation'
        ],
        answerIndex: 0,
        topic: 'State',
        difficulty: 'Intermediate',
        explanation: 'The state file records the mapping of Terraform resources to real-world cloud APIs and tracks metadata/dependencies.'
      },
      {
        id: 3,
        question: 'Why is using a Remote Backend with DynamoDB state locking recommended in team environments?',
        options: [
          'It prevents two users from running `terraform apply` concurrently, avoiding state file corruption',
          'It makes Terraform code run 10x faster',
          'It encrypts local source code files',
          'It bypasses AWS IAM credentials'
        ],
        answerIndex: 0,
        topic: 'Backend',
        difficulty: 'Intermediate',
        explanation: 'DynamoDB state locking prevents concurrent execution race conditions that could corrupt the remote `.tfstate` file.'
      },
      {
        id: 4,
        question: 'Which command generates an execution plan preview showing what resources Terraform will create, update, or destroy?',
        options: ['terraform check', 'terraform plan', 'terraform preview', 'terraform diff'],
        answerIndex: 1,
        topic: 'Workflow',
        difficulty: 'Beginner',
        explanation: '`terraform plan` compares configuration files against existing state and outputs the proposed changes.'
      },
      {
        id: 5,
        question: 'In HCL, how do you reference an output variable `vpc_id` exposed by a child module named `my_vpc`?',
        options: [
          'module.my_vpc.vpc_id',
          'var.my_vpc.vpc_id',
          'output.my_vpc.vpc_id',
          'resource.my_vpc.vpc_id'
        ],
        answerIndex: 0,
        topic: 'Modules',
        difficulty: 'Intermediate',
        explanation: 'Outputs from child modules are accessed using the syntax `module.<MODULE_NAME>.<OUTPUT_NAME>`.'
      },
      {
        id: 6,
        question: 'Which meta-argument in a Terraform resource block creates multiple identical resource instances using an array or map?',
        options: ['for_each', 'count', 'depends_on', 'lifecycle'],
        answerIndex: 0,
        topic: 'HCL',
        difficulty: 'Intermediate',
        explanation: '`for_each` accepts a map or set of strings and creates a resource instance for each item, providing key-based resource addressing.'
      },
      {
        id: 7,
        question: 'What command imports existing real-world cloud infrastructure into Terraform state without writing configuration automatically?',
        options: ['terraform import', 'terraform fetch', 'terraform sync', 'terraform pull'],
        answerIndex: 0,
        topic: 'CLI',
        difficulty: 'Advanced',
        explanation: '`terraform import <ADDRESS> <ID>` maps existing cloud resources into the Terraform state file.'
      },
      {
        id: 8,
        question: 'Which file extension is automatically loaded by Terraform to populate input variables without requiring `-var-file` flags?',
        options: ['terraform.tfvars', 'config.json', 'variables.hcl', 'settings.yaml'],
        answerIndex: 0,
        topic: 'Variables',
        difficulty: 'Beginner',
        explanation: 'Files named `terraform.tfvars` or `*.auto.tfvars` are loaded automatically by Terraform.'
      },
      {
        id: 9,
        question: 'What is the purpose of the `depends_on` meta-argument in a resource block?',
        options: [
          'It forces an explicit dependency ordering when Terraform cannot infer hidden infrastructure dependencies automatically',
          'It connects to external API endpoints',
          'It installs Linux packages',
          'It restarts instances'
        ],
        answerIndex: 0,
        topic: 'HCL',
        difficulty: 'Intermediate',
        explanation: '`depends_on` specifies explicit dependencies between resources that Terraform cannot automatically deduce from configuration references.'
      },
      {
        id: 10,
        question: 'What command formatting tool standardizes Terraform configuration files to canonical HCL style?',
        options: ['terraform fmt', 'terraform lint', 'terraform clean', 'terraform style'],
        answerIndex: 0,
        topic: 'CLI',
        difficulty: 'Beginner',
        explanation: '`terraform fmt` automatically adjusts Terraform configuration files to a standard format and alignment style.'
      }
    ]
  }
};
