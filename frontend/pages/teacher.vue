<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref("overview")

const tabs = [
  { id: "overview", label: "Overview", icon: "heroicons:home" },
  { id: "classes", label: "My Classes", icon: "heroicons:users" },
  { id: "cbt", label: "Create CBT", icon: "heroicons:document-text" },
  { id: "grades", label: "Gradebook", icon: "heroicons:academic-cap" },
]

const students = [
  { name: "Adaeze Okonkwo", score: 88, subject: "Biology", status: "passed" },
  { name: "Emeka Osei", score: 72, subject: "Biology", status: "passed" },
  { name: "Fatimah Bello", score: 54, subject: "Biology", status: "failed" },
  { name: "Tunde Adesanya", score: 91, subject: "Biology", status: "passed" },
  { name: "Amara Nwosu", score: 68, subject: "Biology", status: "passed" },
]
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <header class="border-b border-border bg-card px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-20">
      <div class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
          <span class="text-primary">EduMaster</span>
          <span class="text-accent">Africa</span>
      </div>
      <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-chart-4">Teacher</span>
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs bg-chart-4">TO</div>
        <NuxtLink to="/" class="ml-2 text-muted-foreground hover:text-foreground"><UIcon name="heroicons:arrow-left-on-rectangle" class="w-4 h-4" /></NuxtLink>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-black text-foreground" style="font-family: 'Nunito', sans-serif;">Teacher Portal</h1>
        <p class="text-sm text-muted-foreground">Welcome back, Mr. Taiwo Adewale · Biology · SS2A & SS3B</p>
      </div>

      <div class="flex gap-2 mb-8 border-b border-border">
        <button v-for="t in tabs" :key="t.id" @click="activeTab = t.id"
          :class="['flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors', activeTab === t.id ? 'text-primary' : 'border-transparent text-muted-foreground hover:text-foreground']"
          :style="activeTab === t.id ? { borderColor: 'var(--primary)' } : {}">
          <UIcon :name="t.icon" class="w-4 h-4" /> {{ t.label }}
        </button>
      </div>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="c in [{ label: 'Total Students', value: '147', icon: '👥', color: 'var(--chart-4)' }, { label: 'Avg Class Score', value: '71.4%', icon: '📊', color: 'var(--primary)' }, { label: 'Exams This Month', value: '8', icon: '📋', color: 'var(--chart-5)' }, { label: 'Assignments Due', value: '3', icon: '⏰', color: 'var(--destructive)' }]" :key="c.label"
            class="bg-card rounded-2xl border border-border p-5">
            <div class="text-2xl mb-2">{{ c.icon }}</div>
            <div class="text-2xl font-black text-foreground mb-0.5" style="font-family: 'Nunito', sans-serif;">{{ c.value }}</div>
            <div class="text-xs text-muted-foreground font-semibold">{{ c.label }}</div>
          </div>
        </div>

        <div class="bg-card rounded-2xl border border-border overflow-hidden">
          <div class="px-5 py-4 border-b border-border font-bold text-foreground">Recent Student Performance — Biology Test</div>
          <div class="divide-y divide-border">
            <div v-for="s in students" :key="s.name" class="px-5 py-3 flex items-center gap-4">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 bg-primary">{{ s.name.split(' ').map(n => n[0]).join('') }}</div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-sm text-foreground">{{ s.name }}</div>
              </div>
              <div class="w-24 hidden sm:block">
                <div class="h-2 bg-muted rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all bg-primary" :style="{ width: s.score + '%', background: s.score >= 70 ? 'var(--primary)' : s.score >= 50 ? 'var(--accent)' : 'var(--destructive)' }" />
                </div>
              </div>
              <div class="font-black text-sm w-12 text-right" :style="{ color: s.score >= 70 ? 'var(--primary)' : s.score >= 50 ? 'var(--accent)' : 'var(--destructive)' }">{{ s.score }}%</div>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white" :style="{ background: s.status === 'passed' ? 'var(--primary)' : 'var(--destructive)' }">{{ s.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Create CBT Tab -->
      <div v-if="activeTab === 'cbt'" class="max-w-lg">
        <h2 class="font-black text-xl text-foreground mb-4" style="font-family: 'Nunito', sans-serif;">Create New CBT Exam</h2>
        <div class="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div v-for="f in [{ label: 'Exam Title', placeholder: 'SS2 Biology Mid-Term Test' }, { label: 'Class', placeholder: 'SS2A' }, { label: 'Duration (minutes)', placeholder: '45' }]" :key="f.label">
            <label class="text-xs font-bold text-muted-foreground block mb-1">{{ f.label }}</label>
            <input class="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" :placeholder="f.placeholder" />
          </div>
          <div>
            <label class="text-xs font-bold text-muted-foreground block mb-1">Number of Questions</label>
            <div class="flex gap-2">
              <button v-for="n in [20, 40, 60]" :key="n" class="px-4 py-2 rounded-lg text-sm font-bold border border-border hover:bg-muted">{{ n }}</button>
            </div>
          </div>
          <button class="w-full py-3 rounded-xl font-bold text-sm text-white bg-primary">
            Generate Exam with AI →
          </button>
        </div>
      </div>

      <!-- Classes/Grades Tab -->
      <div v-if="activeTab === 'classes' || activeTab === 'grades'" class="flex flex-col items-center py-16 text-center">
        <div class="text-4xl mb-3">🏗️</div>
        <div class="font-bold text-foreground mb-1">{{ activeTab === 'classes' ? 'Class Management' : 'Gradebook' }}</div>
        <p class="text-sm text-muted-foreground max-w-xs">Full portal available for school license holders. Contact your administrator.</p>
      </div>
    </div>
  </div>
</template>