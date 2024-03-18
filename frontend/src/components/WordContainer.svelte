<script>
    import Word from "./Word.svelte";

    export let type; // 'words' or 'sentence'
    export let words;

    let visibleWords = [];
    let sentenceWords = [];
    let draggedWord;
    let draggedIndex = -1;
    let draggableItem;
    let pointerStart = { x: 0, y: 0 };
    
    $: if (type === 'sentence') {
        words = [];
        visibleWords = words;
    } else {
        words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine',
        'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yellow', 'zucchini'];
        visibleWords = words;
    }

    document.addEventListener('mouseup', dragEnd);

    function handleWordDragOver(event) {
        //console.warn('handleWordDragOver', event);
        const { targetIndex } = event.detail;
        console.warn("event:", event);
        if (draggedIndex !== targetIndex) {
            console.warn('draggedIndex', draggedIndex, 'targetIndex', targetIndex)
            const draggedWord = visibleWords[draggedIndex];
            visibleWords.splice(draggedIndex, 1);
            visibleWords.splice(targetIndex, 0, draggedWord);
            visibleWords = [...visibleWords];
            draggedIndex = targetIndex;
        }
    }

    function handleWordDrop(data, targetIndex, event) {
        //console.warn('handleWordDrop', data, targetIndex, event);
        //if (type === 'sentence'){
            const draggedWord = data;
            if (!visibleWords.includes(draggedWord)) {
                visibleWords.splice(targetIndex, 0, draggedWord);
                visibleWords = [...visibleWords];
            }
        //}
        draggedIndex = -1;
    }

    function dragStart(e) {
        e.preventDefault();
        if (e.target.classList.contains('word')) {
            draggableItem = e.target;
        }

        if (!draggableItem) return;

        pointerStart = {
            x: e.clientX,
            y: e.clientY
        };

        draggableItem.classList.remove('is-idle');
        draggableItem.classList.add('is-draggable');

        document.addEventListener('mousemove', drag);
    }

    function drag(e) {
        e.preventDefault();
        if (!draggableItem) return;

        const dx = e.clientX - pointerStart.x;
        const dy = e.clientY - pointerStart.y;

        draggableItem.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    function dragEnd(e) {
        e.preventDefault();
        
        unsetDraggableItem();

        document.removeEventListener('mousemove', drag);
    }

    function unsetDraggableItem() {
        if (draggableItem) {
            draggableItem.style = null;
            draggableItem.classList.remove('is-draggable');
            draggableItem.classList.add('is-idle');
            draggableItem = null;
        }
    }

</script>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="word-container m-2" class:sentence-container={type === 'sentence'}
        on:mousedown={dragStart}>
        {#each visibleWords as word}
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