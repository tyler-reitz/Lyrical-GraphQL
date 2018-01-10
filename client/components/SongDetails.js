import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CreateLyric from './CreateLyric'
import LyricsList from './LyricsList'

const query = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
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

class SongDetails extends Component {
  render() {
    const { 
      data: { 
        song: { id, title, lyrics } = {},
        loading, 
      } = {}
    } = this.props

    return (
      !loading ? (
        <div>
          <Link to="/">Back to Songs List</Link>
          <h3>{title}</h3>
          <LyricsList lyrics={lyrics} />
          <CreateLyric songId={id} />
        </div>
      ) : (
        <p>…Loading</p>
      )
    )  
  }
}

export default graphql(query, {
  options: ({ match: { params: { id }}}) => ({ variables: { id }})
})(SongDetails)
