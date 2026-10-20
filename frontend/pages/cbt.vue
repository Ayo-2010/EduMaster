<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentQ = ref(0)
const selected = ref<Record<number, string>>({})
const revealed = ref(false)
const submitted = ref(false)
const seconds = ref(45 * 60)
const flagged = ref<Set<number>>(new Set())

const cbtQs = [
  {
    text: "The process by which plants manufacture their own food using sunlight, water, and carbon dioxide is called:",
    options: [{ id: "A", text: "Respiration" }, { id: "B", text: "Photosynthesis" }, { id: "C", text: "Transpiration" }, { id: "D", text: "Osmosis" }],
    correct: "B",
    explanation: "Photosynthesis occurs in chloroplasts. Light energy converts CO₂ + H₂O → glucose + O₂. This is the reverse of respiration."
  },
  {
    text: "Which organelle is known as the 'powerhouse of the cell' and is responsible for ATP production?",
    options: [{ id: "A", text: "Chloroplast" }, { id: "B", text: "Nucleus" }, { id: "C", text: "Mitochondria" }, { id: "D", text: "Ribosome" }],
    correct: "C",
    explanation: "Mitochondria carry out cellular respiration, converting glucose and oxygen into ATP, water, and CO₂."
  },
  {
    text: "If 2x + 3 = 11, what is the value of x?",
    options: [{ id: "A", text: "3" }, { id: "B", text: "4" }, { id: "C", text: "5" }, { id: "D", text: "7" }],
    correct: "B",
    explanation: "Solving: 2x = 8, so x = 4."
  }
]

const mins = computed(() => Math.floor(seconds.value / 60))
const secs = computed(() => seconds.value % 60)
const timerColor = computed(() => seconds.value < 300 ? 'var(--destructive)' : seconds.value < 900 ? 'var(--accent)' : 'var(--primary)')
const timerBg = computed(() => seconds.value < 300 ? 'rgba(232, 69, 69, 0.07)' : seconds.value < 900 ? 'rgba(245, 166, 35, 0.07)' : 'rgba(12, 100, 56, 0.07)')
const question = computed(() => cbtQs[currentQ.value])
const chosen = computed(() => selected.value[currentQ.value])
const answeredCount = computed(() => Object.keys(selected.value).length)

onMounted(() => {
  const t = setInterval(() => {
    if (!submitted.value) seconds.value = Math.max(0, seconds.value - 1)
  }, 1000)
  onUnmounted(() => clearInterval(t))
})

const pct = computed(() => Object.keys(selected.value).filter(k => selected.value[+k] === cbtQs[+k]?.correct).length / cbtQs.length * 100)
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <!-- Submitted View -->
    <div v-if="submitted" class="min-h-screen flex items-center justify-center p-6">
      <div class="bg-card rounded-3xl p-8 max-w-lg w-full border border-border shadow-2xl">
        <div class="text-center mb-8">
          <div class="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 bg-primary/10">
            {{ pct.value >= 80 ? '🎉' : pct.value >= 60 ? '👍' : '📚' }}
          </div>
          <div class="text-5xl font-black mb-2" style="font-family: 'Nunito', sans-serif;" :class="pct.value >= 70 ? 'text-primary' : pct.value >= 50 ? 'text-accent' : 'text-destructive'">{{ pct.value.toFixed(0) }}%</div>
          <div class="text-lg font-semibold text-muted-foreground">
            {{ Object.keys(selected).filter(k => selected[+k] === cbtQs[+k]?.correct).length }} of {{ cbtQs.length }} correct
          </div>
        </div>
        <NuxtLink to="/dashboard" class="w-full py-3 rounded-xl font-bold text-sm text-white text-center block bg-primary">
          Back to Dashboard
        </NuxtLink>
      </div>
    </div>

    <!-- Exam View -->
    <div v-else class="min-h-screen bg-background font-body">
      <header class="sticky top-0 z-20 bg-card border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/dashboard" class="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <UIcon name="heroicons:chevron-left" class="w-4 h-4" /> Exit
        </NuxtLink>
        <div class="hidden sm:block text-sm font-bold text-muted-foreground">WAEC Biology · 2023</div>
        <div class="flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-sm font-bold border-2" :style="{ color: timerColor, borderColor: timerColor, background: timerBg }">
          <UIcon name="heroicons:clock" class="w-3.5 h-3.5" /> {{ String(mins).padStart(2, '0') }}:{{ String(secs).padStart(2, '0') }}
        </div>
      </header>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-5">
          <div class="bg-card rounded-2xl p-6 border border-border">
            <div class="flex items-center gap-3 mb-5">
              <div class="text-xs font-black uppercase tracking-widest text-muted-foreground">Q {{ currentQ + 1 }} / {{ cbtQs.length }}</div>
              <div class="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                 <div class="h-full rounded-full transition-all bg-primary" :style="{ width: ((currentQ + 1) / cbtQs.length) * 100 + '%' }" />
              </div>
              <button @click="flagged.value.has(currentQ) ? flagged.value.delete(currentQ) : flagged.value.add(currentQ)"
                :class="['p-1.5 rounded-lg transition-colors', flagged.value.has(currentQ) ? 'text-amber-500 bg-amber-50' : 'text-muted-foreground hover:bg-muted']">
                <UIcon name="heroicons:bookmark" class="w-3.5 h-3.5" />
              </button>
            </div>

            <p class="font-semibold text-base text-foreground leading-relaxed mb-5">{{ question.text }}</p>

            <div class="space-y-3">
              <button v-for="opt in question.options" :key="opt.id"
                @click="!revealed && (selected[currentQ] = opt.id)"
                :class="['w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-left transition-all text-sm font-semibold', !revealed ? 'hover:border-primary hover:bg-primary/10' : '']"
                :style="chosen === opt.id || (revealed && opt.id === question.correct) ? { background: 'var(--primary)', borderColor: 'var(--primary)' } : (revealed && chosen === opt.id ? { background: 'var(--destructive)', borderColor: 'var(--destructive)' } : {})">
                <span :class="['w-7 h-7 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0', chosen === opt.id || (revealed && opt.id === question.correct) ? 'text-white' : 'text-foreground']"
                  :style="chosen === opt.id || (revealed && opt.id === question.correct) ? { background: 'var(--primary)' } : { background: 'var(--muted)' }">
                  {{ opt.id }}
                </span>
                {{ opt.text }}
                <UIcon v-if="revealed && opt.id === question.correct" name="heroicons:check" class="ml-auto text-primary w-3.5 h-3.5" />
                <UIcon v-if="revealed && chosen === opt.id && opt.id !== question.correct" name="heroicons:x-mark" class="ml-auto text-destructive w-3.5 h-3.5" />
              </button>
            </div>

            <div v-if="revealed" class="mt-5 p-4 rounded-xl border-l-4 bg-primary/10 border-primary">
              <div class="font-bold text-sm text-primary mb-1 flex items-center gap-2">
                <UIcon name="heroicons:sparkles" class="w-3 h-3" /> Explanation
              </div>
              <p class="text-sm text-primary/90 leading-relaxed">{{ question.explanation }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <UButton :disabled="currentQ === 0" @click="currentQ--; revealed = false" class="font-bold">
              <UIcon name="heroicons:chevron-left" class="w-3.5 h-3.5" /> Prev
            </UButton>
            <div class="flex gap-2">
              <UButton v-if="chosen && !revealed" variant="outline" @click="revealed = true">Show Answer</UButton>
              <UButton v-if="currentQ < cbtQs.length - 1" @click="currentQ++; revealed = false" class="bg-primary">Next <UIcon name="heroicons:chevron-right" class="w-3.5 h-3.5" /></UButton>
              <UButton v-else @click="submitted = true" class="bg-destructive">Submit Exam</UButton>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-4">
          <div class="bg-card rounded-2xl p-5 border border-border">
            <div class="font-bold text-sm mb-3 text-foreground">Navigator</div>
            <div class="grid grid-cols-5 gap-1.5">
              <button v-for="(_, i) in cbtQs" :key="i" @click="currentQ = i; revealed = false"
                class="w-9 h-9 rounded-lg text-xs font-black transition-all relative"
                :style="{ background: currentQ === i ? 'var(--primary)' : selected[i] ? 'var(--primary)/10' : 'var(--muted)', color: currentQ === i ? '#ffffff' : selected[i] ? 'var(--primary)' : 'var(--muted-foreground)', border: currentQ === i ? '2px solid var(--primary)' : '2px solid transparent' }">
                {{ i + 1 }}
                <span v-if="flagged.value.has(i)" class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full" :style="{ background: 'var(--accent)' }" />
              </button>
            </div>
          </div>

          <div class="bg-card rounded-2xl p-5 border border-border">
            <div class="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{{ answeredCount }} answered</span><span>{{ cbtQs.length - answeredCount }} left</span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden mb-4">
               <div class="h-full rounded-full transition-all bg-primary" :style="{ width: (answeredCount / cbtQs.length) * 100 + '%' }" />
            </div>
            <UButton @click="submitted = true" block class="bg-destructive">Submit Exam</UButton>
          </div>

          <div class="bg-card rounded-2xl p-5 border border-border">
            <div class="font-bold text-sm mb-2 text-foreground flex items-center gap-2">
              <UIcon name="heroicons:chat-bubble-bottom-center-text" class="w-3 h-3" /> AI Hint
            </div>
            <p class="text-xs text-muted-foreground mb-3">Stuck? Get a nudge without seeing the answer.</p>
            <UButton variant="outline" block class="border-primary text-primary">Get a Hint →</UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>