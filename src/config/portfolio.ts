import {
  Award,
  BadgeCheck,
  Braces,
  Cloud,
  Code2,
  CodeXml,
  Cpu,
  Database,
  FolderGit2,
  Github,
  GraduationCap,
  HeartPulse,
  Linkedin,
  Mail,
  MonitorSmartphone,
  Rocket,
  School,
  Trophy,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { CodeChefMark, LeetCodeMark } from '../components/ui/BrandMarks'

/**
 * Icons usable in data cards: Lucide icons or brand mark components.
 * Both accept standard SVG props, so tinting (color/style) keeps working.
 */
export type CardIcon = ComponentType<SVGProps<SVGSVGElement>>

/* ------------------------------------------------------------------ */
/* Profile — everything here comes straight from the resume            */
/* ------------------------------------------------------------------ */

export const profile = {
  firstName: 'Gangaraju',
  lastName: 'Thammannagari',
  name: 'Gangaraju Thammannagari',
  title: 'Aspiring Software Developer',
  email: 'gangarajuthammannagari38@gmail.com',
  github: 'https://github.com/ThammannagariGangaraju',
  linkedin: 'https://www.linkedin.com/in/thammannagari-gangaraju-a351222b0/',
  leetcode: 'https://leetcode.com/u/w3J6HXasqc/',
  codechef: 'https://www.codechef.com/users/bale_temple_51',
  university: 'Mohan Babu University, Tirupati',
  cgpa: 9.2,
  graduationYear: '2027',
  /** Resume served from /public/Resume_1.1.pdf */
  resume: '/Resume_1.1.pdf',
  /** User-provided portrait — optimized WebP from /public/img.png (original file kept) */
  photo: '/img.webp',
}

export const heroIntro =
  "Computer Science and Engineering student at Mohan Babu University with a 9.2/10 CGPA and hands-on experience building web applications and AI-based projects. I write Java, Python, SQL, and React — and I sharpen my problem-solving every day."

export const languages = ['English — Professional', 'Telugu — Native', 'Hindi — Conversational']

/* ------------------------------------------------------------------ */
/* Hero feature cards — resume-grounded topics                         */
/* ------------------------------------------------------------------ */

export type HeroFeature = {
  category: string
  title: string
  text: string
  icon: LucideIcon
}

export const heroFeatures: HeroFeature[] = [
  {
    category: 'Creative Engineering',
    title: 'AI-assisted applications',
    text: 'First-aid and object-detection tools built with React/TypeScript, Node.js, and YOLO.',
    icon: Cpu,
  },
  {
    category: 'Problem Solving',
    title: 'Algorithmic practice',
    text: 'Daily Java, array, string, and DSA problems on LeetCode and CodeChef.',
    icon: Braces,
  },
  {
    category: 'Technical Projects',
    title: 'Three shipped builds',
    text: 'Hack2Care, Bolt & Nut Detector, and a Weather Prediction Website.',
    icon: Rocket,
  },
]

/* ------------------------------------------------------------------ */
/* Navigation & socials                                                */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string; icon: LucideIcon }

export const NAV_LINKS: NavLink[] = [
  { label: 'Profiles', href: '#coding', icon: Braces },
  { label: 'Projects', href: '#projects', icon: FolderGit2 },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Skills', href: '#skills', icon: Code2 },
  { label: 'Achievements', href: '#achievements', icon: Trophy },
  { label: 'Certifications', href: '#certifications', icon: BadgeCheck },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export type SocialLink = { label: string; href: string; icon: LucideIcon }

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'LeetCode', href: profile.leetcode, icon: Braces },
  { label: 'CodeChef', href: profile.codechef, icon: CodeXml },
]

/* ------------------------------------------------------------------ */
/* Skills — grouped exactly as on the resume (Resume_1.1)              */
/* Frameworks/stacks used by projects (React, Node.js…) are shown in   */
/* the projects section, matching the resume's own project wording.    */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  title: string
  icon: LucideIcon
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Java', 'Python', 'C'],
  },
  {
    title: 'Frontend',
    icon: MonitorSmartphone,
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend & DB',
    icon: Database,
    skills: ['SQL'],
  },
  {
    title: 'Tools & Others',
    icon: Cpu,
    skills: ['Git', 'GitHub', 'YOLO', 'Machine Learning'],
  },
]

export const marqueeTechnologies = [
  'Java',
  'Python',
  'C',
  'JavaScript',
  'HTML',
  'CSS',
  'SQL',
  'Git',
  'GitHub',
  'YOLO',
  'Machine Learning',
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectDetail = {
  /** Best-effort statement of what the project is for (resume-grounded) */
  goal: string
  /** First-person contribution — only wording the resume explicitly supports */
  contribution: string
}

export type Project = {
  title: string
  tagline: string
  bullets: string[]
  tags: string[]
  github: string
  icon: LucideIcon
  /** Optional collapsed-by-default case study — render only when provided */
  details?: ProjectDetail
}

export const projects: Project[] = [
  {
    title: 'Hack2Care',
    tagline: 'AI-Powered First-Aid Web App',
    bullets: [
      'Guided condition assessment, emergency logging, and nearby hospital discovery to help users find relevant information fast.',
      'React/TypeScript interface with a Node.js/Express backend, powered by Google Gemini, interactive maps, and OpenStreetMap data.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Google Gemini', 'OpenStreetMap'],
    github: 'https://github.com/ThammannagariGangaraju/Hack2Care',
    icon: HeartPulse,
    details: {
      goal: 'Fast first-aid support in urgent moments — guided condition assessment, emergency logging, and nearby hospital discovery in one place.',
      contribution:
        'Developed a first-aid support web app and integrated its React/TypeScript interface with a Node.js/Express backend, Google Gemini, interactive maps, and OpenStreetMap data.',
    },
  },
  {
    title: 'Bolt & Nut Detector',
    tagline: 'YOLO-Based Object Detection',
    bullets: [
      'Identifies and counts bolts and nuts in images using a YOLO object-detection model.',
      'Python FastAPI backend with a clean web interface for fast, practical inspection.',
    ],
    tags: ['YOLO', 'Python', 'FastAPI', 'Computer Vision', 'Machine Learning'],
    github: 'https://github.com/ThammannagariGangaraju/nuts-and-bolts-detector',
    icon: Wrench,
    details: {
      goal: 'Identify and count bolts and nuts in images for quick, practical inspection.',
      contribution:
        'Built an object-detection system to identify and count bolts and nuts using YOLO, with a Python FastAPI backend and web interface.',
    },
  },
  {
    title: 'Weather Prediction',
    tagline: 'Responsive Weather Website',
    bullets: [
      'A responsive weather interface built with HTML, CSS, and JavaScript.',
      'Focused on clear data presentation and ease of use for every visitor.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    github: 'https://github.com/ThammannagariGangaraju/weather-prediction-',
    icon: Cloud,
    details: {
      goal: 'A clean, responsive weather experience that presents information clearly.',
      contribution: 'Created a responsive weather interface with a focus on clear presentation and ease of use.',
    },
  },
]

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export type EducationItem = {
  degree: string
  school: string
  period: string
  score: string
  icon: LucideIcon
  /** Per-card chronicle accent (reference style) applied to the year
      marker, its icon, and the card's top accent line */
  accent?: string
  highlight?: boolean
  bullets?: string[]
  chips?: string[]
}

export const education: EducationItem[] = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'Mohan Babu University, Tirupati',
    period: '2023 – 2027',
    score: 'CGPA 9.2 / 10',
    icon: GraduationCap,
    accent: '#8b5cf6',
    highlight: true,
    bullets: [
      'Maintaining a 9.2/10 CGPA across every semester so far.',
      'Applying coursework through AI-based web projects and hackathons.',
    ],
    chips: ['COMPUTER SCIENCE', 'CGPA 9.2'],
  },
  {
    degree: 'Intermediate (MPC)',
    school: 'Mother Theresa Junior College, Palamaner',
    period: 'Completed 2023',
    score: '91.4%',
    icon: School,
    accent: '#10b981',
    bullets: [
      'Completed the MPC stream (Maths, Physics, Chemistry) with 91.4%.',
      'Built the foundation for analytical thinking and problem solving.',
    ],
    chips: ['MPC', '91.4%'],
  },
]

/* ------------------------------------------------------------------ */
/* Certifications & achievements                                       */
/* ------------------------------------------------------------------ */

export type Certification = {
  name: string
  issuer: string
  icon: LucideIcon
}

export const certifications: Certification[] = [
  { name: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', icon: Cloud },
  { name: 'ServiceNow Virtual Internship — Micro-Certification', issuer: 'ServiceNow', icon: BadgeCheck },
  { name: 'Java Programming', issuer: 'Certification Course', icon: CodeXml },
  { name: 'Advanced Relational Database and SQL Project', issuer: 'Coursera', icon: Database },
]

export type Achievement = {
  rank: string
  /** Animates as a counting number when set (e.g. 10 → "Top 10") */
  rankValue?: number
  event: string
  detail: string
  icon: LucideIcon
}

export const achievements: Achievement[] = [
  { rank: 'Top 10', rankValue: 10, event: 'Tech24 Hackathon — GDG',
    detail: 'Finished among the top 10 teams at the Tech24 hackathon organized by GDG.',
    icon: Trophy },
  { rank: 'Top 100', rankValue: 100, event: 'INCEPTRIX Hackathon 2.0',
    detail: 'Placed among the top 100 entries at INCEPTRIX Hackathon 2.0.',
    icon: Award },
]

/* ------------------------------------------------------------------ */
/* Competitive / coding profiles — from the resume's coding practice   */
/* ------------------------------------------------------------------ */

export type CodingProfile = {
  platform: string
  /** Shown as the card's big display line — the real handle, no faked ratings */
  handle: string
  /** Colored status line under the display value */
  status: string
  /** 'accent' = green, 'accent-blue' = blue */
  statusTone: 'accent' | 'accent-blue'
  focusLabel: string
  focusValue: string
  /** Hex color of the platform mark in the icon tile (native platform hue) */
  mark: string
  href: string
  icon: CardIcon
}

export const codingProfiles: CodingProfile[] = [
  {
    platform: 'LeetCode',
    handle: 'w3J6HXasqc',
    status: 'Daily problem solving',
    statusTone: 'accent',
    focusLabel: 'Practice focus',
    focusValue: 'Java · Arrays · Strings · DSA',
    mark: '#e8a33d',
    href: profile.leetcode,
    icon: LeetCodeMark,
  },
  {
    platform: 'CodeChef',
    handle: 'bale_temple_51',
    status: 'Hands-on coding practice',
    statusTone: 'accent-blue',
    focusLabel: 'Practice focus',
    focusValue: 'Java · Problem solving',
    mark: '#c7a56a',
    href: profile.codechef,
    icon: CodeChefMark,
  },
  {
    platform: 'GitHub',
    handle: 'ThammannagariGangaraju',
    status: 'Projects & coursework',
    statusTone: 'accent',
    focusLabel: 'Build focus',
    focusValue: 'Web · AI · ML projects',
    mark: '#ffffff',
    href: profile.github,
    icon: Github,
  },
]
