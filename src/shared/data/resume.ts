export const profile = {
  name: 'Aditya Kashyap',
  initials: 'AK',
  role: 'Full Stack Developer',
  experience: '3+ years',
  email: 'adityakashyap7480@gmail.com',
  phone: '+91 74808 45211',
  phoneHref: 'tel:+917480845211',
  linkedin: 'https://www.linkedin.com/in/aditya-kashyap-06a126253/',
  location: 'India',
  /** Put your PDF at: public/Aditya_Kashyap_Resume.pdf */
  resumeUrl: '/Aditya_Kashyap_Resume.pdf',
  resumeFileName: 'Aditya_Kashyap_Resume.pdf',
  summary:
    'Full Stack Developer with 3+ years of experience designing, building, and deploying scalable web and mobile applications. Strong across React, Next.js, NestJS, React Native, Python, and practical AI integration — with a focus on clean architecture and production-ready delivery.',
  positioning:
    'I build scalable web and mobile products end to end — from polished interfaces to reliable APIs, data systems, and cloud deployment.',
  story: [
    'I am a Full Stack Developer with 3+ years of experience shipping production software across web and mobile. My work spans responsive frontends, scalable backends, and mobile apps — using React.js, Next.js, NestJS, Angular, React Native (Expo), Node.js, TypeScript, PostgreSQL, MongoDB, and REST APIs.',
    'Beyond the JavaScript ecosystem, I also build with Python and Django — including certification and operations platforms with REST APIs, dashboards, and data workflows. I integrate practical AI and GenAI into products using OpenAI APIs, prompt engineering, and thoughtful AI-assisted features that improve real user workflows.',
    'Across legal operations, payments, and platform tools, I focus on clean architecture, reusable systems, and reliable delivery — from authentication and microservices to Docker, Firebase, AWS, and Git-based collaboration — so products stay maintainable under real usage.',
  ],
}

export const heroLines = [
  'Building digital products.',
  'Shipping at production scale.',
  'Creating real-world impact.',
]

/** Stats derived only from existing resume content — no invented metrics */
export const positioning = [
  { value: 3, suffix: '+', label: 'Years Experience', detail: 'Professional full-stack delivery' },
  { value: 3, suffix: '', label: 'Companies', detail: 'Legal ops, fintech, platforms' },
  { value: 4, suffix: '', label: 'Featured Products', detail: 'AUDITLab, Fluence Pay, SIS, Cove' },
  { value: 4, suffix: '', label: 'Product Domains', detail: 'Case ops · Payments · Real estate · Certification' },
]

export const skills = {
  languages: ['JavaScript', 'TypeScript', 'Java', 'Python', 'HTML5', 'CSS3', 'SQL'],
  core: ['DSA', 'OOP', 'DBMS', 'System Design'],
  frameworks: [
    'React.js',
    'Next.js',
    'NestJS',
    'Angular',
    'React Native (Expo)',
    'Express.js',
    'Spring Boot',
    'Redux',
    'Node.js',
    'Socket.IO',
    'Tailwind CSS',
    'REST APIs',
  ],
  tools: ['Docker', 'AWS', 'GCP', 'Nginx', 'Firebase', 'Microservices', 'Git', 'GitHub'],
  databases: ['MongoDB', 'PostgreSQL', 'SQL', 'Redis'],
  ai: ['OpenAI API', 'Prompt Engineering', 'AI Integration', 'ChatGPT', 'Claude'],
  soft: ['Problem Solving', 'Analytical Thinking', 'Communication', 'Team Collaboration'],
}

export const skillEcosystem = [
  {
    id: 'technology',
    title: 'Technology',
    description: 'Languages, frameworks, and data layers used to ship production systems.',
    items: [
      ...skills.languages,
      'React.js',
      'Next.js',
      'NestJS',
      'React Native',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Redis',
    ],
  },
  {
    id: 'product',
    title: 'Product',
    description: 'Turning business workflows into clear interfaces, APIs, and durable architecture.',
    items: ['System Design', 'REST APIs', 'Clean Architecture', 'Reusable Components', 'Redux', 'Custom Hooks'],
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'Deployment, reliability, and services that keep products running in production.',
    items: ['Docker', 'Nginx', 'AWS', 'GCP', 'Firebase', 'Microservices', 'Error Handling'],
  },
  {
    id: 'ai',
    title: 'AI / GenAI',
    description: 'Practical AI integration and prompt-driven product features.',
    items: skills.ai,
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'How work gets done across teams, reviews, and delivery cycles.',
    items: [...skills.soft, 'Git', 'GitHub', 'Agile Practices'],
  },
]

export const experience = [
  {
    company: 'Xicom Technologies',
    role: 'Full Stack Developer',
    type: 'Full Time',
    period: 'Aug 2026 — Present',
    focus: 'Legal case operations platform',
    stack: ['React.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'AWS S3'],
    highlights: [
      'Developed and maintained AUDITLab, a full-stack legal case operations platform using React.js, TypeScript, NestJS, PostgreSQL, Redis, and REST APIs for high-volume mass-tort case management.',
      'Enhanced case-details modules including Files & Drafts, Smart Review, medical/exposure inventory, classified documents, checklists, and settlement workflows.',
      'Built secure AWS S3 document workflows with browsing, preview, access controls, presigned URLs, and controlled download APIs; integrated Needles synchronization.',
      'Debugged production-like API and database issues, strengthened error handling, and contributed to dashboards, intake campaigns, client communication, and the Connect portal.',
    ],
  },
  {
    company: 'Blu Parrot Ventures Pvt Ltd',
    role: 'Full Stack Developer',
    type: 'Full Time',
    period: 'Oct 2024 — Jul 2026',
    focus: 'Payments & rewards ecosystem',
    stack: ['React Native', 'Expo', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase', 'Docker'],
    highlights: [
      "Engineered Fluence Pay's User Panel with React Native, Expo, and TypeScript — QR payments, digital wallet, transaction history, cashback rewards, and REST API integration.",
      'Built Merchant Onboarding and Admin Panel modules using Node.js, Express.js, PostgreSQL, and Firebase for KYC, approvals, user management, and analytics.',
      'Integrated Authentication, Cashback, Notifications, and Points Wallet microservices; configured Docker and Nginx for scalable, high-availability deployment.',
    ],
  },
  {
    company: 'Peregrine IT Solutions',
    role: 'Full Stack Developer',
    type: 'Full Time',
    period: 'Sep 2023 — Oct 2024',
    focus: 'Real estate platform UI',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
    highlights: [
      'Developed responsive UI for a real estate platform (admin.coveagent.com) using Next.js, TypeScript, Tailwind CSS, and Redux with modular architecture.',
      'Managed complex application state with React Hooks and Redux for seamless data flow across the platform.',
      'Built reusable custom React hooks to streamline development and improve maintainability.',
    ],
  },
]

export const projects = [
  {
    name: 'AUDITLab',
    index: '01',
    role: 'Full Stack Developer',
    domain: 'Legal Operations',
    stack: ['React.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'REST APIs'],
    points: [
      'Legal case management platform for law firms handling high-volume mass-tort portfolios — case managers, admins, vendors, advocates, and clients via Connect.',
      'Supports case intake, medical/exposure review, Smart Review, settlement workflows, checklists, reports, and classified documents.',
      'NestJS backend with PostgreSQL and Redis, React.js frontend, REST APIs, and AWS S3 for secure document storage.',
      'Syncs case data with Needles CMS; Connect provides client-facing chat and document access.',
    ],
    visual: 'legal' as const,
    liveUrl: 'https://staging-fe-dev.drsh0qo9fyi7.amplifyapp.com/dashboard' as string | undefined,
    liveLabel: 'View staging' as string | undefined,
    githubUrl: undefined as string | undefined,
  },
  {
    name: 'Fluence Pay',
    index: '02',
    role: 'Full Stack Developer',
    domain: 'Fintech · Payments',
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase', 'Microservices'],
    points: [
      'Merchant: onboarding (applications, profile), transaction handling, and cashback campaigns with REST APIs for payments and funds.',
      'User Panel: QR scan-to-pay, transaction history, wallet, and Fluence Score cashback in React Native / Expo.',
      'Admin Panel: merchant approval workflows, user/merchant management, and analytics dashboards.',
      'Integrated authentication, cashback, notifications, and points-wallet microservices for end-to-end rewards flow.',
    ],
    visual: 'pay' as const,
    liveUrl: undefined as string | undefined,
    liveLabel: undefined as string | undefined,
    githubUrl: undefined as string | undefined,
  },
  {
    name: 'Cove Agent',
    index: '03',
    role: 'Full Stack Developer',
    domain: 'Real Estate',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Custom Hooks'],
    points: [
      'Built responsive UI for a real estate admin platform (admin.coveagent.com) with Next.js, TypeScript, Tailwind CSS, and Redux.',
      'Managed complex application state with React Hooks and Redux for seamless data flow across the platform.',
      'Created reusable custom React hooks to streamline shared logic and keep the codebase maintainable.',
    ],
    visual: 'estate' as const,
    liveUrl: 'https://admin.coveagent.com' as string | undefined,
    liveLabel: 'View live' as string | undefined,
    githubUrl: undefined as string | undefined,
  },
  {
    name: 'SIS Certification',
    index: '04',
    role: 'Full Stack Developer',
    domain: 'Certification Ops',
    stack: ['Python', 'Django', 'PostgreSQL', 'REST APIs'],
    points: [
      'Certification management web app with modules for leads, proposals, training batches, and exam results tracking.',
      'REST APIs and admin dashboards for Cost Calculator, Training Matrix, and analytics — including Excel import/export with Pandas.',
      'Reusable Django components for proposal pipelines, certification journey tracking, batch assignment, and automated PDF reports.',
    ],
    visual: 'cert' as const,
    liveUrl: undefined as string | undefined,
    liveLabel: undefined as string | undefined,
    githubUrl: undefined as string | undefined,
  },
]

export const education = [
  {
    school: 'Veer Kunwar Singh University',
    degree: 'Bachelor of Business Administration (B.B.A.)',
    period: '2021 — 2024',
  },
]

export const certifications = [
  {
    org: 'Coding Ninjas',
    title: 'Full Stack Web Development',
    period: 'Jan 2023 — Jul 2023',
  },
]

export const navLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]
