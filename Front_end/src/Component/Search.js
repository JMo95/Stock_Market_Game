import React from "react";

class search extends React.Component
{
  constructor(props) 
  {
    super(props);
    this.state = { 
      search_for: ''
  };

  }

  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Search
            Something is happening
          </p>

          <p>
            Buscando {this.props.Input}
          </p>
        </header>
      </div>
    );
  }
}

export default search;

