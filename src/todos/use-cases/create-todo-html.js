export const createTodoHtml = (todo) => {

    if(!todo) throw new Error('A TODO object is required');

    const { description, done, id} = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ (done) ? 'checked' : '' } >
            <label>${ description }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    if(done) liElement.classList.add('completed');
    liElement.setAttribute('data-id', id);
    return liElement;

}