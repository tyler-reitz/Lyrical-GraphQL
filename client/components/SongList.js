import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import query from '../queries/fetchSongs'

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

class SongList extends Component {
  render() {
    const { data: { songs, refetch }, mutate } = this.props

    return (
      <div>
        <h4>Song List</h4>
        {songs ? (
            <ul className="collection">
              {songs.map(({ title, id }) => 
                <li key={id} className="collection-item">
                  <Link to={`/song/${id}`}>{title}</Link>
                  <i 
                    className="material-icons"
                    onClick={async () => {
                      await mutate({ variables: { id } })
                      refetch()
                    }}
                  >
                    delete
                  </i>
                </li>
              )}
            </ul>
          ) : (
            <div>…Loading</div>
          )
        }

        <Link 
          to="/song/new" 
          className="btn-floating btn-large red right"
        >
          +
        </Link>
      </div>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(SongList)
)
