<script>    
    import Dropzone from '../../components/Dropzone.svelte';
    import WordContainer from '../../components/WordContainer.svelte';

    import { draggable } from "$lib/dnd";

</script>

<div class="playScreenContainer">
    <div class="topWordContainers">
        <WordContainer></WordContainer>
        <WordContainer></WordContainer>
    </div>
    <Dropzone></Dropzone>
    <WordContainer></WordContainer>
</div>


<style>
    .topWordContainers {
        display: flex;
        margin-top: 1%;
    }
</style>



