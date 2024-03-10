<script>
    import { onDestroy } from 'svelte';
    import { socketStore } from '$lib/socketStore.js';
    import { page } from '$app/stores';
    import UserList from '../../../components/UserList.svelte';

    const lobbyId = $page.params.serverId;

    // Subscribe to the socket store
    const unsubscribe = socketStore.subscribe((socket) => {
        if (socket) {
            // Join the lobby when the component is mounted
            socket.emit('join-lobby', lobbyId);
        }
    });

    onDestroy(() => {
        // Unsubscribe from the socket store
        unsubscribe();

        // Leave the lobby when the component is unmounted
        $socketStore.emit('leave-lobby', lobbyId);
    });
</script>

<main class="container mx-auto">
    <h1 class="text-3xl font-bold mb-8">Lobby</h1>
    <UserList {lobbyId} />
</main>

<!-- <script>
    // Get the values from +page.js
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { socketStore } from '$lib/socketStore.js';
    import UserList from "../../../components/UserList.svelte";
    import { page } from '$app/stores';

    export let data;
    let users = [];

    $: console.log(data);

    onMount(() => {
        socketStore.subscribe((socket) => {
            if (socket) {
                console.log('Subscribed to socket');
                $socketStore = socket;
            }
        });
    });


    // Get the users in this server
    $socketStore.emit('lobby-players-request', data.props.serverId, retrievedUsersCallback);

    function retrievedUsersCallback(data) {
        console.log('Retrieved users: ', data);
        users = data;
    }

    onbeforeunload = () => {
        console.log('Leaving lobby');
        $socketStore.emit('leave-lobby', data.props.serverId);
    }

    // Get the server ID from the URL
    //$: serverId = $page.params.serverId;
</script>
<main class="container mx-auto">
    <h1 class="text-3xl font-bold mb-8">Lobby</h1>
    <UserList />
    <h1>Server ID: {data.props.serverId}</h1>
    <p>Current path: {$page.url}</p>
</main> -->
<!-- <div>
    <UserList serverId={data.props.serverId} users={users}></UserList>
    

</div> -->