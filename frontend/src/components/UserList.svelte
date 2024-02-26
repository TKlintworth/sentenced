<script>
    import { onMount } from 'svelte';
    import { socketStore } from '../lib/socketStore.js';
    import UserCard from './UserCard.svelte';

    let users = [];

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
        {#each users as user}
            <UserCard username={user.username} />
        {/each}
    </ul>
</div>

