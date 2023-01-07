import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
function App() {
	const [userToDelete, setUserToDelete] = useState()
	const [checkBox, setCheckBox] = useState(false)
	const [userToSend, setUserToSend] = useState()
	const [data, setData] = useState()
	async function populateData() {
		const response = await axios.get('http://localhost:2121/api/todos')
		setData(
			JSON.stringify(
				response.data.map((entry) => {
					return [entry.id, entry.todo, entry.finished]
				})
			)
		)
	}
	useEffect(() => {
		populateData()
	}, [])
	async function postTodo(e) {
		e.preventDefault()
		console.log('send it')
		await axios
			.post('http://localhost:2121/api/postTodo', {
				todo: document.getElementById('todo').value,
				finished: checkBox,
			})
			.then((res) => {
				console.log(res)
			})
	}

	async function deleteAllTodos() {
		await axios.delete('http://localhost:2121/api/deleteTodo')
	}
	return (
		<>
			{data ? data : 'no data'}
			<button onClick={deleteAllTodos}>Get em out of here</button>
			<form
				className="card flex flex-cols gap-2 w-[34rem] mt-8 bg-slate-600 py-8 px-16"
				onSubmit={postTodo}>
				<h2 className="text-3xl">Add a new ToDo</h2>
				<label htmlFor="todo"></label>
				<input className="p-2 mt-2" type="text" name="todo" id="todo" />
				<section className="grid grid-cols-2">
					<label className="text-center mt-4 text-2xl" htmlFor="finished">
						Finished?
					</label>
					<input
						className="mt-4"
						type="checkbox"
						name="finished"
						id="finished"
						onClick={() => {
							setCheckBox(!checkBox)
						}}
					/>
				</section>
				<input
					className="btn bg-green-400 hover:text-green-400 text-slate-900 w-[50%] m-auto mt-4"
					type="submit"
					value="Add Todo"
				/>
			</form>
		</>
	)
}

export default App
