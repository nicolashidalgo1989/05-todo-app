import html from './app.html?raw';
import todoStore, { Filters} from '../store/todo.store';
import { renderTodos, renderPendings } from './use-cases';

const ElementsIds = {
    clearCompleted: '.clear-completed',
    filterButton: '.filtro',
    newTodoInput: '#new-todo-input',
    pendings: '#pending-count',
    todoList : '.todo-list',
}

/**
 *
 * @param {String} elementId
 * @returns
 */
export const App = ( elementId ) => {

    const { clearCompleted, filterButton, newTodoInput, pendings, todoList } = ElementsIds;

    const displayTodos = () => {
        const todos = todoStore.getToDos( todoStore.currentFilter() );
        renderTodos( todoList, todos );
        renderPendings(pendings, todos);
        switch(todoStore.currentFilter()){
            case Filters.All:
                document.querySelectorAll(filterButton)[0].classList.add('selected');
            case Filters.Pending:
                document.querySelectorAll(filterButton)[1].classList.add('selected');
            default:
                document.querySelectorAll(filterButton)[2].classList.add('selected');
        }
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //referenciasHtml
    document.querySelector(newTodoInput).addEventListener('keypress', e => {
        if(e.key === 'Enter'){
            if( e.keyCode !== 13) return;
            if(e.target.value.trim().length === 0 ) return;

            todoStore.addToDo(e.target.value);
            displayTodos();
            e.target.value = '';

        }
    })

    document.querySelector(todoList).addEventListener('click', e => {
        if(!e.target.classList.contains('destroy')){
            const element = e.target.closest('[data-id]');
            todoStore.toggleToDo(element.getAttribute('data-id'));
            displayTodos();
        }
    })


    document.querySelector(todoList).addEventListener('click', e => {
        const element = e.target.closest('[data-id]');
        const destroy = e.target.className === 'destroy';

        if(!destroy || !element) return;
        if(destroy){
            todoStore.deleteToDo(element.getAttribute('data-id'));
            displayTodos();
        }
    })

    document.querySelector(clearCompleted).addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    document.querySelectorAll(filterButton).forEach( elem => {

        document.querySelectorAll(filterButton).forEach( item => item.classList.remove('selected'));

        elem.addEventListener('click', (e) => {
            if(!e.target.classList.contains('filtro')) return;
            document.querySelectorAll(filterButton).forEach( item => item.classList.remove('selected'));
            e.target.classList.add('selected');
            switch(e.target.textContent){
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                default:
                    todoStore.setFilter(Filters.All);
            }
            displayTodos();
        })
    })

}
