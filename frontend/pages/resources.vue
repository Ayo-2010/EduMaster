<script setup lang="ts">

const resources = [
  { subject: 'Mathematics', icon: '📐', count: '1,240', color: 'var(--primary)' },
  { subject: 'English', icon: '📖', count: '890', color: 'var(--accent)' },
  { subject: 'Physics', icon: '⚛️', count: '760', color: 'var(--chart-4)' },
  { subject: 'Chemistry', icon: '🧪', count: '680', color: 'var(--destructive)' },
  { subject: 'Biology', icon: '🧬', count: '520', color: 'var(--chart-5)' },
  { subject: 'Economics', icon: '📊', count: '430', color: 'var(--chart-2)' },
]
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <nav class="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2 font-black text-lg" style="font-family: 'Nunito', sans-serif;">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm bg-primary">E</div>
          <span class="text-primary">EduMaster</span>
          <span class="text-accent">Africa</span>
        </NuxtLink>
      </div>
    </nav>

    <main class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div class="mb-8">
        <h1 class="text-3xl font-black text-foreground mb-2" style="font-family: 'Nunito', sans-serif;">Resources</h1>
        <p class="text-muted-foreground">Download notes, textbooks, and past question PDFs</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="r in resources" :key="r.subject" class="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
          <div class="text-3xl mb-3">{{ r.icon }}</div>
          <div class="font-bold text-foreground mb-1">{{ r.subject }}</div>
          <div class="text-sm text-muted-foreground mb-4">{{ r.count }} resources available</div>
          <UButton block variant="outline">Download Now</UButton>
        </div>
      </div>
    </main>
  </div>
</template>