import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const mutation = gql`
  mutation AddLyric($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`

class CreateLyric extends Component {
  state = {
    content: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { 
      props: { mutate, songId }, 
      state: { content }
    } = this

    await mutate({ variables: { content, songId }})
    this.setState({ content: '' })
  }

  render() {
    const { state: { content }, handleSubmit } = this

    return (
      <form onSubmit={handleSubmit}>
        <label>Add a lyric</label>
        <input 
          value={content}
          onChange={({ target: { value:content }}) => 
            this.setState({ content })
          }
        />
      </form>
    )
  }
}

export default graphql(mutation)(CreateLyric)
