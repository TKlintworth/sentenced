<script>
    import { onMount } from 'svelte';
    import { socketStore } from '../lib/socketStore.js';

    export let lobbyId;
    export let lobbyData;



</script>

<div class="card card-compact bg-base-100 shadow-x2">
    <div class="card-body">
        <h2 class="card-title">{lobbyData.host}'s Lobby</h2>
        <p>Players: {lobbyData.userCount}/{lobbyData.maxUsers}</p>
        <p>Status: {lobbyData.status}</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Join Lobby</button>
        </div>
    </div>
</div>

<style>

</style>