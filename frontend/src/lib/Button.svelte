<script>
    // Props
    export let text = "world";

    // Reactive declaration
    $: name = (text) ? text : "world";
    // $: upperName = name.toUpperCase();

    // Can also run arbitrary statements reactively
    $: if (name === 'worlds') {
        console.log('The name is', name);
        console.log('The upperName is', upperName);
    }

    function logSomeStuff() {
        console.log('Hello, world!');
    }
</script>

<button class="btn" on:click={logSomeStuff}>
    Hello {name}! Click me!
</button>

<style>
    button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
</style>