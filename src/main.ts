import './style.css'
import {v4} from 'uuid'
import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')//buscamos la etiqueta
console.log(taskForm)
const taskList = document.querySelector<HTMLDivElement>('#taskList')


interface Task{
  title:string
  description:string
  id:string
}

//creamos un arreglo
let tasks: Task[] = []

taskForm?.addEventListener('submit', e => {//busca el evento submit 
  e.preventDefault()// ver esta wea

const title = taskForm['title'] as unknown as HTMLInputElement
console.log(title.value)
const description = taskForm['description'] as unknown as HTMLTextAreaElement//volvemos desconocido para luego pasarlo a uno en su formato de index.html
console.log(description.value)//.value nos debe retornar el valor de lo que le estamos pidiendo

tasks.push({//aniade al final de un array y regresa el tamanio del mismo pero alterado
  title:title.value,
  description: description.value,
  id:v4(),//llama a una funcion que genera una id 
})

localStorage.setItem('tasks', JSON.stringify(tasks))/**lo de la izquierda convierte la tarea en string  */
/** el Local Storage es una API que posee el navegador */

Toastify({
  text: "Tarea Guardada"
}).showToast();

renderTasks(tasks);//para que vuelva a renderizar la lista
taskForm.reset()//para limpiar lo que esta escrito
title.focus()//para cada vez que use reset() vuelva a posicionarse en title

})
document.addEventListener('DOMContentLoaded', ()=>{tasks = JSON.parse(localStorage.getItem('tasks')||'[]')
renderTasks(tasks)})

function renderTasks(tasks:Task[]){
  taskList!.innerHTML = '' //admiracion nos va a servir para indicar que siemmpre vamos a recibir un dato al menos en este caso
  tasks.forEach(task =>{

  const taskElement =  document.createElement('div')// aja pero con div

  taskElement.className = 'bg-zinc-700 mb-1 p-4 roundend-lg hover:bg-zinc-900 hover:cursor-pointer'
  
  const header = document.createElement('header')// lo de abajo pero con header
  header.className = 'flex justify-between'
  const title = document.createElement('span')//creamos una constante para crear un elemento en el documento/pagina con la etiqueta span
  title.innerText = task.title //Agramos el titulo del texto
  const btnDelete = document.createElement('button')
  header.append(title)//append() es una buena manera de añadir un elemento al final de una lista ya sea ordenada o desordenada.
  header.append(btnDelete)
  btnDelete.innerText = 'Eliminar'
  btnDelete.addEventListener('click', ()=>{
    const index = tasks.findIndex(i => i.id === task.id)// busca el indice, con un parametro busca el id
    tasks.splice(index, 1) //elimina un elemento de un array
    localStorage.setItem('tasks', JSON.stringify(task))//guarda el resultado de lo anterior para act
    renderTasks(tasks)//renderiza las tareas 
    Toastify({
      text: "Tarea Eliminada"
    }).showToast();
  })
  btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md'

  const description = document.createElement('p')
  description.innerText = task.description

  taskElement.append(header)
  taskElement.append(description)
  taskList?.append(taskElement)
})
}