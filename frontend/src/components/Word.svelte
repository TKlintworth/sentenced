<script>
    export let word;
    import { draggable } from "$lib/dnd";
    
</script>

<kbd class="kbd kbd-md mr-2 mb-2 bg-de-york-200 hover:bg-de-york-300" use:draggable={word}>{word}</kbd>

<style>
   
</style>