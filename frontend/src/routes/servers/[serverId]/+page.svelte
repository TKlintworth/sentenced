<script>
    // Get the values from +page.js
    import { goto } from '$app/navigation';
    import UserList from "../../../components/UserList.svelte";

    export let data;

    $: console.log(data);

    // Get the users in this server
    let users = [];

    // Get the server ID
    let serverId = ''

    // Get the server ID from the URL
    //$: serverId = $page.params.serverId;
</script>
<div>
    <h1>Server ID: {data.props.serverId}</h1>
    <UserList serverId={data.props.serverId}></UserList>
</div>