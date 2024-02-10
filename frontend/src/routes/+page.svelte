<div class="landing-page">
  <h1>Sentencio</h1>
  <p class="subtext">Sentences with friends :).</p>
  <div class="buttons">
      <button class="btn bg-de-york-500 text-cod-gray-100" onclick="hostGame()">Host Game</button>
      <button class="btn bg-de-york-500 text-cod-gray-100" onclick="joinGame()">Join Game</button>
  </div>
</div>


<!-- <h1>Sentencio</h1>
<p>Create silly sentences with your friends!</p>
<Button text="Tristan"></Button>
<Button></Button> -->

<script>
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
    import Button from '../components/Button.svelte';
  
    let socket;
  
    onMount(() => {
      socket = io('http://localhost:3000');
  
      socket.on('connect', () => {
        console.log('Connected to server');
      });
    });
  </script>