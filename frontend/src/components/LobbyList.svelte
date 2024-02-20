<script>
    import { onMount } from 'svelte';
    import { socketStore } from '../lib/socketStore.js';
    import Lobby from './Lobby.svelte';
    
    let lobbies = [];

    socketStore.subscribe((socket) => {
        if (socket){
            setInterval(() => {
                socket.emit('list-lobbies');
                console.log('Sent list-lobbies request')
            }, 10000);

            socket.on('list-lobbies', (newLobbies) => {
                console.log('Lobbies: ', newLobbies);
                lobbies = newLobbies;
            });
        }
    });
    

</script>

<div class="lobby-list">
    {#each Object.entries(lobbies) as [lobbyId, lobby]}
        <Lobby lobbyId={lobbyId} lobbyData={lobby} />
    {/each}
</div>

<style>
    .lobby-list {
    }
</style>