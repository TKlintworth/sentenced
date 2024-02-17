<script>
    let timeLeft = 60; // Starting time left in seconds
  
    // Countdown function
    const countdown = () => {
      if(timeLeft > 0) {
        setTimeout(() => {
          timeLeft -= 1;
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
            {timeLeft}
        </div>
        <progress class="progress progress-primary w-56" value={timeLeft} max="60"></progress>
    </div>
</div>