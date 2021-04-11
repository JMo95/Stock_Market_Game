import React from "react";

class search extends React.Component
{
  constructor(props) 
  {
    super(props);
<<<<<<< HEAD
  };

=======
    this.state = { 
      search_for: this.props.Input,
      search_for_dynamic: ''
  };


  this.handle_Change = this.handle_Change.bind(this);
  }


  handle_Change(event)
  {
    console.log("Opertion55");
    this.setState( (state, props) =>{
      return{
       search_for_dynamic: event.target.value
      };
      })
  }


>>>>>>> main
  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <p>
<<<<<<< HEAD
            Enter the Abbreviation of a Stock below:
          </p>
          <form action="/user/" method="post">
            <input id="abbr" type="text" name="abbr"/>
            <button type="submit" className="btn btn-primary mb-5"> 
              Submit 
            </button> 
          </form>
=======
            Search
            Something is happening
          </p>

          <form className="Nav_Base" onSubmit={this.handleSubmit} >
            <input className="Nav_Base" type="text"  placeholder = "Seach ...."  name="name"  value={this.props.search_for_dynamic} onChange={this.handle_Change} />
          </form>

          <p>
            Looking for {this.state.search_for_dynamic}
          </p>
>>>>>>> main
        </header>
      </div>
    );
  }
}

export default search;

