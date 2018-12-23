import React, { Component } from "react";
import Search from "./components/Search.js";
import Table from './components/Table.js';
import Button from './components/Button.js';
import "./App.css";

const searchQuery = "";
const defaultQuery = 'react'
const defaultHits = 80;

const NEWS_PATH = "https://hn.algolia.com/api/v1";
const NEWS_URL = `${NEWS_PATH}/search?query=`;
const PAGE = 'page='
const PAGE_HITS = 'hitsPerPage='

const url = `${NEWS_URL}${defaultQuery}&${PAGE}`
console.log(url)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: searchQuery
    };
  }

  topSearchStories = result => {
    const { hits, page } = result;
    //add old search results + new results to page
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updateHits = [...oldHits, ...hits]
    this.setState({
      result: { hits: updateHits, page }
    });
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchResult(searchTerm)
  }

  fetchSearchResult = (searchTerm, page = 0) => {
    fetch(`${NEWS_URL}${searchTerm}&${PAGE}${page}&${PAGE_HITS}${defaultHits}`)
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
    const page = (result && result.page) || 0
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
        <div className="interactions">
          <Button onClick={ () => this.fetchSearchResult(searchTerm, page+1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}


export default App;
