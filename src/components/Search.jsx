import React, { Component } from 'react';

class Search extends Component {
  state = {
    search: '',
    err: null
  }
  render() {
    return (
      <div className="search">
        <h2 className="search_header">Enter a URL to Search</h2>
        <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="What is your url?"
        id="search"
        className="search_bar"
        value={this.state.search}
        onChange={this.handleChange}
        required/>
        </form>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  handleChange = ({target: { value, id }}) => {
    this.setState({
      [id]: value
    });
  }
}

export default Search;