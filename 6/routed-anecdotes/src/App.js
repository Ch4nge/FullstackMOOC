import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { 
  Container,
  Table,
  Grid, 
  Image,
  Form,
  Button,
  Menu,
  Header,
  Icon
} from 'semantic-ui-react';


const Navi = () => {
    //Old styles
    const style = {
      backgroundColor: 'lightblue',
      padding: 10
    }
    const itemStyle = {
      padding: 10,
    }
    const activeStyle = {
      backgroundColor: 'lightgrey',
      fontWeight: 'bold'
    }
  return(
    <Menu inverted>
      <Menu.Item link>
        <NavLink exact to='/'> anecdotes </NavLink>&nbsp;
      </Menu.Item>
      <Menu.Item link>
        <NavLink exact to='/new'> create new </NavLink>&nbsp;
      </Menu.Item>
      <Menu.Item link>
        <NavLink exact to='/about'> about </NavLink>&nbsp;
      </Menu.Item>
    </Menu>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table>
      <Table.Body>
        {anecdotes.map(anecdote => 
          <Table.Row><Table.Cell><Link to={'/anecdotes/'+anecdote.id} >{anecdote.content}</Link></Table.Cell></Table.Row>)}
        </Table.Body>
      </Table>  
    </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

  See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
</div>
)
const Notification = ({notification}) => {
  if(notification === ''){
    return null
  }
  const style = {
    color: 'green',
    border: 'solid',
    margin: 5,
    padding: 10,
    borderRadius: 15
  }
  return <div style={style}> {notification} </div>
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label> 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>  
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field> 
          <Button color='green'>create</Button>
        </Form>
      </div>  
    )

  }
}

const Anecdote = ({anecdote}) => {
  return(
    <div>
      <h1>{ anecdote.content } by { anecdote.author }</h1>

      <p>has {anecdote.votes} votes </p>

      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
    </div>
  )
}
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.notify('a new anecdote ' + anecdote.content + ' created!')
  }

  notify = (text) => {
    this.setState({ notification: text })
    setTimeout(() => {
      this.setState({ notification: ''})}, 5000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <div>
          <Header as='h1' icon textAlign='center'>
            <Icon name='terminal' circular />

            <Header.Content>Software anecdotes</Header.Content>
          </Header>
          <Router>
            <div>
              <Navi />
              <Notification notification={this.state.notification} />
              <Grid columns='16' divided={true} >
                <Grid.Row>
                  <Grid.Column width='12' >
                    <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                    <Route path ='/about' render={() => <About />} />      
                    <Route path='/new' render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
                    <Route path='/anecdotes/:id' render={ ({match}) => 
                        <Anecdote anecdote={this.anecdoteById(match.params.id)} /> }
                      />
                    </Grid.Column>
                    <Grid.Column width='4'>
                      <Image 
                        src='https://cdn.technologyreview.com/i/images/andrewng.jpg?sw=802&cx=0&cy=0&cw=1800&ch=2389' 
                        size='small'
                        spaced='left'
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Router>
            <Footer />
          </div>
        </Container>
    );
  }
  }

  export default App;
