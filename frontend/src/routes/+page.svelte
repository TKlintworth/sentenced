<h1>Sentencio</h1>
<p>Create silly sentences with your friends!</p>
<Button text="Tristan"></Button>
<Button></Button>

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