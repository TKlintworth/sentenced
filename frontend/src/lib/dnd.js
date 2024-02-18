export function draggable(node, data) {
    //console.warn('draggable node data', node, data);
    let state = data;

    node.draggable = true;
    node.style.cursor = 'grab';

    function handle_dragstart(event) {
        event.dataTransfer.setData('text/plain', state);
        //console.warn('dragstart', state);
        event.target.classList.add("ghost");
    }

    function handle_dragend(event) {
        //console.warn('dragend', state);
        event.target.classList.remove("ghost");
        if (event.target.style.display === 'none') {
            event.target.style.display = 'block';
        } else {
            event.target.style.display = 'none';
        }
    }

    node.addEventListener('dragstart', handle_dragstart);
    node.addEventListener('dragend', handle_dragend);

    return {
        update(data) {
            state = data;
        },

        destroy() {
            node.removeEventListener('dragstart', handle_dragstart);
            node.removeEventListener('dragend', handle_dragend);
        }
    };
}

export function dropzone(node, options){
    let state = {
        dropEffect: 'move',
        dragover_class: 'droppable',
        ...options,
    }

    function handle_dragenter(event){
        event.preventDefault();
        event.target.classList.add(state.dragover_class);
    }

    function handle_dragleave(event){
        event.target.classList.remove(state.dragover_class);
        //console.warn('dragleave', event.target);

        // Change visibility of the event.target
        //if (event.target.classList.contains('word') ) {
        //    event.target.style.display = 'none';
        //}
    }

    function handle_dragover(event){
        event.preventDefault();
        event.dataTransfer.dropEffect = state.dropEffect;
    }

    function handle_drop(event){
        //event.preventDefault();
        console.warn('drop', event.target);
        const data = event.dataTransfer.getData('text/plain');
        event.target.classList.remove(state.dragover_class);
        state.on_dropzone(data, event);
    }

    node.addEventListener('dragenter', handle_dragenter);
    node.addEventListener('dragleave', handle_dragleave);
    node.addEventListener('dragover', handle_dragover);
    node.addEventListener('drop', handle_drop);
}