import React, { Component } from "react";
import Search from "./components/Search.js";
import Button from "./components/Button.js";
import "./App.css";

const list = [
  {
    title: "React",
    author: "Bob nmu",
    url: "www.react.com",
    comments: 4,
    points: 3,
    objectID: 1
  },
  {
    title: "Vue",
    author: "Rob nmu",
    url: "www.vue.com",
    comments: 2,
    points: 5,
    objectID: 2
  }
];

function isSearched(query) {
  return function(item) {
    //When search query matches in list, item stays, when item doesnt match - item is removed.
    return item.title.toLowerCase().includes(query.toLowerCase());
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: ""
    };
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
    const { searchTerm, list } = this.state;
    return (
      <div>
        <Search 
        value={searchTerm} 
        onChange={this.onSearchChange} 
        >Search</Search>
        <Table 
        list={list} 
        pattern={searchTerm} 
        onDismiss={this.onDismiss} 
        />
      </div>
    );
  }
}

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div>
        { list.filter(isSearched(pattern)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={ () => onDismiss(item.objectID) }>
                Dismiss
              </Button>

            </span>
          </div>
        ))}
      </div>
  )
}

export default App;
