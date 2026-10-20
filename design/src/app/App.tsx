import { useState, useEffect, useRef, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  LineChart, Line, CartesianGrid, RadarChart, PolarGrid,
  PolarAngleAxis, Radar, AreaChart, Area,
} from "recharts";
import {
  BookOpen, Brain, Trophy, Users, Clock, Star, ArrowRight, Play,
  Flame, Target, TrendingUp, CheckCircle, Menu, X, Bell, Search,
  Zap, Shield, ChevronRight, Download, MessageCircle, BarChart2,
  FileText, Mic, Sparkles, Home, User, Settings, AlarmClock,
  ChevronLeft, LogOut, Moon, Sun, Send, Plus, GraduationCap,
  Award, Globe, Layers, ChevronDown, ChevronUp, Mail, Phone,
  Twitter, Youtube, Instagram, Linkedin, Lock, Eye, EyeOff,
  BookMarked, FlaskConical, Calculator, AtomIcon, PenLine, Languages,
  Filter, Calendar, Bookmark, RefreshCw, Check, AlertCircle,
} from "lucide-react";
import { Toaster, toast } from "sonner";

// ─── TYPES ──────────────────────────────────────────────────

type Page = "home" | "auth" | "pricing" | "dashboard" | "cbt-setup" | "cbt" | "courses" | "teacher" | "parent";
type Role = "student" | "teacher" | "parent" | "school";

// ─── CONSTANTS ──────────────────────────────────────────────

const G = "#0c6438";
const AMBER = "#f5a623";
const RED = "#e84545";
const PURPLE = "#7c3aed";
const BLUE = "#2563eb";

// ─── MOCK DATA ──────────────────────────────────────────────

const subjectProgress = [
  { subject: "Maths", score: 74, mastery: 74, predicted: 81 },
  { subject: "Biology", score: 88, mastery: 88, predicted: 91 },
  { subject: "Chemistry", score: 61, mastery: 61, predicted: 68 },
  { subject: "Physics", score: 55, mastery: 55, predicted: 63 },
  { subject: "English", score: 92, mastery: 92, predicted: 94 },
  { subject: "Lit", score: 79, mastery: 79, predicted: 83 },
];

const radarData = [
  { topic: "Algebra", score: 85 }, { topic: "Calculus", score: 58 },
  { topic: "Genetics", score: 91 }, { topic: "Ecology", score: 76 },
  { topic: "Organic Chem", score: 62 }, { topic: "Mechanics", score: 51 },
];

const weeklyStudy = [
  { day: "Mon", hours: 2.5, target: 3 }, { day: "Tue", hours: 3.0, target: 3 },
  { day: "Wed", hours: 1.5, target: 3 }, { day: "Thu", hours: 4.0, target: 3 },
  { day: "Fri", hours: 3.5, target: 3 }, { day: "Sat", hours: 5.0, target: 4 },
  { day: "Sun", hours: 2.0, target: 2 },
];

const scoreHistory = [
  { week: "Wk 1", score: 58 }, { week: "Wk 2", score: 63 },
  { week: "Wk 3", score: 61 }, { week: "Wk 4", score: 69 },
  { week: "Wk 5", score: 72 }, { week: "Wk 6", score: 74 },
  { week: "Wk 7", score: 70 }, { week: "Wk 8", score: 78 },
];

const leaderboard = [
  { rank: 1, name: "Chisom Adeyemi", xp: 12840, school: "FGGC Bwari", state: "FCT", avatar: "CA", streak: 32 },
  { rank: 2, name: "Emeka Osei", xp: 11720, school: "King's College Lagos", state: "Lagos", avatar: "EO", streak: 28 },
  { rank: 3, name: "Fatimah Bello", xp: 10950, school: "GGSS Kano", state: "Kano", avatar: "FB", streak: 21 },
  { rank: 4, name: "Tunde Adesanya", xp: 10400, school: "CHS Ibadan", state: "Oyo", avatar: "TA", streak: 19 },
  { rank: 5, name: "You (Adaeze)", xp: 9880, school: "Queens College Lagos", state: "Lagos", avatar: "AO", streak: 14, isMe: true },
  { rank: 6, name: "Amara Nwosu", xp: 9650, school: "FGC Enugu", state: "Enugu", avatar: "AN", streak: 11 },
  { rank: 7, name: "Suleiman Garba", xp: 9340, school: "Govt Sec Sch Kaduna", state: "Kaduna", avatar: "SG", streak: 9 },
  { rank: 8, name: "Taiwo Adewale", xp: 9120, school: "CMS Grammar Bariga", state: "Lagos", avatar: "TW", streak: 15 },
];

const enrolledCourses = [
  { id: 1, title: "WAEC Mathematics Complete", category: "WAEC", lessons: 48, completed: 31, color: G, instructor: "Dr. Akin Okafor" },
  { id: 2, title: "JAMB Biology Masterclass", category: "JAMB", lessons: 36, completed: 36, color: PURPLE, instructor: "Prof. Ngozi Eze" },
  { id: 3, title: "English Language & Lit", category: "WAEC", lessons: 40, completed: 18, color: BLUE, instructor: "Mrs. Adaku Bello" },
  { id: 4, title: "Physics: From Basics to JAMB", category: "JAMB", lessons: 44, completed: 8, color: AMBER, instructor: "Mr. Ibrahim Musa" },
];

const allCourses = [
  { id: 1, title: "WAEC Mathematics Complete", category: "WAEC", lessons: 48, enrolled: 12400, rating: 4.9, badge: "Bestseller", color: G, instructor: "Dr. Akin Okafor", price: "Free" },
  { id: 2, title: "JAMB Biology Masterclass", category: "JAMB", lessons: 36, enrolled: 8900, rating: 4.8, badge: "Top Rated", color: PURPLE, instructor: "Prof. Ngozi Eze", price: "₦2,500/mo" },
  { id: 3, title: "English Language & Lit", category: "WAEC", lessons: 40, enrolled: 10200, rating: 4.7, badge: null, color: BLUE, instructor: "Mrs. Adaku Bello", price: "Free" },
  { id: 4, title: "NECO Chemistry Deep Dive", category: "NECO", lessons: 32, enrolled: 5600, rating: 4.6, badge: null, color: RED, instructor: "Mr. Seun Adeyemi", price: "₦1,500/mo" },
  { id: 5, title: "Physics: From Basics to JAMB", category: "JAMB", lessons: 44, enrolled: 7300, rating: 4.8, badge: "New", color: AMBER, instructor: "Mr. Ibrahim Musa", price: "₦2,000/mo" },
  { id: 6, title: "Post-UTME Crash Course", category: "Post-UTME", lessons: 20, enrolled: 15000, rating: 4.9, badge: "Bestseller", color: "#0891b2", instructor: "Team EduMaster", price: "₦3,000" },
  { id: 7, title: "Common Entrance Prep", category: "Primary", lessons: 28, enrolled: 4200, rating: 4.5, badge: null, color: "#16a34a", instructor: "Mrs. Patience Obi", price: "Free" },
  { id: 8, title: "SAT & Scholarship Prep", category: "International", lessons: 52, enrolled: 3100, rating: 4.7, badge: "New", color: "#db2777", instructor: "Dr. Chuka Nweze", price: "₦5,000/mo" },
  { id: 9, title: "WAEC Chemistry Mastery", category: "WAEC", lessons: 38, enrolled: 6800, rating: 4.6, badge: null, color: "#d97706", instructor: "Dr. Kunle Bello", price: "Free" },
  { id: 10, title: "JAMB Mathematics 2025", category: "JAMB", lessons: 50, enrolled: 9400, rating: 4.9, badge: "Bestseller", color: G, instructor: "Prof. Emeka Osei", price: "₦2,500/mo" },
  { id: 11, title: "NECO Biology Essentials", category: "NECO", lessons: 30, enrolled: 4100, rating: 4.5, badge: null, color: PURPLE, instructor: "Mrs. Amara Nwosu", price: "₦1,000/mo" },
  { id: 12, title: "IELTS Preparation Course", category: "International", lessons: 45, enrolled: 2800, rating: 4.8, badge: "Top Rated", color: BLUE, instructor: "Mr. Dave Eze", price: "₦6,000/mo" },
];

const examCategories = [
  { name: "WAEC", icon: "📋", count: "24,000+", color: "#dcfce7", border: G, questions: "questions" },
  { name: "JAMB", icon: "🎯", count: "18,500+", color: "#fef9c3", border: "#ca8a04", questions: "questions" },
  { name: "NECO", icon: "📚", count: "12,000+", color: "#dbeafe", border: BLUE, questions: "questions" },
  { name: "NABTEB", icon: "🔧", count: "8,400+", color: "#fce7f3", border: "#db2777", questions: "questions" },
  { name: "Post-UTME", icon: "🏛️", count: "31,000+", color: "#ede9fe", border: PURPLE, questions: "questions" },
  { name: "Common Entrance", icon: "🌟", count: "5,200+", color: "#fff7ed", border: "#ea580c", questions: "questions" },
];

const cbtSubjects = [
  { name: "Biology", icon: <FlaskConical size={20} />, color: G, years: ["2023", "2022", "2021", "2020", "2019"] },
  { name: "Chemistry", icon: <AtomIcon size={20} />, color: RED, years: ["2023", "2022", "2021", "2020"] },
  { name: "Mathematics", icon: <Calculator size={20} />, color: AMBER, years: ["2023", "2022", "2021", "2020", "2019"] },
  { name: "Physics", icon: <Zap size={20} />, color: BLUE, years: ["2023", "2022", "2021", "2020"] },
  { name: "English", icon: <PenLine size={20} />, color: PURPLE, years: ["2023", "2022", "2021"] },
  { name: "Literature", icon: <BookOpen size={20} />, color: "#0891b2", years: ["2023", "2022", "2021"] },
];

const cbtModes = [
  { id: "practice", label: "Practice Mode", desc: "Study at your own pace. See answers immediately.", icon: "📖" },
  { id: "exam", label: "Exam Mode", desc: "Timed. Realistic exam experience. No hints.", icon: "⏱️" },
  { id: "challenge", label: "Challenge Mode", desc: "Compete with others in real time.", icon: "⚡" },
  { id: "mock", label: "Mock Exam", desc: "Full-length simulation. Replicate exam day.", icon: "🎯" },
];

const cbtQs = [
  {
    id: 1, subject: "Biology",
    text: "The process by which plants manufacture their own food using sunlight, water, and carbon dioxide is called:",
    options: [{ id: "A", text: "Respiration" }, { id: "B", text: "Photosynthesis" }, { id: "C", text: "Transpiration" }, { id: "D", text: "Osmosis" }],
    correct: "B",
    explanation: "Photosynthesis occurs in chloroplasts. Light energy converts CO₂ + H₂O → glucose + O₂. This is the reverse of respiration.",
  },
  {
    id: 2, subject: "Biology",
    text: "Which organelle is known as the 'powerhouse of the cell' and is responsible for ATP production?",
    options: [{ id: "A", text: "Chloroplast" }, { id: "B", text: "Nucleus" }, { id: "C", text: "Mitochondria" }, { id: "D", text: "Ribosome" }],
    correct: "C",
    explanation: "Mitochondria carry out cellular respiration, converting glucose and oxygen into ATP, water, and CO₂.",
  },
  {
    id: 3, subject: "Mathematics",
    text: "If 2x + 3 = 11, what is the value of x?",
    options: [{ id: "A", text: "3" }, { id: "B", text: "4" }, { id: "C", text: "5" }, { id: "D", text: "7" }],
    correct: "B",
    explanation: "2x + 3 = 11 → 2x = 8 → x = 4. Always isolate the variable by performing inverse operations.",
  },
  {
    id: 4, subject: "Chemistry",
    text: "What is the chemical formula for sulfuric acid?",
    options: [{ id: "A", text: "HCl" }, { id: "B", text: "H₂SO₃" }, { id: "C", text: "H₂SO₄" }, { id: "D", text: "H₂S" }],
    correct: "C",
    explanation: "Sulfuric acid is H₂SO₄. It is a strong diprotic acid and one of the most widely produced industrial chemicals.",
  },
  {
    id: 5, subject: "Physics",
    text: "A car travels 120 km in 2 hours. What is its average speed?",
    options: [{ id: "A", text: "40 km/h" }, { id: "B", text: "60 km/h" }, { id: "C", text: "80 km/h" }, { id: "D", text: "100 km/h" }],
    correct: "B",
    explanation: "Average speed = total distance ÷ time = 120 km ÷ 2 h = 60 km/h.",
  },
];

const notifications = [
  { id: 1, type: "achievement", text: "You earned the 'Streak Master' badge! 🔥", time: "2 min ago", read: false },
  { id: 2, type: "exam", text: "WAEC Biology Mock starts in 3 hours. Don't forget!", time: "1 hr ago", read: false },
  { id: 3, type: "rank", text: "You moved up to #5 on the National Leaderboard 🎉", time: "3 hrs ago", read: true },
  { id: 4, type: "course", text: "New lesson added: Quadratic Equations – Advanced", time: "Yesterday", read: true },
  { id: 5, type: "ai", text: "Your AI study plan for July is ready. Check it out.", time: "Yesterday", read: true },
];

const faqs = [
  { q: "Is EduMaster Africa free to use?", a: "Yes! We have a robust free tier covering thousands of past questions, video lessons, and basic AI tutoring. Premium plans unlock unlimited CBT practice, advanced AI features, and full course access." },
  { q: "Which exams does EduMaster cover?", a: "We cover WAEC, NECO, NABTEB, JAMB, BECE, Post-UTME, Common Entrance, SAT, IELTS, Cambridge, and more. New exams are added regularly based on student demand." },
  { q: "How does the AI Tutor work?", a: "EduMaster AI is trained on the Nigerian and international curriculum. It understands natural language questions, explains concepts step-by-step, solves math problems, marks essays, and adapts to your learning level over time." },
  { q: "Can my school use EduMaster?", a: "Absolutely. Our School License gives administrators tools to manage students, upload school-specific exams, track class performance, generate report cards, and communicate with parents. Contact us for institutional pricing." },
  { q: "Can I use EduMaster offline?", a: "Our mobile apps (Android and iOS) support offline mode. Download lessons, notes, and question packs while connected — then study anywhere, even without internet." },
  { q: "Is my data safe?", a: "We use end-to-end encryption, JWT authentication, and comply with GDPR and NDPR regulations. We never sell student data. Parental consent is required for users under 13." },
];

const partners = ["WAEC", "NUC", "UNN", "UNILAG", "ABU Zaria", "OAU Ile-Ife", "Ministry of Education", "NERDC", "JAMB Board", "British Council"];

const testimonials = [
  { name: "Ngozi Okafor", role: "SS3 Student, Lagos", text: "EduMaster helped me score 312 in JAMB. The CBT practice mode is exactly like the real exam. I practiced 400 past questions in 2 weeks!", score: "312/400 JAMB", avatar: "NO" },
  { name: "Ibrahim Musa", role: "Graduate, Kano", text: "I was struggling with Chemistry until I found the AI tutor. It explains every step in detail and generates practice questions instantly.", score: "A1 Chemistry", avatar: "IM" },
  { name: "Blessing Eze", role: "Parent, Enugu", text: "As a parent, I love the progress reports. I can see exactly what my daughter is studying, her scores, and how she ranks nationally.", score: "Parent Portal", avatar: "BE" },
  { name: "Chukwuemeka Nze", role: "Teacher, Anambra", text: "Creating CBT exams for my SS2 class used to take hours. Now I do it in minutes with AI-generated questions and automatic grading.", score: "Teacher Portal", avatar: "CN" },
];

const aiReplies: Record<string, string> = {
  default: "Great question! Let me break that down for you step by step...",
  photosynthesis: "**Photosynthesis** is the process by which plants convert light energy into chemical energy:\n\n6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nIt occurs in two stages:\n1. **Light reactions** (thylakoid) — capture light, produce ATP and NADPH\n2. **Calvin cycle** (stroma) — uses ATP + NADPH to fix CO₂ into glucose\n\nWant me to generate practice questions on this? 📝",
  jamb: "For JAMB 2025, focus on these high-yield areas:\n\n**Biology**: Cell division, genetics, ecology, reproduction\n**Chemistry**: Electrochemistry, organic reactions, equilibrium\n**Physics**: Waves, electricity, mechanics\n**Maths**: Algebra, trigonometry, statistics\n\nI recommend 40 questions/day for 6 weeks. Want me to build your personalized study timetable? 📅",
  plan: "I'll create a personalized 45-day WAEC study plan for you:\n\n**Week 1–2**: English & Literature (high marks, fast gains)\n**Week 3–4**: Biology & Chemistry (your weakest subjects)\n**Week 5–6**: Mathematics (daily problem sets)\n**Week 7**: Mock exams + review\n\nShall I schedule daily reminders and track your progress? ✅",
};

// ─── SHARED COMPONENTS ──────────────────────────────────────

function AvatarComp({ initials, size = "md", color = G }: { initials: string; size?: "sm" | "md" | "lg"; color?: string }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" };
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`} style={{ backgroundColor: color }}>
      {initials}
    </div>
  );
}

function BadgeComp({ label, color = G }: { label: string; color?: string }) {
  return <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>{label}</span>;
}

function ProgressBar({ value, color = G, height = "h-2" }: { value: number; color?: string; height?: string }) {
  return (
    <div className={`${height} bg-muted rounded-full overflow-hidden`}>
      <div className={`${height} rounded-full transition-all duration-700`} style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function Logo({ onClick, size = "md" }: { onClick?: () => void; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "text-base" : "text-lg";
  return (
    <button onClick={onClick} className={`flex items-center gap-2 font-black ${cls}`} style={{ fontFamily: "Nunito, sans-serif" }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm" style={{ background: G }}>E</div>
      <span style={{ color: G }}>EduMaster</span>
      <span style={{ color: AMBER }}>Africa</span>
    </button>
  );
}

// Notification panel
function NotifPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items, setItems] = useState(notifications);
  const unread = items.filter(n => !n.read).length;
  const typeIcon: Record<string, string> = { achievement: "🏅", exam: "📋", rank: "🏆", course: "📚", ai: "🤖" };

  if (!open) return null;
  return (
    <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="font-bold text-sm">Notifications {unread > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full text-white text-xs" style={{ background: RED }}>{unread}</span>}</div>
        <button onClick={() => setItems(i => i.map(n => ({ ...n, read: true })))} className="text-xs font-semibold" style={{ color: G }}>Mark all read</button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {items.map(n => (
          <div key={n.id} onClick={() => setItems(i => i.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${!n.read ? "bg-green-50" : ""}`}>
            <span className="text-xl flex-shrink-0">{typeIcon[n.type]}</span>
            <div className="min-w-0">
              <p className={`text-xs leading-relaxed ${!n.read ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{n.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: G }} />}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-border">
        <button className="text-xs font-bold w-full text-center" style={{ color: G }}>View all notifications →</button>
      </div>
    </div>
  );
}

// Course detail modal
function CourseModal({ course, onClose, onNavigate }: { course: typeof allCourses[0]; onClose: () => void; onNavigate: (p: Page) => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl w-full max-w-lg border border-border shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="h-3" style={{ background: course.color }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <BadgeComp label={course.category} color={course.color} />
              <h2 className="font-black text-xl text-foreground mt-2">{course.title}</h2>
              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Lessons", value: String(course.lessons) },
              { label: "Students", value: `${(course.enrolled / 1000).toFixed(1)}k` },
              { label: "Rating", value: String(course.rating) + " ★" },
            ].map(s => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-muted/50">
                <div className="font-black text-lg text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 mb-5">
            {["HD video lessons with downloadable notes", "AI-generated practice questions per topic", "Progress tracking and mastery scores", "Certificate of completion", "Lifetime access to updates"].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                <Check size={14} style={{ color: G }} />
                {f}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="font-black text-2xl" style={{ color: G }}>{course.price}</div>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted">Preview</button>
              <button onClick={() => { onClose(); onNavigate("dashboard"); toast.success("Enrolled! Course added to your library."); }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: course.color }}>
                Enroll Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Accordion
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm text-foreground hover:bg-muted/40 transition-colors">
            {faq.q}
            {open === i ? <ChevronUp size={16} className="flex-shrink-0 text-muted-foreground" /> : <ChevronDown size={16} className="flex-shrink-0 text-muted-foreground" />}
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── AUTH PAGE ──────────────────────────────────────────────

function AuthPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<Role>("student");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", school: "" });

  const roles: { id: Role; label: string; icon: string }[] = [
    { id: "student", label: "Student", icon: "🎓" },
    { id: "teacher", label: "Teacher", icon: "👨‍🏫" },
    { id: "parent", label: "Parent", icon: "👪" },
    { id: "school", label: "School", icon: "🏫" },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "teacher") { onNavigate("teacher"); toast.success("Welcome back, Teacher!"); }
      else if (role === "parent") { onNavigate("parent"); toast.success("Welcome, Parent!"); }
      else { onNavigate("dashboard"); toast.success(mode === "login" ? "Welcome back, Adaeze! 👋" : "Account created! Let's get started. 🎉"); }
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-background flex font-body">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 p-12 text-white" style={{ background: "linear-gradient(160deg, #0c6438 0%, #073d25 100%)" }}>
        <Logo onClick={() => onNavigate("home")} />
        <div>
          <div className="text-4xl font-black mb-4" style={{ fontFamily: "Nunito, sans-serif" }}>
            Your Journey to<br /><span style={{ color: AMBER }}>Academic Excellence</span><br />Starts Here.
          </div>
          <p className="text-white/70 mb-8">Join 2.1 million students preparing for WAEC, JAMB, NECO and beyond.</p>
          <div className="space-y-3">
            {["Access 80,000+ past questions", "AI tutor available 24/7", "Track your progress in real time", "Free to start — no card required"].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: AMBER }}>
                  <Check size={12} color="#0d1f12" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-white/40">© 2025 EduMaster Africa</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo onClick={() => onNavigate("home")} /></div>
          <div className="mb-8">
            <h1 className="text-2xl font-black text-foreground mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
              {mode === "login" ? "Sign in to your account" : "Create your free account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="font-bold" style={{ color: G }}>
                {mode === "login" ? "Sign up free" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Role selector (register only) */}
          {mode === "register" && (
            <div className="mb-6">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">I am a</div>
              <div className="grid grid-cols-4 gap-2">
                {roles.map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)}
                    className={`flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-bold border-2 transition-all ${role === r.id ? "text-white" : "border-border text-muted-foreground hover:border-green-300"}`}
                    style={role === r.id ? { background: G, borderColor: G } : {}}>
                    <span className="text-lg">{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Full Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Adaeze Okonkwo" required />
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com" required />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••" required minLength={8} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {mode === "register" && (role === "student" || role === "teacher") && (
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">School (optional)</label>
                <input value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Queens College Lagos" />
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: G }}>
              {loading ? <><RefreshCw size={16} className="animate-spin" /> Processing...</> : mode === "login" ? "Sign In →" : "Create Free Account →"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Google", "Microsoft"].map(p => (
                <button key={p} onClick={() => { onNavigate("dashboard"); toast.success(`Signed in with ${p}`); }}
                  className="py-3 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2 text-foreground">
                  <Globe size={16} /> {p}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PRICING PAGE ───────────────────────────────────────────

function PricingPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Free", price: "₦0", annualPrice: "₦0", period: "", color: "#374151", bg: "#f9fafb",
      desc: "Great for getting started",
      features: ["1,000+ practice questions", "Basic CBT practice mode", "3 AI Tutor questions/day", "Limited course access", "Progress tracking"],
      missing: ["Unlimited questions", "Exam mode & mock exams", "Full AI Tutor", "All courses", "Certificate", "Offline access"],
      cta: "Get Started Free",
    },
    {
      name: "Premium", price: "₦2,500", annualPrice: "₦1,800", period: "/mo", color: G, bg: "#dcfce7",
      desc: "Everything you need to ace your exams",
      features: ["Unlimited past questions", "All CBT modes (Practice, Exam, Mock)", "Unlimited AI Tutor", "All 200+ courses", "Certificates of completion", "Offline learning (mobile)", "Performance analytics", "Priority support"],
      missing: [],
      cta: "Start Premium →",
      highlight: true,
    },
    {
      name: "School", price: "₦150k", annualPrice: "₦120k", period: "/yr per class", color: PURPLE, bg: "#ede9fe",
      desc: "For institutions and school administrators",
      features: ["Everything in Premium", "Student management dashboard", "Custom CBT exam builder", "Class performance analytics", "Report card generation", "Parent portal access", "Bulk student enrollment", "Dedicated account manager", "API access"],
      missing: [],
      cta: "Contact Sales →",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-20 px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo onClick={() => onNavigate("home")} />
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("auth")} className="text-sm font-semibold px-4 py-2 rounded-lg border border-border hover:bg-muted">Sign In</button>
          <button onClick={() => onNavigate("auth")} className="text-sm font-bold px-4 py-2 rounded-lg text-white" style={{ background: G }}>Get Started</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: G }}>Pricing</div>
          <h1 className="text-4xl font-black text-foreground mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">Start free. Upgrade when you're ready. No hidden fees.</p>
          <div className="inline-flex items-center gap-2 p-1 rounded-full border border-border bg-muted">
            <button onClick={() => setAnnual(false)} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${!annual ? "bg-card text-foreground shadow" : "text-muted-foreground"}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${annual ? "bg-card text-foreground shadow" : "text-muted-foreground"}`}>
              Annual <span className="text-xs ml-1" style={{ color: G }}>Save 28%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl border-2 overflow-hidden ${plan.highlight ? "shadow-2xl scale-105" : ""}`}
              style={{ borderColor: plan.highlight ? G : "var(--border)" }}>
              {plan.highlight && <div className="py-2 text-center text-xs font-black text-white" style={{ background: G }}>MOST POPULAR</div>}
              <div className="p-6 bg-card">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-lg" style={{ background: plan.bg }}>{plan.name === "Free" ? "🆓" : plan.name === "Premium" ? "⭐" : "🏫"}</div>
                  <div className="font-black text-lg text-foreground">{plan.name}</div>
                  <div className="text-xs text-muted-foreground">{plan.desc}</div>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-black text-foreground">{annual ? plan.annualPrice : plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <button
                  onClick={() => { onNavigate("auth"); toast.info(`${plan.name} plan selected`); }}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 mb-6"
                  style={plan.highlight ? { background: G, color: "#fff" } : plan.name === "School" ? { background: PURPLE, color: "#fff" } : { background: "transparent", border: "2px solid var(--border)", color: "var(--foreground)" }}
                >
                  {plan.cta}
                </button>
                <div className="space-y-2">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2 text-xs text-foreground">
                      <Check size={13} style={{ color: plan.color }} className="flex-shrink-0 mt-0.5" /> {f}
                    </div>
                  ))}
                  {plan.missing.map(f => (
                    <div key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <X size={13} className="flex-shrink-0 mt-0.5" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm mb-4">Trusted payment providers. Cancel anytime.</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {["Paystack", "Flutterwave", "Stripe", "Monnify"].map(p => (
              <div key={p} className="px-4 py-2 rounded-lg border border-border bg-card text-xs font-bold text-muted-foreground">{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD TABS ─────────────────────────────────────────

function MyCoursesTab({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-xl text-foreground">My Courses</h2>
        <button onClick={() => onNavigate("courses")} className="text-sm font-bold flex items-center gap-1" style={{ color: G }}>Browse More <ArrowRight size={14} /></button>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {enrolledCourses.map(c => {
          const pct = Math.round((c.completed / c.lessons) * 100);
          const done = c.completed === c.lessons;
          return (
            <div key={c.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0" style={{ background: c.color }}>📖</div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-foreground leading-snug mb-0.5">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.instructor}</div>
                </div>
                {done && <BadgeComp label="Complete ✓" color={G} />}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{c.completed}/{c.lessons} lessons</span>
                  <span className="font-bold" style={{ color: c.color }}>{pct}%</span>
                </div>
                <ProgressBar value={pct} color={c.color} />
              </div>
              <button
                onClick={() => { toast.success(`Resuming ${c.title}`); }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: done ? "#6b7280" : c.color }}
              >
                {done ? "Review Course" : "Continue Learning →"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PracticeTab({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-black text-xl text-foreground mb-1">Quick Practice</h2>
        <p className="text-sm text-muted-foreground">Pick a subject and start a practice session in seconds.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cbtSubjects.map(s => (
          <button key={s.name} onClick={() => onNavigate("cbt-setup")}
            className="bg-card rounded-2xl border border-border p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3" style={{ background: s.color }}>
              {s.icon}
            </div>
            <div className="font-bold text-foreground mb-1 group-hover:underline" style={{ textDecorationColor: s.color }}>{s.name}</div>
            <div className="text-xs text-muted-foreground">{s.years.length} years of past questions</div>
            <div className="mt-3 text-xs font-bold" style={{ color: s.color }}>Start Practice →</div>
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={18} style={{ color: "#f97316" }} />
          <div className="font-bold text-foreground">Today's Challenges</div>
        </div>
        <div className="space-y-3">
          {[
            { name: "Daily Biology Sprint", time: "10 questions · 5 min", xp: "+50 XP", done: true },
            { name: "Maths Speed Round", time: "15 questions · 8 min", xp: "+75 XP", done: false },
            { name: "Chemistry Concept Quiz", time: "20 questions · 12 min", xp: "+100 XP", done: false },
          ].map(c => (
            <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: c.done ? "#dcfce7" : "#ece8e0" }}>
                  {c.done ? <Check size={14} style={{ color: G }} /> : <Target size={14} className="text-muted-foreground" />}
                </div>
                <div>
                  <div className={`font-bold text-sm ${c.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.time}</div>
                </div>
              </div>
              {c.done ? <BadgeComp label="Done ✓" color={G} /> : (
                <button onClick={() => onNavigate("cbt")} className="text-xs font-bold px-3 py-1.5 rounded-lg text-white" style={{ background: G }}>Start</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h2 className="font-black text-xl text-foreground">Performance Analytics</h2>

      {/* Predicted scores */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { exam: "WAEC", predicted: "B2-A3", trend: "+5%", color: G },
          { exam: "JAMB", predicted: "284/400", trend: "+12 pts", color: AMBER },
          { exam: "Post-UTME", predicted: "68%", trend: "+4%", color: PURPLE },
        ].map(p => (
          <div key={p.exam} className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">{p.exam} Predicted</div>
            <div className="text-3xl font-black mb-1" style={{ color: p.color }}>{p.predicted}</div>
            <div className="text-xs font-semibold" style={{ color: G }}>{p.trend} this month ↑</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Score history */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="font-bold text-foreground mb-4">Score Trend (8 Weeks)</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={scoreHistory}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={G} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={G} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ece8e0" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={[50, 90]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v: number) => [`${v}%`, "Score"]} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke={G} strokeWidth={2.5} fill="url(#greenGrad)" dot={{ fill: G, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="font-bold text-foreground mb-4">Topic Mastery Radar</div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ece8e0" />
              <PolarAngleAxis dataKey="topic" tick={{ fontSize: 10 }} />
              <Radar name="Score" dataKey="score" stroke={G} fill={G} fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject mastery table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border font-bold text-foreground">Subject Mastery Breakdown</div>
        <div className="divide-y divide-border">
          {subjectProgress.map(s => (
            <div key={s.subject} className="px-5 py-3 flex items-center gap-4">
              <div className="w-28 font-semibold text-sm text-foreground">{s.subject}</div>
              <div className="flex-1"><ProgressBar value={s.mastery} color={s.mastery >= 80 ? G : s.mastery >= 65 ? AMBER : RED} /></div>
              <div className="w-12 text-right font-bold text-sm" style={{ color: s.mastery >= 80 ? G : s.mastery >= 65 ? AMBER : RED }}>{s.mastery}%</div>
              <div className="w-20 text-right text-xs text-muted-foreground">Predicted: {s.predicted}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Study calendar heatmap */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="font-bold text-foreground mb-4">Study Activity — June 2025</div>
        <div className="grid grid-cols-7 gap-1.5">
          {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="text-center text-xs text-muted-foreground font-bold">{d}</div>)}
          {Array.from({ length: 30 }, (_, i) => {
            const intensity = [0, 1, 3, 2, 0, 1, 2, 3, 2, 1, 0, 2, 3, 1, 2, 3, 2, 1, 3, 2, 1, 0, 3, 2, 1, 2, 3, 2, 1, 3][i];
            const opacity = [0.1, 0.3, 0.6, 1][intensity];
            return (
              <div key={i} title={`Day ${i + 1}: ${["No study", "Light", "Good", "Excellent"][intensity]}`}
                className="aspect-square rounded-sm cursor-pointer transition-transform hover:scale-110"
                style={{ background: intensity === 0 ? "#ece8e0" : G, opacity: intensity === 0 ? 1 : opacity }} />
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-muted-foreground">Less</span>
          {[0.15, 0.35, 0.65, 1].map(o => <div key={o} className="w-4 h-4 rounded-sm" style={{ background: G, opacity: o }} />)}
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  );
}

function LeaderboardTab() {
  const [filter, setFilter] = useState<"national" | "state" | "school">("national");
  const [period, setPeriod] = useState<"weekly" | "monthly" | "alltime">("alltime");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <h2 className="font-black text-xl text-foreground">Leaderboard</h2>
        <div className="flex flex-wrap gap-2">
          {(["national", "state", "school"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all capitalize"
              style={filter === f ? { background: G, color: "#fff" } : { background: "#ece8e0", color: "#5c6b5e" }}>
              {f === "national" ? "🌍 National" : f === "state" ? "📍 State" : "🏫 School"}
            </button>
          ))}
          {(["weekly", "monthly", "alltime"] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={period === p ? { background: AMBER, color: "#0d1f12" } : { background: "#ece8e0", color: "#5c6b5e" }}>
              {p === "weekly" ? "Week" : p === "monthly" ? "Month" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3 mb-2">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((entry, podiumPos) => {
          const heights = ["h-24", "h-32", "h-20"];
          const medals = ["🥈", "🥇", "🥉"];
          return (
            <div key={entry.rank} className={`flex flex-col items-center ${podiumPos === 1 ? "order-2" : podiumPos === 0 ? "order-1" : "order-3"}`}>
              <AvatarComp initials={entry.avatar} size="lg" color={[AMBER, "#c0c0c0", "#cd7f32"][entry.rank - 1]} />
              <div className="text-xs font-bold text-center mt-1 truncate max-w-full px-1">{entry.name.split(" ")[0]}</div>
              <div className="text-lg">{medals[podiumPos === 1 ? 0 : podiumPos === 0 ? 1 : 2]}</div>
              <div className={`w-full rounded-t-xl mt-2 flex items-end justify-center pb-2 ${heights[podiumPos === 1 ? 1 : podiumPos === 0 ? 0 : 2]}`}
                style={{ background: [AMBER + "40", "#c0c0c040", "#cd7f3240"][podiumPos === 1 ? 0 : podiumPos === 0 ? 1 : 2] }}>
                <div className="text-xs font-black">{entry.xp.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {leaderboard.map(entry => (
            <div key={entry.rank}
              className={`flex items-center gap-3 px-5 py-3.5 ${entry.isMe ? "border-l-4" : ""}`}
              style={entry.isMe ? { borderLeftColor: AMBER, background: "#fffbeb" } : {}}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                style={entry.rank <= 3 ? { background: [AMBER, "#c0c0c0", "#cd7f32"][entry.rank - 1], color: "#fff" } : { background: "#ece8e0", color: "#5c6b5e" }}>
                {entry.rank}
              </div>
              <AvatarComp initials={entry.avatar} size="sm" color={entry.isMe ? AMBER : G} />
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm truncate ${entry.isMe ? "text-amber-700" : "text-foreground"}`}>
                  {entry.name}{entry.isMe ? " (You)" : ""}
                </div>
                <div className="text-xs text-muted-foreground truncate">{entry.school}</div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                <Flame size={12} style={{ color: "#f97316" }} /> {entry.streak}d
              </div>
              <div className="font-black text-sm" style={{ fontFamily: "JetBrains Mono, monospace", color: entry.isMe ? AMBER : G }}>
                {entry.xp.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AITutorTab() {
  type Msg = { role: "user" | "ai"; text: string; typing?: boolean };
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hello Adaeze! 👋 I'm EduMaster AI — your personal learning companion.\n\nI can explain concepts, solve problems, generate questions, mark essays, and build study plans. What would you like to work on today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const quickPrompts = ["Explain photosynthesis", "I have JAMB in 40 days", "Create a study plan", "WAEC Chemistry tips"];

  function getReply(msg: string): string {
    const m = msg.toLowerCase();
    if (m.includes("photosynthesis")) return aiReplies.photosynthesis;
    if (m.includes("jamb") || m.includes("exam")) return aiReplies.jamb;
    if (m.includes("plan") || m.includes("timetable") || m.includes("schedule")) return aiReplies.plan;
    return `I understand you're asking about "${msg.slice(0, 40)}..."\n\nLet me break that down:\n\n**Key concept:** This topic appears in WAEC Biology and JAMB. Focus on understanding the mechanism and practical applications.\n\n**Quick tip:** Draw diagrams to reinforce visual memory — it works especially well for science topics.\n\nWould you like practice questions, a summary, or a deeper explanation? 📚`;
  }

  function sendMessage(text: string = input.trim()) {
    if (!text || isTyping) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: getReply(text) }]);
      setIsTyping(false);
    }, 1400 + Math.random() * 800);
  }

  function renderAIText(text: string) {
    return text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
      return <p key={i} className="mb-0.5" dangerouslySetInnerHTML={{ __html: bold || "&nbsp;" }} />;
    });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[700px] bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs" style={{ background: G }}>AI</div>
        <div>
          <div className="font-bold text-sm text-foreground">EduMaster AI</div>
          <div className="text-xs text-green-500">● Always online</div>
        </div>
        <div className="ml-auto flex gap-2">
          {["📖 Explain", "🧮 Solve", "📝 Essay", "📋 Generate"].map(a => (
            <button key={a} onClick={() => sendMessage(a.split(" ")[1] + " a concept for me")}
              className="hidden sm:block px-2.5 py-1 rounded-lg text-xs font-semibold border border-border hover:bg-muted transition-colors">{a}</button>
          ))}
        </div>
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto border-b border-border">
        {quickPrompts.map(p => (
          <button key={p} onClick={() => sendMessage(p)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-border hover:bg-muted transition-colors text-foreground">
            {p}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "ai" && <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ background: G }}>AI</div>}
            <div className={`max-w-xs sm:max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "rounded-tr-sm text-white" : "rounded-tl-sm text-foreground bg-muted"}`}
              style={msg.role === "user" ? { background: G } : {}}>
              {renderAIText(msg.text)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ background: G }}>AI</div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              {[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: G, animationDelay: `${i * 0.15}s` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-border">
        <div className="flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-muted-foreground"
            placeholder="Ask anything — photosynthesis, JAMB prep, essay help..." disabled={isTyping} />
          <button onClick={() => sendMessage()} disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40"
            style={{ background: G }}>
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">EduMaster AI · Trained on WAEC, JAMB, NECO curricula</p>
      </div>
    </div>
  );
}

function SettingsTab() {
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, push: true, sms: false, whatsapp: true });
  const [privacy, setPrivacy] = useState({ leaderboard: true, profile: false });

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-black text-xl text-foreground">Account Settings</h2>

      {/* Profile */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="font-bold text-foreground mb-4">Profile Information</div>
        <div className="flex items-center gap-4 mb-5">
          <AvatarComp initials="AO" size="lg" />
          <div>
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors">Change Photo</button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Adaeze Okonkwo" },
            { label: "Email", value: "adaeze@example.com" },
            { label: "School", value: "Queens College Lagos" },
            { label: "Class", value: "SS3" },
            { label: "State", value: "Lagos" },
            { label: "Exam Target", value: "WAEC + JAMB 2025" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-xs font-bold text-muted-foreground block mb-1">{f.label}</label>
              <input defaultValue={f.value} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          ))}
        </div>
        <button onClick={() => { setSaved(true); toast.success("Profile saved!"); setTimeout(() => setSaved(false), 2000); }}
          className="mt-4 px-5 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2" style={{ background: G }}>
          {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="font-bold text-foreground mb-4">Notification Preferences</div>
        <div className="space-y-4">
          {(Object.entries(notifs) as [keyof typeof notifs, boolean][]).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm capitalize text-foreground">{key === "push" ? "Push Notifications" : key === "sms" ? "SMS Alerts" : key === "whatsapp" ? "WhatsApp Updates" : "Email Digest"}</div>
                <div className="text-xs text-muted-foreground">
                  {key === "email" ? "Weekly summary and exam reminders" : key === "push" ? "Real-time alerts for scores and badges" : key === "sms" ? "Urgent alerts only" : "Study reminders via WhatsApp"}
                </div>
              </div>
              <button onClick={() => setNotifs(n => ({ ...n, [key]: !val }))}
                className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${val ? "" : "bg-muted"}`}
                style={val ? { background: G } : {}}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="font-bold text-foreground mb-4">Privacy</div>
        <div className="space-y-4">
          {(Object.entries(privacy) as [keyof typeof privacy, boolean][]).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-foreground">{key === "leaderboard" ? "Show me on Leaderboard" : "Public Profile"}</div>
                <div className="text-xs text-muted-foreground">{key === "leaderboard" ? "Other students can see your rank" : "Let others view your achievements"}</div>
              </div>
              <button onClick={() => setPrivacy(p => ({ ...p, [key]: !val }))}
                className="w-11 h-6 rounded-full relative transition-colors flex-shrink-0"
                style={{ background: val ? G : "var(--muted)" }}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-card rounded-2xl border-2 border-border p-6" style={{ borderColor: AMBER + "60" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-foreground">Current Plan</div>
          <BadgeComp label="Free" color="#6b7280" />
        </div>
        <p className="text-sm text-muted-foreground mb-4">Upgrade to Premium for unlimited questions, AI tutor, and all courses.</p>
        <button onClick={() => toast.info("Redirecting to pricing...")} className="px-5 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: AMBER, color: "#0d1f12" }}>
          Upgrade to Premium ⭐
        </button>
      </div>
    </div>
  );
}

// ─── STUDENT DASHBOARD ──────────────────────────────────────

function StudentDashboard({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview", icon: <Home size={18} /> },
    { id: "courses", label: "My Courses", icon: <BookOpen size={18} /> },
    { id: "practice", label: "Practice", icon: <Target size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    { id: "leaderboard", label: "Leaderboard", icon: <Trophy size={18} /> },
    { id: "ai", label: "AI Tutor", icon: <Brain size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const upcomingExams = [
    { name: "WAEC Biology Mock", date: "Jul 8, 2025", time: "10:00 AM", color: G },
    { name: "JAMB CBT Practice", date: "Jul 11, 2025", time: "2:00 PM", color: PURPLE },
    { name: "Chemistry Quiz — SS3A", date: "Jul 14, 2025", time: "9:00 AM", color: BLUE },
  ];

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Sidebar */}
      <aside className={`fixed lg:relative z-40 h-full flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ width: 240, background: "#0c6438" }}>
        <div className="flex flex-col h-full">
          <div className="px-5 py-5 border-b border-white/10">
            <Logo onClick={() => onNavigate("home")} />
          </div>
          <div className="px-3 py-4 flex-1 overflow-y-auto">
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest px-2 mb-2">Menu</div>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 transition-all ${activeTab === item.id ? "bg-white text-green-800" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
                {item.icon} {item.label}
              </button>
            ))}
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest px-2 mb-2 mt-6">Quick Exams</div>
            {[{ label: "WAEC Practice", icon: "📋" }, { label: "JAMB CBT", icon: "🎯" }, { label: "NECO Mock", icon: "📚" }].map(e => (
              <button key={e.label} onClick={() => onNavigate("cbt-setup")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 text-white/70 hover:bg-white/10 hover:text-white transition-all">
                <span>{e.icon}</span> {e.label}
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <AvatarComp initials="AO" size="sm" color="rgba(255,255,255,0.2)" />
              <div className="min-w-0">
                <div className="text-white text-sm font-bold truncate">Adaeze Okonkwo</div>
                <div className="text-white/50 text-xs">SS3 · Queens College</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
            <div>
              <div className="font-black text-foreground text-base">{navItems.find(n => n.id === activeTab)?.label}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">Mon, 30 Jun 2025 · 45 days to WAEC</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative">
                <Bell size={18} />
                {unreadNotifs > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: RED }} />}
              </button>
              <NotifPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>
            <div className="relative">
              <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-muted transition-colors">
                <AvatarComp initials="AO" size="sm" />
                <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <div className="font-bold text-sm">Adaeze Okonkwo</div>
                    <div className="text-xs text-muted-foreground">adaeze@example.com</div>
                  </div>
                  {[
                    { icon: <User size={14} />, label: "My Profile", action: () => setActiveTab("settings") },
                    { icon: <Award size={14} />, label: "Certificates", action: () => toast.info("Coming soon!") },
                    { icon: <Settings size={14} />, label: "Settings", action: () => setActiveTab("settings") },
                    { icon: <LogOut size={14} />, label: "Sign Out", action: () => onNavigate("home") },
                  ].map(item => (
                    <button key={item.label} onClick={() => { item.action(); setProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left text-foreground">
                      <span className="text-muted-foreground">{item.icon}</span> {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 pb-24">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-black text-2xl text-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>Good morning, Adaeze 👋</h1>
                  <p className="text-sm text-muted-foreground">3 topics scheduled today. Let's go!</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold" style={{ background: "#fff7ed", color: "#c2410c" }}>
                  <Flame size={18} style={{ color: "#f97316" }} /> 14-day streak 🔥
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total XP", value: "9,880", icon: <Zap size={18} />, change: "+240 today", color: G, bg: "#dcfce7" },
                  { label: "National Rank", value: "#5", icon: <Trophy size={18} />, change: "↑ from #8", color: PURPLE, bg: "#ede9fe" },
                  { label: "Avg. Score", value: "74.8%", icon: <TrendingUp size={18} />, change: "+3.2% this week", color: BLUE, bg: "#dbeafe" },
                  { label: "Questions Done", value: "1,247", icon: <CheckCircle size={18} />, change: "Last 30 days", color: AMBER, bg: "#fef9c3" },
                ].map(card => (
                  <div key={card.label} className="bg-card rounded-2xl p-5 border border-border hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{card.label}</div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
                    </div>
                    <div className="text-2xl font-black text-foreground mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>{card.value}</div>
                    <div className="text-xs font-semibold" style={{ color: card.color }}>{card.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-card rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-5">
                    <div className="font-bold text-foreground">Subject Mastery</div>
                    <button onClick={() => setActiveTab("analytics")} className="text-xs font-semibold" style={{ color: G }}>View Analytics →</button>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={subjectProgress} barSize={24}>
                      <XAxis dataKey="subject" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <Tooltip formatter={(v: number) => [`${v}%`, "Mastery"]} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", fontSize: 12 }} />
                      <Bar dataKey="mastery" fill={G} radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-card rounded-2xl p-5 border border-border">
                  <div className="font-bold text-foreground mb-5">Study Hours vs Target</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={weeklyStudy}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ece8e0" />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", fontSize: 12 }} />
                      <Line type="monotone" dataKey="hours" stroke={G} strokeWidth={2.5} dot={{ fill: G, r: 4 }} name="Actual" />
                      <Line type="monotone" dataKey="target" stroke={AMBER} strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-foreground">Upcoming Exams</div>
                    <button className="text-xs font-semibold" style={{ color: G }}>See all</button>
                  </div>
                  <div className="space-y-3">
                    {upcomingExams.map(exam => (
                      <div key={exam.name} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                        <div className="w-2 h-10 rounded-full" style={{ background: exam.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate text-foreground">{exam.name}</div>
                          <div className="text-xs text-muted-foreground">{exam.date} · {exam.time}</div>
                        </div>
                        <button onClick={() => onNavigate("cbt-setup")} className="text-xs font-bold px-3 py-1.5 rounded-lg text-white" style={{ background: exam.color }}>
                          Practice
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-foreground">National Leaderboard</div>
                    <button onClick={() => setActiveTab("leaderboard")} className="text-xs font-semibold" style={{ color: G }}>Full board →</button>
                  </div>
                  <div className="space-y-2">
                    {leaderboard.slice(0, 5).map(entry => (
                      <div key={entry.rank}
                        className={`flex items-center gap-3 p-3 rounded-xl ${entry.isMe ? "border-2" : "bg-muted/40"}`}
                        style={entry.isMe ? { borderColor: AMBER, background: "#fffbeb" } : {}}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                          style={entry.rank <= 3 ? { background: [AMBER, "#c0c0c0", "#cd7f32"][entry.rank - 1], color: "#fff" } : { background: "#ece8e0", color: "#5c6b5e" }}>
                          {entry.rank}
                        </div>
                        <AvatarComp initials={entry.avatar} size="sm" color={entry.isMe ? AMBER : G} />
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-sm truncate ${entry.isMe ? "text-amber-700" : "text-foreground"}`}>{entry.name}{entry.isMe ? " (You)" : ""}</div>
                          <div className="text-xs text-muted-foreground truncate">{entry.school}</div>
                        </div>
                        <div className="text-sm font-black" style={{ fontFamily: "JetBrains Mono, monospace", color: entry.isMe ? AMBER : G }}>{entry.xp.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && <MyCoursesTab onNavigate={onNavigate} />}
          {activeTab === "practice" && <PracticeTab onNavigate={onNavigate} />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "leaderboard" && <LeaderboardTab />}
          {activeTab === "ai" && <AITutorTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

// ─── CBT SETUP ──────────────────────────────────────────────

function CBTSetup({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [subject, setSubject] = useState<string | null>(null);
  const [year, setYear] = useState<string>("2023");
  const [mode, setMode] = useState<string>("practice");
  const [step, setStep] = useState(1);

  const selectedSubject = cbtSubjects.find(s => s.name === subject);

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="border-b border-border bg-card px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
        <Logo />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "text-white" : "bg-muted text-muted-foreground"}`}
                style={step >= s ? { background: G } : {}}>
                {step > s ? <Check size={14} /> : s}
              </div>
              <span className={`text-sm font-semibold ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Subject" : s === 2 ? "Settings" : "Start"}
              </span>
              {s < 3 && <div className="flex-1 h-px bg-border w-8 sm:w-16" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-black text-foreground mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>Choose a Subject</h1>
            <p className="text-muted-foreground text-sm mb-6">Select the subject you want to practice today.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cbtSubjects.map(s => (
                <button key={s.name} onClick={() => setSubject(s.name)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all hover:shadow-md ${subject === s.name ? "text-white" : "bg-card border-border"}`}
                  style={subject === s.name ? { background: s.color, borderColor: s.color } : {}}>
                  <div className={`mb-2 ${subject === s.name ? "text-white" : ""}`} style={subject !== s.name ? { color: s.color } : {}}>{s.icon}</div>
                  <div className={`font-bold text-sm ${subject === s.name ? "text-white" : "text-foreground"}`}>{s.name}</div>
                  <div className={`text-xs ${subject === s.name ? "text-white/70" : "text-muted-foreground"}`}>{s.years.length} years</div>
                </button>
              ))}
            </div>
            <button onClick={() => subject && setStep(2)} disabled={!subject}
              className="mt-6 px-6 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40 transition-all"
              style={{ background: G }}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && selectedSubject && (
          <div>
            <h1 className="text-2xl font-black text-foreground mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>Configure Your Session</h1>
            <p className="text-muted-foreground text-sm mb-6">{subject} · Customise your practice.</p>

            <div className="space-y-6">
              <div>
                <div className="text-sm font-bold text-foreground mb-3">Year / Paper</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSubject.years.map(y => (
                    <button key={y} onClick={() => setYear(y)}
                      className="px-4 py-2 rounded-xl font-bold text-sm transition-all"
                      style={year === y ? { background: selectedSubject.color, color: "#fff" } : { background: "#ece8e0", color: "#5c6b5e" }}>
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-foreground mb-3">Mode</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cbtModes.map(m => (
                    <button key={m.id} onClick={() => setMode(m.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${mode === m.id ? "border-green-600 bg-green-50" : "border-border bg-card"}`}>
                      <div className="text-xl mb-1">{m.icon}</div>
                      <div className={`font-bold text-sm ${mode === m.id ? "text-green-800" : "text-foreground"}`}>{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl font-bold text-sm border border-border hover:bg-muted">← Back</button>
              <button onClick={() => setStep(3)} className="px-6 py-3 rounded-xl font-bold text-sm text-white" style={{ background: G }}>Review →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-2xl font-black text-foreground mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>Ready to Start!</h1>
            <p className="text-muted-foreground text-sm mb-6">Review your session details below.</p>
            <div className="bg-card rounded-2xl border border-border p-6 mb-6 space-y-4">
              {[
                { label: "Subject", value: subject || "" },
                { label: "Year", value: year },
                { label: "Mode", value: cbtModes.find(m2 => m2.id === mode)?.label || "" },
                { label: "Questions", value: "5 questions (demo)" },
                { label: "Duration", value: mode === "practice" ? "Untimed" : "45 minutes" },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-semibold">{row.label}</span>
                  <span className="font-bold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-5 py-3 rounded-xl font-bold text-sm border border-border hover:bg-muted">← Back</button>
              <button onClick={() => onNavigate("cbt")}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: G }}>
                <Play size={16} /> Start Exam
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CBT EXAM ───────────────────────────────────────────────

function CBTExam({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(45 * 60);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timerColor = seconds < 300 ? RED : seconds < 900 ? AMBER : G;
  const question = cbtQs[currentQ];
  const chosen = selected[currentQ];
  const answeredCount = Object.keys(selected).length;

  if (submitted) {
    const correct = Object.keys(selected).filter(k => selected[+k] === cbtQs[+k]?.correct).length;
    const pct = Math.round((correct / cbtQs.length) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 font-body">
        <div className="bg-card rounded-3xl p-8 max-w-lg w-full border border-border shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-4" style={{ background: pct >= 60 ? "#dcfce7" : "#fee2e2" }}>
              {pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "📚"}
            </div>
            <div className="text-5xl font-black mb-2" style={{ fontFamily: "Nunito, sans-serif", color: pct >= 70 ? G : pct >= 50 ? AMBER : RED }}>{pct}%</div>
            <div className="text-lg font-semibold text-muted-foreground">{correct} of {cbtQs.length} correct</div>
            <div className="text-sm text-muted-foreground mt-1">
              {pct >= 80 ? "Outstanding! You're on track for A1." : pct >= 60 ? "Good work! Keep pushing — you can do better." : "Keep practicing — every attempt makes you better."}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[{ label: "Correct", value: correct, color: G }, { label: "Wrong", value: cbtQs.length - correct, color: RED }, { label: "Score", value: `${pct}%`, color: AMBER }].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: `${s.color}15` }}>
                <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-muted-foreground font-semibold">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            {cbtQs.map((q, i) => {
              const ans = selected[i];
              const isRight = ans === q.correct;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl text-sm" style={{ background: isRight ? "#dcfce7" : "#fee2e2" }}>
                  {isRight ? <Check size={14} style={{ color: G }} className="mt-0.5 flex-shrink-0" /> : <X size={14} style={{ color: RED }} className="mt-0.5 flex-shrink-0" />}
                  <div className={`font-semibold truncate ${isRight ? "text-green-800" : "text-red-700"}`}>Q{i + 1}: {q.text.slice(0, 60)}...</div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setSubmitted(false); setSelected({}); setCurrentQ(0); setSeconds(45 * 60); setRevealed(false); setFlagged(new Set()); }}
              className="flex-1 py-3 rounded-xl font-bold text-sm border border-border hover:bg-muted transition-colors">
              Try Again
            </button>
            <button onClick={() => { onNavigate("dashboard"); toast.success(`+${Math.round(pct * 0.5)} XP earned!`); }}
              className="flex-1 py-3 rounded-xl font-bold text-sm text-white" style={{ background: G }}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> Exit
        </button>
        <div className="hidden sm:block text-sm font-bold text-muted-foreground">WAEC Biology · 2023</div>
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-sm font-bold border-2"
          style={{ color: timerColor, borderColor: timerColor, background: `${timerColor}12`, fontFamily: "JetBrains Mono, monospace" }}>
          <AlarmClock size={14} /> {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-5">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">Q {currentQ + 1} / {cbtQs.length}</div>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${((currentQ + 1) / cbtQs.length) * 100}%`, background: G }} />
              </div>
              <button onClick={() => setFlagged(f => { const n = new Set(f); n.has(currentQ) ? n.delete(currentQ) : n.add(currentQ); return n; })}
                className={`p-1.5 rounded-lg transition-colors ${flagged.has(currentQ) ? "text-amber-500 bg-amber-50" : "text-muted-foreground hover:bg-muted"}`}>
                <Bookmark size={15} />
              </button>
            </div>

            <p className="font-semibold text-base text-foreground leading-relaxed mb-5">{question.text}</p>

            <div className="space-y-3">
              {question.options.map(opt => {
                const isChosen = chosen === opt.id;
                const isRight = opt.id === question.correct;
                let style: React.CSSProperties = { borderColor: "var(--border)", background: "var(--card)" };
                let txt = "text-foreground";
                if (revealed) {
                  if (isRight) { style = { borderColor: G, background: "#dcfce7" }; txt = "text-green-800"; }
                  else if (isChosen) { style = { borderColor: RED, background: "#fee2e2" }; txt = "text-red-700"; }
                } else if (isChosen) {
                  style = { borderColor: G, background: "#dcfce7" }; txt = "text-green-800";
                }
                return (
                  <button key={opt.id} onClick={() => !revealed && setSelected(s => ({ ...s, [currentQ]: opt.id }))}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-left transition-all text-sm font-semibold ${txt} ${!revealed ? "hover:border-green-400 hover:bg-green-50" : ""}`}
                    style={style}>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                      style={{ background: (isChosen || (revealed && isRight)) ? G : "#ece8e0", color: (isChosen || (revealed && isRight)) ? "#fff" : "#5c6b5e" }}>
                      {opt.id}
                    </span>
                    {opt.text}
                    {revealed && isRight && <Check size={15} className="ml-auto text-green-600" />}
                    {revealed && isChosen && !isRight && <X size={15} className="ml-auto text-red-500" />}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className="mt-5 p-4 rounded-xl border-l-4" style={{ background: "#dcfce7", borderColor: G }}>
                <div className="font-bold text-sm text-green-800 mb-1 flex items-center gap-2"><Sparkles size={13} /> Explanation</div>
                <p className="text-sm text-green-900 leading-relaxed">{question.explanation}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => { setCurrentQ(q => Math.max(0, q - 1)); setRevealed(false); }} disabled={currentQ === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border border-border hover:bg-muted disabled:opacity-40">
              <ChevronLeft size={15} /> Prev
            </button>
            <div className="flex gap-2">
              {chosen && !revealed && (
                <button onClick={() => setRevealed(true)} className="px-4 py-2.5 rounded-xl font-bold text-sm border-2 transition-colors"
                  style={{ borderColor: AMBER, color: AMBER }}>
                  Show Answer
                </button>
              )}
              {currentQ < cbtQs.length - 1 ? (
                <button onClick={() => { setCurrentQ(q => q + 1); setRevealed(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: G }}>
                  Next <ChevronRight size={15} />
                </button>
              ) : (
                <button onClick={() => setSubmitted(true)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: RED }}>
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="font-bold text-sm mb-3 text-foreground">Navigator</div>
            <div className="grid grid-cols-5 gap-1.5">
              {cbtQs.map((_, i) => {
                const ans = selected[i]; const isCurr = i === currentQ; const flag = flagged.has(i);
                return (
                  <button key={i} onClick={() => { setCurrentQ(i); setRevealed(false); }}
                    className="w-9 h-9 rounded-lg text-xs font-black transition-all relative"
                    style={{ background: isCurr ? G : ans ? "#dcfce7" : "#ece8e0", color: isCurr ? "#fff" : ans ? "#166534" : "#5c6b5e", border: isCurr ? `2px solid ${G}` : "2px solid transparent" }}>
                    {i + 1}
                    {flag && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" style={{ background: AMBER }} />}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 space-y-1">
              {[{ color: G, text: "Current" }, { color: "#dcfce7", text: "Answered" }, { color: "#ece8e0", text: "Unanswered" }, { color: AMBER, text: "Flagged" }].map(l => (
                <div key={l.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3.5 h-3.5 rounded-sm" style={{ background: l.color }} /> {l.text}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{answeredCount} answered</span><span>{cbtQs.length - answeredCount} left</span>
            </div>
            <ProgressBar value={(answeredCount / cbtQs.length) * 100} />
            <button onClick={() => setSubmitted(true)} className="w-full mt-4 py-3 rounded-xl font-bold text-sm text-white" style={{ background: RED }}>
              Submit Exam
            </button>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="font-bold text-sm mb-2 text-foreground flex items-center gap-2"><Brain size={13} style={{ color: G }} /> AI Hint</div>
            <p className="text-xs text-muted-foreground mb-3">Stuck? Get a nudge without seeing the answer.</p>
            <button onClick={() => toast.info("Hint: Consider the organelle that generates energy for the cell.")}
              className="w-full py-2 rounded-lg text-xs font-bold border-2 transition-colors" style={{ borderColor: G, color: G }}>
              Get a Hint →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COURSES PAGE ───────────────────────────────────────────

function CoursesPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<typeof allCourses[0] | null>(null);
  const filters = ["All", "WAEC", "JAMB", "NECO", "Post-UTME", "Primary", "International"];
  const filtered = allCourses.filter(c => (filter === "All" || c.category === filter) && (search === "" || c.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="bg-card border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-20">
        <Logo onClick={() => onNavigate("home")} />
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <button onClick={() => onNavigate("home")} className="text-muted-foreground hover:text-foreground">Home</button>
          <button onClick={() => onNavigate("pricing")} className="text-muted-foreground hover:text-foreground">Pricing</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("auth")} className="text-sm font-semibold px-3 py-2 rounded-lg border border-border hover:bg-muted hidden sm:block">Sign In</button>
          <button onClick={() => onNavigate("dashboard")} className="text-sm font-bold px-4 py-2 rounded-lg text-white" style={{ background: G }}>Dashboard</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: G }}>Course Library</div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>Find Your Course</h1>
          <p className="text-muted-foreground max-w-xl">Expert-crafted courses for every major exam. Taught by Nigeria's top educators.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search courses..." />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-2 rounded-full text-xs font-bold transition-all"
                style={filter === f ? { background: G, color: "#fff" } : { background: "#ece8e0", color: "#5c6b5e" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-5">{filtered.length} courses found</div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(course => (
            <div key={course.id} onClick={() => setSelectedCourse(course)}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group">
              <div className="h-2" style={{ background: course.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: course.color }}>📖</div>
                  {course.badge && <BadgeComp label={course.badge} color={course.badge === "New" ? BLUE : course.badge === "Bestseller" ? AMBER : G} />}
                </div>
                <h3 className="font-bold text-sm text-foreground mb-0.5 leading-snug group-hover:underline">{course.title}</h3>
                <div className="text-xs text-muted-foreground mb-1">{course.instructor}</div>
                <div className="text-xs font-semibold mb-3" style={{ color: course.color }}>{course.category}</div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><BookOpen size={10} /> {course.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {(course.enrolled / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold">{course.rating}</span>
                  </div>
                  <div className="font-black text-sm" style={{ color: course.color }}>{course.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">🔍</div>
            <div className="font-bold text-foreground mb-1">No courses found</div>
            <div className="text-sm text-muted-foreground">Try a different search or filter.</div>
          </div>
        )}
      </div>

      {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} onNavigate={onNavigate} />}
    </div>
  );
}

// ─── TEACHER PORTAL ─────────────────────────────────────────

function TeacherPortal({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <Home size={16} /> },
    { id: "classes", label: "My Classes", icon: <Users size={16} /> },
    { id: "cbt", label: "Create CBT", icon: <FileText size={16} /> },
    { id: "grades", label: "Gradebook", icon: <Award size={16} /> },
  ];

  const students = [
    { name: "Adaeze Okonkwo", score: 88, subject: "Biology", status: "passed" },
    { name: "Emeka Osei", score: 72, subject: "Biology", status: "passed" },
    { name: "Fatimah Bello", score: 54, subject: "Biology", status: "failed" },
    { name: "Tunde Adesanya", score: 91, subject: "Biology", status: "passed" },
    { name: "Amara Nwosu", score: 68, subject: "Biology", status: "passed" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="border-b border-border bg-card px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-20">
        <Logo onClick={() => onNavigate("home")} />
        <div className="flex items-center gap-2">
          <BadgeComp label="Teacher" color={BLUE} />
          <AvatarComp initials="TO" size="sm" color={BLUE} />
          <button onClick={() => onNavigate("home")} className="ml-2 text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>Teacher Portal</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Mr. Taiwo Adewale · Biology · SS2A &amp; SS3B</p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === t.id ? "text-green-700" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              style={activeTab === t.id ? { borderColor: G } : {}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Students", value: "147", icon: "👥", color: BLUE },
                { label: "Avg Class Score", value: "71.4%", icon: "📊", color: G },
                { label: "Exams This Month", value: "8", icon: "📋", color: PURPLE },
                { label: "Assignments Due", value: "3", icon: "⏰", color: RED },
              ].map(c => (
                <div key={c.label} className="bg-card rounded-2xl border border-border p-5">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="text-2xl font-black text-foreground mb-0.5" style={{ fontFamily: "Nunito, sans-serif" }}>{c.value}</div>
                  <div className="text-xs text-muted-foreground font-semibold">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border font-bold text-foreground">Recent Student Performance — Biology Test</div>
              <div className="divide-y divide-border">
                {students.map(s => (
                  <div key={s.name} className="px-5 py-3 flex items-center gap-4">
                    <AvatarComp initials={s.name.split(" ").map(n => n[0]).join("")} size="sm" color={G} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-foreground">{s.name}</div>
                    </div>
                    <div className="w-24 hidden sm:block"><ProgressBar value={s.score} color={s.score >= 70 ? G : s.score >= 50 ? AMBER : RED} /></div>
                    <div className="font-black text-sm w-12 text-right" style={{ color: s.score >= 70 ? G : s.score >= 50 ? AMBER : RED }}>{s.score}%</div>
                    <BadgeComp label={s.status} color={s.status === "passed" ? G : RED} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "cbt" && (
          <div className="max-w-lg">
            <h2 className="font-black text-xl text-foreground mb-4">Create New CBT Exam</h2>
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              {[{ label: "Exam Title", placeholder: "SS2 Biology Mid-Term Test" }, { label: "Class", placeholder: "SS2A" }, { label: "Duration (minutes)", placeholder: "45" }].map(f => (
                <div key={f.label}>
                  <label className="text-xs font-bold text-muted-foreground block mb-1">{f.label}</label>
                  <input className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1">Number of Questions</label>
                <div className="flex gap-2">
                  {[20, 40, 60].map(n => <button key={n} className="px-4 py-2 rounded-lg text-sm font-bold border border-border hover:bg-muted">{n}</button>)}
                </div>
              </div>
              <button onClick={() => toast.success("Exam created! Share the code with your students.")}
                className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: G }}>
                Generate Exam with AI →
              </button>
            </div>
          </div>
        )}

        {(activeTab === "classes" || activeTab === "grades") && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="text-4xl mb-3">🏗️</div>
            <div className="font-bold text-foreground mb-1">{activeTab === "classes" ? "Class Management" : "Gradebook"}</div>
            <p className="text-sm text-muted-foreground max-w-xs">Full portal available for school license holders. Contact your administrator.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PARENT PORTAL ──────────────────────────────────────────

function ParentPortal({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const child = { name: "Adaeze Okonkwo", class: "SS3", school: "Queens College Lagos", streak: 14 };

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="border-b border-border bg-card px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-20">
        <Logo onClick={() => onNavigate("home")} />
        <div className="flex items-center gap-2">
          <BadgeComp label="Parent" color={PURPLE} />
          <AvatarComp initials="BE" size="sm" color={PURPLE} />
          <button onClick={() => onNavigate("home")} className="ml-2 text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 mb-8 p-5 bg-card rounded-2xl border border-border">
          <AvatarComp initials="AO" size="lg" />
          <div>
            <div className="font-black text-xl text-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>{child.name}</div>
            <div className="text-sm text-muted-foreground">{child.class} · {child.school}</div>
            <div className="flex items-center gap-2 mt-1">
              <Flame size={14} style={{ color: "#f97316" }} />
              <span className="text-xs font-bold text-orange-600">{child.streak}-day study streak</span>
            </div>
          </div>
          <div className="ml-auto hidden sm:block">
            <button onClick={() => toast.info("Report downloaded!")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-border hover:bg-muted">
              <Download size={14} /> Download Report
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Avg. Score", value: "74.8%", trend: "+3.2%", color: G },
            { label: "Study Hours/Week", value: "21.5h", trend: "+2h", color: BLUE },
            { label: "National Rank", value: "#5", trend: "↑3 spots", color: AMBER },
            { label: "Questions Practiced", value: "1,247", trend: "This month", color: PURPLE },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">{s.label}</div>
              <div className="text-2xl font-black text-foreground mb-0.5" style={{ fontFamily: "Nunito, sans-serif" }}>{s.value}</div>
              <div className="text-xs font-semibold" style={{ color: s.color }}>{s.trend}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="font-bold text-foreground mb-4">Subject Performance</div>
            <div className="space-y-3">
              {subjectProgress.map(s => (
                <div key={s.subject} className="flex items-center gap-3">
                  <div className="w-24 text-sm font-semibold text-foreground">{s.subject}</div>
                  <div className="flex-1"><ProgressBar value={s.mastery} color={s.mastery >= 80 ? G : s.mastery >= 65 ? AMBER : RED} /></div>
                  <div className="w-10 text-right text-sm font-bold" style={{ color: s.mastery >= 80 ? G : s.mastery >= 65 ? AMBER : RED }}>{s.mastery}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="font-bold text-foreground mb-4">Recent Activity</div>
            <div className="space-y-3">
              {[
                { text: "Completed WAEC Biology Mock — 88%", time: "Today, 9:14 AM", icon: "🎯" },
                { text: "Studied Chemistry for 1h 45m", time: "Yesterday, 8:00 PM", icon: "📚" },
                { text: "Earned 'Streak Master' badge", time: "2 days ago", icon: "🏅" },
                { text: "JAMB Practice — 74% (Maths)", time: "3 days ago", icon: "📊" },
                { text: "Joined study group: Physics SS3", time: "4 days ago", icon: "👥" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{a.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{a.text}</div>
                    <div className="text-xs text-muted-foreground">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LANDING PAGE ───────────────────────────────────────────

function LandingPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Logo onClick={() => onNavigate("home")} />
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <button onClick={() => onNavigate("courses")} className="text-foreground/70 hover:text-foreground">Courses</button>
            <a href="#exams" className="text-foreground/70 hover:text-foreground">Exam Prep</a>
            <a href="#ai" className="text-foreground/70 hover:text-foreground">AI Tutor</a>
            <button onClick={() => onNavigate("pricing")} className="text-foreground/70 hover:text-foreground">Pricing</button>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => onNavigate("auth")} className="text-sm font-semibold px-4 py-2 rounded-lg border border-border hover:bg-muted">Sign In</button>
            <button onClick={() => onNavigate("auth")} className="text-sm font-bold px-4 py-2 rounded-lg text-white hover:opacity-90" style={{ background: G }}>Get Started Free</button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3 text-sm font-semibold">
            <button onClick={() => { onNavigate("courses"); setMenuOpen(false); }} className="text-left py-2 text-foreground">Courses</button>
            <button onClick={() => { onNavigate("pricing"); setMenuOpen(false); }} className="text-left py-2 text-foreground">Pricing</button>
            <button onClick={() => { onNavigate("auth"); setMenuOpen(false); }} className="text-left py-2 text-foreground">Sign In</button>
            <button onClick={() => { onNavigate("auth"); setMenuOpen(false); }} className="w-full py-2.5 rounded-lg text-white font-bold" style={{ background: G }}>Get Started Free</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #0c6438 0%, #0a5030 60%, #073d25 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 right-16 w-40 h-40 rounded-full opacity-10" style={{ background: AMBER }} />
          <div className="absolute bottom-16 left-8 w-24 h-24 rotate-45 opacity-10" style={{ background: AMBER }} />
          <svg className="absolute top-12 left-1/4 opacity-10" width="80" height="80" viewBox="0 0 80 80"><polygon points="40,0 80,80 0,80" fill={AMBER} /></svg>
          <div className="absolute bottom-24 right-24 w-20 h-20 rounded-full opacity-5 bg-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background: "rgba(245,166,35,0.2)", color: AMBER }}>
              <Sparkles size={12} /> Africa's #1 Exam Prep Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6" style={{ fontFamily: "Nunito, sans-serif" }}>
              Ace Your Exams.<br /><span style={{ color: AMBER }}>Own Your Future.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
              WAEC · JAMB · NECO · Post-UTME and beyond. Practice with real past questions, get AI explanations, and track your progress to the top.
            </p>
            <div className="relative max-w-lg mb-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input className="w-full pl-11 pr-32 py-4 rounded-xl text-white bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:border-amber-400 text-sm" placeholder="Search courses, topics, past questions..." />
              <button onClick={() => onNavigate("courses")} className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-sm font-bold" style={{ background: AMBER, color: "#0d1f12" }}>Search</button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate("auth")} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90" style={{ background: AMBER, color: "#0d1f12" }}>
                Start Free <ArrowRight size={16} />
              </button>
              <button onClick={() => onNavigate("cbt-setup")} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/30 text-white hover:bg-white/10">
                <Play size={16} /> Try CBT Demo
              </button>
            </div>
          </div>

          {/* Hero mockup */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">JAMB 2024 Mock</div>
                  <div className="font-black text-base text-foreground">Biology · Q 23 of 60</div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold font-mono" style={{ background: "#dcfce7", color: G }}>
                  <AlarmClock size={13} /> 38:14
                </div>
              </div>
              <div className="bg-muted rounded-xl p-4 text-sm text-foreground mb-4">Which organelle produces ATP through cellular respiration?</div>
              {["A. Chloroplast", "B. Nucleus", "C. Mitochondria", "D. Ribosome"].map((opt, i) => (
                <div key={i} className={`mb-2 px-4 py-3 rounded-lg text-sm font-semibold border ${i === 2 ? "text-white border-transparent" : "border-border"}`} style={i === 2 ? { background: G } : {}}>
                  {opt}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="text-xs text-muted-foreground">22 answered · 38 remaining</div>
                <button className="text-xs font-bold px-4 py-2 rounded-lg text-white" style={{ background: G }}>Next →</button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ value: "2.1M+", label: "Active Students" }, { value: "500K+", label: "Daily Questions Answered" }, { value: "98.2%", label: "Pass Rate (JAMB)" }, { value: "4,200+", label: "Partner Schools" }].map(s => (
              <div key={s.label} className="text-center p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "Nunito, sans-serif" }}>{s.value}</div>
                <div className="text-xs text-white/60 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam categories */}
      <section id="exams" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: G }}>Exam Preparation</div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>Pick Your Exam. We'll Get You Ready.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Millions of past questions, organized by year, topic, and difficulty. Start in under 60 seconds.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {examCategories.map(cat => (
            <button key={cat.name} onClick={() => onNavigate("cbt-setup")}
              className="group p-5 rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-lg border-2"
              style={{ background: cat.color, borderColor: cat.border }}>
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-black text-sm text-foreground mb-0.5">{cat.name}</div>
              <div className="text-xs text-muted-foreground">{cat.count} {cat.questions}</div>
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: G }}>How It Works</div>
            <h2 className="text-3xl font-black text-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>From Sign-Up to Success in 4 Steps</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "1", title: "Create Account", desc: "Sign up free in 30 seconds. Choose your exam and class level.", icon: "👤" },
              { n: "2", title: "Take Assessment", desc: "Our AI tests your baseline and identifies weak areas instantly.", icon: "🧠" },
              { n: "3", title: "Study & Practice", desc: "Watch lessons, practice past questions, and chat with AI Tutor 24/7.", icon: "📚" },
              { n: "4", title: "Track Progress", desc: "Monitor your scores, climb the leaderboard, and predict your results.", icon: "📈" },
            ].map((s, i) => (
              <div key={s.n} className="text-center relative">
                {i < 3 && <div className="hidden lg:block absolute top-8 left-full w-8 border-t-2 border-dashed border-border z-0" />}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: "#dcfce7" }}>{s.icon}</div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Step {s.n}</div>
                <div className="font-black text-foreground mb-2">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI section */}
      <section id="ai" className="py-20" style={{ background: "#0d1f12" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background: "rgba(245,166,35,0.15)", color: AMBER }}>
              <Brain size={12} /> EduMaster AI
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6" style={{ fontFamily: "Nunito, sans-serif" }}>
              Your Personal AI Tutor.<br /><span style={{ color: AMBER }}>Always Available.</span>
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">Ask anything. Get step-by-step explanations, practice questions, essay feedback, and a personalized study plan — tailored to your curriculum.</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[{ icon: <BookOpen size={15} />, text: "Explain any concept" }, { icon: <Target size={15} />, text: "Solve Maths problems" }, { icon: <FileText size={15} />, text: "Mark your essays" }, { icon: <Mic size={15} />, text: "Voice questions" }, { icon: <Download size={15} />, text: "Summarize PDFs" }, { icon: <Zap size={15} />, text: "Generate flashcards" }].map(f => (
                <div key={f.text} className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <span style={{ color: AMBER }}>{f.icon}</span>
                  <span className="text-sm text-white/80 font-semibold">{f.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate("auth")} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm" style={{ background: AMBER, color: "#0d1f12" }}>
              Try AI Tutor Free <ArrowRight size={16} />
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs" style={{ background: G }}>AI</div>
              <div><div className="text-white font-bold text-sm">EduMaster AI</div><div className="text-xs text-green-400">● Online</div></div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-end"><div className="bg-white/10 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs">Explain the nitrogen cycle for WAEC Biology</div></div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">AI</div>
                <div className="text-white/80 text-sm leading-relaxed bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm max-w-xs">
                  The nitrogen cycle:<br /><br />
                  <strong className="text-white">1. Fixation</strong> — Bacteria: N₂ → NH₃<br />
                  <strong className="text-white">2. Nitrification</strong> — NH₃ → NO₃⁻<br />
                  <strong className="text-white">3. Assimilation</strong> — Plants absorb nitrates<br />
                  <strong className="text-white">4. Denitrification</strong> — NO₃⁻ → N₂
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
                <div className="text-white/80 text-sm bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">Want me to generate practice questions? 🎯</div>
              </div>
            </div>
            <div className="flex gap-2">
              <input className="flex-1 bg-white/10 text-white text-sm px-4 py-2.5 rounded-xl border border-white/10 placeholder-white/30 focus:outline-none" placeholder="Ask EduMaster AI..." />
              <button onClick={() => onNavigate("auth")} className="px-3 py-2.5 rounded-xl text-sm font-bold" style={{ background: AMBER, color: "#0d1f12" }}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: G }}>Student Stories</div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>Real Results, Real Students</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}</div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <AvatarComp initials={t.avatar} size="sm" color={G} />
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border"><BadgeComp label={t.score} color={G} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-xs font-black uppercase tracking-widest text-muted-foreground mb-8">Trusted by educational institutions across Africa</div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map(p => (
              <div key={p} className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-bold text-muted-foreground hover:text-foreground hover:border-green-300 transition-colors cursor-pointer">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: G }}>FAQ</div>
          <h2 className="text-3xl font-black text-foreground" style={{ fontFamily: "Nunito, sans-serif" }}>Frequently Asked Questions</h2>
        </div>
        <FAQ />
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-2xl mb-2">📬</div>
          <h2 className="text-2xl font-black text-foreground mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>Stay Ahead of the Exam</h2>
          <p className="text-sm text-muted-foreground mb-6">Get weekly WAEC/JAMB tips, new past questions, and scholarship alerts — free.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your email" />
            <button onClick={() => toast.success("Subscribed! Check your inbox.")} className="px-5 py-3 rounded-xl font-bold text-sm text-white whitespace-nowrap" style={{ background: G }}>Subscribe →</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 mx-4 sm:mx-6 max-w-7xl lg:mx-auto rounded-3xl my-16" style={{ background: "linear-gradient(135deg, #0c6438 0%, #073d25 100%)" }}>
        <div className="text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ fontFamily: "Nunito, sans-serif" }}>Start Free. Stay Ahead.</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">Join 2.1 million students. No credit card needed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate("auth")} className="px-8 py-4 rounded-xl font-black text-sm hover:opacity-90" style={{ background: AMBER, color: "#0d1f12" }}>Create Free Account →</button>
            <button onClick={() => onNavigate("pricing")} className="px-8 py-4 rounded-xl font-bold text-sm border-2 border-white/30 text-white hover:bg-white/10">View Pricing</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0d1f12" }} className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <Logo />
              <p className="text-white/50 text-sm mt-3 leading-relaxed">Africa's most comprehensive educational platform. From primary school to university entrance examinations.</p>
              <div className="flex items-center gap-3 mt-5">
                {[<Twitter size={16} />, <Youtube size={16} />, <Instagram size={16} />, <Linkedin size={16} />].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">{Icon}</button>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: ["Courses", "CBT Practice", "AI Tutor", "Leaderboard", "Certificates"] },
              { title: "Exams", links: ["WAEC Prep", "JAMB CBT", "NECO Mock", "Post-UTME", "Scholarships"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Contact", "Privacy Policy"] },
            ].map(col => (
              <div key={col.title}>
                <div className="font-bold text-white text-sm mb-4">{col.title}</div>
                <div className="space-y-2.5">
                  {col.links.map(l => (
                    <button key={l} className="block text-sm text-white/50 hover:text-white transition-colors">{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <div>© 2025 EduMaster Africa Ltd. All rights reserved.</div>
            <div className="flex items-center gap-2"><Shield size={12} /> <span>NDPR & GDPR Compliant · Secured by SSL</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── APP ROOT ───────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const allTabs: { id: Page; label: string }[] = [
    { id: "home", label: "🏠 Home" },
    { id: "auth", label: "🔑 Auth" },
    { id: "pricing", label: "💳 Pricing" },
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "cbt-setup", label: "⚙️ CBT Setup" },
    { id: "cbt", label: "🎯 CBT Exam" },
    { id: "courses", label: "📚 Courses" },
    { id: "teacher", label: "👨‍🏫 Teacher" },
    { id: "parent", label: "👪 Parent" },
  ];

  return (
    <div className={`size-full ${darkMode ? "dark" : ""}`} style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`
        .font-display { font-family: 'Nunito', system-ui, sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .page-tabs {
          position: fixed; bottom: 1.25rem; left: 50%; transform: translateX(-50%);
          z-index: 100; display: flex; gap: 0.375rem; align-items: center;
          background: rgba(13,31,18,0.92); backdrop-filter: blur(12px);
          padding: 0.5rem; border-radius: 9999px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          max-width: calc(100vw - 2rem); overflow-x: auto; scrollbar-width: none;
        }
        .page-tabs::-webkit-scrollbar { display: none; }
        .page-tab {
          padding: 0.4rem 0.875rem; border-radius: 9999px; font-size: 0.7rem;
          font-weight: 700; cursor: pointer; transition: all 0.2s;
          color: rgba(255,255,255,0.55); white-space: nowrap; border: none;
          background: transparent; flex-shrink: 0;
        }
        .page-tab.active { background: ${G}; color: white; }
        .page-tab:not(.active):hover { color: white; background: rgba(255,255,255,0.1); }

        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 3px; }

        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        .animate-bounce { animation: bounce 1.2s infinite; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>

      <Toaster position="top-right" richColors expand={false} />

      {page === "home" && <LandingPage onNavigate={navigate} />}
      {page === "auth" && <AuthPage onNavigate={navigate} />}
      {page === "pricing" && <PricingPage onNavigate={navigate} />}
      {page === "dashboard" && <StudentDashboard onNavigate={navigate} />}
      {page === "cbt-setup" && <CBTSetup onNavigate={navigate} />}
      {page === "cbt" && <CBTExam onNavigate={navigate} />}
      {page === "courses" && <CoursesPage onNavigate={navigate} />}
      {page === "teacher" && <TeacherPortal onNavigate={navigate} />}
      {page === "parent" && <ParentPortal onNavigate={navigate} />}

      {/* Floating nav + dark mode */}
      <nav className="page-tabs">
        <button onClick={() => setDarkMode(!darkMode)} className="page-tab" title="Toggle dark mode">
          {darkMode ? <Sun size={13} /> : <Moon size={13} />}
        </button>
        <div className="w-px h-4 bg-white/20 mx-0.5" />
        {allTabs.map(tab => (
          <button key={tab.id} onClick={() => navigate(tab.id)} className={`page-tab ${page === tab.id ? "active" : ""}`}>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
