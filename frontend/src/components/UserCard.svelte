<script>
  export let user;
  export let ready;
</script>

<div class="card bg-base-100 shadow-xl class:bg-de-york-400={ready}">
  <div class="card-body">
    <h2 class="card-title">{user.name}</h2>
    <p>Joined at: {user.createdAt}</p>
    <p>Lobby: {user.lobbyName || 'Not in a lobby'}</p>
    <div class="">
      {#if ready}
        <button on:click={} class="btn bg-de-york-600 text-cod-gray-100">Ready</button>
      {:else}
        <button class="btn bg-de-york-600 text-cod-gray-100">Not Ready</button>
      {/if}
    </div>
  </div>
</div>