import React, { Component } from "react";
import Search from "./components/Search.js";
import Table from './components/Table.js';
import "./App.css";

const searchQuery = "";

const NEWS_PATH = "https://hn.algolia.com/api/v1";
const NEWS_URL = `${NEWS_PATH}/search?query=`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: searchQuery
    };
  }

  topSearchStories = result => {
    this.setState({
      result: result
    });
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchResult(searchTerm)
  }

  fetchSearchResult = (searchTerm) => {
    fetch(`${NEWS_URL}${searchTerm}`)
      .then(res => res.json())
      .then(data => this.topSearchStories(data))
      .catch(err => err);
  }

  handleRemoveItem = id => {
    const updatedResults = this.state.result.hits.filter(item => {
      return item.objectID !== id;
    });
    //generate new object and updates the hits array with filtered
    //out elements removed
    this.setState({
      result: { ...this.state.results, hits: updatedResults }
    });
  };

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.fetchSearchResult(searchTerm)
    event.preventDefault();
  }


  render() {
    console.log(this.state);
    const { searchTerm, result } = this.state;
    //prevent from returning anything because result in state is set to null
    //Once API data has suceeded results are saved to state and App
    //component will re render
    if (!result) return null;

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm} 
            onChange={this.handleSearchChange}
            onSubmit={this.handleSearchSubmit}
            >
            Search
          </Search>
        </div>
        <Table
          list={result.hits}
          handleRemoveItem={this.handleRemoveItem}
        />
      </div>
    );
  }
}


export default App;
