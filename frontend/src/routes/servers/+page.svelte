<script>
    import LobbyList from "../../components/LobbyList.svelte";
    import UserList from "../../components/UserList.svelte";
  </script>
  
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h1>Lobby List</h1>
        <LobbyList></LobbyList>
      </div>
      <div class="col-md-4">
        <h2>Online Players</h2>
        <UserList></UserList>
      </div>
    </div>
  </div>
  
  <style>
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
  
    .col-md-8 {
      flex: 0 0 66.666667%;
      max-width: 66.666667%;
      padding-right: 15px;
      padding-left: 15px;
    }
  
    .col-md-4 {
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
      padding-right: 15px;
      padding-left: 15px;
    }
  
    h1, h2 {
      margin-bottom: 20px;
    }
  </style>

<!-- <script>
    import LobbyList from "../../components/LobbyList.svelte";
    import UserList from "../../components/UserList.svelte";
</script>

<div class="container">
    <h1>Lobby List</h1>
    <LobbyList></LobbyList>
</div>

<style>

</style> -->