<script>
    // Get the values from +page.js
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { socketStore } from '$lib/socketStore.js';
    import UserList from "../../../components/UserList.svelte";
    import { page } from '$app/stores';

    export let data;
    let users = [];

    $: console.log(data);

    onMount = () => {
        socketStore.subscribe((socket) => {
            if (socket) {
                console.log('Subscribed to socket');
                $socketStore = socket;
            }
        });
    }


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
<div>
    <UserList serverId={data.props.serverId} users={users}></UserList>
    <h1>Server ID: {data.props.serverId}</h1>
    <p>Current path: {$page.url}</p>

</div>