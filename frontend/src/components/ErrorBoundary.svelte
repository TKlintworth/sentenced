<script>
  import { onMount } from "svelte";

  let error = null;

  onMount(() => {
    window.addEventListener('error', (event) => {
        error = event.error;
    });
  });
</script>

{#if error}
    <div class='error-boundary'>
        <h2>Oops! Something went wrong.</h2>
        <p>We're sorry, but an error occurred. Please try refreshing the page.</p>
        <pre>{error.stack}</pre>
    </div>
{:else}
    <slot />
{/if}

<style>
    .error-boundary {
        padding: 20px;
        background-color: #ffeeee;
        border: 1px solid #ff0000;
        border-radius: 5px;
        margin: 10px;
    }
</style>