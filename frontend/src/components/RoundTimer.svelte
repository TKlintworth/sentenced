<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let roundTime = 60; // Default round time in seconds
  let countdownValue = tweened(roundTime, {
    duration: 1000,
    easing: cubicOut
  });

  // Countdown function
  const countdown = () => {
    if (roundTime > 0) {
      setTimeout(() => {
        roundTime -= 1;
        countdownValue.set(roundTime);
        countdown();
      }, 1000);
    }
  };

  onMount(() => {
    countdown(); // Start the countdown
  });
</script>

<div class="container">
  <div class="timer">
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" class="timer-circle" />
      <path
        d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
        class="timer-path"
        style="stroke-dasharray: {$countdownValue * 283 / roundTime}, 283;"
      />
    </svg>
    <div class="timer-label">
      <div class="timer-value">{Math.ceil($countdownValue)}</div>
      <div class="timer-text">Time Left in Round</div>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .timer {
    position: relative;
    width: 200px;
    height: 200px;
  }

  .timer-circle {
    fill: none;
    stroke: #eee;
    stroke-width: 10;
  }

  .timer-path {
    fill: none;
    stroke: #2196f3;
    stroke-width: 10;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
    transition: stroke-dasharray 0.5s ease-in-out;
  }

  .timer-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .timer-value {
    font-size: 48px;
    font-weight: bold;
    color: #2196f3;
  }

  .timer-text {
    font-size: 18px;
    color: #666;
  }
</style>