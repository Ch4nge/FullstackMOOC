import blogService from '../services/blogs' 

const reducer = (state = [], action) => {
  switch(action.type){
    case 'INIT':
      return action.blogs
    case 'CREATE':
      return state.concat(action.blog)
    case 'DELETE':
      return state.filter(b => b.id !== action.id)
    case 'LIKE':
      const oldBlogs = state.filter(b => b.id !== action.id)
      const updated = state.find(b => b.id === action.id)
      console.log(updated) 
      return [...oldBlogs, {...updated, likes: updated.likes + 1}]
    case 'COMMENT':
      const oBlogs = state.filter(b => b.id !== action.id)
      const commented = state.find(b => b.id === action.id)
      return [...oBlogs, {...commented, comments: commented.comments.concat(action.comment)}]
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      blogs: blogs
    })
  }
} 

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {...blog, likes: blog.likes+1 } 
    await blogService.update(blog.id, newBlog)
    dispatch({
      type: 'LIKE',
      id: blog.id
    })
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const commentContainer = { comment: comment }
    await blogService.comment(id, commentContainer)
    dispatch({
      type: 'COMMENT',
      comment: comment,
      id: id
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      blog: newBlog
    }) 
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      id: id
    })
  }
}

export default reducer
