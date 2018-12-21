import React from 'react';
import '../css/Search.css';

const Search = ({ value, onChange, children, onSubmit }) => {
  return (
    <form onSubmit={ onSubmit }>
       
       <input 
       type="text" 
        value={value} 
        onChange={onChange} 
        />
        <button type="submit">
        { children } 
        </button>
      </form>
  )
}

export default Search;
