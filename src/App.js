import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    author: 'Bob nmu',
    url: 'www.react.com',
    comments: 4,
    points: 3,
    objectID: 1
  },
  {
    title: 'Vue',
    author: 'Rob nmu',
    url: 'www.vue.com',
    comments: 2,
    points: 5,
    objectID: 2
  },
]

function isSearched(query){
  return function(item) {
    //When search query matches in list, item stays, when item doesnt match - item is removed.
    return item.title.toLowerCase().includes(query.toLowerCase())
  }
}

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      list: list,
      searchTerm: ''
    }
  }

  onDismiss = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.objectID !== id)
    });
  }

  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
      <form>
        <input type="text" onChange={ this.onSearchChange }/>
      </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {
          return (
            <div key={item.objectID}>
            <span>
            <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.comments}</span>
            <span>{item.points}</span>
            <span>
              <button onClick={ () => this.onDismiss(item.objectID)} type="button">
              Dismiss
              </button>
            </span>
            
            </div>
          )
          
          
        })}
      </div>
    );
  }
}

export default App;
