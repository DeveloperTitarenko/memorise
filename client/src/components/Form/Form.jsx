import useStyles from "../Form/styles";
import {useState, useEffect} from "react";
import FileBase from "react-file-base64";
import {TextField, Button, Typography, Paper} from '@material-ui/core'

import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from "../../redux/actions/posts";


const Form = ({currentId, setCurrentId}) => {
  const classes = useStyles()
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  const dispatch = useDispatch()
  const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null)

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const changeHandler = (event) => {
    const {name, value} = event.target
    setPostData((prev) => ({...prev, [name]: value}))
  }

  const clear = () => {
    setCurrentId(0)
    setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (currentId === 0) {
      await dispatch(createPost(postData))
      clear()
    } else {
      await dispatch(updatePost(currentId, postData))
      clear()
    }
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing ' : 'Creating '}a Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
                   onChange={changeHandler}/>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                   onChange={changeHandler}/>
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}
                   onChange={changeHandler}/>
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                   onChange={changeHandler}/>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({
            ...postData,
            selectedFile: base64
          })}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit"
                fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form