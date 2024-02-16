<script>    
    import WordContainer from '../../components/WordContainer.svelte';

    import { draggable } from "$lib/dnd";

</script>

<div class="playScreenContainer">
    <div class="topWordContainers">
        <WordContainer type="words"></WordContainer>
        <WordContainer type="words"></WordContainer>
    </div>
    <WordContainer type="sentence"></WordContainer>
    <WordContainer type="words"></WordContainer>
</div>


<style>
    .topWordContainers {
        display: flex;
        margin-top: 1%;
    }

    
</style>



