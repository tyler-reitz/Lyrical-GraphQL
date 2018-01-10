import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

class LyricsList extends Component {

  onLike = (id, likes) => {
    const { mutate } = this.props

    mutate({ 
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          __typename: 'LyricType',
          likes: ++likes,
          id
        }
      }
    })
  }

  render() {
    const { props: { lyrics }, onLike } = this
    return (
      <ul className="collection">
        {lyrics.map(({ id, content, likes }, idx) => 
          <li key={id} className="collection-item"> 
            {content} 
            <div className="vote-box">
              <i className="material-icons"
                onClick={() => onLike(id, likes)}
              >
                thumb_up
              </i>
              {likes}
            </div>
          </li>
        )}
      </ul>
    )
  }
}

export default graphql(mutation)(LyricsList)
