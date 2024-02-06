<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<script>
    import { onMount } from 'svelte';
    import io from 'socket.io-client';
  
    let socket;
  
    onMount(() => {
      socket = io('http://localhost:3000');
  
      socket.on('connect', () => {
        console.log('Connected to server');
      });
    });
  </script>