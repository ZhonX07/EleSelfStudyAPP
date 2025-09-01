<template>
  <div class="math-self-study">
    <BackToHomeButton @go-home="$emit('go-home')" />
    <HelpButton />
    <RealTimeClock />
    <GaokaoCountdown />
    <StudyPlanDisplay />
  </div>
</template>

<script setup>
import RealTimeClock from './RealTimeClock.vue'
import GaokaoCountdown from './GaokaoCountdown.vue'
import StudyPlanDisplay from './StudyPlanDisplay.vue'

// 定义事件
defineEmits(['go-home'])
</script>

<style scoped>
.math-self-study {
  min-height: 100vh;
  width: 100vw;
  background: url('../assets/back.png') center/cover no-repeat fixed;
  position: relative;
  overflow: hidden;
}
</style>