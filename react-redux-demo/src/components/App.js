import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import Main from './Main/Main'
import { getPosts } from '../actions'
import { connect } from 'react-redux'
class App extends Component {
  componentDidMount() {
    // 更新 store 中的数据
    // 通过 store 下的 dispatch 方法，发出对应的 action
    // dispatch 方法接收一个对象作为参数，该对象下必须有一个 type 属性 对应 reducer 中的 action.type 类型，其他属性就是 负载数据 ,更新 store 需要用到的数据
    // store.dispatch({ type: 'GET_POSTS', posts: res.data })
    const { getPosts } = this.props
    getPosts()
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <header>
            <Link to='/'>首页</Link>
          </header>
          <Main />
        </>
      </BrowserRouter>
    )
  }
}

// mstp   mdtp
export default connect(
  null,
  { getPosts }
)(App)
