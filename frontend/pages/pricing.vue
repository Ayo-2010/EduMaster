<script setup lang="ts">
import { ref } from 'vue'
const annual = ref(false)

const plans = [
  {
    name: "Free",     price: "₦0", annualPrice: "₦0", period: "", color: "var(--muted-foreground)", bg: "var(--muted)",
    desc: "Great for getting started",
    features: ["1,000+ practice questions", "Basic CBT practice mode", "3 AI Tutor questions/day", "Limited course access", "Progress tracking"],
    missing: ["Unlimited questions", "Exam mode & mock exams", "Full AI Tutor", "All courses", "Certificate", "Offline access"],
    cta: "Get Started Free",
  },
  {
    name: "Premium", price: "₦2,500", annualPrice: "₦1,800", period: "/mo", color: 'var(--primary)', bg: "#dcfce7",
    desc: "Everything you need to ace your exams",
    features: ["Unlimited past questions", "All CBT modes (Practice, Exam, Mock)", "Unlimited AI Tutor", "All 200+ courses", "Certificates of completion", "Offline learning (mobile)", "Performance analytics", "Priority support"],
    missing: [],
    cta: "Start Premium →",
    highlight: true,
  },
  {
    name: "School", price: "₦150k", annualPrice: "₦120k", period: "/yr per class", color: 'var(--chart-5)', bg: "#ede9fe",
    desc: "For institutions and school administrators",
    features: ["Everything in Premium", "Student management dashboard", "Custom CBT exam builder", "Class performance analytics", "Report card generation", "Parent portal access", "Bulk student enrollment", "Dedicated account manager", "API access"],
    missing: [],
    cta: "Contact Sales →",
  },
]
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <header class="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-20 px-4 sm:px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
          <span class="text-primary">EduMaster</span>
          <span class="text-accent">Africa</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <NuxtLink to="/auth" class="text-sm font-semibold px-4 py-2 rounded-lg border border-border hover:bg-muted">Sign In</NuxtLink>
        <NuxtLink to="/auth" class="text-sm font-bold px-4 py-2 rounded-lg text-white bg-primary">Get Started</NuxtLink>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div class="text-center mb-12">
        <div class="text-xs font-black uppercase tracking-widest mb-3 text-primary">Pricing</div>
        <h1 class="text-4xl font-black text-foreground mb-3" style="font-family: 'Nunito', sans-serif;">Simple, Transparent Pricing</h1>
        <p class="text-muted-foreground max-w-md mx-auto mb-6">Start free. Upgrade when you're ready. No hidden fees.</p>
        <div class="inline-flex items-center gap-2 p-1 rounded-full border border-border bg-muted">
          <button @click="annual = false" :class="['px-4 py-1.5 rounded-full text-sm font-bold transition-all', !annual ? 'bg-card text-foreground shadow' : 'text-muted-foreground']">Monthly</button>
          <button @click="annual = true" :class="['px-4 py-1.5 rounded-full text-sm font-bold transition-all', annual ? 'bg-card text-foreground shadow' : 'text-muted-foreground']">
            Annual <span class="text-xs ml-1 text-primary">Save 28%</span>
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="plan in plans" :key="plan.name"
          :class="['rounded-2xl border-2 overflow-hidden', plan.highlight ? 'shadow-2xl scale-105' : '']"
          :style="{ borderColor: plan.highlight ? 'var(--primary)' : 'var(--border)' }">
          <div v-if="plan.highlight" class="py-2 text-center text-xs font-black text-white bg-primary">MOST POPULAR</div>
          <div class="p-6 bg-card">
            <div class="mb-4">
              <div class="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-lg" :style="{ background: plan.bg }">{{ plan.name === "Free" ? "🆓" : plan.name === "Premium" ? "⭐" : "🏫" }}</div>
              <div class="font-black text-lg text-foreground">{{ plan.name }}</div>
              <div class="text-xs text-muted-foreground">{{ plan.desc }}</div>
            </div>
            <div class="mb-6">
              <span class="text-3xl font-black text-foreground">{{ annual ? plan.annualPrice : plan.price }}</span>
              <span class="text-muted-foreground text-sm">{{ plan.period }}</span>
            </div>
             <button class="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 mb-6"
                :class="plan.highlight ? 'bg-primary text-white' : plan.name === 'School' ? 'bg-chart-5 text-white' : 'bg-transparent border-2 border-border text-foreground'">
              {{ plan.cta }}
            </button>
            <div class="space-y-2">
              <div v-for="f in plan.features" :key="f" class="flex items-start gap-2 text-xs text-foreground">
                <UIcon name="heroicons:check" class="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-primary" /> {{ f }}
              </div>
              <div v-for="f in plan.missing" :key="f" class="flex items-start gap-2 text-xs text-muted-foreground">
                <UIcon name="heroicons:x-mark" class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {{ f }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <p class="text-muted-foreground text-sm mb-4">Trusted payment providers. Cancel anytime.</p>
        <div class="flex items-center justify-center gap-6 flex-wrap">
          <div v-for="p in ['Paystack', 'Flutterwave', 'Stripe', 'Monnify']" :key="p" class="px-4 py-2 rounded-lg border border-border bg-card text-xs font-bold text-muted-foreground">{{ p }}</div>
        </div>
      </div>
    </div>
  </div>
</template>