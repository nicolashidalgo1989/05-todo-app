(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const S=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>

    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="filtro" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`;let f;const T=new Uint8Array(16);function L(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(T)}const l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).slice(1));function E(e,t=0){return l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:A};function C(e,t,s){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const i=e.random||(e.rng||L)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){s=s||0;for(let o=0;o<16;++o)t[s+o]=i[o];return t}return E(i)}class m{constructor(t){this.id=C(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"completed",Pending:"pending"},d={todos:[new m("Piedra del alma"),new m("Piedra del caos"),new m("Piedra del tiempo"),new m("Piedra del infinito"),new m("Piedra del poder")],filter:c.All},P=()=>{v(),console.log("init store 🥑")},v=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));d.todos=e,d.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(d))},D=(e=c.All)=>{switch(e){case c.All:return[...d.todos];case c.Completed:return d.todos.filter(t=>t.done);case c.Pending:return d.todos.filter(t=>!t.done);default:throw new Error(`Opcion ${e} not allowed`)}},q=e=>{if(!e)throw new Error("Description is required");d.todos.push(new m(e)),h()},k=e=>{if(!e)throw new Error("Not implemented");d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},x=e=>{if(!e)throw new Error("Not implemented");d.todos=d.todos.filter(t=>t.id!==e),h()},O=()=>{d.todos=d.todos.filter(e=>!e.done),h()},U=(e=c.All)=>{if(!e)throw new Error("Not implemented");console.log(e),d.filter=e,h()},I=()=>d.filter,a={addToDo:q,currentFilter:I,deleteCompleted:O,deleteToDo:x,getToDos:D,initStore:P,loadStore:v,saveStateToLocalStorage:h,setFilter:U,toggleToDo:k},N=e=>{if(!e)throw new Error("A TODO object is required");const{description:t,done:s,id:i}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${s?"checked":""} >
            <label>${t}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,s&&n.classList.add("completed"),n.setAttribute("data-id",i),n};let y;const M=(e,t=[])=>{if(y||(y=document.querySelector(e)),!e)throw new Error(`${e} not found`);y.innerHTML="",t.forEach(s=>y.append(N(s)))};let w;const F=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`No hay ${e}`);w.textContent=a.getToDos(c.Pending).length},V={clearCompleted:".clear-completed",filterButton:".filtro",newTodoInput:"#new-todo-input",pendings:"#pending-count",todoList:".todo-list"},H=e=>{const{clearCompleted:t,filterButton:s,newTodoInput:i,pendings:o,todoList:n}=V,u=()=>{const r=a.getToDos(a.currentFilter());switch(M(n,r),F(o),a.currentFilter()){case c.All:document.querySelectorAll(s)[0].classList.add("selected");case c.Pending:document.querySelectorAll(s)[1].classList.add("selected");default:document.querySelectorAll(s)[2].classList.add("selected")}};(()=>{const r=document.createElement("div");r.innerHTML=S,document.querySelector(e).append(r),u()})(),document.querySelector(i).addEventListener("keypress",r=>{if(r.key==="Enter"){if(r.keyCode!==13||r.target.value.trim().length===0)return;a.addToDo(r.target.value),u(),r.target.value=""}}),document.querySelector(n).addEventListener("click",r=>{if(!r.target.classList.contains("destroy")){const p=r.target.closest("[data-id]");a.toggleToDo(p.getAttribute("data-id")),u()}}),document.querySelector(n).addEventListener("click",r=>{const p=r.target.closest("[data-id]"),g=r.target.className==="destroy";!g||!p||g&&(a.deleteToDo(p.getAttribute("data-id")),u())}),document.querySelector(t).addEventListener("click",()=>{a.deleteCompleted(),u()}),document.querySelectorAll(s).forEach(r=>{document.querySelectorAll(s).forEach(p=>p.classList.remove("selected")),r.addEventListener("click",p=>{if(p.target.classList.contains("filtro")){switch(document.querySelectorAll(s).forEach(g=>g.classList.remove("selected")),p.target.classList.add("selected"),p.target.textContent){case"Completados":a.setFilter(c.Completed);break;case"Pendientes":a.setFilter(c.Pending);break;default:a.setFilter(c.All)}u()}})})};a.initStore();H("#app");
