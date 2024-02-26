<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { socketStore } from '../lib/socketStore.js';
    import LobbyCard from './LobbyCard.svelte';
    
    let lobbies = [];

    onMount(() => {
        socketStore.subscribe((socket) => {
            if (socket){
                socket.emit('list-lobbies');
                console.log('Sent list-lobbies request');
                socket.on('list-lobbies', (newLobbies) => {
                    console.log('Lobbies: ', newLobbies);
                    lobbies = newLobbies;
                });
                socket.on('lobby-created', () => {
                    socket.emit('list-lobbies');
                });
            }
        });
    });

    function createLobbyButtonClicked() {
        goto('/servers/create');
    }

    function refreshButtonClicked() {
        console.log('Refresh button clicked');
        socketStore.subscribe((socket) => {
            if (socket){
                socket.emit('list-lobbies');
                console.log('Sent list-lobbies request');
            }
        });
    }

    function backButtonClicked() {
        goto('/');
    }

</script>

<div>
    <div class="lobby-list">
        {#each Object.entries(lobbies) as [lobbyId, lobby]}
            <LobbyCard lobbyId={lobbyId} lobbyData={lobby} />
        {/each}
    </div>
    <div class="lobby-list-buttons">
        <button class="btn bg-de-york-600 text-cod-gray-100" on:click={createLobbyButtonClicked}>Create Lobby</button>
        <button class="btn bg-de-york-600 text-cod-gray-100" on:click={refreshButtonClicked}>Refresh</button>
        <button class="btn bg-de-york-600 text-cod-gray-100" on:click={backButtonClicked}>Back</button>
    </div>
</div>

<style>
    .lobby-list {
    }

    .lobby-list-buttons {
    }
</style>