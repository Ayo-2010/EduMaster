<script setup lang="ts">
const route = useRoute()

const navItems = [
  { path: '/dashboard', icon: 'heroicons:home', label: 'Dashboard' },
  { path: '/courses', icon: 'heroicons:book-open', label: 'Courses' },
  { path: '/cbt-setup', icon: 'heroicons:academic-cap', label: 'CBT Practice' },
  { path: '/ai', icon: 'heroicons:chat-bubble-left-right', label: 'AI Tutor', soon: true },
  { path: '/resources', icon: 'heroicons:folder', label: 'Resources' },
]

const isActive = (path: string) => route.path === path
const isMinimized = ref(false)
</script>

<template>
  <div class="min-h-screen bg-background font-body">
    <slot />
  </div>
</template>

<style>
.font-display { font-family: 'Nunito', system-ui, sans-serif; }
.font-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
</style>