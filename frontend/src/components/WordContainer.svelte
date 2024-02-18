<script>
    import Word from "./Word.svelte";
    import { draggable, dropzone } from "$lib/dnd";

    export let type; // 'words' or 'sentence'
    export let words;

    let visibleWords = [];
    let sentenceWords = [];
    let draggedWord;
    
    $: if (type === 'sentence') {
        words = [];
        visibleWords = words;
    } else {
        words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine',
        'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yellow', 'zucchini'];
        visibleWords = words;
    }

    function handleWordDragStart(e){
        // The event data transfer has not been set yet, so we can't hide the word yet in here
        //console.warn('handleWordDragStart', e);
        let draggedWord = e.detail.word;
        //console.warn('draggedWord', draggedWord);
        //console.warn('e.detail.e.target', e.detail.e.target);
        // Remove the word from the list
        // words = words.filter(word => word !== draggedWord);
    }

    function handleWordDragEnd(e){
        console.warn('handleWordDragEnd', e);
        let draggedWord = '';
        //console.warn('draggedWord', draggedWord);
        //e.detail.e.target.style.display = 'block';
        // Add the word back to the list
        // words.push(draggedWord);
    }

</script>

    <div class="word-container m-2" class:sentence-container={type === 'sentence'} use:dropzone={{
        on_dropzone(d, e){
            // Get the index of the word we dropped onto, if any

            // A word has been dropped onto this word container.
            if (type === 'sentence'){
                if (!words.includes(d)){
                    visibleWords.push(d);
                    visibleWords = [...visibleWords];
                } 
            }
        },
    }}>
        {#each visibleWords as word}
            <Word word={word} on:dragstart={handleWordDragStart} on:dragend={handleWordDragEnd}></Word>
        {/each}
    </div>

<style>
    .word-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border: 1px solid black;
        padding: 20px;
        align-items: flex-start;
        border-radius: 1.5em;
        width: 100%;
        height: 100%;
    }

    .word-container.sentence-container {
        border: 1px solid black;
        margin-left: 10%;
        margin-top: 1%;
        align-items: flex-start;
        margin-right: 10%;
        margin-bottom: 1%;
        height: 20vh;
    }

    :global(.droppable) {
        outline: 0.25em solid red;
        outline-offset: 0.25em;
        border-radius: 1em;
    }
</style>