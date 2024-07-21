<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { socketStore } from '../lib/socketStore.js';
    import LobbyCard from './LobbyCard.svelte';
    
    let lobbies = [];
    let error = null;

    $: filteredLobbies = Object.entries(lobbies);

    function handleSocketError(errorMessage) {
        error = errorMessage;
        console.error(errorMessage);
    }

    onMount(() => {
        const unsubscribe =
            socketStore.subscribe((socket) => {
                if (socket){
                    socket.emit('list-lobbies');

                    socket.on('list-lobbies', (listLobbies) => {
                        lobbies = listLobbies;
                        error = null;
                    });

                    socket.on('lobby-created', () => {
                        socket.emit('list-lobbies');
                    });

                    socket.on('lobby-updated', (updatedLobby) => {
                        lobbies[updatedLobby.id] = updatedLobby;
                        lobbies = {...lobbies};
                    });

                    socket.on('lobby-deleted', (deletedLobbyId) => {
                        delete lobbies[deletedLobbyId];
                        lobbies = {...lobbies};
                    });

                    socket.on('error', handleSocketError);
                }
            });

            return () => {
                unsubscribe();
                const socket = get(socketStore);
                if (socket) {
                    socket.off('list-lobbies');
                    socket.off('lobby-created');
                    socket.off('lobby-updated');
                    socket.off('lobby-deleted');
                    socket.off('error', handleSocketError);
                }
            };
    });

    function createLobbyButtonClicked() {
        try {
            goto('/servers/create');
        } catch (error) {
            handleSocketError('Error navigating to create lobby page');
        }
    }

    function refreshButtonClicked() {
        const socket = get(socketStore);
        if (socket) {
            socket.emit('list-lobbies');
        } else {
            handleSocketError('Not connected to server');
        }
    }

    function backButtonClicked() {
        try {
            goto('/');
        } catch (error) {
            handleSocketError('Error navigating to home page');
        }
    }
</script>

<div>
    {#if error}
        <div class="error-message">{error}</div>
    {/if}
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
    .error-message {
        color: #ff3e00;
        background-color: #ffeeee;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
</style>