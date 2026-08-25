package com.cloudverse.config;

import com.cloudverse.model.*;
import com.cloudverse.repository.QuizRepository;
import com.cloudverse.repository.TechnologyRepository;
import com.cloudverse.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder {
    private final TechnologyRepository technologyRepository;
    private final TopicRepository topicRepository;
    private final QuizRepository quizRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void seedData() {
        if (technologyRepository.count() > 0) return;

        Technology aws = createTech("aws", "AWS", "Amazon Web Services", "aws-icon", "#FF9900", "https://aws.amazon.com/docs/", 12, 1);

        Topic aws_iam = Topic.builder()
                .technologyId(aws.getId())
                .slug("iam")
                .title("IAM")
                .overview("AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources. With IAM, you can centrally manage permissions that control which AWS resources users can access.\n\nIAM provides the following key features: Users (individual accounts), Groups (collections of users), Roles (temporary credentials), and Policies (JSON documents defining permissions).\n\nBest practices include enabling MFA, following the principle of least privilege, and using IAM roles instead of access keys. Avoid using the root account.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("IAM Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering IAM", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the difference between IAM Users and IAM Roles?", "An IAM User is a unique identity with permanent credentials, whereas an IAM Role is a set of permissions that can be assumed by anyone who needs it, providing temporary credentials."), new InterviewQuestion("What is the principle of least privilege?", "Granting only the permissions required to perform a specific task, and no more.")))
                .flashCards(List.of(new FlashCard("IAM Policy", "A JSON document that defines permissions"), new FlashCard("MFA", "Multi-Factor Authentication - adds an extra layer of protection on top of a user name and password")))
                .displayOrder(1)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_iam);

        Quiz aws_iam_quiz = Quiz.builder()
                .topicId(aws_iam.getId())
                .technologyId(aws.getId())
                .title("IAM Quiz")
                .questions(List.of(new Question("Which of the following is NOT an IAM best practice?", List.of("Enable MFA", "Use root account for all tasks", "Grant least privilege", "Rotate access keys"), 1, "Using the root account is a major security risk.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_iam_quiz);

        Topic aws_ec2 = Topic.builder()
                .technologyId(aws.getId())
                .slug("ec2")
                .title("EC2")
                .overview("Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud. Using Amazon EC2 eliminates your need to invest in hardware up front, so you can develop and deploy applications faster.\n\nKey concepts include Instance Types (various combinations of CPU, memory, storage, and networking capacity), AMIs (templates containing a software configuration), and Key Pairs (secure login information).\n\nYou can also manage networking with Security Groups and Elastic IPs, and optimize performance with Placement Groups.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("EC2 Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering EC2", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("Explain the difference between Security Groups and NACLs", "Security Groups operate at the instance level and are stateful, while NACLs operate at the subnet level and are stateless."), new InterviewQuestion("What is an Elastic IP?", "A static, public IPv4 address designed for dynamic cloud computing.")))
                .flashCards(List.of(new FlashCard("What is an AMI?", "Amazon Machine Image - a template for launching EC2 instances containing OS, application server, and applications"), new FlashCard("Security Group", "Acts as a virtual firewall for your EC2 instances to control incoming and outgoing traffic")))
                .displayOrder(2)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_ec2);

        Quiz aws_ec2_quiz = Quiz.builder()
                .topicId(aws_ec2.getId())
                .technologyId(aws.getId())
                .title("EC2 Quiz")
                .questions(List.of(new Question("Which EC2 pricing model provides the most significant discount for long-term predictable workloads?", List.of("On-Demand", "Spot Instances", "Reserved Instances", "Dedicated Hosts"), 2, "Reserved Instances offer significant discounts in exchange for a 1- or 3-year term commitment.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_ec2_quiz);

        Topic aws_s3 = Topic.builder()
                .technologyId(aws.getId())
                .slug("s3")
                .title("S3")
                .overview("Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can store and protect any amount of data for virtually any use case.\n\nKey concepts include Buckets (containers for objects), Objects (the fundamental entities stored), and Storage Classes like S3 Standard, S3 Intelligent-Tiering, S3 Standard-IA, and S3 Glacier.\n\nS3 also supports Versioning to keep multiple variants of an object, Lifecycle Policies for automatic transitions, and Static Website Hosting.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("S3 Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering S3", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the difference between S3 Standard and S3 Standard-IA?", "S3 Standard is for frequently accessed data, while S3 Standard-IA (Infrequently Accessed) is for data accessed less often but requires rapid access when needed."), new InterviewQuestion("How can you automatically move data to a cheaper storage class in S3?", "By configuring S3 Lifecycle policies.")))
                .flashCards(List.of(new FlashCard("S3 Bucket", "A container for objects stored in Amazon S3"), new FlashCard("S3 Versioning", "A means of keeping multiple variants of an object in the same bucket")))
                .displayOrder(3)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_s3);

        Quiz aws_s3_quiz = Quiz.builder()
                .topicId(aws_s3.getId())
                .technologyId(aws.getId())
                .title("S3 Quiz")
                .questions(List.of(new Question("Which S3 storage class offers the lowest cost for infrequently accessed data?", List.of("S3 Standard", "S3-IA", "S3 Glacier", "S3 One Zone-IA"), 2, "S3 Glacier is designed for low-cost data archiving.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_s3_quiz);

        Topic aws_vpc = Topic.builder()
                .technologyId(aws.getId())
                .slug("vpc")
                .title("VPC")
                .overview("Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.\n\nA VPC spans all of the Availability Zones in the Region. You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.\n\nYou can use IPv4 and IPv6 in your VPC for secure and easy access to resources and applications.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("VPC Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering VPC", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is a subnet?", "A range of IP addresses in your VPC. You can attach AWS resources to a selected subnet."), new InterviewQuestion("What is the difference between a public and private subnet?", "A public subnet has a route to the Internet Gateway, while a private subnet does not.")))
                .flashCards(List.of(new FlashCard("VPC", "Virtual Private Cloud - a logically isolated section of the AWS Cloud"), new FlashCard("CIDR Block", "Classless Inter-Domain Routing - a method for allocating IP addresses and routing IP packets")))
                .displayOrder(4)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_vpc);

        Quiz aws_vpc_quiz = Quiz.builder()
                .topicId(aws_vpc.getId())
                .technologyId(aws.getId())
                .title("VPC Quiz")
                .questions(List.of(new Question("What component is required for a VPC to communicate with the internet?", List.of("NAT Gateway", "Internet Gateway", "Virtual Private Gateway", "Customer Gateway"), 1, "An Internet Gateway enables communication between instances in your VPC and the internet.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_vpc_quiz);

        Topic aws_route_tables = Topic.builder()
                .technologyId(aws.getId())
                .slug("route-tables")
                .title("Route Tables")
                .overview("A route table contains a set of rules, called routes, that are used to determine where network traffic from your subnet or gateway is directed. Each subnet in your VPC must be associated with a route table.\n\nWhen you create a VPC, it automatically comes with a main route table. You can create custom route tables and associate them with specific subnets to control traffic flow.\n\nFor example, to make a subnet public, you add a route to the internet gateway in its associated route table.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("Route Tables Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Route Tables", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("Can a subnet be associated with multiple route tables?", "No, a subnet can only be associated with one route table at a time."), new InterviewQuestion("What is the local route?", "A default route in every route table that allows all resources within the VPC to communicate with each other.")))
                .flashCards(List.of(new FlashCard("Route Table", "A set of rules used to determine where network traffic is directed"), new FlashCard("Destination", "The IP address range where you want traffic to go")))
                .displayOrder(5)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_route_tables);

        Quiz aws_route_tables_quiz = Quiz.builder()
                .topicId(aws_route_tables.getId())
                .technologyId(aws.getId())
                .title("Route Tables Quiz")
                .questions(List.of(new Question("Every route table contains a default route for communication within the VPC. What is its destination?", List.of("0.0.0.0/0", "The VPC's CIDR block", "The internet gateway ID", "The NAT gateway ID"), 1, "The local route destination is the VPC's CIDR block, enabling intra-VPC communication.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_route_tables_quiz);

        Topic aws_internet_gateway = Topic.builder()
                .technologyId(aws.getId())
                .slug("internet-gateway")
                .title("Internet Gateway")
                .overview("An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet. It supports IPv4 and IPv6 traffic.\n\nIt serves two purposes: to provide a target in your VPC route tables for internet-routable traffic, and to perform network address translation (NAT) for instances that have been assigned public IPv4 addresses.\n\nTo enable internet access, you must attach the gateway to your VPC, ensure your subnet's route table points to it, and assign a public IP to your instances.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("Internet Gateway Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Internet Gateway", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("Is there a bandwidth constraint on an Internet Gateway?", "No, it is horizontally scaled and redundant, with no direct bandwidth constraints."), new InterviewQuestion("Can a VPC have multiple Internet Gateways?", "No, you can attach only one Internet Gateway to a VPC at a time.")))
                .flashCards(List.of(new FlashCard("Internet Gateway (IGW)", "A VPC component that allows communication between your VPC and the internet"), new FlashCard("Egress-Only Internet Gateway", "Allows IPv6 traffic from your VPC to the internet, but prevents the internet from initiating an IPv6 connection")))
                .displayOrder(6)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_internet_gateway);

        Quiz aws_internet_gateway_quiz = Quiz.builder()
                .topicId(aws_internet_gateway.getId())
                .technologyId(aws.getId())
                .title("Internet Gateway Quiz")
                .questions(List.of(new Question("What is required for an EC2 instance in a private subnet to access the internet for updates?", List.of("Internet Gateway", "NAT Gateway", "Virtual Private Gateway", "Customer Gateway"), 1, "A NAT Gateway allows instances in a private subnet to connect to the internet while preventing inbound connections.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_internet_gateway_quiz);

        Topic aws_security_groups = Topic.builder()
                .technologyId(aws.getId())
                .slug("security-groups")
                .title("Security Groups")
                .overview("A security group acts as a virtual firewall for your EC2 instances to control incoming and outgoing traffic. Inbound rules control the incoming traffic to your instance, and outbound rules control the outgoing traffic from your instance.\n\nWhen you launch an instance, you can specify one or more security groups. If you don't specify one, Amazon EC2 uses the default security group for the VPC.\n\nSecurity groups are stateful — if you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("Security Groups Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Security Groups", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the default behavior of a new Security Group?", "It denies all inbound traffic and allows all outbound traffic."), new InterviewQuestion("Are Security Groups stateful or stateless?", "Stateful, meaning return traffic is automatically allowed.")))
                .flashCards(List.of(new FlashCard("Security Group", "A virtual firewall for instances to control inbound and outbound traffic"), new FlashCard("Stateful", "A characteristic where response traffic to an allowed request is automatically permitted")))
                .displayOrder(7)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_security_groups);

        Quiz aws_security_groups_quiz = Quiz.builder()
                .topicId(aws_security_groups.getId())
                .technologyId(aws.getId())
                .title("Security Groups Quiz")
                .questions(List.of(new Question("If you allow inbound SSH (port 22) in a security group, do you need to explicitly allow outbound traffic for the response?", List.of("Yes", "No", "Only for IPv6", "Only if crossing subnets"), 1, "Security groups are stateful, so the outbound response is automatically allowed.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_security_groups_quiz);

        Topic aws_alb = Topic.builder()
                .technologyId(aws.getId())
                .slug("alb")
                .title("ALB")
                .overview("An Application Load Balancer (ALB) functions at the application layer (Layer 7) of the OSI model. After the load balancer receives a request, it evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group.\n\nALBs support path-based and host-based routing, making them ideal for microservices and container-based architectures like Amazon ECS.\n\nThey can handle HTTP and HTTPS traffic, support SSL offloading, and integrate seamlessly with AWS Web Application Firewall (WAF).")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("ALB Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering ALB", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What OSI layer does an Application Load Balancer operate at?", "Layer 7 (Application layer)."), new InterviewQuestion("What is path-based routing in an ALB?", "Routing requests to different target groups based on the URL path (e.g., /api vs /images).")))
                .flashCards(List.of(new FlashCard("Application Load Balancer (ALB)", "A load balancer operating at Layer 7, ideal for HTTP/HTTPS traffic"), new FlashCard("Target Group", "A group of resources (like EC2 instances) that an ALB routes requests to")))
                .displayOrder(8)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_alb);

        Quiz aws_alb_quiz = Quiz.builder()
                .topicId(aws_alb.getId())
                .technologyId(aws.getId())
                .title("ALB Quiz")
                .questions(List.of(new Question("Which of the following routing methods is supported by an ALB?", List.of("Port-based routing", "IP-based routing", "Path-based routing", "MAC-based routing"), 2, "ALBs support path-based routing to direct traffic to different services based on the URL.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_alb_quiz);

        Topic aws_cloudwatch = Topic.builder()
                .technologyId(aws.getId())
                .slug("cloudwatch")
                .title("CloudWatch")
                .overview("Amazon CloudWatch is a monitoring and observability service built for DevOps engineers, developers, site reliability engineers (SREs), and IT managers. CloudWatch provides you with data and actionable insights to monitor your applications.\n\nYou can use CloudWatch to collect and track metrics, collect and monitor log files, set alarms, and automatically react to changes in your AWS resources.\n\nFor example, you can monitor the CPU utilization of an EC2 instance and trigger an Auto Scaling policy if it exceeds a certain threshold.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("CloudWatch Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering CloudWatch", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is a CloudWatch Metric?", "A metric represents a time-ordered set of data points that are published to CloudWatch."), new InterviewQuestion("How can you monitor custom application logs in AWS?", "By using the CloudWatch Logs agent to send application logs to CloudWatch Logs.")))
                .flashCards(List.of(new FlashCard("CloudWatch Alarm", "Watches a single metric and performs one or more actions based on its value relative to a threshold"), new FlashCard("CloudWatch Logs", "A service to monitor, store, and access log files from EC2 instances, AWS CloudTrail, and other sources")))
                .displayOrder(9)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_cloudwatch);

        Quiz aws_cloudwatch_quiz = Quiz.builder()
                .topicId(aws_cloudwatch.getId())
                .technologyId(aws.getId())
                .title("CloudWatch Quiz")
                .questions(List.of(new Question("What is the minimum resolution for a custom metric in CloudWatch?", List.of("1 minute", "5 minutes", "1 second", "1 hour"), 2, "High-resolution custom metrics in CloudWatch can have a resolution of 1 second.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_cloudwatch_quiz);

        Topic aws_cloudformation = Topic.builder()
                .technologyId(aws.getId())
                .slug("cloudformation")
                .title("CloudFormation")
                .overview("AWS CloudFormation is a service that helps you model and set up your Amazon Web Services resources so that you can spend less time managing those resources and more time focusing on your applications.\n\nYou create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and CloudFormation takes care of provisioning and configuring those resources for you.\n\nCloudFormation allows you to treat infrastructure as code (IaC), version control your infrastructure, and easily replicate environments.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("CloudFormation Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering CloudFormation", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What languages are supported for CloudFormation templates?", "JSON and YAML."), new InterviewQuestion("What is a CloudFormation stack?", "A stack is a collection of AWS resources that you can manage as a single unit.")))
                .flashCards(List.of(new FlashCard("CloudFormation Template", "A JSON or YAML formatted text file that describes your AWS infrastructure"), new FlashCard("Infrastructure as Code (IaC)", "The process of managing and provisioning computing infrastructure through machine-readable definition files")))
                .displayOrder(10)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_cloudformation);

        Quiz aws_cloudformation_quiz = Quiz.builder()
                .topicId(aws_cloudformation.getId())
                .technologyId(aws.getId())
                .title("CloudFormation Quiz")
                .questions(List.of(new Question("What feature of CloudFormation prevents accidental deletion of resources during a stack update?", List.of("DeletionPolicy", "UpdatePolicy", "CreationPolicy", "DependsOn"), 0, "The DeletionPolicy attribute enables you to retain or back up a resource when its stack is deleted.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_cloudformation_quiz);

        Topic aws_ecs = Topic.builder()
                .technologyId(aws.getId())
                .slug("ecs")
                .title("ECS")
                .overview("Amazon Elastic Container Service (Amazon ECS) is a highly scalable, fast, container management service that makes it easy to run, stop, and manage Docker containers on a cluster.\n\nYou can run your containers on a cluster of Amazon EC2 instances that you manage, or you can use AWS Fargate, which provides serverless compute for containers without needing to provision or manage servers.\n\nECS defines applications using Task Definitions, which specify the Docker images, resources, and networking configurations required to run them.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("ECS Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering ECS", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is AWS Fargate in the context of ECS?", "Fargate is a serverless compute engine for containers that works with ECS, removing the need to manage EC2 instances."), new InterviewQuestion("What is an ECS Task Definition?", "It is like a blueprint for your application, describing how docker containers should launch.")))
                .flashCards(List.of(new FlashCard("ECS Task", "The instantiation of a task definition within a cluster"), new FlashCard("ECS Cluster", "A logical grouping of tasks or services")))
                .displayOrder(11)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_ecs);

        Quiz aws_ecs_quiz = Quiz.builder()
                .topicId(aws_ecs.getId())
                .technologyId(aws.getId())
                .title("ECS Quiz")
                .questions(List.of(new Question("Which of the following is required to run a Docker container in ECS?", List.of("EC2 Instance", "Task Definition", "CloudFormation Template", "S3 Bucket"), 1, "A Task Definition is required to specify the Docker image and configuration for the container.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_ecs_quiz);

        Topic aws_auto_scaling = Topic.builder()
                .technologyId(aws.getId())
                .slug("auto-scaling")
                .title("Auto Scaling")
                .overview("AWS Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. Using AWS Auto Scaling, it's easy to setup application scaling for multiple resources across multiple services in minutes.\n\nAmazon EC2 Auto Scaling specifically helps you maintain EC2 instance availability and allows you to automatically add or remove EC2 instances according to conditions you define.\n\nThis ensures you have enough capacity during demand spikes while reducing costs during quiet periods.")
                .officialDocUrl("https://docs.aws.amazon.com/")
                .videoLinks(List.of(
                        new VideoLink("Auto Scaling Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Auto Scaling", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is a Launch Template?", "A Launch Template specifies instance configuration information, like the AMI, instance type, and security groups, used by an Auto Scaling group to launch instances."), new InterviewQuestion("What is scaling out vs scaling in?", "Scaling out is adding instances, while scaling in is removing instances.")))
                .flashCards(List.of(new FlashCard("Auto Scaling Group", "A collection of EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management"), new FlashCard("Cooldown Period", "A configurable timeframe that allows the previous scaling activity to take effect before subsequent scaling activities are initiated")))
                .displayOrder(12)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(aws_auto_scaling);

        Quiz aws_auto_scaling_quiz = Quiz.builder()
                .topicId(aws_auto_scaling.getId())
                .technologyId(aws.getId())
                .title("Auto Scaling Quiz")
                .questions(List.of(new Question("Which metric is most commonly used to trigger an Auto Scaling policy?", List.of("Disk Read Ops", "Network In", "CPU Utilization", "Memory Utilization"), 2, "CPU Utilization is the most common metric used to determine if more or fewer instances are needed.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(aws_auto_scaling_quiz);

        Technology docker = createTech("docker", "Docker", "Containerization platform", "docker-icon", "#2496ED", "https://docs.docker.com/", 10, 2);

        Topic docker_architecture = Topic.builder()
                .technologyId(docker.getId())
                .slug("architecture")
                .title("Architecture")
                .overview("Docker uses a client-server architecture. The Docker client talks to the Docker daemon, which does the heavy lifting of building, running, and distributing your Docker containers. The Docker client and daemon can run on the same system, or you can connect a Docker client to a remote Docker daemon.\n\nKey components include the Docker Daemon (dockerd), which listens for requests and manages objects, and the Docker Client (docker), which is the primary way users interact with Docker.\n\nRegistries store images, while containerd and runc serve as the underlying runtime technologies.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Architecture Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Architecture", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What happens when you run docker build?", "The Docker client sends the build context to the Docker daemon, which executes the instructions in the Dockerfile one by one to create a new Docker image."), new InterviewQuestion("What is the role of containerd in Docker?", "containerd is an industry-standard container runtime that manages the complete container lifecycle of its host system.")))
                .flashCards(List.of(new FlashCard("Docker Daemon", "The background service running on the host that manages building, running, and distributing Docker containers."), new FlashCard("Docker Registry", "A stateless, highly scalable server side application that stores and lets you distribute Docker images.")))
                .displayOrder(1)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_architecture);

        Quiz docker_architecture_quiz = Quiz.builder()
                .topicId(docker_architecture.getId())
                .technologyId(docker.getId())
                .title("Architecture Quiz")
                .questions(List.of(new Question("Which component actually runs the container processes in modern Docker?", List.of("Docker daemon", "Docker CLI", "runc", "Docker Compose"), 2, "runc is the low-level runtime that actually creates and runs containers.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_architecture_quiz);

        Topic docker_images = Topic.builder()
                .technologyId(docker.getId())
                .slug("images")
                .title("Images")
                .overview("A Docker image is a read-only template with instructions for creating a Docker container. Often, an image is based on another image, with some additional customization.\n\nFor example, you may build an image which is based on the ubuntu image, but installs the Apache web server and your application, as well as the configuration details needed to make your application run.\n\nImages are built from a series of layers. Each layer represents an instruction in the image's Dockerfile. If you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Images Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Images", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What are image layers?", "Each instruction in a Dockerfile creates a read-only layer. Layers are stacked and form the final image."), new InterviewQuestion("How do you list available images on your host?", "Using the 'docker images' or 'docker image ls' command.")))
                .flashCards(List.of(new FlashCard("Docker Image", "A read-only template with instructions for creating a Docker container"), new FlashCard("Layer", "A modification to a Docker image, represented by an instruction in a Dockerfile")))
                .displayOrder(2)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_images);

        Quiz docker_images_quiz = Quiz.builder()
                .topicId(docker_images.getId())
                .technologyId(docker.getId())
                .title("Images Quiz")
                .questions(List.of(new Question("What is the primary benefit of Docker image layers?", List.of("Security", "Faster builds and reduced storage through caching", "Cross-platform compatibility", "Better networking"), 1, "Layers allow Docker to cache steps; unchanged layers are reused, saving time and space.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_images_quiz);

        Topic docker_containers = Topic.builder()
                .technologyId(docker.getId())
                .slug("containers")
                .title("Containers")
                .overview("A container is a runnable instance of an image. You can create, start, stop, move, or delete a container using the Docker API or CLI. You can connect a container to one or more networks, attach storage to it, or even create a new image based on its current state.\n\nBy default, a container is relatively well isolated from other containers and its host machine. You can control how isolated a container's network, storage, or other underlying subsystems are from other containers or from the host machine.\n\nA container is defined by its image as well as any configuration options you provide to it when you create or start it.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Containers Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Containers", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the difference between an image and a container?", "An image is a read-only template, while a container is a running, writable instance of an image."), new InterviewQuestion("How do you stop a running container?", "Using the 'docker stop <container_id>' command.")))
                .flashCards(List.of(new FlashCard("Docker Container", "A runnable instance of a Docker image"), new FlashCard("docker ps", "A command used to list running containers")))
                .displayOrder(3)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_containers);

        Quiz docker_containers_quiz = Quiz.builder()
                .topicId(docker_containers.getId())
                .technologyId(docker.getId())
                .title("Containers Quiz")
                .questions(List.of(new Question("What happens to data written inside a container when the container is deleted?", List.of("It is saved automatically", "It is moved to the host", "It is lost unless stored in a volume", "It is backed up to Docker Hub"), 2, "Data written to the container's writable layer is lost when the container is removed.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_containers_quiz);

        Topic docker_dockerfile = Topic.builder()
                .technologyId(docker.getId())
                .slug("dockerfile")
                .title("Dockerfile")
                .overview("This section focuses on Dockerfile in Docker. Dockerfile is a fundamental concept for containerizing applications efficiently and securely.\n\nUnderstanding Dockerfile allows you to better structure your container deployments, optimize resource usage, and follow industry standards.\n\nProperly configuring Dockerfile ensures that your Docker environments are reproducible, scalable, and easy to maintain across different stages of development and production.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Dockerfile Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Dockerfile", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the main purpose of Dockerfile?", "To manage and configure aspects of Dockerfile in a Docker environment."), new InterviewQuestion("How do you implement Dockerfile?", "By utilizing specific Docker commands and configuration files relevant to this feature.")))
                .flashCards(List.of(new FlashCard("Dockerfile Concept", "The core idea behind Dockerfile"), new FlashCard("Dockerfile Usage", "Practical application of Dockerfile")))
                .displayOrder(4)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_dockerfile);

        Quiz docker_dockerfile_quiz = Quiz.builder()
                .topicId(docker_dockerfile.getId())
                .technologyId(docker.getId())
                .title("Dockerfile Quiz")
                .questions(List.of(new Question("Why is Dockerfile important in Docker?", List.of("It provides security", "It is required for orchestration", "It improves configuration management", "All of the above"), 3, "Dockerfile plays a critical role in all these areas.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_dockerfile_quiz);

        Topic docker_volumes = Topic.builder()
                .technologyId(docker.getId())
                .slug("volumes")
                .title("Volumes")
                .overview("This section focuses on Volumes in Docker. Volumes is a fundamental concept for containerizing applications efficiently and securely.\n\nUnderstanding Volumes allows you to better structure your container deployments, optimize resource usage, and follow industry standards.\n\nProperly configuring Volumes ensures that your Docker environments are reproducible, scalable, and easy to maintain across different stages of development and production.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Volumes Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Volumes", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the main purpose of Volumes?", "To manage and configure aspects of Volumes in a Docker environment."), new InterviewQuestion("How do you implement Volumes?", "By utilizing specific Docker commands and configuration files relevant to this feature.")))
                .flashCards(List.of(new FlashCard("Volumes Concept", "The core idea behind Volumes"), new FlashCard("Volumes Usage", "Practical application of Volumes")))
                .displayOrder(5)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_volumes);

        Quiz docker_volumes_quiz = Quiz.builder()
                .topicId(docker_volumes.getId())
                .technologyId(docker.getId())
                .title("Volumes Quiz")
                .questions(List.of(new Question("Why is Volumes important in Docker?", List.of("It provides security", "It is required for orchestration", "It improves configuration management", "All of the above"), 3, "Volumes plays a critical role in all these areas.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_volumes_quiz);

        Topic docker_networking = Topic.builder()
                .technologyId(docker.getId())
                .slug("networking")
                .title("Networking")
                .overview("This section focuses on Networking in Docker. Networking is a fundamental concept for containerizing applications efficiently and securely.\n\nUnderstanding Networking allows you to better structure your container deployments, optimize resource usage, and follow industry standards.\n\nProperly configuring Networking ensures that your Docker environments are reproducible, scalable, and easy to maintain across different stages of development and production.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Networking Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Networking", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the main purpose of Networking?", "To manage and configure aspects of Networking in a Docker environment."), new InterviewQuestion("How do you implement Networking?", "By utilizing specific Docker commands and configuration files relevant to this feature.")))
                .flashCards(List.of(new FlashCard("Networking Concept", "The core idea behind Networking"), new FlashCard("Networking Usage", "Practical application of Networking")))
                .displayOrder(6)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_networking);

        Quiz docker_networking_quiz = Quiz.builder()
                .topicId(docker_networking.getId())
                .technologyId(docker.getId())
                .title("Networking Quiz")
                .questions(List.of(new Question("Why is Networking important in Docker?", List.of("It provides security", "It is required for orchestration", "It improves configuration management", "All of the above"), 3, "Networking plays a critical role in all these areas.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_networking_quiz);

        Topic docker_docker_compose = Topic.builder()
                .technologyId(docker.getId())
                .slug("docker-compose")
                .title("Docker Compose")
                .overview("This section focuses on Docker Compose in Docker. Docker Compose is a fundamental concept for containerizing applications efficiently and securely.\n\nUnderstanding Docker Compose allows you to better structure your container deployments, optimize resource usage, and follow industry standards.\n\nProperly configuring Docker Compose ensures that your Docker environments are reproducible, scalable, and easy to maintain across different stages of development and production.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Docker Compose Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Docker Compose", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the main purpose of Docker Compose?", "To manage and configure aspects of Docker Compose in a Docker environment."), new InterviewQuestion("How do you implement Docker Compose?", "By utilizing specific Docker commands and configuration files relevant to this feature.")))
                .flashCards(List.of(new FlashCard("Docker Compose Concept", "The core idea behind Docker Compose"), new FlashCard("Docker Compose Usage", "Practical application of Docker Compose")))
                .displayOrder(7)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_docker_compose);

        Quiz docker_docker_compose_quiz = Quiz.builder()
                .topicId(docker_docker_compose.getId())
                .technologyId(docker.getId())
                .title("Docker Compose Quiz")
                .questions(List.of(new Question("Why is Docker Compose important in Docker?", List.of("It provides security", "It is required for orchestration", "It improves configuration management", "All of the above"), 3, "Docker Compose plays a critical role in all these areas.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_docker_compose_quiz);

        Topic docker_multi_stage_builds = Topic.builder()
                .technologyId(docker.getId())
                .slug("multi-stage-builds")
                .title("Multi-Stage Builds")
                .overview("This section focuses on Multi-Stage Builds in Docker. Multi-Stage Builds is a fundamental concept for containerizing applications efficiently and securely.\n\nUnderstanding Multi-Stage Builds allows you to better structure your container deployments, optimize resource usage, and follow industry standards.\n\nProperly configuring Multi-Stage Builds ensures that your Docker environments are reproducible, scalable, and easy to maintain across different stages of development and production.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Multi-Stage Builds Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Multi-Stage Builds", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the main purpose of Multi-Stage Builds?", "To manage and configure aspects of Multi-Stage Builds in a Docker environment."), new InterviewQuestion("How do you implement Multi-Stage Builds?", "By utilizing specific Docker commands and configuration files relevant to this feature.")))
                .flashCards(List.of(new FlashCard("Multi-Stage Builds Concept", "The core idea behind Multi-Stage Builds"), new FlashCard("Multi-Stage Builds Usage", "Practical application of Multi-Stage Builds")))
                .displayOrder(8)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_multi_stage_builds);

        Quiz docker_multi_stage_builds_quiz = Quiz.builder()
                .topicId(docker_multi_stage_builds.getId())
                .technologyId(docker.getId())
                .title("Multi-Stage Builds Quiz")
                .questions(List.of(new Question("Why is Multi-Stage Builds important in Docker?", List.of("It provides security", "It is required for orchestration", "It improves configuration management", "All of the above"), 3, "Multi-Stage Builds plays a critical role in all these areas.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_multi_stage_builds_quiz);

        Topic docker_registry = Topic.builder()
                .technologyId(docker.getId())
                .slug("registry")
                .title("Registry")
                .overview("This section focuses on Registry in Docker. Registry is a fundamental concept for containerizing applications efficiently and securely.\n\nUnderstanding Registry allows you to better structure your container deployments, optimize resource usage, and follow industry standards.\n\nProperly configuring Registry ensures that your Docker environments are reproducible, scalable, and easy to maintain across different stages of development and production.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Registry Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Registry", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the main purpose of Registry?", "To manage and configure aspects of Registry in a Docker environment."), new InterviewQuestion("How do you implement Registry?", "By utilizing specific Docker commands and configuration files relevant to this feature.")))
                .flashCards(List.of(new FlashCard("Registry Concept", "The core idea behind Registry"), new FlashCard("Registry Usage", "Practical application of Registry")))
                .displayOrder(9)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_registry);

        Quiz docker_registry_quiz = Quiz.builder()
                .topicId(docker_registry.getId())
                .technologyId(docker.getId())
                .title("Registry Quiz")
                .questions(List.of(new Question("Why is Registry important in Docker?", List.of("It provides security", "It is required for orchestration", "It improves configuration management", "All of the above"), 3, "Registry plays a critical role in all these areas.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_registry_quiz);

        Topic docker_best_practices = Topic.builder()
                .technologyId(docker.getId())
                .slug("best-practices")
                .title("Best Practices")
                .overview("This section focuses on Best Practices in Docker. Best Practices is a fundamental concept for containerizing applications efficiently and securely.\n\nUnderstanding Best Practices allows you to better structure your container deployments, optimize resource usage, and follow industry standards.\n\nProperly configuring Best Practices ensures that your Docker environments are reproducible, scalable, and easy to maintain across different stages of development and production.")
                .officialDocUrl("https://docs.docker.com/")
                .videoLinks(List.of(
                        new VideoLink("Best Practices Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Best Practices", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the main purpose of Best Practices?", "To manage and configure aspects of Best Practices in a Docker environment."), new InterviewQuestion("How do you implement Best Practices?", "By utilizing specific Docker commands and configuration files relevant to this feature.")))
                .flashCards(List.of(new FlashCard("Best Practices Concept", "The core idea behind Best Practices"), new FlashCard("Best Practices Usage", "Practical application of Best Practices")))
                .displayOrder(10)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(docker_best_practices);

        Quiz docker_best_practices_quiz = Quiz.builder()
                .topicId(docker_best_practices.getId())
                .technologyId(docker.getId())
                .title("Best Practices Quiz")
                .questions(List.of(new Question("Why is Best Practices important in Docker?", List.of("It provides security", "It is required for orchestration", "It improves configuration management", "All of the above"), 3, "Best Practices plays a critical role in all these areas.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(docker_best_practices_quiz);

        Technology kubernetes = createTech("kubernetes", "Kubernetes", "Container orchestration", "k8s-icon", "#326CE5", "https://kubernetes.io/docs/", 12, 3);

        Topic kubernetes_architecture = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("architecture")
                .title("Architecture")
                .overview("A Kubernetes cluster consists of a set of worker machines, called nodes, that run containerized applications. Every cluster has at least one worker node. The worker node(s) host the Pods that are the components of the application workload.\n\nThe Control Plane manages the worker nodes and the Pods in the cluster. It consists of the kube-apiserver (API frontend), etcd (key-value store for state), kube-scheduler (assigns pods to nodes), and kube-controller-manager.\n\nWorker nodes consist of the kubelet (node agent), kube-proxy (network proxy), and the container runtime (e.g., containerd).")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("Architecture Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Architecture", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the role of etcd in Kubernetes?", "etcd is a distributed, reliable key-value store used to hold all the cluster data and state."), new InterviewQuestion("What does the kubelet do?", "The kubelet is an agent that runs on each node in the cluster and makes sure that containers are running in a Pod.")))
                .flashCards(List.of(new FlashCard("kube-apiserver", "Component on the control plane that exposes the Kubernetes API."), new FlashCard("kube-proxy", "Network proxy that runs on each node, maintaining network rules on nodes.")))
                .displayOrder(1)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_architecture);

        Quiz kubernetes_architecture_quiz = Quiz.builder()
                .topicId(kubernetes_architecture.getId())
                .technologyId(kubernetes.getId())
                .title("Architecture Quiz")
                .questions(List.of(new Question("Which Kubernetes component acts as the primary data store for the cluster state?", List.of("kube-scheduler", "etcd", "kube-apiserver", "kubelet"), 1, "etcd stores the entire configuration and state of the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_architecture_quiz);

        Topic kubernetes_pods = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("pods")
                .title("Pods")
                .overview("In Kubernetes, Pods represent a critical abstraction for managing containerized workloads. Understanding Pods is essential for deploying robust applications.\n\nWhen working with Pods, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of Pods allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("Pods Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Pods", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do Pods improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with Pods."), new InterviewQuestion("What is the typical way to create Pods?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("Pods Definition", "A Kubernetes object representing Pods"), new FlashCard("kubectl get pods", "Command to list all Pods in the current namespace")))
                .displayOrder(2)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_pods);

        Quiz kubernetes_pods_quiz = Quiz.builder()
                .topicId(kubernetes_pods.getId())
                .technologyId(kubernetes.getId())
                .title("Pods Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of Pods?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "Pods is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_pods_quiz);

        Topic kubernetes_replicasets = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("replicasets")
                .title("ReplicaSets")
                .overview("In Kubernetes, ReplicaSets represent a critical abstraction for managing containerized workloads. Understanding ReplicaSets is essential for deploying robust applications.\n\nWhen working with ReplicaSets, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of ReplicaSets allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("ReplicaSets Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering ReplicaSets", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do ReplicaSets improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with ReplicaSets."), new InterviewQuestion("What is the typical way to create ReplicaSets?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("ReplicaSets Definition", "A Kubernetes object representing ReplicaSets"), new FlashCard("kubectl get replicasets", "Command to list all ReplicaSets in the current namespace")))
                .displayOrder(3)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_replicasets);

        Quiz kubernetes_replicasets_quiz = Quiz.builder()
                .topicId(kubernetes_replicasets.getId())
                .technologyId(kubernetes.getId())
                .title("ReplicaSets Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of ReplicaSets?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "ReplicaSets is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_replicasets_quiz);

        Topic kubernetes_deployments = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("deployments")
                .title("Deployments")
                .overview("In Kubernetes, Deployments represent a critical abstraction for managing containerized workloads. Understanding Deployments is essential for deploying robust applications.\n\nWhen working with Deployments, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of Deployments allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("Deployments Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Deployments", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do Deployments improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with Deployments."), new InterviewQuestion("What is the typical way to create Deployments?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("Deployments Definition", "A Kubernetes object representing Deployments"), new FlashCard("kubectl get deployments", "Command to list all Deployments in the current namespace")))
                .displayOrder(4)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_deployments);

        Quiz kubernetes_deployments_quiz = Quiz.builder()
                .topicId(kubernetes_deployments.getId())
                .technologyId(kubernetes.getId())
                .title("Deployments Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of Deployments?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "Deployments is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_deployments_quiz);

        Topic kubernetes_services = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("services")
                .title("Services")
                .overview("In Kubernetes, Services represent a critical abstraction for managing containerized workloads. Understanding Services is essential for deploying robust applications.\n\nWhen working with Services, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of Services allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("Services Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Services", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do Services improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with Services."), new InterviewQuestion("What is the typical way to create Services?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("Services Definition", "A Kubernetes object representing Services"), new FlashCard("kubectl get services", "Command to list all Services in the current namespace")))
                .displayOrder(5)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_services);

        Quiz kubernetes_services_quiz = Quiz.builder()
                .topicId(kubernetes_services.getId())
                .technologyId(kubernetes.getId())
                .title("Services Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of Services?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "Services is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_services_quiz);

        Topic kubernetes_ingress = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("ingress")
                .title("Ingress")
                .overview("In Kubernetes, Ingress represent a critical abstraction for managing containerized workloads. Understanding Ingress is essential for deploying robust applications.\n\nWhen working with Ingress, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of Ingress allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("Ingress Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Ingress", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do Ingress improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with Ingress."), new InterviewQuestion("What is the typical way to create Ingress?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("Ingress Definition", "A Kubernetes object representing Ingress"), new FlashCard("kubectl get ingress", "Command to list all Ingress in the current namespace")))
                .displayOrder(6)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_ingress);

        Quiz kubernetes_ingress_quiz = Quiz.builder()
                .topicId(kubernetes_ingress.getId())
                .technologyId(kubernetes.getId())
                .title("Ingress Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of Ingress?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "Ingress is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_ingress_quiz);

        Topic kubernetes_configmaps = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("configmaps")
                .title("ConfigMaps")
                .overview("In Kubernetes, ConfigMaps represent a critical abstraction for managing containerized workloads. Understanding ConfigMaps is essential for deploying robust applications.\n\nWhen working with ConfigMaps, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of ConfigMaps allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("ConfigMaps Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering ConfigMaps", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do ConfigMaps improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with ConfigMaps."), new InterviewQuestion("What is the typical way to create ConfigMaps?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("ConfigMaps Definition", "A Kubernetes object representing ConfigMaps"), new FlashCard("kubectl get configmaps", "Command to list all ConfigMaps in the current namespace")))
                .displayOrder(7)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_configmaps);

        Quiz kubernetes_configmaps_quiz = Quiz.builder()
                .topicId(kubernetes_configmaps.getId())
                .technologyId(kubernetes.getId())
                .title("ConfigMaps Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of ConfigMaps?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "ConfigMaps is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_configmaps_quiz);

        Topic kubernetes_secrets = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("secrets")
                .title("Secrets")
                .overview("In Kubernetes, Secrets represent a critical abstraction for managing containerized workloads. Understanding Secrets is essential for deploying robust applications.\n\nWhen working with Secrets, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of Secrets allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("Secrets Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Secrets", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do Secrets improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with Secrets."), new InterviewQuestion("What is the typical way to create Secrets?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("Secrets Definition", "A Kubernetes object representing Secrets"), new FlashCard("kubectl get secrets", "Command to list all Secrets in the current namespace")))
                .displayOrder(8)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_secrets);

        Quiz kubernetes_secrets_quiz = Quiz.builder()
                .topicId(kubernetes_secrets.getId())
                .technologyId(kubernetes.getId())
                .title("Secrets Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of Secrets?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "Secrets is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_secrets_quiz);

        Topic kubernetes_namespaces = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("namespaces")
                .title("Namespaces")
                .overview("In Kubernetes, Namespaces represent a critical abstraction for managing containerized workloads. Understanding Namespaces is essential for deploying robust applications.\n\nWhen working with Namespaces, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of Namespaces allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("Namespaces Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Namespaces", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do Namespaces improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with Namespaces."), new InterviewQuestion("What is the typical way to create Namespaces?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("Namespaces Definition", "A Kubernetes object representing Namespaces"), new FlashCard("kubectl get namespaces", "Command to list all Namespaces in the current namespace")))
                .displayOrder(9)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_namespaces);

        Quiz kubernetes_namespaces_quiz = Quiz.builder()
                .topicId(kubernetes_namespaces.getId())
                .technologyId(kubernetes.getId())
                .title("Namespaces Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of Namespaces?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "Namespaces is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_namespaces_quiz);

        Topic kubernetes_pv_and_pvc = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("pv-and-pvc")
                .title("PV & PVC")
                .overview("In Kubernetes, PV & PVC represent a critical abstraction for managing containerized workloads. Understanding PV & PVC is essential for deploying robust applications.\n\nWhen working with PV & PVC, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of PV & PVC allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("PV & PVC Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering PV & PVC", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do PV & PVC improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with PV & PVC."), new InterviewQuestion("What is the typical way to create PV & PVC?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("PV & PVC Definition", "A Kubernetes object representing PV & PVC"), new FlashCard("kubectl get pv&pvc", "Command to list all PV & PVC in the current namespace")))
                .displayOrder(10)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_pv_and_pvc);

        Quiz kubernetes_pv_and_pvc_quiz = Quiz.builder()
                .topicId(kubernetes_pv_and_pvc.getId())
                .technologyId(kubernetes.getId())
                .title("PV & PVC Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of PV & PVC?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "PV & PVC is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_pv_and_pvc_quiz);

        Topic kubernetes_statefulsets = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("statefulsets")
                .title("StatefulSets")
                .overview("In Kubernetes, StatefulSets represent a critical abstraction for managing containerized workloads. Understanding StatefulSets is essential for deploying robust applications.\n\nWhen working with StatefulSets, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of StatefulSets allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("StatefulSets Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering StatefulSets", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do StatefulSets improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with StatefulSets."), new InterviewQuestion("What is the typical way to create StatefulSets?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("StatefulSets Definition", "A Kubernetes object representing StatefulSets"), new FlashCard("kubectl get statefulsets", "Command to list all StatefulSets in the current namespace")))
                .displayOrder(11)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_statefulsets);

        Quiz kubernetes_statefulsets_quiz = Quiz.builder()
                .topicId(kubernetes_statefulsets.getId())
                .technologyId(kubernetes.getId())
                .title("StatefulSets Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of StatefulSets?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "StatefulSets is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_statefulsets_quiz);

        Topic kubernetes_daemonsets = Topic.builder()
                .technologyId(kubernetes.getId())
                .slug("daemonsets")
                .title("DaemonSets")
                .overview("In Kubernetes, DaemonSets represent a critical abstraction for managing containerized workloads. Understanding DaemonSets is essential for deploying robust applications.\n\nWhen working with DaemonSets, administrators define the desired state using YAML manifests, and the Kubernetes control plane continuously works to maintain that state.\n\nEffective use of DaemonSets allows for highly available, fault-tolerant, and scalable microservices architectures.")
                .officialDocUrl("https://kubernetes.io/docs/")
                .videoLinks(List.of(
                        new VideoLink("DaemonSets Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering DaemonSets", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How do DaemonSets improve application reliability?", "By allowing Kubernetes to automatically manage the lifecycle and scaling of the workload associated with DaemonSets."), new InterviewQuestion("What is the typical way to create DaemonSets?", "Using the 'kubectl apply -f' command with a YAML configuration file.")))
                .flashCards(List.of(new FlashCard("DaemonSets Definition", "A Kubernetes object representing DaemonSets"), new FlashCard("kubectl get daemonsets", "Command to list all DaemonSets in the current namespace")))
                .displayOrder(12)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(kubernetes_daemonsets);

        Quiz kubernetes_daemonsets_quiz = Quiz.builder()
                .topicId(kubernetes_daemonsets.getId())
                .technologyId(kubernetes.getId())
                .title("DaemonSets Quiz")
                .questions(List.of(new Question("Which of the following is a primary function of DaemonSets?", List.of("Handling network traffic", "Storing configuration data", "Managing workload lifecycle", "Providing storage"), 2, "DaemonSets is generally related to managing how workloads run in the cluster.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(kubernetes_daemonsets_quiz);

        Technology linux = createTech("linux", "Linux", "Operating system basics", "linux-icon", "#FCC624", "https://www.kernel.org/doc/html/latest/", 8, 4);

        Topic linux_commands = Topic.builder()
                .technologyId(linux.getId())
                .slug("commands")
                .title("Commands")
                .overview("The Linux command line is a text interface to your computer. Also known as the shell, it allows you to execute commands, run programs, and manipulate files.\n\nFundamental commands include: ls (list directory), cd (change directory), pwd (print working directory), cp (copy), mv (move), rm (remove), mkdir (make directory), cat (concatenate and print), grep (search for patterns), find (search files).\n\nSystem management commands include: chmod (change permissions), chown (change owner), ps (process status), top (task manager), df (disk space), du (disk usage).")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("Commands Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Commands", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What does the 'grep' command do?", "grep searches for a specific pattern of text in a file or standard input and prints the matching lines."), new InterviewQuestion("How do you find the disk usage of a specific directory?", "By using the 'du' command, often with flags like -sh for a human-readable summary.")))
                .flashCards(List.of(new FlashCard("pwd", "Print Working Directory - shows the current directory you are in"), new FlashCard("chmod", "Change Mode - used to change the access permissions of files or directories")))
                .displayOrder(1)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_commands);

        Quiz linux_commands_quiz = Quiz.builder()
                .topicId(linux_commands.getId())
                .technologyId(linux.getId())
                .title("Commands Quiz")
                .questions(List.of(new Question("Which command would you use to change the owner of a file?", List.of("chown", "chmod", "chgrp", "useradd"), 0, "chown stands for 'change owner'.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_commands_quiz);

        Topic linux_permissions = Topic.builder()
                .technologyId(linux.getId())
                .slug("permissions")
                .title("Permissions")
                .overview("Mastering Permissions is a fundamental skill for any Linux system administrator or DevOps engineer. It forms the backbone of system configuration and maintenance.\n\nLinux heavily relies on concepts like Permissions to secure the system, manage resources, and automate routine tasks effectively.\n\nBy understanding the intricacies of Permissions, you can ensure your Linux servers operate efficiently, securely, and reliably in production environments.")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("Permissions Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Permissions", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What role does Permissions play in system security?", "It ensures that only authorized processes or users can access specific system resources."), new InterviewQuestion("How can you monitor Permissions?", "Using standard command-line utilities and analyzing system logs.")))
                .flashCards(List.of(new FlashCard("Permissions Basics", "Fundamental concepts regarding Permissions"), new FlashCard("Permissions Tools", "Common CLI utilities used to manage Permissions")))
                .displayOrder(2)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_permissions);

        Quiz linux_permissions_quiz = Quiz.builder()
                .topicId(linux_permissions.getId())
                .technologyId(linux.getId())
                .title("Permissions Quiz")
                .questions(List.of(new Question("Why is Permissions considered essential for system administration?", List.of("It manages hardware drivers", "It provides the graphical interface", "It controls core system operations and security", "It compiles the kernel"), 2, "Permissions directly impacts how the system operates and protects data.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_permissions_quiz);

        Topic linux_processes = Topic.builder()
                .technologyId(linux.getId())
                .slug("processes")
                .title("Processes")
                .overview("Mastering Processes is a fundamental skill for any Linux system administrator or DevOps engineer. It forms the backbone of system configuration and maintenance.\n\nLinux heavily relies on concepts like Processes to secure the system, manage resources, and automate routine tasks effectively.\n\nBy understanding the intricacies of Processes, you can ensure your Linux servers operate efficiently, securely, and reliably in production environments.")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("Processes Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Processes", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What role does Processes play in system security?", "It ensures that only authorized processes or users can access specific system resources."), new InterviewQuestion("How can you monitor Processes?", "Using standard command-line utilities and analyzing system logs.")))
                .flashCards(List.of(new FlashCard("Processes Basics", "Fundamental concepts regarding Processes"), new FlashCard("Processes Tools", "Common CLI utilities used to manage Processes")))
                .displayOrder(3)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_processes);

        Quiz linux_processes_quiz = Quiz.builder()
                .topicId(linux_processes.getId())
                .technologyId(linux.getId())
                .title("Processes Quiz")
                .questions(List.of(new Question("Why is Processes considered essential for system administration?", List.of("It manages hardware drivers", "It provides the graphical interface", "It controls core system operations and security", "It compiles the kernel"), 2, "Processes directly impacts how the system operates and protects data.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_processes_quiz);

        Topic linux_systemd = Topic.builder()
                .technologyId(linux.getId())
                .slug("systemd")
                .title("Systemd")
                .overview("Mastering Systemd is a fundamental skill for any Linux system administrator or DevOps engineer. It forms the backbone of system configuration and maintenance.\n\nLinux heavily relies on concepts like Systemd to secure the system, manage resources, and automate routine tasks effectively.\n\nBy understanding the intricacies of Systemd, you can ensure your Linux servers operate efficiently, securely, and reliably in production environments.")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("Systemd Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Systemd", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What role does Systemd play in system security?", "It ensures that only authorized processes or users can access specific system resources."), new InterviewQuestion("How can you monitor Systemd?", "Using standard command-line utilities and analyzing system logs.")))
                .flashCards(List.of(new FlashCard("Systemd Basics", "Fundamental concepts regarding Systemd"), new FlashCard("Systemd Tools", "Common CLI utilities used to manage Systemd")))
                .displayOrder(4)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_systemd);

        Quiz linux_systemd_quiz = Quiz.builder()
                .topicId(linux_systemd.getId())
                .technologyId(linux.getId())
                .title("Systemd Quiz")
                .questions(List.of(new Question("Why is Systemd considered essential for system administration?", List.of("It manages hardware drivers", "It provides the graphical interface", "It controls core system operations and security", "It compiles the kernel"), 2, "Systemd directly impacts how the system operates and protects data.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_systemd_quiz);

        Topic linux_networking = Topic.builder()
                .technologyId(linux.getId())
                .slug("networking")
                .title("Networking")
                .overview("Mastering Networking is a fundamental skill for any Linux system administrator or DevOps engineer. It forms the backbone of system configuration and maintenance.\n\nLinux heavily relies on concepts like Networking to secure the system, manage resources, and automate routine tasks effectively.\n\nBy understanding the intricacies of Networking, you can ensure your Linux servers operate efficiently, securely, and reliably in production environments.")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("Networking Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Networking", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What role does Networking play in system security?", "It ensures that only authorized processes or users can access specific system resources."), new InterviewQuestion("How can you monitor Networking?", "Using standard command-line utilities and analyzing system logs.")))
                .flashCards(List.of(new FlashCard("Networking Basics", "Fundamental concepts regarding Networking"), new FlashCard("Networking Tools", "Common CLI utilities used to manage Networking")))
                .displayOrder(5)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_networking);

        Quiz linux_networking_quiz = Quiz.builder()
                .topicId(linux_networking.getId())
                .technologyId(linux.getId())
                .title("Networking Quiz")
                .questions(List.of(new Question("Why is Networking considered essential for system administration?", List.of("It manages hardware drivers", "It provides the graphical interface", "It controls core system operations and security", "It compiles the kernel"), 2, "Networking directly impacts how the system operates and protects data.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_networking_quiz);

        Topic linux_package_managers = Topic.builder()
                .technologyId(linux.getId())
                .slug("package-managers")
                .title("Package Managers")
                .overview("Mastering Package Managers is a fundamental skill for any Linux system administrator or DevOps engineer. It forms the backbone of system configuration and maintenance.\n\nLinux heavily relies on concepts like Package Managers to secure the system, manage resources, and automate routine tasks effectively.\n\nBy understanding the intricacies of Package Managers, you can ensure your Linux servers operate efficiently, securely, and reliably in production environments.")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("Package Managers Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Package Managers", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What role does Package Managers play in system security?", "It ensures that only authorized processes or users can access specific system resources."), new InterviewQuestion("How can you monitor Package Managers?", "Using standard command-line utilities and analyzing system logs.")))
                .flashCards(List.of(new FlashCard("Package Managers Basics", "Fundamental concepts regarding Package Managers"), new FlashCard("Package Managers Tools", "Common CLI utilities used to manage Package Managers")))
                .displayOrder(6)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_package_managers);

        Quiz linux_package_managers_quiz = Quiz.builder()
                .topicId(linux_package_managers.getId())
                .technologyId(linux.getId())
                .title("Package Managers Quiz")
                .questions(List.of(new Question("Why is Package Managers considered essential for system administration?", List.of("It manages hardware drivers", "It provides the graphical interface", "It controls core system operations and security", "It compiles the kernel"), 2, "Package Managers directly impacts how the system operates and protects data.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_package_managers_quiz);

        Topic linux_ssh = Topic.builder()
                .technologyId(linux.getId())
                .slug("ssh")
                .title("SSH")
                .overview("Mastering SSH is a fundamental skill for any Linux system administrator or DevOps engineer. It forms the backbone of system configuration and maintenance.\n\nLinux heavily relies on concepts like SSH to secure the system, manage resources, and automate routine tasks effectively.\n\nBy understanding the intricacies of SSH, you can ensure your Linux servers operate efficiently, securely, and reliably in production environments.")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("SSH Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering SSH", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What role does SSH play in system security?", "It ensures that only authorized processes or users can access specific system resources."), new InterviewQuestion("How can you monitor SSH?", "Using standard command-line utilities and analyzing system logs.")))
                .flashCards(List.of(new FlashCard("SSH Basics", "Fundamental concepts regarding SSH"), new FlashCard("SSH Tools", "Common CLI utilities used to manage SSH")))
                .displayOrder(7)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_ssh);

        Quiz linux_ssh_quiz = Quiz.builder()
                .topicId(linux_ssh.getId())
                .technologyId(linux.getId())
                .title("SSH Quiz")
                .questions(List.of(new Question("Why is SSH considered essential for system administration?", List.of("It manages hardware drivers", "It provides the graphical interface", "It controls core system operations and security", "It compiles the kernel"), 2, "SSH directly impacts how the system operates and protects data.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_ssh_quiz);

        Topic linux_cron = Topic.builder()
                .technologyId(linux.getId())
                .slug("cron")
                .title("Cron")
                .overview("Mastering Cron is a fundamental skill for any Linux system administrator or DevOps engineer. It forms the backbone of system configuration and maintenance.\n\nLinux heavily relies on concepts like Cron to secure the system, manage resources, and automate routine tasks effectively.\n\nBy understanding the intricacies of Cron, you can ensure your Linux servers operate efficiently, securely, and reliably in production environments.")
                .officialDocUrl("https://linux.die.net/")
                .videoLinks(List.of(
                        new VideoLink("Cron Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Cron", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What role does Cron play in system security?", "It ensures that only authorized processes or users can access specific system resources."), new InterviewQuestion("How can you monitor Cron?", "Using standard command-line utilities and analyzing system logs.")))
                .flashCards(List.of(new FlashCard("Cron Basics", "Fundamental concepts regarding Cron"), new FlashCard("Cron Tools", "Common CLI utilities used to manage Cron")))
                .displayOrder(8)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(linux_cron);

        Quiz linux_cron_quiz = Quiz.builder()
                .topicId(linux_cron.getId())
                .technologyId(linux.getId())
                .title("Cron Quiz")
                .questions(List.of(new Question("Why is Cron considered essential for system administration?", List.of("It manages hardware drivers", "It provides the graphical interface", "It controls core system operations and security", "It compiles the kernel"), 2, "Cron directly impacts how the system operates and protects data.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(linux_cron_quiz);

        Technology git = createTech("git", "Git", "Version control system", "git-icon", "#F05032", "https://git-scm.com/doc", 12, 5);

        Topic git_clone_commit_push = Topic.builder()
                .technologyId(git.getId())
                .slug("clone-commit-push")
                .title("Clone Commit Push")
                .overview("Git is a distributed version control system. The most common workflow involves copying a repository, making changes, and sending them back to a remote server.\n\nKey operations include Clone (`git clone`), which creates a local copy of a remote repository. Commit (`git commit`) captures a snapshot of the project's currently staged changes.\n\nFinally, Push (`git push`) uploads your local repository content (the committed snapshots) to a remote repository, allowing others to see your work.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Clone Commit Push Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Clone Commit Push", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is the difference between git fetch and git pull?", "git fetch downloads new data from a remote repository but doesn't integrate it into your working files. git pull fetches the data and immediately merges it into your current branch."), new InterviewQuestion("How do you undo a git commit without losing the changes?", "You can use 'git reset --soft HEAD~1' to undo the last commit while keeping the changes staged.")))
                .flashCards(List.of(new FlashCard("git clone", "Creates a local copy of a remote repository"), new FlashCard("git commit", "Records changes to the repository with a descriptive message")))
                .displayOrder(1)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_clone_commit_push);

        Quiz git_clone_commit_push_quiz = Quiz.builder()
                .topicId(git_clone_commit_push.getId())
                .technologyId(git.getId())
                .title("Clone Commit Push Quiz")
                .questions(List.of(new Question("Which command sends your local commits to the remote repository?", List.of("git commit", "git push", "git pull", "git send"), 1, "git push pushes your commits to the remote.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_clone_commit_push_quiz);

        Topic git_pull = Topic.builder()
                .technologyId(git.getId())
                .slug("pull")
                .title("Pull")
                .overview("The Pull feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Pull properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Pull is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Pull Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Pull", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Pull?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Pull?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git pull", "The primary command to execute a Pull operation"), new FlashCard("Pull Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(2)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_pull);

        Quiz git_pull_quiz = Quiz.builder()
                .topicId(git_pull.getId())
                .technologyId(git.getId())
                .title("Pull Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Pull?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_pull_quiz);

        Topic git_branch = Topic.builder()
                .technologyId(git.getId())
                .slug("branch")
                .title("Branch")
                .overview("The Branch feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Branch properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Branch is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Branch Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Branch", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Branch?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Branch?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git branch", "The primary command to execute a Branch operation"), new FlashCard("Branch Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(3)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_branch);

        Quiz git_branch_quiz = Quiz.builder()
                .topicId(git_branch.getId())
                .technologyId(git.getId())
                .title("Branch Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Branch?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_branch_quiz);

        Topic git_merge = Topic.builder()
                .technologyId(git.getId())
                .slug("merge")
                .title("Merge")
                .overview("The Merge feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Merge properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Merge is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Merge Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Merge", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Merge?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Merge?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git merge", "The primary command to execute a Merge operation"), new FlashCard("Merge Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(4)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_merge);

        Quiz git_merge_quiz = Quiz.builder()
                .topicId(git_merge.getId())
                .technologyId(git.getId())
                .title("Merge Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Merge?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_merge_quiz);

        Topic git_rebase = Topic.builder()
                .technologyId(git.getId())
                .slug("rebase")
                .title("Rebase")
                .overview("The Rebase feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Rebase properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Rebase is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Rebase Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Rebase", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Rebase?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Rebase?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git rebase", "The primary command to execute a Rebase operation"), new FlashCard("Rebase Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(5)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_rebase);

        Quiz git_rebase_quiz = Quiz.builder()
                .topicId(git_rebase.getId())
                .technologyId(git.getId())
                .title("Rebase Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Rebase?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_rebase_quiz);

        Topic git_cherry_pick = Topic.builder()
                .technologyId(git.getId())
                .slug("cherry-pick")
                .title("Cherry Pick")
                .overview("The Cherry Pick feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Cherry Pick properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Cherry Pick is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Cherry Pick Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Cherry Pick", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Cherry Pick?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Cherry Pick?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git cherry", "The primary command to execute a Cherry Pick operation"), new FlashCard("Cherry Pick Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(6)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_cherry_pick);

        Quiz git_cherry_pick_quiz = Quiz.builder()
                .topicId(git_cherry_pick.getId())
                .technologyId(git.getId())
                .title("Cherry Pick Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Cherry Pick?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_cherry_pick_quiz);

        Topic git_reset = Topic.builder()
                .technologyId(git.getId())
                .slug("reset")
                .title("Reset")
                .overview("The Reset feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Reset properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Reset is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Reset Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Reset", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Reset?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Reset?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git reset", "The primary command to execute a Reset operation"), new FlashCard("Reset Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(7)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_reset);

        Quiz git_reset_quiz = Quiz.builder()
                .topicId(git_reset.getId())
                .technologyId(git.getId())
                .title("Reset Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Reset?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_reset_quiz);

        Topic git_revert = Topic.builder()
                .technologyId(git.getId())
                .slug("revert")
                .title("Revert")
                .overview("The Revert feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Revert properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Revert is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Revert Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Revert", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Revert?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Revert?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git revert", "The primary command to execute a Revert operation"), new FlashCard("Revert Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(8)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_revert);

        Quiz git_revert_quiz = Quiz.builder()
                .topicId(git_revert.getId())
                .technologyId(git.getId())
                .title("Revert Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Revert?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_revert_quiz);

        Topic git_tags = Topic.builder()
                .technologyId(git.getId())
                .slug("tags")
                .title("Tags")
                .overview("The Tags feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing Tags properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of Tags is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("Tags Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Tags", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use Tags?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using Tags?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git tags", "The primary command to execute a Tags operation"), new FlashCard("Tags Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(9)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_tags);

        Quiz git_tags_quiz = Quiz.builder()
                .topicId(git_tags.getId())
                .technologyId(git.getId())
                .title("Tags Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding Tags?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_tags_quiz);

        Topic git_github_flow = Topic.builder()
                .technologyId(git.getId())
                .slug("github-flow")
                .title("GitHub Flow")
                .overview("The GitHub Flow feature in Git provides powerful version control capabilities that enable teams to collaborate efficiently on complex codebases.\n\nUsing GitHub Flow properly allows developers to manage concurrent changes, experiment with new features safely, and maintain a clean project history.\n\nUnderstanding the nuances of GitHub Flow is what separates beginner Git users from advanced practitioners who can resolve conflicts and maintain a pristine repository state.")
                .officialDocUrl("https://git-scm.com/docs")
                .videoLinks(List.of(
                        new VideoLink("GitHub Flow Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering GitHub Flow", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("When should you use GitHub Flow?", "When you need to manipulate the commit history or integrate changes effectively."), new InterviewQuestion("What are the risks of using GitHub Flow?", "If used incorrectly on shared branches, it can cause confusion and conflicts for other team members.")))
                .flashCards(List.of(new FlashCard("git github", "The primary command to execute a GitHub Flow operation"), new FlashCard("GitHub Flow Conflict", "A state that occurs when changes cannot be automatically integrated")))
                .displayOrder(10)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(git_github_flow);

        Quiz git_github_flow_quiz = Quiz.builder()
                .topicId(git_github_flow.getId())
                .technologyId(git.getId())
                .title("GitHub Flow Quiz")
                .questions(List.of(new Question("Which of the following is a best practice regarding GitHub Flow?", List.of("Use it on the main branch constantly", "Understand its impact on shared commit history before executing", "Never use it", "Only use it for hotfixes"), 1, "Manipulating commit history requires careful consideration in collaborative environments.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(git_github_flow_quiz);

        Technology terraform = createTech("terraform", "Terraform", "Infrastructure as code", "terraform-icon", "#7B42BC", "https://developer.hashicorp.com/terraform/docs", 8, 6);

        Topic terraform_providers = Topic.builder()
                .technologyId(terraform.getId())
                .slug("providers")
                .title("Providers")
                .overview("Terraform relies on plugins called providers to interact with cloud providers, SaaS providers, and other APIs. Terraform configurations must declare which providers they require so that Terraform can install and use them.\n\nProviders are responsible for understanding API interactions and exposing resources. For example, the AWS provider allows Terraform to manage AWS resources like EC2 instances and S3 buckets.\n\nEach provider adds a set of resource types and/or data sources that Terraform can manage. You configure providers with authentication details.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("Providers Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Providers", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("What is a Terraform Provider?", "A plugin that allows Terraform to interact with APIs of cloud providers, SaaS platforms, or other services."), new InterviewQuestion("Where does Terraform download providers from?", "By default, Terraform downloads providers from the public Terraform Registry.")))
                .flashCards(List.of(new FlashCard("Provider Block", "Configures the specified provider, in this case providing authentication details"), new FlashCard("terraform init", "Command that initializes a working directory containing Terraform configuration files, including downloading providers")))
                .displayOrder(1)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_providers);

        Quiz terraform_providers_quiz = Quiz.builder()
                .topicId(terraform_providers.getId())
                .technologyId(terraform.getId())
                .title("Providers Quiz")
                .questions(List.of(new Question("Which command must be run to download the necessary providers before applying a Terraform configuration?", List.of("terraform apply", "terraform plan", "terraform init", "terraform get"), 2, "terraform init downloads and installs the required provider plugins.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_providers_quiz);

        Topic terraform_resources = Topic.builder()
                .technologyId(terraform.getId())
                .slug("resources")
                .title("Resources")
                .overview("In Terraform, Resources is a fundamental concept that enables Infrastructure as Code (IaC) principles. It allows you to define, provision, and manage infrastructure consistently.\n\nBy declaring Resources in your configuration files, Terraform knows exactly what state the infrastructure should be in and determines the necessary actions to achieve that state.\n\nProper management of Resources is crucial for collaborating on Terraform projects, ensuring security, and preventing configuration drift in production environments.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("Resources Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Resources", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How does Terraform use Resources?", "It uses Resources to map the configuration to real-world infrastructure objects and maintain their lifecycle."), new InterviewQuestion("What happens if Resources is misconfigured?", "It can lead to deployment failures, unintended resource deletion, or security vulnerabilities.")))
                .flashCards(List.of(new FlashCard("Resources Block", "The HCL syntax used to define Resources"), new FlashCard("Terraform Resources", "The logical representation of Resources in Terraform")))
                .displayOrder(2)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_resources);

        Quiz terraform_resources_quiz = Quiz.builder()
                .topicId(terraform_resources.getId())
                .technologyId(terraform.getId())
                .title("Resources Quiz")
                .questions(List.of(new Question("Which of the following describes the role of Resources in Terraform?", List.of("It defines the cloud provider credentials", "It represents the core components that are provisioned and managed", "It is only used for local testing", "It replaces the need for version control"), 1, "Resources is central to defining and managing the actual infrastructure.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_resources_quiz);

        Topic terraform_variables = Topic.builder()
                .technologyId(terraform.getId())
                .slug("variables")
                .title("Variables")
                .overview("In Terraform, Variables is a fundamental concept that enables Infrastructure as Code (IaC) principles. It allows you to define, provision, and manage infrastructure consistently.\n\nBy declaring Variables in your configuration files, Terraform knows exactly what state the infrastructure should be in and determines the necessary actions to achieve that state.\n\nProper management of Variables is crucial for collaborating on Terraform projects, ensuring security, and preventing configuration drift in production environments.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("Variables Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Variables", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How does Terraform use Variables?", "It uses Variables to map the configuration to real-world infrastructure objects and maintain their lifecycle."), new InterviewQuestion("What happens if Variables is misconfigured?", "It can lead to deployment failures, unintended resource deletion, or security vulnerabilities.")))
                .flashCards(List.of(new FlashCard("Variables Block", "The HCL syntax used to define Variables"), new FlashCard("Terraform Variables", "The logical representation of Variables in Terraform")))
                .displayOrder(3)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_variables);

        Quiz terraform_variables_quiz = Quiz.builder()
                .topicId(terraform_variables.getId())
                .technologyId(terraform.getId())
                .title("Variables Quiz")
                .questions(List.of(new Question("Which of the following describes the role of Variables in Terraform?", List.of("It defines the cloud provider credentials", "It represents the core components that are provisioned and managed", "It is only used for local testing", "It replaces the need for version control"), 1, "Variables is central to defining and managing the actual infrastructure.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_variables_quiz);

        Topic terraform_outputs = Topic.builder()
                .technologyId(terraform.getId())
                .slug("outputs")
                .title("Outputs")
                .overview("In Terraform, Outputs is a fundamental concept that enables Infrastructure as Code (IaC) principles. It allows you to define, provision, and manage infrastructure consistently.\n\nBy declaring Outputs in your configuration files, Terraform knows exactly what state the infrastructure should be in and determines the necessary actions to achieve that state.\n\nProper management of Outputs is crucial for collaborating on Terraform projects, ensuring security, and preventing configuration drift in production environments.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("Outputs Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Outputs", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How does Terraform use Outputs?", "It uses Outputs to map the configuration to real-world infrastructure objects and maintain their lifecycle."), new InterviewQuestion("What happens if Outputs is misconfigured?", "It can lead to deployment failures, unintended resource deletion, or security vulnerabilities.")))
                .flashCards(List.of(new FlashCard("Outputs Block", "The HCL syntax used to define Outputs"), new FlashCard("Terraform Outputs", "The logical representation of Outputs in Terraform")))
                .displayOrder(4)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_outputs);

        Quiz terraform_outputs_quiz = Quiz.builder()
                .topicId(terraform_outputs.getId())
                .technologyId(terraform.getId())
                .title("Outputs Quiz")
                .questions(List.of(new Question("Which of the following describes the role of Outputs in Terraform?", List.of("It defines the cloud provider credentials", "It represents the core components that are provisioned and managed", "It is only used for local testing", "It replaces the need for version control"), 1, "Outputs is central to defining and managing the actual infrastructure.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_outputs_quiz);

        Topic terraform_state = Topic.builder()
                .technologyId(terraform.getId())
                .slug("state")
                .title("State")
                .overview("In Terraform, State is a fundamental concept that enables Infrastructure as Code (IaC) principles. It allows you to define, provision, and manage infrastructure consistently.\n\nBy declaring State in your configuration files, Terraform knows exactly what state the infrastructure should be in and determines the necessary actions to achieve that state.\n\nProper management of State is crucial for collaborating on Terraform projects, ensuring security, and preventing configuration drift in production environments.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("State Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering State", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How does Terraform use State?", "It uses State to map the configuration to real-world infrastructure objects and maintain their lifecycle."), new InterviewQuestion("What happens if State is misconfigured?", "It can lead to deployment failures, unintended resource deletion, or security vulnerabilities.")))
                .flashCards(List.of(new FlashCard("State Block", "The HCL syntax used to define State"), new FlashCard("Terraform State", "The logical representation of State in Terraform")))
                .displayOrder(5)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_state);

        Quiz terraform_state_quiz = Quiz.builder()
                .topicId(terraform_state.getId())
                .technologyId(terraform.getId())
                .title("State Quiz")
                .questions(List.of(new Question("Which of the following describes the role of State in Terraform?", List.of("It defines the cloud provider credentials", "It represents the core components that are provisioned and managed", "It is only used for local testing", "It replaces the need for version control"), 1, "State is central to defining and managing the actual infrastructure.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_state_quiz);

        Topic terraform_init_plan_apply_destroy = Topic.builder()
                .technologyId(terraform.getId())
                .slug("init-plan-apply-destroy")
                .title("Init Plan Apply Destroy")
                .overview("In Terraform, Init Plan Apply Destroy is a fundamental concept that enables Infrastructure as Code (IaC) principles. It allows you to define, provision, and manage infrastructure consistently.\n\nBy declaring Init Plan Apply Destroy in your configuration files, Terraform knows exactly what state the infrastructure should be in and determines the necessary actions to achieve that state.\n\nProper management of Init Plan Apply Destroy is crucial for collaborating on Terraform projects, ensuring security, and preventing configuration drift in production environments.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("Init Plan Apply Destroy Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Init Plan Apply Destroy", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How does Terraform use Init Plan Apply Destroy?", "It uses Init Plan Apply Destroy to map the configuration to real-world infrastructure objects and maintain their lifecycle."), new InterviewQuestion("What happens if Init Plan Apply Destroy is misconfigured?", "It can lead to deployment failures, unintended resource deletion, or security vulnerabilities.")))
                .flashCards(List.of(new FlashCard("Init Plan Apply Destroy Block", "The HCL syntax used to define Init Plan Apply Destroy"), new FlashCard("Terraform Init Plan Apply Destroy", "The logical representation of Init Plan Apply Destroy in Terraform")))
                .displayOrder(6)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_init_plan_apply_destroy);

        Quiz terraform_init_plan_apply_destroy_quiz = Quiz.builder()
                .topicId(terraform_init_plan_apply_destroy.getId())
                .technologyId(terraform.getId())
                .title("Init Plan Apply Destroy Quiz")
                .questions(List.of(new Question("Which of the following describes the role of Init Plan Apply Destroy in Terraform?", List.of("It defines the cloud provider credentials", "It represents the core components that are provisioned and managed", "It is only used for local testing", "It replaces the need for version control"), 1, "Init Plan Apply Destroy is central to defining and managing the actual infrastructure.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_init_plan_apply_destroy_quiz);

        Topic terraform_modules = Topic.builder()
                .technologyId(terraform.getId())
                .slug("modules")
                .title("Modules")
                .overview("In Terraform, Modules is a fundamental concept that enables Infrastructure as Code (IaC) principles. It allows you to define, provision, and manage infrastructure consistently.\n\nBy declaring Modules in your configuration files, Terraform knows exactly what state the infrastructure should be in and determines the necessary actions to achieve that state.\n\nProper management of Modules is crucial for collaborating on Terraform projects, ensuring security, and preventing configuration drift in production environments.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("Modules Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Modules", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How does Terraform use Modules?", "It uses Modules to map the configuration to real-world infrastructure objects and maintain their lifecycle."), new InterviewQuestion("What happens if Modules is misconfigured?", "It can lead to deployment failures, unintended resource deletion, or security vulnerabilities.")))
                .flashCards(List.of(new FlashCard("Modules Block", "The HCL syntax used to define Modules"), new FlashCard("Terraform Modules", "The logical representation of Modules in Terraform")))
                .displayOrder(7)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_modules);

        Quiz terraform_modules_quiz = Quiz.builder()
                .topicId(terraform_modules.getId())
                .technologyId(terraform.getId())
                .title("Modules Quiz")
                .questions(List.of(new Question("Which of the following describes the role of Modules in Terraform?", List.of("It defines the cloud provider credentials", "It represents the core components that are provisioned and managed", "It is only used for local testing", "It replaces the need for version control"), 1, "Modules is central to defining and managing the actual infrastructure.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_modules_quiz);

        Topic terraform_backend = Topic.builder()
                .technologyId(terraform.getId())
                .slug("backend")
                .title("Backend")
                .overview("In Terraform, Backend is a fundamental concept that enables Infrastructure as Code (IaC) principles. It allows you to define, provision, and manage infrastructure consistently.\n\nBy declaring Backend in your configuration files, Terraform knows exactly what state the infrastructure should be in and determines the necessary actions to achieve that state.\n\nProper management of Backend is crucial for collaborating on Terraform projects, ensuring security, and preventing configuration drift in production environments.")
                .officialDocUrl("https://developer.hashicorp.com/terraform/docs")
                .videoLinks(List.of(
                        new VideoLink("Backend Explained", "https://youtube.com/watch?v=example1", "TechWorld with Nana"),
                        new VideoLink("Mastering Backend", "https://youtube.com/watch?v=example2", "NetworkChuck")
                ))
                .interviewQuestions(List.of(new InterviewQuestion("How does Terraform use Backend?", "It uses Backend to map the configuration to real-world infrastructure objects and maintain their lifecycle."), new InterviewQuestion("What happens if Backend is misconfigured?", "It can lead to deployment failures, unintended resource deletion, or security vulnerabilities.")))
                .flashCards(List.of(new FlashCard("Backend Block", "The HCL syntax used to define Backend"), new FlashCard("Terraform Backend", "The logical representation of Backend in Terraform")))
                .displayOrder(8)
                .createdAt(Instant.now())
                .build();
        topicRepository.save(terraform_backend);

        Quiz terraform_backend_quiz = Quiz.builder()
                .topicId(terraform_backend.getId())
                .technologyId(terraform.getId())
                .title("Backend Quiz")
                .questions(List.of(new Question("Which of the following describes the role of Backend in Terraform?", List.of("It defines the cloud provider credentials", "It represents the core components that are provisioned and managed", "It is only used for local testing", "It replaces the need for version control"), 1, "Backend is central to defining and managing the actual infrastructure.")))
                .createdAt(Instant.now())
                .build();
        quizRepository.save(terraform_backend_quiz);

    }

    private Technology createTech(String slug, String title, String desc, String icon, String color, String doc, int count, int order) {
        return technologyRepository.save(Technology.builder()
                .slug(slug).title(title).description(desc).icon(icon).color(color).officialDocUrl(doc)
                .topicCount(count).displayOrder(order).createdAt(Instant.now()).build());
    }
}
