<script>
    function hostGame() {
    // Implementation for hosting a game
    }

    function joinGame() {
    // Implementation for joining a game
    }
</script>

<div class="landing-page">
    <h1>Sentencio</h1>
    <p class="subtext">Fun for the whole friend group :)</p>
    <div class="buttons">
        <button class="btn bg-de-york-500 text-cod-gray-100 hover:bg-de-york-600" onclick="hostGame()">Host Game</button>
        <button class="btn bg-de-york-500 text-cod-gray-100 hover:bg-de-york-600" onclick="joinGame()">Join Game</button>
    </div>
</div>


<style>
    .landing-page {
        display: grid;
        grid-template-columns: 10 1fr;
        grid-template-rows: 10 1fr;
        place-items: center;
        text-align: center;
        padding: 50px 20px; /* Adjust padding as needed */
        min-height: calc(100vh - 120px); /* Adjust based on header/footer height */
    }

    h1 {
        font-size: 4rem;
        color: #333; /* Dark for contrast */
    }

    .subtext {
        font-size: 1.2rem;
        color: #555; /* Slightly lighter */
        margin-bottom: 30px;
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 20px; /* Space between buttons */
    }

    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        background-color: #44c767; /* Vibrant green */
        color: #ffffff; /* Nearly white */
        font-size: 1rem;
    }
</style>