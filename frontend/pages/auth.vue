<script setup lang="ts">

import { ref } from 'vue'
const mode = ref<"login" | "register">("login")
const role = ref<"student" | "teacher" | "parent" | "school">("student")
const showPass = ref(false)
const loading = ref(false)
const form = ref({ name: "", email: "", password: "", school: "" })

const roles: { id: typeof role.value; label: string; icon: string }[] = [
  { id: "student", label: "Student", icon: "🎓" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫" },
  { id: "parent", label: "Parent", icon: "👪" },
  { id: "school", label: "School", icon: "🏫" },
]

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<template>
  <div class="min-h-screen bg-background flex font-body">
    <!-- Left panel -->
    <div class="hidden lg:flex flex-col justify-between w-2/5 p-12 text-white bg-primary">
          <div class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
            <span class="text-primary">EduMaster</span>
            <span class="text-accent">Africa</span>
          </div>
      <div>
        <div class="text-4xl font-black mb-4" style="font-family: 'Nunito', sans-serif;">
          Your Journey to<br /><span class="text-accent">Academic Excellence</span><br />starts here.
        </div>
        <p class="text-white/70 mb-8">Join 2.1 million students preparing for WAEC, JAMB, NECO and beyond.</p>
        <div class="space-y-3">
          <div v-for="f in ['Access 80,000+ past questions', 'AI tutor available 24/7', 'Track your progress in real time', 'Free to start — no card required']" :key="f" class="flex items-center gap-3 text-sm text-white/80">
            <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-accent">
              <UIcon name="heroicons:check" class="w-3 h-3 text-accent-foreground" />
            </div>
            {{ f }}
          </div>
        </div>
      </div>
      <div class="text-xs text-white/40">© 2025 EduMaster Africa</div>
    </div>

    <!-- Right panel -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <div class="lg:hidden mb-8">
          <div class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
            <span class="text-primary">EduMaster</span>
            <span class="text-accent">Africa</span>
          </div>
        </div>
        <div class="mb-8">
          <h1 class="text-2xl font-black text-foreground mb-1" style="font-family: 'Nunito', sans-serif;">
            {{ mode === "login" ? "Sign in to your account" : "Create your free account" }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ mode === "login" ? "Don't have an account? " : "Already have an account? " }}
             <button @click="mode = mode === 'login' ? 'register' : 'login'" class="font-bold text-primary">
              {{ mode === "login" ? "Sign up free" : "Sign in" }}
            </button>
          </p>
        </div>

        <!-- Role selector (register only) -->
        <div v-if="mode === 'register'" class="mb-6">
          <div class="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">I am a</div>
          <div class="grid grid-cols-4 gap-2">
            <button v-for="r in roles" :key="r.id" @click="role = r.id"
            :class="['flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-bold border-2 transition-all', role === r.id ? 'text-white' : 'border-border text-muted-foreground hover:border-primary']"
            :style="role === r.id ? { background: 'var(--primary)', borderColor: 'var(--primary)' } : {}">
              <span class="text-lg">{{ r.icon }}</span>
              {{ r.label }}
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="mode === 'register'">
            <label class="text-xs font-bold text-foreground block mb-1">Full Name</label>
            <input v-model="form.name"
               class="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Adaeze Okonkwo" required />
          </div>
          <div>
            <label class="text-xs font-bold text-foreground block mb-1">Email Address</label>
            <input v-model="form.email" type="email"
               class="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com" required />
          </div>
          <div>
            <label class="text-xs font-bold text-foreground block mb-1">Password</label>
            <div class="relative">
              <input v-model="form.password" :type="showPass ? 'text' : 'password'"
                class="w-full px-4 py-3 pr-11 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••" required minlength="8" />
              <button type="button" @click="showPass = !showPass" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <UIcon :name="showPass ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div v-if="mode === 'register' && (role === 'student' || role === 'teacher')">
            <label class="text-xs font-bold text-foreground block mb-1">School (optional)</label>
            <input v-model="form.school"
               class="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Queens College Lagos" />
          </div>

            <button type="submit" :disabled="loading"
             class="w-full py-3.5 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70 bg-primary">
            <UIcon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
            {{ loading ? "Processing..." : mode === "login" ? "Sign In →" : "Create Free Account →" }}
          </button>
        </form>

        <div class="mt-6">
          <div class="relative flex items-center gap-3 mb-4">
            <div class="flex-1 h-px bg-border" />
            <span class="text-xs text-muted-foreground">or continue with</span>
            <div class="flex-1 h-px bg-border" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="p in ['Google', 'Microsoft']" :key="p"
              class="py-3 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2 text-foreground">
              <UIcon name="heroicons:globe-alt" class="w-4 h-4" /> {{ p }}
            </button>
          </div>
        </div>

        <p class="text-xs text-muted-foreground text-center mt-6">
          By continuing you agree to our
          <span class="underline cursor-pointer">Terms of Service</span> and
          <span class="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  </div>
</template>