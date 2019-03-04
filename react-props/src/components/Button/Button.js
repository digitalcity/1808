import React, { Component } from 'react'
import './buttton.css'
class Button extends Component {
  // 子组件如何接收父组件传递过来的 props
  // 在 render 方法下 直接获取 this.props 就是父组件传递给子组件的 props 对象
  //
  render() {
    // console.log(this.props)
    const { txt, bgColor, onClick } = this.props
    return (
      <button
        style={{ backgroundColor: bgColor ? bgColor : '#00b3d4' }}
        className="btn"
        onClick={onClick}
      >
        {txt ? txt : '按钮'}
      </button>
    )
  }
}

export default Button
