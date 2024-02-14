<script>
    import Word from "./Word.svelte";

    let words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine',
        'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yellow', 'zucchini'];
    

</script>

<div class="word-container m-2">
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
</style>