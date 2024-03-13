<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { socketStore } from '../lib/socketStore.js';
    import LobbyCard from './LobbyCard.svelte';
    
    let lobbies = [];

    $: filteredLobbies = Object.entries(lobbies);

    onMount(() => {
        socketStore.subscribe((socket) => {
            if (socket){
                socket.emit('list-lobbies');
                console.log('Sent list-lobbies request');

                socket.on('list-lobbies', (listLobbies) => {
                    console.log('Lobbies: ', listLobbies);
                    lobbies = listLobbies;
                });

                socket.on('lobby-created', () => {
                    socket.emit('list-lobbies');
                });

                socket.on('lobby-updated', (updatedLobby) => {
                    console.log('Lobby updated: ', updatedLobby);
                    lobbies[updatedLobby.id] = updatedLobby;
                    lobbies = {...lobbies};
                });

                socket.on('lobby-deleted', (deletedLobbyId) => {
                    delete lobbies[deletedLobbyId];
                    lobbies = {...lobbies};
                    console.warn('Lobby deleted: ', deletedLobbyId);
                });
            }
        });
    });

    function createLobbyButtonClicked() {
        goto('/servers/create');
    }

    function refreshButtonClicked() {
        console.log('Refresh button clicked');
        $socketStore.emit('list-lobbies');
    }

    function backButtonClicked() {
        goto('/');
    }

</script>

<div>
    <div class="lobby-list">
        {#each filteredLobbies as [lobbyId, lobby]}
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