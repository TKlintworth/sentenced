<script>
    import { draggable, dropzone } from "$lib/dnd";
</script>

<div class="dropzoneContainer" use:dropzone={{
    on_dropzone(){
        console.warn('dropped');
    }
}}>
    
</div>



<style>
    .dropzoneContainer {
        border: 1px solid black;
        border-radius: 0.5em;
        height: 40%;
        margin-left: 10%;
        margin-top: 3%;
        margin-right: 10%;
        margin-bottom: 3%;
    }

    :global(.droppable) {
        outline: 0.1em solid red;
        outline-offset: 0.25em;
        border-radius: 1em;
    }

    :global(.droppable) * {
        pointer-events: none;
    }
</style>