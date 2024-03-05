<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { socketStore } from '../lib/socketStore.js';

  export let roundTime = 60; // Default round time in seconds

  // Countdown function
  const countdown = () => {
    if(roundTime > 0) {
      setTimeout(() => {
        roundTime -= 1;
        countdown();
      }, 1000);
    }
  };

  countdown(); // Start the countdown
</script>

<div class="flex justify-center items-center h-screen">
    <div class="text-center">
        <div class="text-2xl font-bold text-blue-500 mb-2">Time Left in Round</div>
        <div class="text-6xl font-semibold text-blue-700">
            {roundTime}
        </div>
        <progress class="progress progress-primary w-56" value={roundTime} max="60"></progress>
    </div>
</div>