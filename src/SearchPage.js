import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      name: "",
      open: false,
    };
  }
  componentDidMount() {}

  search = () => {
    const { name } = this.state;
    // console.log(this.state.name);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      console.log(res);
      this.setState({ data: res.data });
    });
  };
  render() {
    return (
      <div>
        <div className="search-bar">
          <TextField
            label="Name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <button onClick={this.search}>Rechercher</button>
        </div>
        {this.state.data.name}
        
      </div>
    );
  }
}
