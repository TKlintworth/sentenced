<script>
  export let user;
</script>

<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{user.name}</h2>
    <p>Joined at: {user.createdAt}</p>
    <p>Lobby: {user.lobbyName || 'Not in a lobby'}</p>
  </div>
</div>