import React, { useState } from "react";

//create your first component
const Home = () => {
	const[task, setTask] = useState("")
	

	const[listTask, setListTask] = useState([])

	const handleChange = (event)=>{
		setTask(event.target.value)
	}

	const handleSavetask= (event)=>{

		if(event.key === "Enter"){
			if(task != ""){
			setListTask([...listTask, task])
			setTask("")
		}else {
			console.log("Debe llenar los campos")
		}
		}
	}

	return (
		<>
		<div className = "container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<h1>Mi lista de tareas</h1>

					<form onSubmit={(event) => event.preventDefault()} > 
						<input 
						type="text"
						name="label"
						className="form-control" 
						placeholder="Agrega una tarea" 
						value={task} 
						onChange={handleChange}
						onKeyDown={handleSavetask}
			
						/>
					</form>
					<ul>
						{listTask.map((item, index)=>{
							return (
								<li key={index}>{item}</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	   </>	
	);
};

export default Home;