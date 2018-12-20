import React, { Component } from "react";
import Search from "./components/Search.js";
import Button from "./components/Button.js";
import "./App.css";

// const list = [
//   {
//     title: "React",
//     author: "Bob nmu",
//     url: "www.react.com",
//     comments: 4,
//     points: 3,
//     objectID: 1
//   },
//   {
//     title: "Vue",
//     author: "Rob nmu",
//     url: "www.vue.com",
//     comments: 2,
//     points: 5,
//     objectID: 2
//   }
// ];

function isSearched(query) {
  return function(item) {
    //When search query matches in list, item stays, when item doesnt match - item is removed.
    return item.title.toLowerCase().includes(query.toLowerCase());
  };
}

const searchQuery = 'react';

const NEWS_PATH = 'https://hn.algolia.com/api/v1';
// const NEWS_SEARCH = './search';
// const PARAM_SEARCH = 'query='
const NEWS_URL = `${NEWS_PATH}/search?query=`

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // list: list,
      // searchTerm: "",
      result: null,
      searchTerm: searchQuery
    };
  }

  topSearchStories = (result) => {
    this.setState({
      result
    });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    
    fetch(`${NEWS_URL}${searchTerm}`)
      .then( res => res.json())
      .then( data => this.topSearchStories(data) )
      .catch(err => err);

  }

  onDismiss = id => {
    this.setState({
      list: this.state.list.filter(item => item.objectID !== id)
    });
  };

  onSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    console.log(this.state)
    const { searchTerm, result } = this.state;
    if(!result) return null

    return (
      <div className="page">
      <div className="interactions">
        <Search 
        value={searchTerm} 
        onChange={this.onSearchChange} 
        >Search</Search>
        </div>
        <Table 
        list={result.hits} 
        pattern={searchTerm} 
        onDismiss={this.onDismiss} 
        />
      </div>
    );
  }
}

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className="table">
        { list.filter(isSearched(pattern)).map(item => (
          <div key={item.objectID} className="table__row">
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '30%' }}>{item.author}</span>
            <span style={{ width: '10%' }}>{item.comments}</span>
            <span style={{ width: '10%' }}>{item.points}</span>
            <span style={{ width: '10%' }}>
              <Button onClick={ () => onDismiss(item.objectID) }
              className="button__inline"
              >
                Dismiss
              </Button>

            </span>
          </div>
        ))}
      </div>
  )
}

export default App;
