import React from "react";

class search extends React.Component
{
  constructor(props) 
  {
    super(props);
  };

  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Enter the Abbreviation of a Stock below:
          </p>
          <form action="/user/" method="post">
            <input id="abbr" type="text" name="abbr"/>
            <button type="submit" className="btn btn-primary mb-5"> 
              Submit 
            </button> 
          </form>
        </header>
      </div>
    );
  }
}

export default search;

