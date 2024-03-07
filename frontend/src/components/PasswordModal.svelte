<script>
    import { createEventDispatcher } from 'svelte';
  
    export let showModal = false;
    let password = '';
  
    const dispatch = createEventDispatcher();
  
    function handleSubmit() {
      dispatch('submit', { password });
      showModal = false;
    }
  
    function handleCancel() {
      dispatch('cancel');
      showModal = false;
    }
</script>
  
{#if showModal}
  <div class="modal modal-middle modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Enter Lobby Password</h3>
      <input type="password" bind:value={password} class="input input-bordered w-full mt-4" />
      <div class="modal-action">
        <button class="btn btn-primary" on:click={handleSubmit}>Submit</button>
        <button class="btn" on:click={handleCancel}>Cancel</button>
      </div>
    </div>
  </div>
{/if}