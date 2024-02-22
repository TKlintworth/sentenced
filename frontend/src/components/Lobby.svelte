<script>
    import { onMount } from 'svelte';
    import { socketStore } from '../lib/socketStore.js';

    export let lobbyId;
    export let lobbyData;

    function attemptToJoinLobby() {
        console.log('Attempting to join lobby: ', lobbyId);
        socketStore.subscribe((socket) => {
            if (socket){
                // Try to join the lobby
                // socket.emit('join-lobby', lobbyId);
            }
        });
    }

</script>

<div class="card card-compact bg-de-york-100 shadow-x2 m-4 transition-colors duration-300 ease-in-out hover:bg-de-york-300">
    <div class="card-body">
        <h2 class="card-title">{lobbyData.hostPlayerName}'s Lobby</h2>
        <p>Players: {lobbyData.userCount}/{lobbyData.maxUsers}</p>
        <p>Status: {lobbyData.status}</p>
        <div class="card-actions justify-end">
            <button class="btn bg-de-york-600" on:click={attemptToJoinLobby}>Join Lobby</button>
        </div>
    </div>
</div>

<style>

</style>