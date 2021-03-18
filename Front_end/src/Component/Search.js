import React from "react";
import axios from "axios";

class search extends React.Component
{
  // constructor(props) 
  // {
  //   super(props);
  //   this.state = { 
  //     search_for: this.props.Input,
  //     search_for_dynamic: ''
  // };


  // this.handle_Change = this.handle_Change.bind(this);
  // }

  state = { 
    details: [], 
    name: "",
    price: 0.0,
    Company: "", 
    desciption: "",
    date: "",
    search_for: '',
    search_for_dynamic: '',
  //     search_for_dynamic: ''
}; 

componentDidMount() { 
    let data; 

    axios 
        .get("http://localhost:8000/wel3/") 
        .then((res) => { 
            data = res.data; 
            this.setState({ 
                details: data, 
            }); 
        }) 
        .catch((err) => {}); 
} 

renderSwitch = (param) => { 
    switch (param + 1) { 
        case 1: 
            return "primary "; 
        case 2: 
            return "secondary"; 
        case 3: 
            return "success"; 
        case 4: 
            return "danger"; 
        case 5: 
            return "warning"; 
        case 6: 
            return "info"; 
        default: 
            return "yellow"; 
    } 
}; 

handleInput = (e) => { 
    this.setState({ 
        [e.target.name]: e.target.value, 
    }); 
}; 


  // handle_Change(event)
  // {
  //   console.log("Opertion55");
  //   this.setState( (state, props) =>{
  //     return{
  //      search_for_dynamic: event.target.value
  //     };
  //     })
  // }

  handleInput = (e) => { 
    this.setState({ 
        [e.target.name]: e.target.value, 
    }); 
}; 


  // handle_Change(event)
  // {
  //   console.log("Opertion55");
  //   this.setState( (state, props) =>{
  //     return{
  //      search_for_dynamic: event.target.value
  //     };
  //     })
  // }


  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Search
            Something is happening
          </p>

          <form className="Nav_Base" onSubmit={this.handleSubmit} >
            <input className="Nav_Base" type="text"  placeholder = "Seach ...."  name="search_for_dynamic"  value={this.props.search_for_dynamic} onChange={this.handleInput} />
          </form>

          <p>
            Looking for {this.state.search_for_dynamic}
          </p>



          <hr 
                    style={{ 
                        color: "#000000", 
                        backgroundColor: "#000000", 
                        height: 0.5, 
                        borderColor: "#000000", 
                    }} 
                /> 
  
                {this.state.details.filter(detail => detail.name.toLowerCase().includes(this.state.search_for_dynamic.toLowerCase()) ).map((detail, id) => ( 
                    <div key={id}> 
                        <div className="card shadow-lg"> 
                            <div className={"bg-" + this.renderSwitch(id % 6) +  
                                          " card-header"}>Stock {id + 1}</div> 
                            <div className="card-body"> 
                                <blockquote className={"text-" + this.renderSwitch(id % 6) +  
                                                   " blockquote mb-0"}> 
                                    <h1> {detail.firstname} {detail.name} </h1> 
                                    <footer className="blockquote-footer"> 
                                        {" "} 
                                        <cite title="Source Title">{detail.Company}</cite> 
                                    </footer> 
                                </blockquote> 
                            </div> 
                        </div> 
                        <span className="border border-primary "></span> 
                    </div> 
                ))} 
        </header>
      </div>
    );
  }
}

export default search;

