<script>
    import Word from "./Word.svelte";
    import { dropzone } from "$lib/dnd";

    let words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine',
        'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yellow', 'zucchini'];
    

</script>

<div class="word-container m-2" use:dropzone={{
    on_dropzone(d, e){
        if (e.srcElement === e.target) {
            console.warn('dropped on self', d, e);
        }
    }
}}>
    {#each words as word}
        <Word word={word}></Word>
    {/each}
</div>

<style>
    .word-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border: 1px solid black;
        padding: 20px;
        border-radius: 1em;
    }

    :global(.droppable) {
        outline: 0.25em solid red;
        outline-offset: 0.25em;
        border-radius: 1em;
    }

    :global(.droppable) * {
        pointer-events: none;
    }
</style>