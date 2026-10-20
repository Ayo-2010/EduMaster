<script setup lang="ts">
import { ref } from 'vue'
const subject = ref<string | null>(null)
const year = ref("2023")
const mode = ref("practice")
const step = ref(1)

const cbtSubjects = [
  { name: "Biology", icon: "🧪", color: 'var(--primary)', years: ["2023", "2022", "2021", "2020", "2019"] },
  { name: "Chemistry", icon: "⚗️", color: 'var(--destructive)', years: ["2023", "2022", "2021", "2020"] },
  { name: "Mathematics", icon: "🔢", color: 'var(--accent)', years: ["2023", "2022", "2021", "2020", "2019"] },
  { name: "Physics", icon: "⚡", color: 'var(--chart-4)', years: ["2023", "2022", "2021", "2020"] },
  { name: "English", icon: "✍️", color: 'var(--chart-5)', years: ["2023", "2022", "2021"] },
  { name: "Literature", icon: "📖", color: 'var(--chart-4)', years: ["2023", "2022", "2021"] },
]

const cbtModes = [
  { id: "practice", label: "Practice Mode", desc: "Study at your own pace. See answers immediately.", icon: "📖" },
  { id: "exam", label: "Exam Mode", desc: "Timed. Realistic exam experience. No hints.", icon: "⏱️" },
  { id: "challenge", label: "Challenge Mode", desc: "Compete with others in real time.", icon: "⚡" },
  { id: "mock", label: "Mock Exam", desc: "Full-length simulation. Replicate exam day.", icon: "🎯" },
]

const selectedSubject = computed(() => cbtSubjects.find(s => s.name === subject.value))
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <header class="border-b border-border bg-card px-4 sm:px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/dashboard" class="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <UIcon name="heroicons:chevron-left" class="w-4 h-4" /> Back to Dashboard
      </NuxtLink>
      <div class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
          <span class="text-primary">EduMaster</span>
          <span class="text-accent">Africa</span>
      </div>
    </header>

    <div class="max-w-2xl mx-auto px-4 py-12">
      <!-- Stepper -->
      <div class="flex items-center gap-2 mb-10">
        <div v-for="s in [1, 2, 3]" :key="s" class="flex items-center gap-2">
          <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all', step >= s ? 'text-white' : 'bg-muted text-muted-foreground']"
            :style="step >= s ? { background: 'var(--primary)' } : {}">
            <UIcon v-if="step > s" name="heroicons:check" class="w-3.5 h-3.5" />
            <span v-else>{{ s }}</span>
          </div>
          <span :class="['text-sm font-semibold', step >= s ? 'text-foreground' : 'text-muted-foreground']">
            {{ s === 1 ? 'Subject' : s === 2 ? 'Settings' : 'Start' }}
          </span>
          <div v-if="s < 3" class="flex-1 h-px bg-border w-8 sm:w-16" />
        </div>
      </div>

      <!-- Step 1: Subject Selection -->
      <div v-if="step === 1">
        <h1 class="text-2xl font-black text-foreground mb-1" style="font-family: 'Nunito', sans-serif;">Choose a Subject</h1>
        <p class="text-muted-foreground text-sm mb-6">Select the subject you want to practice today.</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button v-for="s in cbtSubjects" :key="s.name" @click="subject = s.name"
            :class="['p-4 rounded-2xl border-2 text-left transition-all hover:shadow-md', subject === s.name ? 'text-white' : 'bg-card border-border']"
            :style="subject === s.name ? { background: s.color, borderColor: s.color } : {}">
            <div :class="['mb-2', subject !== s.name ? '' : 'text-white']" :style="subject !== s.name ? { color: s.color } : {}">{{ s.icon }}</div>
            <div :class="['font-bold text-sm', subject === s.name ? 'text-white' : 'text-foreground']">{{ s.name }}</div>
            <div :class="['text-xs', subject === s.name ? 'text-white/70' : 'text-muted-foreground']">{{ s.years.length }} years</div>
          </button>
        </div>
        <UButton @click="step = 2" :disabled="!subject" class="mt-6 font-bold text-sm text-white bg-primary">Continue →</UButton>
      </div>

      <!-- Step 2: Settings -->
      <div v-if="step === 2 && selectedSubject">
        <h1 class="text-2xl font-black text-foreground mb-1" style="font-family: 'Nunito', sans-serif;">Configure Your Session</h1>
        <p class="text-muted-foreground text-sm mb-6">{{ subject }} · Customise your practice.</p>

        <div class="space-y-6">
          <div>
            <div class="text-sm font-bold text-foreground mb-3">Year / Paper</div>
            <div class="flex flex-wrap gap-2">
              <button v-for="y in selectedSubject.years" :key="y" @click="year = y"
                :class="['px-4 py-2 rounded-xl font-medium text-sm transition-all', year === y ? 'text-white' : 'bg-muted text-muted-foreground']"
                :style="year === y ? { background: selectedSubject.color } : {}">
                {{ y }}
              </button>
            </div>
          </div>

          <div>
            <div class="text-sm font-bold text-foreground mb-3">Mode</div>
            <div class="grid sm:grid-cols-2 gap-3">
              <button v-for="m in cbtModes" :key="m.id" @click="mode = m.id"
                :class="['p-4 rounded-xl border-2 text-left transition-all', mode === m.id ? 'border-primary bg-primary/10' : 'border-border bg-card']">
                <div class="text-xl mb-1">{{ m.icon }}</div>
                <div :class="['font-medium text-sm', mode === m.id ? 'text-primary' : 'text-foreground']">{{ m.label }}</div>
                <div class="text-xs text-muted-foreground">{{ m.desc }}</div>
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <UButton variant="outline" @click="step = 1" class="font-bold text-sm">← Back</UButton>
          <UButton @click="step = 3" class="font-bold text-sm text-white bg-primary">Review →</UButton>
        </div>
      </div>

      <!-- Step 3: Review -->
      <div v-if="step === 3">
        <h1 class="text-2xl font-black text-foreground mb-1" style="font-family: 'Nunito', sans-serif;">Ready to Start!</h1>
        <p class="text-muted-foreground text-sm mb-6">Review your session details below.</p>
        <div class="bg-card rounded-2xl border border-border p-6 mb-6 space-y-4">
          <div v-for="row in [{ label: 'Subject', value: subject || '' }, { label: 'Year', value: year }, { label: 'Mode', value: cbtModes.find(m => m.id === mode)?.label || '' }, { label: 'Questions', value: '5 questions (demo)' }, { label: 'Duration', value: mode === 'practice' ? 'Untimed' : '45 minutes' }]" :key="row.label" class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground font-semibold">{{ row.label }}</span>
            <span class="font-bold text-foreground">{{ row.value }}</span>
          </div>
        </div>
        <div class="flex gap-3">
          <UButton variant="outline" @click="step = 2" class="font-bold text-sm">← Back</UButton>
          <NuxtLink to="/cbt" class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-primary">
            <UIcon name="heroicons:play" class="w-4 h-4" /> Start Exam
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>