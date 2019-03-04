import React, { Component } from 'react'
import '../static/gloable.css'
import Todo from './Todo/Todo'
import Bottom from './Bottom/Bottom'
import axios from 'axios'
class App extends Component {
  state = {
    todos: [],
    type: 'all'
  }
  componentDidMount() {
    axios.get('http://localhost:3008/todos').then(res => {
      this.setState({
        todos: res.data
      })
    })
  }

  render() {
    const { todos, type } = this.state
    const content = todos.length ? (
      <div>
        <Bottom
          todos={todos}
          type={type}
          changeType={this.changeType}
          delTodo={this.delTodo}
        />
      </div>
    ) : (
      <div>请添加</div>
    )
    return (
      <div>
        <h1>TO DO</h1>
        <Todo
          todos={todos}
          addTodo={this.addTodo}
          completeTodo={this.completeTodo}
          type={type}
          delTodo={this.delTodo}
        />
        {content}
      </div>
    )
  }
  addTodo = newTodo => {
    const { todos } = this.state
    axios.post('http://localhost:3008/todos', newTodo).then(res => {
      this.setState({
        todos: [...todos, res.data]
      })
    })
  }
  completeTodo = id => {
    const { todos } = this.state
    axios
      .patch(`http://localhost:3008/todos/${id}`, {
        completed: !todos.find(todo => todo.id === id).completed
      })
      .then(res => {
        // 方法1
        // todos.find(todo => todo.id === id).completed = true
        // this.setState({
        //   todos: todos
        // })
        // 方法2
        // console.log(res.data)
        this.setState({
          todos: todos.map(todo => {
            if (todo.id === id) {
              // todo = rea.data   todo.completed = true 为什么不用这两个方法，因为 map 内 todo 这个参数就是 todos 数组内的某个对象 直接对 todo 进行修改也相当于直接修改了 todos
              return res.data
            }
            return todo
          })
        })
      })
  }
  changeType = type => {
    this.setState({
      type: type
    })
  }
  delTodo = id => {
    const { todos } = this.state
    axios.delete(`http://localhost:3008/todos/${id}`).then(res => {
      this.setState({
        todos: todos.filter(todo => todo.id !== id)
      })
    })
  }
}

export default App
