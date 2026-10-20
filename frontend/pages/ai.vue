<script setup lang="ts">

const messages = [
  { from: 'ai', text: 'Hello! I\'m EduMaster AI. How can I help you today?', time: '10:24 AM' },
  { from: 'user', text: 'Explain the quadratic formula', time: '10:25 AM' },
  { from: 'ai', text: 'The quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\n\nThis solves equations of the form ax² + bx + c = 0. The discriminant (b² - 4ac) determines the nature of roots.', time: '10:25 AM' },
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
        <div class="flex items-center gap-4">
          <UButton variant="ghost" size="sm">Upgrade</UButton>
        </div>
      </div>
    </nav>

    <main class="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-black text-foreground mb-2" style="font-family: 'Nunito', sans-serif;">AI Tutor</h1>
        <p class="text-muted-foreground">Ask anything, get instant explanations</p>
      </div>

      <div class="bg-card rounded-2xl border border-border h-[500px] flex flex-col">
        <div class="flex-1 p-4 overflow-y-auto space-y-4">
          <div v-for="(msg, i) in messages" :key="i" class="flex gap-3" :class="msg.from === 'user' ? 'justify-end' : 'justify-start'">
             <div v-if="msg.from === 'ai'" class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
            <div class="flex flex-col" :class="msg.from === 'user' ? 'items-end' : 'items-start'">
              <div class="text-xs text-muted-foreground mb-1">{{ msg.time }}</div>
              <div class="px-4 py-2.5 rounded-2xl text-sm max-w-xs whitespace-pre-wrap"
                   :class="msg.from === 'user' ? 'text-white' : 'text-foreground bg-muted'"
                    :style="msg.from === 'user' ? { background: 'var(--primary)' } : {}">
                {{ msg.text }}
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-border">
          <div class="flex gap-2">
             <textarea class="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[42px] resize-none"
                      placeholder="Ask a question..."></textarea>
             <UButton class="px-4 bg-primary">Send</UButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>