<h1>Sentencio</h1>
<p>Create silly sentences with your friends!</p>
<button>Host Game</button>
<button>Join Game</button>

<script>
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
    import Button from '../lib/Button.svelte';
  
    let socket;
  
    onMount(() => {
      socket = io('http://localhost:3000');
  
      socket.on('connect', () => {
        console.log('Connected to server');
      });
    });
  </script>