export const portfolioData = {
  personal: {
    name: "Quenzzy J. Navelgas",
    firstName: "Quenzzy",
    title: "CS Student & Freelance Developer",
    tagline: "Building intelligent systems at the intersection of ML, Web Dev & QA.",
    email: "quenzzynavelgas123@gmail.com",
    phone: "0916-683-7582",
    location: "Dasmariñas, Cavite, Philippines",
    github: "https://github.com/Kyuwenzy",
    linkedin: "https://www.linkedin.com/in/quenzzy-navelgas-b4a588359/",
    summary:
      "Results-driven Computer Science graduate and freelance professional with hands-on experience in AI-assisted content creation, automation testing, and frontend web development. Proven ability to manage high-volume, multi-project workloads independently while maintaining quality and meeting strict deadlines. Adept at leveraging AI tools, modern development frameworks, and structured workflows to deliver consistent, client-aligned outputs across diverse technical and creative roles.",
  },

  highlights: [
    { label: "Projects Shipped", value: "3+",  icon: "Rocket"      },
    { label: "Best ML Accuracy", value: "94%", icon: "BrainCircuit" },
    { label: "Scripts Written",  value: "100+", icon: "Youtube"     },
    { label: "Certifications",   value: "2",   icon: "Award"        },
  ],

  skills: [
    {
      category: "Web Development",
      icon: "Globe",
      items: [
        "Astro", "Bootstrap", "CSS", "Django", "HTML", "JavaScript",
        "MySQL", "Next.js", "PHP", "PostgreSQL", "React",
        "SQLite", "Tailwind CSS", "TypeScript",
      ],
    },
    {
      category: "Machine Learning",
      icon: "BrainCircuit",
      items: [
        "Cross-Validation", "Feature Engineering", "Hyperparameter Tuning",
        "NumPy", "Pandas", "Python", "Scikit-learn",
      ],
    },
    {
      category: "Testing & QA",
      icon: "TestTube",
      items: ["Automation Testing", "Bug Tracking", "Playwright", "Regression Testing"],
    },
    {
      category: "Data & Analytics",
      icon: "BarChart3",
      items: ["Looker Studio", "Power BI", "Tableau"],
    },
    {
      category: "DevOps & Version Control",
      icon: "GitBranch",
      items: ["Branching", "Git", "GitHub", "Pull Requests"],
    },
    {
      category: "IT & Networking",
      icon: "Network",
      items: [
        "Computer Hardware", "Command Line Interface", "DNS",
        "Linux", "Network Security", "Troubleshooting", "Windows",
      ],
    },
    {
      category: "Collaboration",
      icon: "Users",
      items: ["Discord", "Google Workspace", "Microsoft Office", "Notion", "Trello"],
    },
    {
      category: "AI Tools",
      icon: "Sparkles",
      items: ["BlackBox", "ChatGPT", "Claude", "Cursor", "DeepSeek", "Gemini", "Groq AI", "Poppy"],
    },
  ],

  experience: [
    {
      role: "Freelance AI Scriptwriter",
      company: "YTA Business",
      type: "Remote",
      period: "February 2026 – June 2026",
      description:
        "Created AI-assisted long-form YouTube scripts across 30+ channels spanning history, lifestyle, automotive, documentary, survival, and true crime niches.",
      bullets: [
        "Leveraged AI tools (Claude, ChatGPT, Poppy) with structured prompt engineering to produce retention-focused scripts tailored to each channel's unique voice.",
        "Managed production pipeline using Trello and Google Sheets across simultaneous projects.",
        "Coordinated with cross-functional teams including video editors and thumbnail artists via Discord.",
        "Adapted writing style and tone across 30+ distinct channel personalities while maintaining brand consistency.",
        "Submitted biweekly EOD reports summarizing script completions, blockers, and channel status updates.",
      ],
      tags: ["AI Tools", "Prompt Engineering", "Content Creation", "Trello", "Discord"],
    },
    {
      role: "Freelance Virtual Assistant / Web Developer",
      company: "JogaLiga — Startup",
      type: "Remote",
      period: "January 2026 – February 2026",
      description:
        "Developed reusable UI components and implemented mobile-first designs for a Brazilian startup.",
      bullets: [
        "Developed reusable UI components using Astro and Tailwind CSS following structured technical documentation.",
        "Implemented mobile-first, high-contrast UI designs aligned with client requirements.",
        "Utilized Git and GitHub for version control, including branching and pull request workflows.",
        "Conducted audience research on Brazilian culture and social media behavior for marketing strategy.",
        "Delivered regular progress updates and responded to client feedback professionally.",
      ],
      tags: ["Astro", "Tailwind CSS", "Git", "GitHub", "UI Development"],
    },
    {
      role: "Quality Assurance Intern (Automation Testing)",
      company: "QNE Software Philippines, Inc.",
      type: "On-site",
      period: "June 2025 – July 2025",
      description:
        "Assisted in creating and executing automated test cases for website modules using Playwright and JavaScript.",
      bullets: [
        "Assisted in creating and executing automated test cases for website modules ensuring functionality and usability.",
        "Utilized Playwright and JavaScript to streamline regression and functional testing processes.",
        "Performed bug reporting and tracking using Notion for timely defect resolution.",
        "Collaborated with QA team to validate fixes, conduct re-testing, and perform exploratory testing.",
        "Gained practical experience in SDLC, testing methodologies, and Agile team collaboration.",
      ],
      tags: ["Playwright", "JavaScript", "Automation Testing", "Notion", "Agile"],
    },
  ],

  projects: [
    {
      id: "01",
      title: "WoofWoof",
      subtitle: "ML-Based Dog Disease Prediction System",
      period: "2025 – 2026",
      context: "Emilio Aguinaldo College — Thesis Project",
      description:
        "A full-stack web-based clinical screening tool that predicts 14 common dog diseases using a Voting Classifier ensemble achieving 94% cross-validated accuracy.",
      bullets: [
        "Engineered end-to-end ML pipeline with feature engineering across 10 input categories, one-hot encoding, StandardScaler normalization, and soft-voting aggregation.",
        "Benchmarked 10 models (Decision Tree, Logistic Regression, SVC, Random Forest, XGBoost, Gradient Boosting) using k-fold cross-validation (k=5–7).",
        "Applied hyperparameter tuning via Grid Search, Random Search, and Bayesian Optimization (Optuna).",
        "Built and deployed as Django web app with REST Framework API, Django-templated frontend, PostgreSQL, and Groq AI integration.",
        "Implemented security features: rate limiting, brute-force protection, and CAPTCHA.",
        "Collaborated with licensed veterinarians to validate clinical accuracy of encoded symptom-disease relationships.",
      ],
      tech: ["Python", "Django", "Scikit-learn", "PostgreSQL", "Groq AI", "JavaScript"],
      metric: "94%",
      metricSub: "Cross-Validated Accuracy",
      screenshot: "/woofwoof-preview.png",
      github: "https://github.com/Kyuwenzy/WoofWoof-CDDPS",
      demo: "https://woofwoof-cddps.onrender.com",
    },

    {
      id: "02",
      title: "PesoTrack",
      subtitle: "Budgeting & Expense Tracking Web App",
      period: "2026",
      context: "Personal Project",
      description:
        "A full-stack personal finance web app for tracking income, expenses, and savings goals — featuring multi-currency support, AI-powered insights, and a real-time dashboard with budget analytics.",
      bullets: [
        "Built with Next.js 15 App Router, Prisma ORM, and PostgreSQL (Neon), with NextAuth v5 for Google OAuth and credential-based authentication.",
        "Designed a global multi-currency system with live exchange rates, supporting 11 currencies with real-time conversion across all charts and KPIs.",
        "Implemented a responsive bento-grid dashboard with animated KPI cards, cash flow bar charts, and categorical spending pie charts.",
        "Integrated Groq AI to generate personalized financial insights and spending pattern summaries.",
        "Built a dynamic theming system with light/dark/system mode and 6 selectable color themes.",
        "Developed full CRUD for accounts, transactions, budgets, savings goals — with CSV/Excel import and JSON backup.",
      ],
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Groq AI", "Tailwind CSS"],
      metric: "11",
      metricSub: "Currencies Supported",
      screenshot: "/pesotrack-preview.png",
      github: "https://github.com/Kyuwenzy/Pesotrack---Your-Budgeting-Companion",
      demo: "https://pesotrack-your-budgeting-companion.vercel.app/",
    },

    {
      id: "03",
      title: "Portfolio",
      subtitle: "Editorial Personal Portfolio Website",
      period: "2026",
      context: "Personal Project",
      description:
        "A magazine-editorial personal portfolio built with Next.js 14 and Framer Motion — designed to communicate that a Computer Science graduate is not just technical, but also deeply creative. Inspired by the art direction of GQ, Vogue, and Cosmopolitan.",
      bullets: [
        "Designed an original editorial design system — GQ gold-on-paper palette, Cormorant Garamond display type, JetBrains Mono for code register, and a strict no-rounded-corners philosophy.",
        "Built premium animations: character-by-character name reveal, masked slide-up section headers, magnetic 3D hover cards, clip-path panel transitions, and a continuously rotating SVG stamp seal.",
        "Implemented a full-screen editorial navigation drawer, scroll-driven chapter indicator, dual-layer clip name rendering for light/dark mode compatibility, and a functional contact form via Resend API.",
        "Architected with a single data/portfolio.ts source of truth — all content updates propagate across every section with zero component edits.",
        "Deployed on Vercel with environment-based email dispatch and full SEO metadata including Open Graph and Twitter cards.",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend", "Vercel"],
      metric: "100%",
      metricSub: "Build with AI",
      screenshot: "/portfolio-preview.png",
      github: "https://github.com/Kyuwenzy/Website---Personal-Portfolio",
      demo: "https://your-vercel-url.vercel.app",
    },

  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Emilio Aguinaldo College",
      location: "Dasmariñas, Cavite",
      period: "2023 – 2026",
      status: "In Progress",
    },
  ],

  certifications: [
    {
      name: "Google AI Essentials",
      issuer: "Google via Coursera",
      year: "2025",
      icon: "BrainCircuit",
    },
    {
      name: "Google IT Support Professional Certificate",
      issuer: "Google via Coursera",
      year: "2025",
      icon: "Shield",
    },
  ],

  awards: [
    { title: "Excellence in Team Stewardship Award", icon: "Trophy" },
    { title: "Polaris Award for Strategic Guidance",  icon: "Star"  },
  ],

  leadership: [
    {
      role: "Vice President – Internal",
      org: "School of Computer Studies and Informatics",
      period: "2025 – 2026",
    },
    {
      role: "Vice President – External",
      org: "Junior Philippine Computer Society",
      period: "2024 – 2026",
    },
    {
      role: "Secretary",
      org: "School of Engineering and Technology",
      period: "2025",
    },
    {
      role: "Computer Science Representative",
      org: "School of Engineering and Technology",
      period: "2023 – 2025",
    },
    {
      role: "Event Member",
      org: "Central Student Council Board — EAC Student Leadership Training & Seminar",
      period: "2026",
    },
    {
      role: "Event Member",
      org: "CS Seminar: CTRL+F The Future — Web Dev with Kblink.ph",
      period: "2024",
    },
    {
      role: "Event Member",
      org: "Central Student Council Board — EAC Student Leadership Training & Seminar",
      period: "2024",
    },
  ],
};
