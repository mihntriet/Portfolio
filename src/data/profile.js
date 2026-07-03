export const myProfileData = {
    // 1. Personal Information
    personalInfo: {
        fullName: "Doan Minh Triet",
        university: "University of Science - VNU-HCM (HCMUS)",
        major: "Information Technology",
        year: "2nd Year Student",
        // Main account — shown in Contact & Navbar
        github: "https://github.com/mihntriet",
        // Projects account — shown in Project cards
        githubAlt: "https://github.com/dmtriet11",
        linkedin: "https://linkedin.com/in/lio56",
        email: "doanminhtriet0506@gmail.com",
        tagline: "Passionate about building automated systems, optimizing infrastructure, and designing Cloud-native architectures.",
    },

    // 2. Real Projects (displayed in the Interactive Architecture Diagram)
    projects: [
        {
            title: "Wedding Invitation System Deployment",
            description: "An online wedding invitation platform featuring real-time RSVP functionality for guests.",
            techStack: ["React", "Tailwind CSS", "Firebase Firestore", "GitHub Actions", "Firebase Hosting"],
            achievements: "Fully automated the CI/CD pipeline: tests run and deploy to Hosting automatically on every push to the main branch.",
            githubRepo: "https://github.com/dmtriet11",
        },
        {
            title: "Lab OS & Network Projects",
            description: "A series of system configuration and process management assignments from the HCMUS Year 2 curriculum.",
            techStack: ["C/C++", "Linux Shell Scripting", "Docker", "Ubuntu Server"],
            achievements: "Used Docker to containerize lab environments, allowing all team members to run code consistently without environment conflicts.",
            githubRepo: "https://github.com/dmtriet11",
        },
        {
            title: "Food Delivery App",
            description: "A cross-platform mobile food ordering application. Responsible for the entire React Native frontend and managing all API endpoints with a Flask backend.",
            techStack: ["React Native", "Flask API", "Firebase Auth", "Firebase Firestore", "Expo"],
            achievements: "Designed and managed the full API endpoint system: user authentication, menu management, order placement, and real-time order tracking.",
            githubRepo: "https://github.com/dmtriet11",
        },
        {
            title: "Group Desktop Game Project",
            description: "A collaborative desktop game developed as a team project for class, built with C++/C# featuring game logic, physics, and local multiplayer.",
            techStack: ["C++", "C#", "OOP Design", "Team Collaboration", "Git Workflow"],
            achievements: "Collaborated as a team to build an internal game engine: clearly separated modules and used a professional Git workflow to merge code without conflicts.",
            githubRepo: "https://github.com/dmtriet11",
        },
        {
            title: "Interactive DevOps Portfolio",
            description: "A modern portfolio showcasing system engineering skills, packaged with Docker and Docker Compose, featuring complex layout micro-interactions and an interactive Linux terminal emulator.",
            techStack: ["React", "Vite", "Tailwind CSS", "Docker", "Docker Compose", "Nginx", "Framer Motion", "EmailJS API"],
            achievements: "Containerized the application utilizing a Multi-stage build process with Node and Nginx, orchestrated local deployment with Docker Compose, and configured Nginx fallbacks for routing.",
            githubRepo: "https://github.com/mihntriet/Portfolio",
        }
    ],

    // 3. Skill levels for the Infrastructure Dashboard
    skills: {
        linuxAutomation: [
            { name: "Bash Scripting", level: 75 },
            { name: "Linux System Administration", level: 70 }
        ],
        containers: [
            { name: "Docker & Containerization", level: 80 },
            { name: "Kubernetes (Basic Concepts)", level: 50 }
        ],
        cicd: [
            { name: "GitHub Actions", level: 75 },
            { name: "Git Workflow", level: 85 },
            { name: "Jenkins", level: 20 }
        ],
        cloudMonitoring: [
            { name: "Firebase Service Stack", level: 80 },
            { name: "Vercel / Cloud Deployment", level: 85 }
        ]
    },

    // 4. Terminal simulator command responses
    terminalCommands: {
        about: "Hello! I'm Doan Minh Triet, a 2nd-year IT student at HCMUS. I'm deeply focused on DevOps culture, infrastructure automation, and CI/CD Pipelines.",
        contact: "You can reach me via Email: doanminhtriet0506@gmail.com or GitHub: https://github.com/mihntriet"
    }
};
