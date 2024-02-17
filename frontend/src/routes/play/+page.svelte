<script>    
    import WordContainer from '../../components/WordContainer.svelte';
    import RoundCounter from '../../components/RoundCounter.svelte';
    import RoundTimer from '../../components/RoundTimer.svelte';

    import { draggable } from "$lib/dnd";

</script>
<div class="playScreenContainer">
    <!-- <div class="flex justify-between items-center w-full">
        <div class="basis-1/2 flex justify-center">
            <RoundCounter></RoundCounter>
        </div>
        <div class="basis-1/2 flex justify-end pr-4">
            <RoundTimer></RoundTimer>
        </div>
    </div> -->
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



