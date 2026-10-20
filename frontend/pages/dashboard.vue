<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref("overview")
const sidebarOpen = ref(false)
const notifOpen = ref(false)
const profileOpen = ref(false)

const navItems = [
  { id: "overview", label: "Overview", icon: "heroicons:home" },
  { id: "courses", label: "My Courses", icon: "heroicons:book-open" },
  { id: "practice", label: "Practice", icon: "heroicons:flag" },
  { id: "analytics", label: "Analytics", icon: "heroicons:chart-bar" },
  { id: "leaderboard", label: "Leaderboard", icon: "heroicons:trophy" },
  { id: "ai", label: "AI Tutor", icon: "heroicons:brain" },
  { id: "settings", label: "Settings", icon: "heroicons:cog-6-tooth" },
]

const subjectProgress = [
  { subject: "Maths", score: 74, mastery: 74, predicted: 81 },
  { subject: "Biology", score: 88, mastery: 88, predicted: 91 },
  { subject: "Chemistry", score: 61, mastery: 61, predicted: 68 },
  { subject: "Physics", score: 55, mastery: 55, predicted: 63 },
  { subject: "English", score: 92, mastery: 92, predicted: 94 },
  { subject: "Lit", score: 79, mastery: 79, predicted: 83 },
]

const weeklyStudy = [
  { day: "Mon", hours: 2.5, target: 3 }, { day: "Tue", hours: 3.0, target: 3 },
  { day: "Wed", hours: 1.5, target: 3 }, { day: "Thu", hours: 4.0, target: 3 },
  { day: "Fri", hours: 3.5, target: 3 }, { day: "Sat", hours: 5.0, target: 4 },
  { day: "Sun", hours: 2.0, target: 2 },
]

const scoreHistory = [
  { week: "Wk 1", score: 58 }, { week: "Wk 2", score: 63 },
  { week: "Wk 3", score: 61 }, { week: "Wk 4", score: 69 },
  { week: "Wk 5", score: 72 }, { week: "Wk 6", score: 74 },
  { week: "Wk 7", score: 70 }, { week: "Wk 8", score: 78 },
]

const leaderboard = [
  { rank: 1, name: "Chisom Adeyemi", xp: 12840, school: "FGGC Bwari", avatar: "CA", streak: 32 },
  { rank: 2, name: "Emeka Osei", xp: 11720, school: "King's College Lagos", avatar: "EO", streak: 28 },
  { rank: 3, name: "Fatimah Bello", xp: 10950, school: "GGSS Kano", avatar: "FB", streak: 21 },
  { rank: 4, name: "Tunde Adesanya", xp: 10400, school: "CHS Ibadan", avatar: "TA", streak: 19 },
  { rank: 5, name: "You (Adaeze)", xp: 9880, school: "Queens College Lagos", avatar: "AO", streak: 14, isMe: true },
  { rank: 6, name: "Amara Nwosu", xp: 9650, school: "FGC Enugu", avatar: "AN", streak: 11 },
  { rank: 7, name: "Suleiman Garba", xp: 9340, school: "Govt Sec Sch Kaduna", avatar: "SG", streak: 9 },
  { rank: 8, name: "Taiwo Adewale", xp: 9120, school: "CMS Grammar Bariga", avatar: "TW", streak: 15 },
]

const upcomingExams = [
  { name: "WAEC Biology Mock", date: "Jul 8, 2025", time: "10:00 AM", color: 'var(--primary)' },
  { name: "JAMB CBT Practice", date: "Jul 11, 2025", time: "2:00 PM", color: 'var(--chart-5)' },
  { name: "Chemistry Quiz — SS3A", date: "Jul 14, 2025", time: "9:00 AM", color: 'var(--chart-4)' },
]

function formatPct(val: number) {
  return ((val / 100) * 100).toFixed(0)
}
</script>

<template>
  <div class="flex h-screen bg-background overflow-hidden font-body">
    <!-- Sidebar -->
      <aside :class="['fixed lg:relative z-40 h-full flex-shrink-0 transition-transform duration-300', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0', 'bg-primary text-primary-foreground']">
      <div class="flex flex-col h-full">
        <div class="px-5 py-5 border-b border-white/10">
          <NuxtLink to="/" class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
            <span class="text-white">EduMaster</span>
            <span class="text-accent">Africa</span>
          </NuxtLink>
        </div>
        <div class="px-3 py-4 flex-1 overflow-y-auto">
          <div class="text-xs font-bold text-white/40 uppercase tracking-widest px-2 mb-2">Menu</div>
          <button v-for="item in navItems" :key="item.id" @click="activeTab = item.id; sidebarOpen = false"
            :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 transition-all', activeTab === item.id ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white']">
            <UIcon :name="item.icon" class="w-4.5 h-4.5" /> {{ item.label }}
          </button>
          <div class="text-xs font-bold text-white/40 uppercase tracking-widest px-2 mb-2 mt-6">Quick Exams</div>
          <button v-for="e in [{ label: 'WAEC Practice', icon: '📋' }, { label: 'JAMB CBT', icon: '🎯' }, { label: 'NECO Mock', icon: '📚' }]" :key="e.label"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 text-white/70 hover:bg-white/10 hover:text-white transition-all">
            <span>{{ e.icon }}</span> {{ e.label }}
          </button>
        </div>
        <div class="p-4 border-t border-white/10">
          <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 bg-white/20">AO</div>
            <div class="min-w-0">
              <div class="text-white text-sm font-bold truncate">Adaeze Okonkwo</div>
              <div class="text-white/50 text-xs">SS3 · Queens College</div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/40 z-30 lg:hidden" @click="sidebarOpen = false" />

    <main class="flex-1 overflow-y-auto">
      <!-- Top bar -->
      <header class="sticky top-0 z-20 bg-background/90 backdrop-blur border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button class="lg:hidden" @click="sidebarOpen = true"><UIcon name="heroicons:bars-3" class="w-5 h-5" /></button>
          <div>
            <div class="font-black text-foreground text-base">{{ navItems.find(n => n.id === activeTab)?.label }}</div>
            <div class="text-xs text-muted-foreground hidden sm:block">Mon, 30 Jun 2025 · 45 days to WAEC</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="relative">
            <button @click="notifOpen = !notifOpen; profileOpen = false"
              class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative">
              <UIcon name="heroicons:bell" class="w-4.5 h-4.5" />
              <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
          </div>
          <div class="relative">
            <button @click="profileOpen = !profileOpen; notifOpen = false"
              class="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-muted transition-colors">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 bg-primary">AO</div>
              <UIcon name="heroicons:chevron-down" class="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
            </button>
            <div v-if="profileOpen" class="absolute right-0 top-12 w-52 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
              <div class="px-4 py-3 border-b border-border">
                <div class="font-bold text-sm">Adaeze Okonkwo</div>
                <div class="text-xs text-muted-foreground">adaeze@example.com</div>
              </div>
              <NuxtLink v-for="item in [{ icon: 'heroicons:user', label: 'My Profile', tab: 'settings' }, { icon: 'heroicons:academic-cap', label: 'Certificates', tab: '' }, { icon: 'heroicons:cog-6-tooth', label: 'Settings', tab: 'settings' }, { icon: 'heroicons:arrow-left-on-rectangle', label: 'Sign Out', tab: 'home' }]" :key="item.label"
                :to="item.tab === 'home' ? '/' : '#'"
                @click="item.tab && (item.tab === 'home' ? null : activeTab = item.tab); profileOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left text-foreground">
                <UIcon :name="item.icon" class="w-3.5 h-3.5 text-muted-foreground" /> {{ item.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>

      <div class="p-4 sm:p-6 pb-24">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="font-black text-2xl text-foreground" style="font-family: 'Nunito', sans-serif;">Good morning, Adaeze 👋</h1>
              <p class="text-sm text-muted-foreground">3 topics scheduled today. Let's go!</p>
            </div>
            <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-accent/10 text-accent">
              <UIcon name="heroicons:fire" class="w-4.5 h-4.5 text-accent" /> 14-day streak 🔥
            </div>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="card in [{ label: 'Total XP', value: '9,880', icon: 'heroicons:bolt', change: '+240 today', color: 'var(--primary)', bg: 'var(--primary)/10' }, { label: 'National Rank', value: '#5', icon: 'heroicons:trophy', change: '↑ from #8', color: 'var(--chart-5)', bg: 'var(--chart-5)/10' }, { label: 'Avg. Score', value: '74.8%', icon: 'heroicons:chart-bar', change: '+3.2% this week', color: 'var(--chart-4)', bg: 'var(--chart-4)/10' }, { label: 'Questions Done', value: '1,247', icon: 'heroicons:check-circle', change: 'Last 30 days', color: 'var(--accent)', bg: 'var(--chart-2)/10' }]" :key="card.label"
              class="bg-card rounded-2xl p-5 border border-border hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between mb-3">
                <div class="text-xs font-bold text-muted-foreground uppercase tracking-wide">{{ card.label }}</div>
                 <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: card.bg, color: card.color }"><UIcon :name="card.icon" class="w-4.5 h-4.5" /></div>
              </div>
              <div class="text-2xl font-black text-foreground mb-1" style="font-family: 'Nunito', sans-serif;">{{ card.value }}</div>
              <div class="text-xs font-semibold" :style="{ color: card.color }">{{ card.change }}</div>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <div class="lg:col-span-3 bg-card rounded-2xl p-5 border border-border">
              <div class="font-bold text-foreground mb-5">Subject Mastery</div>
              <div class="h-64">
                <!-- Bar chart using simple divs -->
                <div class="flex items-end justify-between h-56 gap-2">
                  <div v-for="s in subjectProgress" :key="s.subject" class="flex flex-col items-center flex-1">
                    <div class="w-full rounded-t-xl transition-all bg-primary" :style="{ height: s.mastery + '%' }" />
                    <span class="text-xs text-muted-foreground mt-2">{{ s.subject }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-card rounded-2xl p-5 border border-border">
              <div class="font-bold text-foreground mb-5">Study Hours vs Target</div>
              <div class="h-56">
                <!-- Line chart using simple divs -->
                <div class="relative h-full">
                  <div v-for="(d, i) in weeklyStudy" :key="d.day" class="absolute bottom-0 flex flex-col items-center" :style="{ left: (i / (weeklyStudy.length - 1)) * 100 + '%' }">
                    <div class="w-1 rounded-full bg-primary" :style="{ height: (d.hours / 5) * 100 + '%' }" />
                    <span class="text-xs text-muted-foreground mt-1">{{ d.day }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <div class="bg-card rounded-2xl p-5 border border-border">
              <div class="flex items-center justify-between mb-4">
                <div class="font-bold text-foreground">Upcoming Exams</div>
                <button class="text-xs font-semibold text-primary">See all</button>
              </div>
              <div class="space-y-3">
                <div v-for="exam in upcomingExams" :key="exam.name" class="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                  <div class="w-2 h-10 rounded-full" :style="{ background: exam.color }" />
                  <div class="flex-1 min-w-0">
                    <div class="font-bold text-sm truncate text-foreground">{{ exam.name }}</div>
                    <div class="text-xs text-muted-foreground">{{ exam.date }} · {{ exam.time }}</div>
                  </div>
                   <NuxtLink to="/cbt-setup" class="text-xs font-bold px-3 py-1.5 rounded-lg text-white bg-primary">Practice</NuxtLink>
                </div>
              </div>
            </div>

            <div class="bg-card rounded-2xl p-5 border border-border">
              <div class="flex items-center justify-between mb-4">
                <div class="font-bold text-foreground">National Leaderboard</div>
                <NuxtLink to="/#leaderboard" class="text-xs font-semibold text-primary">Full board →</NuxtLink>
              </div>
              <div class="space-y-2">
                <div v-for="entry in leaderboard.slice(0, 5)" :key="entry.rank"
                  :class="['flex items-center gap-3 p-3 rounded-xl', entry.isMe ? 'border-2' : 'bg-muted/40']"
                   :style="entry.isMe ? { borderColor: 'var(--accent)', background: 'oklch(0.985 0 0)' } : {}">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                    :style="entry.rank <= 3 ? { background: ['var(--accent)', '#c0c0c0', '#cd7f32'][entry.rank - 1], color: '#ffffff' } : { background: 'var(--muted)', color: 'var(--muted-foreground)' }">
                    {{ entry.rank }}
                  </div>
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" :style="{ background: entry.isMe ? 'var(--accent)' : 'var(--primary)' }">{{ entry.avatar }}</div>
                  <div class="flex-1 min-w-0">
                    <div :class="['font-bold text-sm truncate', entry.isMe ? 'text-accent' : 'text-foreground']">{{ entry.name.replace(' (You)', '') }}{{ entry.isMe ? ' (You)' : '' }}</div>
                    <div class="text-xs text-muted-foreground truncate">{{ entry.school }}</div>
                  </div>
                  <div class="text-sm font-black font-mono" :style="{ color: entry.isMe ? 'var(--accent)' : 'var(--primary)' }">{{ entry.xp.toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Courses Tab -->
        <div v-if="activeTab === 'courses'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="font-black text-xl text-foreground">My Courses</h2>
             <NuxtLink to="/courses" class="text-sm font-bold flex items-center gap-1 text-primary">Browse More <UIcon name="heroicons:arrow-right" class="w-3.5 h-3.5" /></NuxtLink>
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <div v-for="c in [{ id: 1, title: 'WAEC Mathematics Complete', lessons: 48, completed: 31, color: 'var(--primary)', instructor: 'Dr. Akin Okafor' }, { id: 2, title: 'JAMB Biology Masterclass', lessons: 36, completed: 36, color: 'var(--chart-5)', instructor: 'Prof. Ngozi Eze' }, { id: 3, title: 'English Language & Lit', lessons: 40, completed: 18, color: 'var(--chart-4)', instructor: 'Mrs. Adaku Bello' }, { id: 4, title: 'Physics: From Basics to JAMB', lessons: 44, completed: 8, color: 'var(--accent)', instructor: 'Mr. Ibrahim Musa' }]" :key="c.id"
              class="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0" :style="{ background: c.color }">📖</div>
                <div class="min-w-0">
                  <div class="font-bold text-sm text-foreground leading-snug mb-0.5">{{ c.title }}</div>
                  <div class="text-xs text-muted-foreground">{{ c.instructor }}</div>
                </div>
                <span v-if="c.completed === c.lessons" class="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-primary">Complete ✓</span>
              </div>
              <div class="mb-3">
                <div class="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{{ c.completed }}/{{ c.lessons }} lessons</span>
                  <span class="font-bold" :style="{ color: c.color }">{{ Math.round((c.completed / c.lessons) * 100) }}%</span>
                </div>
                <div class="h-2 bg-muted rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all" :style="{ width: (c.completed / c.lessons) * 100 + '%', background: c.color }" />
                </div>
              </div>
              <button class="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                :style="{ background: c.completed === c.lessons ? 'var(--muted-foreground)' : c.color }">
                {{ c.completed === c.lessons ? 'Review Course' : 'Continue Learning →' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>