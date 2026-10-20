<script setup lang="ts">
import { ref, computed } from 'vue'
const filter = ref("All")
const search = ref("")
const selectedCourse = ref<typeof allCourses[0] | null>(null)

const filters = ["All", "WAEC", "JAMB", "NECO", "Post-UTME", "Primary", "International"]

const allCourses = [
  { id: 1, title: "WAEC Mathematics Complete", category: "WAEC", lessons: 48, enrolled: 12400, rating: 4.9, badge: "Bestseller", color: 'var(--primary)', instructor: "Dr. Akin Okafor", price: "Free" },
  { id: 2, title: "JAMB Biology Masterclass", category: "JAMB", lessons: 36, enrolled: 8900, rating: 4.8, badge: "Top Rated", color: 'var(--chart-5)', instructor: "Prof. Ngozi Eze", price: "₦2,500/mo" },
  { id: 3, title: "English Language & Lit", category: "WAEC", lessons: 40, enrolled: 10200, rating: 4.7, badge: null, color: 'var(--chart-4)', instructor: "Mrs. Adaku Bello", price: "Free" },
  { id: 4, title: "NECO Chemistry Deep Dive", category: "NECO", lessons: 32, enrolled: 5600, rating: 4.6, badge: null, color: 'var(--destructive)', instructor: "Mr. Seun Adeyemi", price: "₦1,500/mo" },
  { id: 5, title: "Physics: From Basics to JAMB", category: "JAMB", lessons: 44, enrolled: 7300, rating: 4.8, badge: "New", color: 'var(--accent)', instructor: "Mr. Ibrahim Musa", price: "₦2,000/mo" },
  { id: 6, title: "Post-UTME Crash Course", category: "Post-UTME", lessons: 20, enrolled: 15000, rating: 4.9, badge: "Bestseller", color: 'var(--chart-4)', instructor: "Team EduMaster", price: "₦3,000" },
  { id: 7, title: "Common Entrance Prep", category: "Primary", lessons: 28, enrolled: 4200, rating: 4.5, badge: null, color: 'var(--primary)', instructor: "Mrs. Patience Obi", price: "Free" },
  { id: 8, title: "SAT & Scholarship Prep", category: "International", lessons: 52, enrolled: 3100, rating: 4.7, badge: "New", color: 'var(--destructive)', instructor: "Dr. Chuka Nweze", price: "₦5,000/mo" },
]

const filtered = computed(() => allCourses.filter(c => (filter.value === "All" || c.category === filter.value) && (search.value === "" || c.title.toLowerCase().includes(search.value.toLowerCase()))))
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <header class="bg-card border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-20">
      <div class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
          <span class="text-primary">EduMaster</span>
          <span class="text-accent">Africa</span>
      </div>
      <div class="hidden md:flex items-center gap-6 text-sm font-semibold">
        <NuxtLink to="/" class="text-muted-foreground hover:text-foreground">Home</NuxtLink>
        <NuxtLink to="/pricing" class="text-muted-foreground hover:text-foreground">Pricing</NuxtLink>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/auth" class="text-sm font-semibold px-3 py-2 rounded-lg border border-border hover:bg-muted hidden sm:block">Sign In</NuxtLink>
        <NuxtLink to="/dashboard" class="text-sm font-bold px-4 py-2 rounded-lg text-white bg-primary">Dashboard</NuxtLink>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div class="mb-8">
        <div class="text-xs font-black uppercase tracking-widest mb-2 text-primary">Course Library</div>
        <h1 class="text-3xl sm:text-4xl font-black text-foreground mb-2" style="font-family: 'Nunito', sans-serif;">Find Your Course</h1>
        <p class="text-muted-foreground max-w-xl">Expert-crafted courses for every major exam. Taught by Nigeria's top educators.</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <div class="relative flex-1 max-w-md">
          <UIcon name="heroicons:magnifying-glass" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
          <input v-model="search"                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Search courses..." />
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="f in filters" :key="f" @click="filter = f"
            :class="['px-3 py-2 rounded-full text-xs font-bold transition-all', filter === f ? 'text-white' : 'bg-muted text-muted-foreground']"
            :style="filter === f ? { background: 'var(--primary)' } : {}">
            {{ f }}
          </button>
        </div>
      </div>

      <div class="text-sm text-muted-foreground mb-5">{{ filtered.length }} courses found</div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div v-for="course in filtered" :key="course.id" @click="selectedCourse = course"
          class="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group">
          <div class="h-2 bg-primary" :style="{ background: course.color }" />
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
               <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white" :style="{ background: course.color }">📖</div>
               <span v-if="course.badge" class="text-xs font-bold px-2 py-0.5 rounded-full text-white" :style="{ background: course.badge === 'New' ? 'var(--chart-4)' : course.badge === 'Bestseller' ? 'var(--accent)' : 'var(--primary)' }">{{ course.badge }}</span>
            </div>
            <h3 class="font-bold text-sm text-foreground mb-0.5 leading-snug group-hover:underline">{{ course.title }}</h3>
            <div class="text-xs text-muted-foreground mb-1">{{ course.instructor }}</div>
            <div class="text-xs font-semibold mb-3" :style="{ color: course.color }">{{ course.category }}</div>
            <div class="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span class="flex items-center gap-1"><UIcon name="heroicons:book-open" class="w-2.5 h-2.5" /> {{ course.lessons }} lessons</span>
              <span class="flex items-center gap-1"><UIcon name="heroicons:users" class="w-2.5 h-2.5" /> {{ (course.enrolled / 1000).toFixed(1) }}k</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                <UIcon v-for="i in 5" :key="i" name="heroicons:star" class="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span class="text-xs font-bold">{{ course.rating }}</span>
              </div>
              <div class="font-black text-sm" :style="{ color: course.color }">{{ course.price }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filtered.length === 0" class="text-center py-20">
        <div class="text-5xl mb-3">🔍</div>
        <div class="font-bold text-foreground mb-1">No courses found</div>
        <div class="text-sm text-muted-foreground">Try a different search or filter.</div>
      </div>
    </div>

    <!-- Course Modal -->
    <div v-if="selectedCourse" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="selectedCourse = null">
      <div class="bg-card rounded-2xl w-full max-w-lg border border-border shadow-2xl overflow-hidden" @click.stop>
        <div class="h-3" :style="{ background: selectedCourse.color }" />
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white" :style="{ background: selectedCourse.color }">{{ selectedCourse.category }}</span>
              <h2 class="font-black text-xl text-foreground mt-2">{{ selectedCourse.title }}</h2>
              <p class="text-sm text-muted-foreground">by {{ selectedCourse.instructor }}</p>
            </div>
            <button @click="selectedCourse = null" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"><UIcon name="heroicons:x-mark" class="w-4 h-4" /></button>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-5">
            <div v-for="s in [{ label: 'Lessons', value: String(selectedCourse.lessons) }, { label: 'Students', value: (selectedCourse.enrolled / 1000).toFixed(1) + 'k' }, { label: 'Rating', value: String(selectedCourse.rating) + ' ★' }]" :key="s.label" class="text-center p-3 rounded-xl bg-muted/50">
              <div class="font-black text-lg text-foreground">{{ s.value }}</div>
              <div class="text-xs text-muted-foreground">{{ s.label }}</div>
            </div>
          </div>
          <div class="space-y-2 mb-5">
            <div v-for="f in ['HD video lessons with downloadable notes', 'AI-generated practice questions per topic', 'Progress tracking and mastery scores', 'Certificate of completion', 'Lifetime access to updates']" :key="f" class="flex items-center gap-2 text-sm text-foreground">
               <UIcon name="heroicons:check" class="w-3.5 h-3.5" :style="{ color: 'var(--primary)' }" /> {{ f }}
            </div>
          </div>
          <div class="flex items-center justify-between">
             <div class="font-black text-2xl text-primary">{{ selectedCourse.price }}</div>
            <div class="flex gap-2">
              <button class="px-4 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted">Preview</button>
               <button class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-primary">Enroll Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>