<script setup lang="ts">

const examCategories = [
  { name: "WAEC", icon: "📋", count: "24,000+", color: "#dcfce7", border: 'var(--primary)' },
  { name: "JAMB", icon: "🎯", count: "18,500+", color: "#fef9c3", border: 'var(--chart-2)' },
  { name: "NECO", icon: "📚", count: "12,000+", color: "#dbeafe", border: 'var(--chart-4)' },
  { name: "NABTEB", icon: "🔧", count: "8,400+", color: "#fce7f3", border: 'var(--destructive)' },
  { name: "Post-UTME", icon: "🏛️", count: "31,000+", color: "#ede9fe", border: 'var(--chart-5)' },
  { name: "Common Entrance", icon: "🌟", count: "5,200+", color: "#fff7ed", border: 'var(--accent)' },
]

const testimonials = [
  { name: "Ngozi Okafor", role: "SS3 Student, Lagos", text: "EduMaster helped me score 312 in JAMB. The CBT practice mode is exactly like the real exam. I practiced 400 past questions in 2 weeks!", score: "312/400 JAMB", avatar: "NO" },
  { name: "Ibrahim Musa", role: "Graduate, Kano", text: "I was struggling with Chemistry until I found the AI tutor. It explains every step in detail and generates practice questions instantly.", score: "A1 Chemistry", avatar: "IM" },
  { name: "Blessing Eze", role: "Parent, Enugu", text: "As a parent, I love the progress reports. I can see exactly what my daughter is studying, her scores, and how she ranks nationally.", score: "Parent Portal", avatar: "BE" },
  { name: "Chukwuemeka Nze", role: "Teacher, Anambra", text: "Creating CBT exams for my SS2 class used to take hours. Now I do it in minutes with AI-generated questions and automatic grading.", score: "Teacher Portal", avatar: "CN" },
]

const partners = ["WAEC", "NUC", "UNN", "UNILAG", "ABU Zaria", "OAU Ile-Ife", "Ministry of Education", "NERDC", "JAMB Board", "British Council"]

const faqs = [
  { q: "Is EduMaster Africa free to use?", a: "Yes! We have a robust free tier covering thousands of past questions, video lessons, and basic AI tutoring. Premium plans unlock unlimited CBT practice, advanced AI features, and full course access." },
  { q: "Which exams does EduMaster cover?", a: "We cover WAEC, NECO, NABTEB, JAMB, BECE, Post-UTME, Common Entrance, SAT, IELTS, Cambridge, and more. New exams are added regularly based on student demand." },
  { q: "How does the AI Tutor work?", a: "EduMaster AI is trained on the Nigerian and international curriculum. It understands natural language questions, explains concepts step-by-step, solves math problems, marks essays, and adapts to your learning level over time." },
  { q: "Can my school use EduMaster?", a: "Absolutely. Our School License gives administrators tools to manage students, upload school-specific exams, track class performance, generate report cards, and communicate with parents. Contact us for institutional pricing." },
  { q: "Can I use EduMaster offline?", a: "Our mobile apps (Android and iOS) support offline mode. Download lessons, notes, and question packs while connected — then study anywhere, even without internet." },
  { q: "Is my data safe?", a: "We use end-to-end encryption, JWT authentication, and comply with GDPR and NDPR regulations. We never sell student data. Parental consent is required for users under 13." },
]

import { ref } from 'vue'
const menuOpen = ref(false)
const openFaq = ref<number | null>(null)
const stat = ref({ value: '2.1M+', label: 'Students' })
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
          <span class="text-primary">EduMaster</span>
          <span class="text-accent">Africa</span>
        </NuxtLink>
        <div class="hidden md:flex items-center gap-6 text-sm font-semibold">
          <NuxtLink to="/courses" class="text-foreground/70 hover:text-foreground">Courses</NuxtLink>
          <a href="#exams" class="text-foreground/70 hover:text-foreground">Exam Prep</a>
          <a href="#ai" class="text-foreground/70 hover:text-foreground">AI Tutor</a>
          <NuxtLink to="/pricing" class="text-foreground/70 hover:text-foreground">Pricing</NuxtLink>
        </div>
        <div class="hidden md:flex items-center gap-3">
          <NuxtLink to="/auth" class="text-sm font-semibold px-4 py-2 rounded-lg border border-border hover:bg-muted text-foreground">Sign In</NuxtLink>
          <NuxtLink to="/auth" class="text-sm font-bold px-4 py-2 rounded-lg text-white hover:opacity-90 bg-primary">Get Started Free</NuxtLink>
        </div>
        <button class="md:hidden" @click="menuOpen = !menuOpen">
          <UIcon :name="menuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
        </button>
      </div>
      <div v-if="menuOpen" class="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3 text-sm font-semibold">
        <NuxtLink to="/courses" @click="menuOpen = false" class="py-2 text-foreground">Courses</NuxtLink>
        <NuxtLink to="/pricing" @click="menuOpen = false" class="py-2 text-foreground">Pricing</NuxtLink>
        <NuxtLink to="/auth" @click="menuOpen = false" class="py-2 text-foreground">Sign In</NuxtLink>
        <NuxtLink to="/auth" @click="menuOpen = false" class="w-full py-2.5 rounded-lg text-white font-bold bg-primary">Get Started Free</NuxtLink>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative pt-24 pb-24 overflow-hidden bg-primary text-primary-foreground">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-8 right-16 w-40 h-40 rounded-full opacity-10 bg-accent" />
        <div class="absolute bottom-16 left-8 w-24 h-24 rotate-45 opacity-10 bg-accent" />
        <div class="absolute top-12 left-1/4 opacity-10 text-4xl">🔺</div>
        <div class="absolute bottom-24 right-24 w-20 h-20 rounded-full opacity-5 bg-white" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6 bg-accent/20 text-accent">
            <UIcon name="heroicons:sparkles" class="w-3 h-3" /> Africa's #1 Exam Prep Platform
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6" style="font-family: 'Nunito', sans-serif;">
            Ace Your Exams.<br /><span class="text-accent">Own Your Future.</span>
          </h1>
          <p class="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
            WAEC · JAMB · NECO · Post-UTME and beyond. Practice with real past questions, get AI explanations, and track your progress to the top.
          </p>
          <div class="relative max-w-lg mb-8">
            <UIcon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
            <input class="w-full pl-11 pr-32 py-4 rounded-xl text-white bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:border-accent text-sm" placeholder="Search courses, topics, past questions..." />
            <NuxtLink to="/courses" class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-sm font-bold bg-accent text-accent-foreground">Search</NuxtLink>
          </div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/auth" class="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 bg-accent text-accent-foreground">
              Start Free <UIcon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink to="/cbt-setup" class="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/30 text-white hover:bg-white/10">
              <UIcon name="heroicons:play" class="w-4 h-4" /> Try CBT Demo
            </NuxtLink>
          </div>
        </div>

        <!-- Hero mockup -->
        <div class="hidden lg:block">
          <div class="bg-white rounded-2xl p-6 shadow-2xl">
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="text-xs text-muted-foreground font-semibold">JAMB 2024 Mock</div>
                <div class="font-black text-base text-foreground">Biology · Q 23 of 60</div>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold font-mono bg-primary/10 text-primary">
                <UIcon name="heroicons:clock" class="w-3 h-3" /> 38:14
              </div>
            </div>
            <div class="bg-muted rounded-xl p-4 text-sm text-foreground mb-4">Which organelle produces ATP through cellular respiration?</div>
            <div class="mb-2 px-4 py-3 rounded-lg text-sm font-semibold border border-border">A. Chloroplast</div>
            <div class="mb-2 px-4 py-3 rounded-lg text-sm font-semibold border border-border">B. Nucleus</div>
            <div class="mb-2 px-4 py-3 rounded-lg text-sm font-semibold text-white border-transparent bg-primary">C. Mitochondria</div>
            <div class="mb-2 px-4 py-3 rounded-lg text-sm font-semibold border border-border">D. Ribosome</div>
            <div class="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div class="text-xs text-muted-foreground">22 answered · 38 remaining</div>
              <NuxtLink to="/cbt-setup" class="text-xs font-bold px-4 py-2 rounded-lg text-white bg-primary">Next →</NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="text-center p-4 rounded-xl bg-primary/10">
            <div class="text-2xl font-black text-white mb-0.5" style="font-family: 'Nunito', sans-serif;">{{ stat.value }}</div>
            <div class="text-xs text-white/60 font-semibold">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Exam categories -->
    <section id="exams" class="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10">
        <div class="text-xs font-black uppercase tracking-widest mb-2 text-primary">Exam Preparation</div>
        <h2 class="text-3xl sm:text-4xl font-black text-foreground mb-3" style="font-family: 'Nunito', sans-serif;">Pick Your Exam. We'll Get You Ready.</h2>
        <p class="text-muted-foreground max-w-xl mx-auto">Millions of past questions, organized by year, topic, and difficulty. Start in under 60 seconds.</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <NuxtLink v-for="cat in examCategories" :key="cat.name" to="/cbt-setup"
          class="group p-5 rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-lg border-2"
          :style="{ background: cat.color, borderColor: cat.border }">
          <div class="text-3xl mb-2">{{ cat.icon }}</div>
          <div class="font-black text-sm text-foreground mb-0.5">{{ cat.name }}</div>
          <div class="text-xs text-muted-foreground">{{ cat.count }} questions</div>
        </NuxtLink>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 bg-card border-y border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <div class="text-xs font-black uppercase tracking-widest mb-2 text-primary">How It Works</div>
          <h2 class="text-3xl font-black text-foreground" style="font-family: 'Nunito', sans-serif;">From Sign-Up to Success in 4 Steps</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(step, i) in [{ n: '1', title: 'Create Account', desc: 'Sign up free in 30 seconds. Choose your exam and class level.', icon: '👤' }, { n: '2', title: 'Take Assessment', desc: 'Our AI tests your baseline and identifies weak areas instantly.', icon: '🧠' }, { n: '3', title: 'Study & Practice', desc: 'Watch lessons, practice past questions, and chat with AI Tutor 24/7.', icon: '📚' }, { n: '4', title: 'Track Progress', desc: 'Monitor your scores, climb the leaderboard, and predict your results.', icon: '📈' }]" :key="step.n" class="text-center relative">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 bg-primary/10">{{ step.icon }}</div>
            <div class="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Step {{ step.n }}</div>
            <div class="font-black text-foreground mb-2">{{ step.title }}</div>
            <div class="text-sm text-muted-foreground">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI section -->
    <section id="ai" class="py-20 bg-primary text-primary-foreground">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6 bg-accent/20 text-accent">
            <UIcon name="heroicons:brain" class="w-3 h-3" /> EduMaster AI
          </div>
          <h2 class="text-3xl sm:text-4xl font-black text-white mb-6" style="font-family: 'Nunito', sans-serif;">
            Your Personal AI Tutor.<br /><span class="text-accent">Always Available.</span>
          </h2>
          <p class="text-white/70 mb-8 leading-relaxed">Ask anything. Get step-by-step explanations, practice questions, essay feedback, and a personalized study plan — tailored to your curriculum.</p>
          <div class="grid grid-cols-2 gap-3 mb-8">
            <div v-for="f in [{ icon: 'heroicons:book-open', text: 'Explain any concept' }, { icon: 'heroicons:bolt', text: 'Solve Maths problems' }, { icon: 'heroicons:document-text', text: 'Mark your essays' }, { icon: 'heroicons:chat-bubble-bottom-center-text', text: 'Voice questions' }, { icon: 'heroicons:arrow-down-tray', text: 'Summarize PDFs' }, { icon: 'heroicons:sparkles', text: 'Generate flashcards' }]" :key="f.text" class="flex items-center gap-2.5 p-3 rounded-xl bg-white/5">
              <UIcon :name="f.icon" class="w-3.5 h-3.5 text-accent" />
              <span class="text-sm text-white/80 font-semibold">{{ f.text }}</span>
            </div>
          </div>
          <NuxtLink to="/auth" class="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-accent text-accent-foreground">
            Try AI Tutor Free <UIcon name="heroicons:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-5 pb-4 border-b border-white/10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs bg-primary">AI</div>
            <div><div class="text-white font-bold text-sm">EduMaster AI</div><div class="text-xs text-green-400">● Online</div></div>
          </div>
          <div class="space-y-3 mb-4">
            <div class="flex justify-end"><div class="bg-white/10 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs">Explain the nitrogen cycle for WAEC Biology</div></div>
            <div class="flex gap-3">
              <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">AI</div>
              <div class="text-white/80 text-sm leading-relaxed bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm max-w-xs">
                The nitrogen cycle:<br /><br />
                <strong class="text-white">1. Fixation</strong> — Bacteria: N₂ → NH₃<br />
                <strong class="text-white">2. Nitrification</strong> — NH₃ → NO₃⁻<br />
                <strong class="text-white">3. Assimilation</strong> — Plants absorb nitrates<br />
                <strong class="text-white">4. Denitrification</strong> — NO₃⁻ → N₂
              </div>
            </div>
            <div class="flex gap-3">
              <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
              <div class="text-white/80 text-sm bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">Want me to generate practice questions? 🎯</div>
            </div>
          </div>
          <div class="flex gap-2">
            <input class="flex-1 bg-white/10 text-white text-sm px-4 py-2.5 rounded-xl border border-white/10 placeholder-white/30 focus:outline-none" placeholder="Ask EduMaster AI..." />
            <NuxtLink to="/auth" class="px-3 py-2.5 rounded-xl text-sm font-bold bg-accent text-accent-foreground">→</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <div class="text-xs font-black uppercase tracking-widest mb-2 text-primary">Student Stories</div>
        <h2 class="text-3xl sm:text-4xl font-black text-foreground" style="font-family: 'Nunito', sans-serif;">Real Results, Real Students</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="t in testimonials" :key="t.name" class="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-1 mb-3">
            <UIcon v-for="i in 5" :key="i" name="heroicons:star" class="w-3 h-3 fill-amber-400 text-amber-400" />
          </div>
          <p class="text-foreground/80 text-sm leading-relaxed mb-4">"&ldquo;{{ t.text }}&ldquo;</p>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 bg-primary">{{ t.avatar }}</div>
            <div class="min-w-0">
              <div class="font-bold text-sm truncate text-foreground">{{ t.name }}</div>
              <div class="text-xs text-muted-foreground truncate">{{ t.role }}</div>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-border"><span class="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-primary">{{ t.score }}</span></div>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="py-16 border-y border-border bg-card">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center text-xs font-black uppercase tracking-widest text-muted-foreground mb-8">Trusted by educational institutions across Africa</div>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div v-for="p in partners" :key="p" class="px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-bold text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer">{{ p }}</div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <div class="text-xs font-black uppercase tracking-widest mb-2 text-primary">FAQ</div>
        <h2 class="text-3xl font-black text-foreground" style="font-family: 'Nunito', sans-serif;">Frequently Asked Questions</h2>
      </div>
      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="border border-border rounded-xl overflow-hidden bg-card">
          <button @click="openFaq = openFaq === i ? null : i"
            class="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm text-foreground hover:bg-muted/40 transition-colors">
            {{ faq.q }}
            <UIcon :name="openFaq === i ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="flex-shrink-0 text-muted-foreground" />
          </button>
          <div v-if="openFaq === i" class="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
            {{ faq.a }}
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16 bg-card border-y border-border">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div class="text-2xl mb-2">📬</div>
        <h2 class="text-2xl font-black text-foreground mb-2" style="font-family: 'Nunito', sans-serif;">Stay Ahead of the Exam</h2>
        <p class="text-sm text-muted-foreground mb-6">Get weekly WAEC/JAMB tips, new past questions, and scholarship alerts — free.</p>
        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input class="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your email" />
          <button class="px-5 py-3 rounded-xl font-bold text-sm text-white whitespace-nowrap bg-primary">Subscribe →</button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 mx-4 sm:mx-6 max-w-7xl lg:mx-auto rounded-3xl my-16 bg-primary text-primary-foreground">
      <div class="text-center px-6">
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4" style="font-family: 'Nunito', sans-serif;">Start Free. Stay Ahead.</h2>
        <p class="text-white/70 mb-8 max-w-md mx-auto">Join 2.1 million students. No credit card needed.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/auth" class="px-8 py-4 rounded-xl font-black text-sm hover:opacity-90 bg-accent text-accent-foreground">Create Free Account →</NuxtLink>
          <NuxtLink to="/pricing" class="px-8 py-4 rounded-xl font-bold text-sm border-2 border-white/30 text-white hover:bg-white/10">View Pricing</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary text-primary-foreground pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
              <span class="text-white">EduMaster</span>
              <span class="text-accent">Africa</span>
            </div>
            <p class="text-white/50 text-sm mt-3 leading-relaxed">Africa's most comprehensive educational platform. From primary school to university entrance examinations.</p>
            <div class="flex items-center gap-3 mt-5">
              <button v-for="(icon, i) in ['twitter', 'youtube', 'instagram', 'linkedin']" :key="i" class="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                <UIcon :name="`simple-icons:${icon}`" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div v-for="col in [{ title: 'Platform', links: ['Courses', 'CBT Practice', 'AI Tutor', 'Leaderboard', 'Certificates'] }, { title: 'Exams', links: ['WAEC Prep', 'JAMB CBT', 'NECO Mock', 'Post-UTME', 'Scholarships'] }, { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact', 'Privacy Policy'] }]" :key="col.title">
            <div class="font-bold text-white text-sm mb-4">{{ col.title }}</div>
            <div class="space-y-2.5">
              <button v-for="l in col.links" :key="l" class="block text-sm text-white/50 hover:text-white transition-colors">{{ l }}</button>
            </div>
          </div>
        </div>
        <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div>© 2025 EduMaster Africa Ltd. All rights reserved.</div>
          <div class="flex items-center gap-2"><UIcon name="heroicons:shield-check" class="w-3 h-3" /> <span>NDPR & GDPR Compliant · Secured by SSL</span></div>
        </div>
      </div>
    </footer>
  </div>
</template>