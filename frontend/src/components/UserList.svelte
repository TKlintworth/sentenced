<script>
    import { onMount, onDestroy } from 'svelte';
    import { socketStore } from '../lib/socketStore.js';
    import UserCard from './UserCard.svelte';
  
    let users = [];
    let socketSubscription = null;

    export let lobbyId;
  
    onMount(() => {
      socketStore.subscribe((socket) => {
        if (socket) {
          socketSubscription = socket;
          fetchUsers();
          subscribeToEvents();
        }
      });
    });
  
    onDestroy(() => {
      if (socketSubscription) {
        unsubscribeFromEvents();
      }
    });
  
    function fetchUsers() {
      if(lobbyId) {
        socketSubscription.emit('lobby-players-request', lobbyId, (data) => {
          users = Object.values(data);
        });
      } else {
        socketSubscription.emit('global-players-request', (data) => {
          users = Object.values(data);
        });
      }
    }
  
    function subscribeToEvents() {
      socketSubscription.on('user-joined-lobby', (user) => {
        users = [...users, user];
      });
  
      socketSubscription.on('user-left-lobby', (user) => {
        users = users.filter((u) => u.id !== user.id);
      });
  
      socketSubscription.on('user-updated', (userObj) => {
        console.warn('User updated: ', userObj);
        users = users.map((u) => (u.id === userObj.id ? userObj : u));
      });
    }
  
    function unsubscribeFromEvents() {
      socketSubscription.off('user-joined-lobby');
      socketSubscription.off('user-left-lobby');
      socketSubscription.off('user-updated');
    }
  </script>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each users as user}
      <UserCard {user} />
    {/each}
  </div>



<!-- <script>
    import { onMount } from 'svelte';
    import { socketStore } from '../lib/socketStore.js';
    import UserCard from './UserCard.svelte';

    export let users = [];
    //let users = [];

    onMount(() => {
        console.log('Mounting user list');
        socketStore.subscribe((socket) => {
            if (socket){
                socket.emit('global-players-request', callback);
            }
        });
    });

    function callback(data) {
        let flattened = [];
        Object.keys(data).forEach((key) => {
            let newUserObject = {
                socketId: key,
                username: data[key].name,
                lobbyId: data[key].lobby,
                createdAt: data[key].createdAt,
            };
            flattened.push(newUserObject);
        });
        console.log('Data: ', data);
        console.log('Users: ', flattened);
        //users = data;
    }
</script>

<div class="container mx-auto px-4">
    <h1>User List</h1>
    <ul>
        {#if users.length === 0}
            <p>No users</p>
        {:else}
            {#each users as user}
                <UserCard username={user.username} />
            {/each}
        {/if}
    </ul>
</div> -->

