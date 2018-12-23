import React from "react";
import Button from './Button.js';

const Table = ({ list, handleRemoveItem }) => {
    return (
      <div className="table">
        {list.map(item => (
          <div key={item.objectID} className="table__row">
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: "30%" }}>{item.author}</span>
            <span style={{ width: "10%" }}>{item.comments}</span>
            <span style={{ width: "10%" }}>{item.points}</span>
            <span style={{ width: "10%" }}>
              <Button
                onClick={() => handleRemoveItem(item.objectID)}
                className="button__inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  };
export default Table;
