import { Todo } from '../models/todo.model'
import { createTodoHtml } from './create-todo-html';

let element;

/**
 *
 * @param {String} elementId
 * @param {Array<Todo>} todos
 */
export const renderTodos = ( elementId, todos = [] ) => {
    if(!element) element = document.querySelector(elementId);
    if(!elementId) throw new Error(`${elementId} not found`)
    element.innerHTML = '';
    todos.forEach( todo => element.append( createTodoHtml(todo) ) )
}