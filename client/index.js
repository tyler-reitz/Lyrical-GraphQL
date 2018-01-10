import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './style/style.css'

import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetails from './components/SongDetails'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
})

const Root = () => (
  <ApolloProvider client={client} >
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={SongList} />
          <Route path="/song/new" component={SongCreate} />
          <Route path="/song/:id?" component={SongDetails} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
