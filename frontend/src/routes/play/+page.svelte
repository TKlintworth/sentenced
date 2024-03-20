<script>    
    import WordContainer from '../../components/WordContainer.svelte';

</script>
<div class="playScreenContainer">
    <div class="topWordContainers">
        <WordContainer type="words"></WordContainer>
        <WordContainer type="words"></WordContainer>
    </div>
    <div class="sentenceContainer">
        <WordContainer type="sentence"></WordContainer>
    </div>
    <div class="bottomWordContainers">
        <WordContainer type="words"></WordContainer>
        <WordContainer type="words"></WordContainer>
    </div>
</div>


<style>
    .playScreenContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .sentenceContainer {
        width: 85vw;
    }

    .topWordContainers {
        display: flex;
        width: 100vw;
        align-items: stretch;
        flex-basis: initial;
    }

    .bottomWordContainers {
        display: flex;
        margin-bottom: 3%;
        width: 100vw;
        align-items: stretch;
    }

    :global(.topWordContainers) > * {
        width: 50vw;
    }
</style>



