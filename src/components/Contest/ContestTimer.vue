<!-- src\components\Contest\ContestTimer.vue -->

<template>
 <div class="timer">
   <div class="timer-item">
     <span class="timer-value">{{ days }}</span>
     <span class="timer-unit">д.</span>
   </div>
   <span class="timer-separator">:</span>
   <div class="timer-item">
     <span class="timer-value">{{ hours }}</span>
     <span class="timer-unit">ч.</span>
   </div>
   <span class="timer-separator">:</span>
   <div class="timer-item">
     <span class="timer-value">{{ minutes }}</span>
     <span class="timer-unit">м.</span>
   </div>
   <span class="timer-separator">:</span>
   <div class="timer-item">
     <span class="timer-value">{{ seconds }}</span>
     <span class="timer-unit">сек.</span>
   </div>
 </div>
</template>

<script>
export default {
 name: 'ContestTimer',
 data() {
   return {
     endDate: new Date('2025-09-15T23:59:59'),
     days: '00',
     hours: '00',
     minutes: '00',
     seconds: '00',
     interval: null
   }
 },
 mounted() {
   this.updateTimer();
   this.interval = setInterval(this.updateTimer, 1000);
 },
 beforeUnmount() {
   if (this.interval) {
     clearInterval(this.interval);
   }
 },
 methods: {
   updateTimer() {
     const now = new Date().getTime();
     const distance = this.endDate.getTime() - now;

     if (distance < 0) {
       this.days = '00';
       this.hours = '00';
       this.minutes = '00';
       this.seconds = '00';
       if (this.interval) {
         clearInterval(this.interval);
       }
       return;
     }

     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

     this.days = days.toString().padStart(2, '0');
     this.hours = hours.toString().padStart(2, '0');
     this.minutes = minutes.toString().padStart(2, '0');
     this.seconds = seconds.toString().padStart(2, '0');
   }
 }
}
</script>

<style scoped>
.timer {
 display: flex;
 align-items: center;
 gap: 4px;
}

.timer-item {
 display: flex;
 align-items: baseline;
 gap: 2px;
}

.timer-value {
 font-size: 28px;
 font-weight: 700;
 color: #1a1a1a;
 color: #3F3F3F;
}

.timer-unit {
 font-size: 14px;
 color: #3F3F3F;
}

.timer-separator {
 font-size: 14px;
 font-weight: 700;
 color: #3F3F3F;
 margin: 0 2px;
}
</style>