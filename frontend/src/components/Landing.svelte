<script>
    import { goto } from '$app/navigation';

    function hostGame() {
        // Implementation for hosting a game
        
        goto('/host');
    }

    function joinGame() {
        // Implementation for joining a game

        goto('/join');
    }
    
    function joinLobbyUsingGameCode() {
        // Implementation for joining a game using a game code
        goto('/join');
    }

    let nameEntered = false;
    let playButtonText = 'Play';
    let name = 'Player';

    function playClickedHandler() {
        console.log("Name: " + name)
        if (nameEntered) {
            // Change name
            console.log('Changing name');
        } else {
            // Play
            nameEntered = true;
            console.log('Playing');
        }
    }

    $: playButtonText = nameEntered ? 'Change Name' : 'Play';
</script>

<div class="landing-page bg-white">
    <div>
        <h1 class="title-animation">Sentencio</h1>
        <p class="subtext subtext-animation">Fun for the whole friend group :)</p>
    </div>
    <div class="main buttons">
        <div class="nameEntry">
            <input bind:value={name} type="text" class="input input-bordered" />
            <button class="btn btn-de-york-500 hover:bg-de-york-600 ml-2" on:click={playClickedHandler}>{playButtonText}</button>
        </div>
        {#if nameEntered}
            <section class="sub buttons">
                <div class="flex">
                    <input type="text" placeholder="Enter Game Code" class="input input-bordered flex-grow" />
                    <button class="btn btn-de-york-500 hover:bg-de-york-600 ml-2" on:click={joinLobbyUsingGameCode}>Join Game</button>
                </div>
                <button class="btn bg-de-york-500  hover:bg-de-york-600" on:click={hostGame}>Create Lobby</button>
                <button class="btn bg-de-york-500  hover:bg-de-york-600" on:click={joinGame}>Server Browser</button>
            </section>
        {/if}
    </div>
</div>


<style>
    /* https://www.happyhues.co/palettes/15 */
    button {
        background: #2C7A44;
    }

    .landing-page {
        /* display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 10em 1fr 2fr; */
        display: flex;
        flex-direction: column;
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
        grid-column: auto;
        grid-row: auto;
    }

    .subtext {
        font-size: 1.25rem;
        color: #555; /* Slightly lighter */
        margin: 10px 0 30px;
    }

    .btn {
        padding: 0px 40px;
        font-size: 1.5em;
        color: #ffffff; /* Nearly white */
    }
</style>