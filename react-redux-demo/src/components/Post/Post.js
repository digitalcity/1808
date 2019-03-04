import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostBody from '../PostBody/PostBody'
import PostComment from '../PostComment/PostComment'

import { addComment, getComments, delComment } from '../../actions'
// import { bindActionCreators } from 'redux'
class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    const { getComments } = this.props
    getComments(id)
  }

  render() {
    const { posts, match, comments, addComment, delComment } = this.props

    const { id } = match.params
    const post = posts.find(e => e.id.toString() === id)
    const article = post ? (
      <div>
        <PostBody post={post} />
        <PostComment
          comments={comments}
          id={id}
          addComment={addComment}
          delComment={delComment}
        />
      </div>
    ) : (
      '请稍等'
    )

    return <div>{article}</div>
  }
}

const mapStateToProps = state => {
  console.log(state)

  return {
    posts: state.posts,
    comments: state.comments
  }
}

// 将子组件要发的 action 函数添加上 dispatch 功能，
// 1.为什么在这添加？ 因为只有直接和 store 交互的组件才能获取 store 的 dispatch
// 2.为什么要添加？因为每次子组件更新 store 的时候都需要引入 store 使用他的 dispatch 才能发 action
// 3.怎么添加通过 mapDispatchToProps 将action创建函数添加上dispatch
// 例子给 addComment 函数添加 dispatch， 写法如下
//  addComment 中就会带 dispatch 功能将该方法传递给子组件执行就会自动发出对应的 action

// mapDisPatchToProps 的初始写法 需要从 redux 包中引入 bindActionCreators 方法将addComment创建函数添加 dispatch 功能

// const mapDispatchToProps = dispatch => {
//   return {
//     addComment: bindActionCreators(addComment, dispatch)
//   }
// }
// mapDisPatchToProps 的简写 直接写成一个对象，将需要添加 dispatch 的action 函数当做属性
// const mapDispatchToProps = {
//   addComment
// }
export default connect(
  mapStateToProps,
  { addComment, getComments, delComment }
)(Post)
