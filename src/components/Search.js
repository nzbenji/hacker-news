import React from 'react';
import '../css/Search.css';

const Search = ({ value, onChange, children }) => {
  return (
    <form>
       { children } <input type="text" 
        value={value} 
        onChange={onChange} 
        />
      </form>
  )
}

export default Search;
