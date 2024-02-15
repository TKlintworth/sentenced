<script>
    import Word from "./Word.svelte";
    import { draggable, dropzone } from "$lib/dnd";

    let words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine',
        'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yellow', 'zucchini'];

    export let type; // words or sentence
    

</script>

    {#if type === 'words'}
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
    {:else}
        <div class="word-container sentence-container m-2" use:dropzone={{
            on_dropzone(d, e){
                if (e.srcElement === e.target) {
                    console.warn('dropped on self', d, e);
                }
            }
        }}>
        </div>
    {/if}

<style>
    .word-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border: 1px solid black;
        padding: 20px;
        border-radius: 1em;
    }

    .word-container.sentence-container {
        border: 1px solid black;
        border-radius: 0.5em;
        height: 40%;
        margin-left: 10%;
        margin-top: 3%;
        margin-right: 10%;
        margin-bottom: 3%;
    }

    :global(.droppable) {
        outline: 0.25em solid red;
        outline-offset: 0.25em;
        border-radius: 1em;
    }

    :global(.droppable) > * {
        pointer-events: none;
    }
</style>