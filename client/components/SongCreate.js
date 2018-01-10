import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'

import query from '../queries/fetchSongs'

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`

class SongCreate extends Component {

  state = {
    title: '',
    redirect: false
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { state: { title }, props: { mutate}  } = this

    await mutate({ 
      variables: { title },
      refetchQueries: [{ query }]
    }) 
    this.setState({ redirect: true  })
  }

  render() {
    const { state:{ title, redirect }, handleSubmit } = this

    return (
      redirect
        ? <Redirect to="/" />
        : ( <div>
              <Link to="/">Back</Link>
              <h4>Create A New Song</h4>
              <form onSubmit={handleSubmit}>
                <label>Song Title</label>
                <input 
                  value={title} 
                  onChange={e => this.setState(
                    { title: e.target.value })
                  }
                />
              </form>
            </div>
          )
    )
  }
}

export default graphql(mutation)(SongCreate)
