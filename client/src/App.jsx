import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { getPosts } from './redux/actions/posts'
import memories from './images/memories.png'
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from './styles'

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [currentID, setCurrentId] = useState(0)

  useEffect(() => {
    dispatch(getPosts)
  },[dispatch])

  return (
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentID} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>

  )
}

export default App