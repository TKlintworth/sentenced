<script>
    export let word;
    export let ghost = false;
    
    function wordClicked(){
        //console.log('word clicked', word)
    }

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function handleDragStart(e){
        //console.warn('handleDragStart', e)
        let data = {word: word, e: e};
        dispatch('dragstart', data);
    }

    function handleDragEnd(e){
        //console.warn('handleDragEnd', e)
        let data = {word: word, e: e};
        dispatch('dragend', data);
    }
</script>

<kbd aria-hidden="true" class="word is-idle kbd kbd-md mr-2 mb-2 bg-de-york-200 hover:bg-de-york-300" 
    class:ghost={ghost == true}
    
    on:dragstart={(e)=>handleDragStart(e)} 
    on:click={(e)=>{wordClicked()}} 
    on:dragend={(e)=>handleDragEnd(e)}>
        {word}
</kbd>

<style>
    :global(.droppable) > * {
        pointer-events: none;
    }

    .ghost {
        opacity: 0.5;
    }

    .word.is-idle {
        cursor: grab;
        transition: 0.25s ease transform;
    }

    :global(.word.is-draggable) {
        cursor: grabbing;
        z-index: 10;
    }
</style>