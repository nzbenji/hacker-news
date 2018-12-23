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
      results: null,
      searchKey: '',
      searchTerm: searchQuery
    };
  }

  topSearchStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state

    //add old search results + new results to page
    const oldHits = results && results[searchKey] ? results[searchKey] : []; //retrieved from results map with searchKey as key
    const updateHits = [...oldHits, ...hits]
    this.setState({
      //spread all other results by searchKey to save previous search results
      results: { ...results, 
        //store searchKey in the results map with hits and page properties
        [searchKey]: { hits: updateHits, page } 
      }
    });
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey : searchTerm})
    this.fetchSearchResult(searchTerm)
  }

  fetchSearchResult = (searchTerm, page = 0) => {
    fetch(`${NEWS_URL}${searchTerm}&${PAGE}${page}&${PAGE_HITS}${defaultHits}`)
      .then(res => res.json())
      .then(data => this.topSearchStories(data))
      .catch(err => err);
  }

  handleRemoveItem = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey]

    const updatedResults = hits.filter(item => {
      return item.objectID !== id;
    });
    //generate new object and updates the hits array with filtered
    //out elements removed
    this.setState({
      results: { ...results, 
        [searchKey] : { hits: updatedResults, page }
      }
    });
  };

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm})

    if(this.requiredSearchRequest) {
      this.fetchSearchResult(searchTerm)
    }
    event.preventDefault();
  }

  requiredSearchRequest = searchTerm => {
    return !this.state.results[searchTerm]
  }


  render() {
    console.log(this.state);
    const { searchTerm, results, searchKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || []
    //prevent from returning anything because result in state is set to null
    //Once API data has suceeded results are saved to state and App
    //component will re render
    if (!results) return null;

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
          list={list}
          handleRemoveItem={this.handleRemoveItem}
        />
        <div className="interactions">
          <Button onClick={ () => this.fetchSearchResult(searchKey, page+1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}


export default App;
