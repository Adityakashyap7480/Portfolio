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
    'Full Stack Developer with 3+ years of experience designing, building, and deploying scalable web and mobile applications. Strong in clean architecture, reusable systems, and shipping reliable product experiences end to end.',
  positioning:
    'I design and ship scalable digital products — interfaces, APIs, and infrastructure — for real businesses operating at production scale.',
  story: [
    'I started by building full-stack interfaces and systems end to end — then grew into shipping products that sit at the center of real operations: legal case workflows, payment ecosystems, and platform admin tools.',
    'Across roles, the through-line has been the same: understand the business problem, design clean architecture, and execute across frontend, backend, data, and deployment without losing product clarity.',
    'Today I work as a Full Stack Developer focused on scalable web and mobile applications — React, Next.js, NestJS, Node.js, PostgreSQL, Redis, and cloud delivery — with a bias toward systems that stay maintainable under real usage.',
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
  { value: 3, suffix: '', label: 'Featured Products', detail: 'AUDITLab, Fluence Pay, SIS' },
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
    problem:
      'Law firms managing high-volume mass-tort portfolios need one operations platform for intake, review, documents, settlement, and client communication.',
    contribution:
      'Built and maintained core full-stack flows across case details, document security, Needles sync, and Connect portal support.',
    stack: ['React.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS S3', 'REST APIs'],
    points: [
      'Supports case intake, medical/exposure review, Smart Review, settlement workflows, checklists, reports, and classified document management.',
      'NestJS backend with PostgreSQL and Redis, React frontend, REST APIs, and AWS S3 for secure document storage.',
      'Synchronizes with Needles CMS while Connect provides a client-facing chat and document portal.',
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
    problem:
      'Merchants and users needed a connected payment and rewards system spanning onboarding, QR payments, wallets, cashback, and admin oversight.',
    contribution:
      'Owned user-panel mobile flows and contributed to merchant onboarding, admin modules, and microservice integrations.',
    stack: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Firebase', 'Microservices'],
    points: [
      'Merchant flows for onboarding, transactions, and cashback campaigns with REST payment APIs.',
      'User panel with QR scan-to-pay, wallet, transaction history, and Fluence Score cashback.',
      'Admin workflows for merchant approval, user/merchant management, and analytics dashboards.',
    ],
    visual: 'pay' as const,
    liveUrl: undefined as string | undefined,
    liveLabel: undefined as string | undefined,
    githubUrl: undefined as string | undefined,
  },
  {
    name: 'SIS Certification',
    index: '03',
    role: 'Full Stack Developer',
    domain: 'Certification Ops',
    problem:
      'Certification operations needed a web system for leads, proposals, training batches, exams, analytics, and report generation.',
    contribution:
      'Built Django-based certification management with REST APIs, dashboards, Excel workflows, and PDF reporting.',
    stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Pandas', 'REST APIs'],
    points: [
      'Interactive admin dashboards for Cost Calculator, Training Matrix, and analytics with Excel import/export via Pandas.',
      'Reusable Django components for proposal pipelines, certification journey tracking, batch assignment, and PDF report generation.',
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
