const myProfileData = {
    // 1. Thông tin cá nhân cơ bản
    personalInfo: {
        fullName: "Đoàn Minh Triết",
        university: "Trường Đại học Khoa học Tự nhiên - ĐHQG-HCM (HCMUS)",
        major: "Công nghệ Thông tin",
        year: "Sinh viên Năm 2",
        github: "https://github.com/mihntriet",
        linkedin: "https://linkedin.com/in/lio56",
        email: "doanminhtriet0506@gmail.com",
        tagline: "Đam mê xây dựng hệ thống tự động hóa, tối ưu hóa hạ tầng và kiến trúc Cloud.",
    },

    // 2. Dự án thực tế (Sẽ hiển thị trong phần Sơ đồ kiến trúc)
    projects: [
        {
            title: "Wedding Invitation System Deployment",
            description: "Hệ thống thiệp cưới online tích hợp tính năng RSVP thời gian thực cho khách mời.",
            techStack: ["React", "Tailwind CSS", "Firebase Firestore", "GitHub Actions", "Firebase Hosting"],
            achievements: "Tự động hóa hoàn toàn quy trình CI/CD: Tự động chạy test và deploy lên Hosting ngay khi push code lên nhánh main."
        },
        {
            title: "Lab OS & Network Projects",
            description: "Chuỗi bài tập lớn cấu hình hệ thống và quản lý tiến trình trong chương trình học năm 2 HCMUS.",
            techStack: ["C/C++", "Linux Shell Scripting", "Docker", "Ubuntu Server"],
            achievements: "Ứng dụng Docker để đóng gói môi trường làm bài tập, giúp các thành viên trong nhóm chạy code đồng bộ không bị lỗi môi trường."
        }
    ],

    // 3. Chỉ số thanh phần trăm cho Kỹ năng (Infrastructure Dashboard)
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

    // 4. Các câu lệnh phản hồi trong Terminal giả lập
    terminalCommands: {
        about: "Xin chào! Tôi là Đoàn Minh Triết, hiện là sinh viên năm 2 ngành CNTT tại HCMUS. Tôi đang tập trung nghiên cứu chuyên sâu về văn hóa DevOps, tự động hóa hạ tầng và CI/CD Pipelines.",
        contact: "Bạn có thể liên hệ với tôi qua Email: doanminhtriet0506@gmail.com hoặc GitHub: ://github.com/mihntriet."
    }
};
