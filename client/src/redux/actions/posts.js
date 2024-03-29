import * as api from '../../api'

export const getPosts = async (dispatch)  => {
  try{
const {data} = await api.axiosPost()
    dispatch({type: 'FETCH_ALL', payload: data})
  }catch (err){
    console.log(err.message)
  }
}

export const createPost = (post) => async (dispatch) => {
  try{
    const { data } = await api.createPost(post)
    dispatch({type: 'CREATE_POST', payload: data})
  }catch (err){
    console.log(err.message)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try{
  const { data } =  await api.updatePost(id, post)
    dispatch({type: 'UPDATE', payload: data})
  }catch (err){
    console.log(err.message)
  }
}
