import React, { useEffect, useState } from "react";

const initialState ={
	label: "",
	done: false
}
const urlBase="https://playground.4geeks.com/apis/fake/todos/user/emilio"


const Home = () => {
//Estado que guarda la tarea que estoy escribiendo
	const[task, setTask] = useState(initialState)
 //Esta es la tarea, listas para agregarse a mi lista de tareas	
	const[listTask, setListTask] = useState([])//lista de tareas arreglo
 //maneja el error  
	const [error,setError]= useState(false)
	//Objeto evento dirigido al Input
	const getTask = async() =>{
		try {
			let response = await fetch(urlBase)
			let data = await response.json()
		
			if(response.ok){
				setListTask(data)
			}
			if (response.status == 404){
				createUser()
			}

		} catch (error) {
			console.log(error)	
		}
	}

	const createUser = async()=>{
		try {
			//Metodo POst tiene dos parametros:
			//1. La URl para consultar
			//2. EL objeto con los detalles
			let response = await fetch(urlBase, {
				method:"POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify([])
			})	
			if (response.ok){
				getTask()
			}
		
		} catch (error) {
			console.log(error)
			
		}
	}


	const handleChange = (event)=>{
		// console.log(event.target.value)
		//Es el apuntador y es el valor en el estado de Task
		setTask({
			label:event.target.value,
			done: false
		})
		//input debe estar sincronizada con el estado
	}
//Manejar el onKeydown= enter, controlo la tecla con Key
	const handleSavetask= async (event)=> {
		if(event.key === "Enter"){
			//para no guardar tareas vacias
			if(task.label.trim() !== ""){
				//Copia del array
			//setListTask([...listTask, task])
			//Se pone vacio despues de la tarea
			//setTask(initialState)
			//setError(false)
			try {
				let response = await fetch (urlBase, {
					method: "PUT",
					headers: {
						"Content-Type":"application/json"
					},
					body: JSON.stringify([...listTask, task])
				})

				if(response.ok) {
					getTask()
					setTask(initialState)
					setError(false)
				}
				
			} catch (error) {
				console.log(error)	
			}
		}else {
			setError(true)
			console.log("Debe llenar los campos")
		}
		}
	}
	
	 const deleteTask = async (id) => {
		
		let result = listTask.filter((item, index)=>id !=index) 

		try {
			let response = await fetch(urlBase,{
				method: "PUT",
				headers:{
					"Content-Type":"application/json"
					},
					body: JSON.stringify(result)
				})
				if (response.ok) {
					getTask()
				}
		} catch (error) {
			console.log(error)	
		}
	}

	async function deleteAll(){
		try {
			let response = await fetch(urlBase,{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}

			})

			if(response.ok){
				getTask()
			}
			
		} catch (error) {
			console.log(error)	
		}
	}

	useEffect (()=>{
		getTask()
	},[])

	return (
		
		<div className = "container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<h1>Lista de tareas</h1>
					{error ? <div className= "alert alert-danger">No hay tareas, añada tareas</div> : ""}
					<form onSubmit={(event) => event.preventDefault()} > 
						<input 
						type="text"
						placeholder="Agregar tareas aquí" 
						className="form-control" 
						name="label"
						value={task.label} 
						onChange={handleChange}
						onKeyDown={handleSavetask}
						>
						</input>
					</form>
					<ol>
					{/* <.MAp(recibe call back) recibe key, dibujar las tareas al cerrar. React necesita identificador cada map> */}
						{listTask.map((item, index) => {
							return <li key={index} onClick={()=>deleteTask(index)}>{item.label}<span className= "delete-task " > X </span></li>
						})}
					</ol>
					<button onClick ={()=> deleteAll()}> Borrar todo </button>
				</div>
			</div>
		</div>
	   	
	);
};

export default Home;

// 1. Traerse todas las tareas guardadas en bd(API) 
// 2. Crear un usuario
// 3. Guarda tarea
// 4. Borra las tareas cuando le doy click
// 5. Eliminar usuarios con todas las tareas


