<script>
    import { goto } from '$app/navigation';
    import { socketStore } from '../lib/socketStore.js';

    let passwordBoolean = false;
    let socketSubscription = null;

    $socketStore.on('lobby-created', (lobbyId) => {
      console.log('Lobby created: ', lobbyId);
      $socketStore.emit('join-lobby', lobbyId);
    });

    $socketStore.on('lobby-joined', (lobbyId) => {
      console.log('Lobby joined: ', lobbyId);
      goto('/servers/' + lobbyId);
    });

    const emitCreateLobby = (lobbyData) => {
      if(socketSubscription){
        console.log(socketSubscription);
        socketSubscription.emit('create-lobby', lobbyData);
      }
    };

    function createLobby(event) {
        // Need to validate our data and send a socket io client event to the server
        event.preventDefault();
        console.log('Client side creating lobby');
        let password = ''
        if (passwordBoolean) {
            password = document.getElementById('grid-password').value;
        }
        emitCreateLobby({
            serverName: document.getElementById('server-name').value,
            password: password,
            maxUsers: document.getElementById('grid-state').value,
            hostPlayerName: sessionStorage.getItem('sentencio-username')
        });
    }

    function handlePasswordChecked(event) {
        passwordBoolean = event.target.checked;
        console.log('Password checked: ', passwordBoolean);
    }

    function cancelCreateLobby(event) {
        event.preventDefault();
        console.log('Canceling lobby creation');
        goto('/');
    }

</script>

<div class="form-container">
    <div>
        <h1 class="text-3xl font-bold text-blue-500 mb-2 ">Create Lobby</h1>
    </div>
    <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="server-name">
              Server Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="server-name" type="text">
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
           
          <div class="w-full px-3">
            <input type="checkbox" class="checkbox" bind:value={passwordBoolean} on:change={handlePasswordChecked} />
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Password
            </label>
            <!-- Disable input if passwordBoolean is false -->
            {#if passwordBoolean}
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password">
            {:else}
              <input aria-label="disabled input" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="Disabled input" disabled>
            {/if}
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Players
            </label>
            <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={cancelCreateLobby}>Cancel</button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={createLobby}>Create Lobby</button>
        </div>
      </form>
</div>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
