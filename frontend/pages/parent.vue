<script setup lang="ts">

const children = [
  { name: 'Adeola Okonkwo', class: 'SS3', school: 'University of Lagos Staff School', avatar: 'AO', avg: '87%' },
  { name: 'Samuel Okonkwo', class: 'JS3', school: 'University of Lagos Staff School', avatar: 'SO', avg: '92%' },
]

const recentActivity = [
  { child: 'AO', action: 'Completed JAMB Mock (Maths)', score: '78/100', time: '2 hours ago' },
  { child: 'SO', action: 'Started WAEC Chemistry', score: '-', time: '3 hours ago' },
  { child: 'AO', action: 'Asked AI about calculus', score: '-', time: '5 hours ago' },
  { child: 'SO', action: 'Downloaded Biology notes', score: '-', time: '1 day ago' },
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
          <UButton variant="ghost" size="sm">Notifications</UButton>
          <UButton variant="ghost" size="sm">Settings</UButton>
        </div>
      </div>
    </nav>

    <main class="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div class="mb-8">
        <h1 class="text-3xl font-black text-foreground mb-2" style="font-family: 'Nunito', sans-serif;">Parent Portal</h1>
        <p class="text-muted-foreground">Monitor your children's academic progress</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-card rounded-2xl p-6 border border-border">
            <h2 class="font-bold text-foreground mb-4">Your Children</h2>
            <div class="space-y-4">
              <div v-for="c in children" :key="c.name" class="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-primary">{{ c.avatar }}</div>
                  <div>
                    <div class="font-bold text-foreground">{{ c.name }}</div>
                    <div class="text-sm text-muted-foreground">{{ c.class }} @ {{ c.school }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-primary">{{ c.avg }} avg</div>
                  <UButton variant="ghost" size="sm">View Details</UButton>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-card rounded-2xl p-6 border border-border">
            <h2 class="font-bold text-foreground mb-4">Recent Activity</h2>
            <div class="space-y-3">
              <div v-for="(a, i) in recentActivity" :key="i" class="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-primary">{{ a.child }}</div>
                  <span class="text-sm text-foreground">{{ a.action }}</span>
                </div>
                <div class="text-xs text-muted-foreground">{{ a.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-card rounded-2xl p-6 border border-border">
            <h3 class="font-bold text-foreground mb-4">Quick Actions</h3>
            <div class="space-y-2">
              <UButton block variant="outline" :ui="{ base: 'justify-start' }">
                <UIcon name="heroicons:calendar" class="w-4 h-4 mr-2" />
                Schedule Study Time
              </UButton>
              <UButton block variant="outline" :ui="{ base: 'justify-start' }">
                <UIcon name="heroicons:envelope" class="w-4 h-4 mr-2" />
                Send Message to Teacher
              </UButton>
              <UButton block variant="outline" :ui="{ base: 'justify-start' }">
                <UIcon name="heroicons:document-text" class="w-4 h-4 mr-2" />
                Download Report Card
              </UButton>
            </div>
          </div>

          <div class="bg-card rounded-2xl p-6 border border-border">
            <h3 class="font-bold text-foreground mb-2">Need Help?</h3>
            <p class="text-sm text-muted-foreground mb-4">Contact support or visit our help center</p>
            <UButton block color="primary">Contact Support</UButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>