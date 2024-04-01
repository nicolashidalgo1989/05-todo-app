import { Todo } from '../todos/models/todo.model'

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
}

const state = {

    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del caos'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del poder'),
    ],
    filter: Filters.All

}

const initStore = () => {
    loadStore();
    console.log('init store 🥑');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Filtra todos de la lista (filters.all por defecto)
 * @param {String} filter
 */
const getToDos = (filter = Filters.All) => {
    switch (filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error(`Opcion ${filter} not allowed`);
    }
}

/**
 * Agrega un todo a la lista
 * @param {String} description
 */
const addToDo = (description) => {
    if(!description) throw new Error('Description is required');
    state.todos.push( new Todo(description) );
    saveStateToLocalStorage();
}

/**
 * @param {String} id
 */
const toggleToDo = (id) => {
    if(!id) throw new Error('Not implemented');
    state.todos = state.todos.map( todo => {
        if(todo.id === id) todo.done = !todo.done;
        return todo;
    })
    saveStateToLocalStorage();
}

/**
 * Elimina un todo de la lista
 * @param {String} id
 * @returns {Array}
 */
const deleteToDo = (id) => {
    if(!id) throw new Error('Not implemented');
    state.todos = state.todos.filter( todo => todo.id !== id );
    saveStateToLocalStorage();
}

/**
 * Elimina todos los todos completados
 * @param {String} id
 * @returns {Array}
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * Elimina todos los todos completados
 * @param {String} id
 * @returns {Array}
 */
const setFilter = (newFilter = Filters.All) => {
    if(!newFilter) throw new Error('Not implemented');
    console.log(newFilter);
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const currentFilter = () => {
    return state.filter;
}

export default {
    addToDo,
    currentFilter,
    deleteCompleted,
    deleteToDo,
    getToDos,
    initStore,
    loadStore,
    saveStateToLocalStorage,
    setFilter,
    toggleToDo,
}