import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

const Home = () => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch((err) => console.log(err))
  }, [])

  const handleEdit = (id) => {
    axios.put('http://localhost:3001/update/' + id)
      .then(result => { location.reload() })
      .catch((err) => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/delete/' + id)
      .then(result => { location.reload() })
      .catch((err) => console.log(err))
  }

  return (
    <div className='home'>
      <h1>Todo List</h1>
      <Create />
      {
        todos.length === 0
          ?
          <div><h2>No Records</h2></div>
          :
          todos.map(todo => (
            // eslint-disable-next-line react/jsx-key
            <center>
              <div className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                  {todo.done
                    ?
                    <BsFillCheckCircleFill></BsFillCheckCircleFill>
                    :
                    <BsCircleFill className='icon' />
                  }
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div>
                  <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                </div>
              </div>
            </center>
          ))
      }
    </div>
  )
}

export default Home