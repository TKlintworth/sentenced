<script>
    function hostGame() {
        // Implementation for hosting a game
        console.warn("Host game not implemented yet");
    }

    function joinGame() {
        // Implementation for joining a game
        console.warn("Join game not implemented yet")
    }
</script>

<div class="landing-page bg-hit-pink-200">
    <div>
        <h1 class="title-animation">Sentencio</h1>
        <p class="subtext subtext-animation">Fun for the whole friend group :)</p>
    </div>
    <div class="buttons">
        <button class="btn bg-de-york-500  hover:bg-de-york-600" on:click={hostGame}>Host Game</button>
        <button class="btn bg-de-york-500  hover:bg-de-york-600" on:click={joinGame}>Join Game</button>
    </div>
</div>


<style>
    .landing-page {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 10em 1fr 2fr;
        place-items: center;
        text-align: center;
        padding: 10em;
    }
    .title-animation {
        animation: fadeInUp 1s ease-out forwards;
    }

    .subtext-animation {
        animation: fadeInUp 1.5s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    h1 {
        margin: 0;
        font-size: 4.5rem;
        color: #333; /* Dark for contrast */
    }

    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px; /* Space between buttons */
    }

    .subtext {
        font-size: 1.25rem;
        color: #555; /* Slightly lighter */
        margin: 10px 0 30px;
    }

    .buttons {
        grid-column: auto;
        grid-row: auto;
    }

    .btn {
        padding: 0px 40px;
        font-size: 1.5em;
        color: #ffffff; /* Nearly white */
    }
</style>