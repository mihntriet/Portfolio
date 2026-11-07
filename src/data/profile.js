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
        tagline: "I deployed this portfolio to an Amazon Linux 2023 EC2 instance with Ansible and Docker. I am building CI experience and learning Terraform and Kubernetes step by step.",
    },

    // 2. Real Projects (displayed in the Interactive Architecture Diagram)
    projects: [
        {
            title: "Wedding Invitation System Deployment",
            description: "An online wedding invitation platform featuring real-time RSVP functionality for guests.",
            techStack: ["React", "Tailwind CSS", "Firebase Firestore", "GitHub Actions", "Firebase Hosting"],
            achievements: "An RSVP project using Firebase services. A project-specific repository and CI workflow walkthrough are still to be documented.",
            githubRepo: null,
        },
        {
            title: "Lab OS & Network Projects",
            description: "A series of system configuration and process management assignments from the HCMUS Year 2 curriculum.",
            techStack: ["C/C++", "Linux Shell Scripting", "Docker", "Ubuntu Server"],
            achievements: "Practiced Linux system administration and Docker-based lab environments. A public lab walkthrough is still to be documented.",
            githubRepo: null,
        },
        {
            title: "Food Delivery App",
            description: "A cross-platform food ordering team project using React Native and a Flask API.",
            techStack: ["React Native", "Flask API", "Firebase Auth", "Firebase Firestore", "Expo"],
            achievements: "Contributed to the mobile frontend and API integration. A project-specific repository and contribution breakdown are still to be documented.",
            githubRepo: null,
        },
        {
            title: "Group Desktop Game Project",
            description: "A collaborative desktop game developed as a class team project with C++/C#.",
            techStack: ["C++", "C#", "OOP Design", "Team Collaboration", "Git Workflow"],
            achievements: "Practiced modular code and team Git workflow. A project-specific repository and contribution breakdown are still to be documented.",
            githubRepo: null,
        },
        {
            title: "Interactive DevOps Portfolio",
            description: "A React portfolio deployed to Amazon Linux 2023 on EC2 using Ansible, Docker, and Nginx.",
            techStack: ["Ansible", "AWS EC2", "Docker", "Nginx", "GitHub Actions", "React", "Vite"],
            achievements: "The Ansible playbooks install Docker, build the image on EC2, run the Nginx container, and verify HTTP. Two consecutive deployment runs reported changed=6 then changed=0, with no failures. GitHub Actions CI passed lint, test, build, and Docker HTTP smoke on main; EC2 delivery remains manual.",
            githubRepo: "https://github.com/mihntriet/Portfolio",
        }
    ],

    // 3. Skills with explicit practice status instead of subjective percentages
    skills: {
        practiced: [
            { name: "Linux", detail: "Hands-on foundation; public lab notes pending." },
            { name: "Docker", detail: "Multi-stage build and Compose in this repository.", href: "https://github.com/mihntriet/Portfolio" },
            { name: "Ansible", detail: "Used bootstrap and deploy playbooks for this EC2 deployment." },
            { name: "AWS EC2", detail: "Deployed this portfolio on Amazon Linux 2023." }
        ],
        learning: [
            { name: "Terraform", detail: "Theory only; first AWS lab planned." },
            { name: "Kubernetes", detail: "Theory only; first local cluster lab planned." }
        ]
    },

    // 4. Terminal simulator command responses
    terminalCommands: {
        about: "Hello! I'm Doan Minh Triet, a 2nd-year IT student at HCMUS. I deployed this portfolio to EC2 with Ansible and Docker. Terraform and Kubernetes are currently theory only.",
        contact: "You can reach me via Email: doanminhtriet0506@gmail.com or GitHub: https://github.com/mihntriet"
    }
};
