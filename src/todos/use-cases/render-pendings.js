import todoStore, { Filters } from '../../store/todo.store';

let element;

export const renderPendings = (html ) => {

    if(!element) element = document.querySelector(html);
    if(!element) throw new Error(`No hay ${html}`);

    element.textContent = todoStore.getToDos( Filters.Pending ).length;

}