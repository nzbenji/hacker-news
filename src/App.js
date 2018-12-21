import React, { Component } from "react";
import Search from "./components/Search.js";
import Button from "./components/Button.js";
import "./App.css";

function isSearched(query) {
  return function(item) {
    //When search query matches in list, item stays, when item doesnt match - item is removed.
    return item.title.toLowerCase().includes(query.toLowerCase());
  };
}

const searchQuery = 'react';

const NEWS_PATH = 'https://hn.algolia.com/api/v1';
const NEWS_URL = `${NEWS_PATH}/search?query=`;

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
      result: result
    });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${NEWS_URL}${searchTerm}`)
      .then( res => res.json())
      .then( data => this.topSearchStories(data) )
      .catch(err => err);

  }

  handleRemoveItem = id => {
    const updatedResults = this.state.result.hits.filter(item => {
      return item.objectID !== id
    })
    //generate new object and updates the hits array with filtered
    //out elements removed
    this.setState({
      result: { ...this.state.results, hits: updatedResults }
    });
  };

  handSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    console.log(this.state)
    const { searchTerm, result } = this.state;
    //prevent from returning anything because result in state is set to null
    //Once API data has suceeded results are saved to state and App 
    //component will re render
    if(!result) return null

    return (
      <div className="page">
      <div className="interactions">
        <Search 
        value={searchTerm} 
        onChange={this.handSearchChange} 
        >Search</Search>
        </div>
        <Table 
        list={result.hits} 
        pattern={searchTerm} 
        handleRemoveItem={this.handleRemoveItem} 
        />
      </div>
    );
  }
}

const Table = ({ list, pattern, handleRemoveItem }) => {
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
              <Button onClick={ () => handleRemoveItem(item.objectID) }
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
