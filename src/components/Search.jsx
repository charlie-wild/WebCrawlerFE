import React, { Component } from "react";
import * as api from "./api";

class Search extends Component {
  state = {
    search: "",
    results: "",
    err: null,
    success: false
  };
  render() {
    return (
      <div className="search">
        <h2 className="search_header">Enter a URL to Search</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="What is your url?"
            id="search"
            className="search_bar"
            value={this.state.search}
            onChange={this.handleChange}
            required
          />
          <button className="submit_button">Search For Broken Links</button>
        </form>
        {this.state.success && <p>successful search!</p>}
      </div>
    );
  }

  handleSubmit = e => {
    const { search } = this.state;
    const validUrls = [
      "https://broken-links-api.herokuapp.com/",
      "https://web-crawler-test1.herokuapp.com/",
      "https://web-crawler-test2.herokuapp.com/",
      "https://random-static-linky-site-01.herokuapp.com/",
      "https://random-static-linky-site-02.herokuapp.com/"
    ];
    if (validUrls.includes(search)) {
      e.preventDefault();
      api
        .getLinkData(search)
        .then(results => {
          this.setState({ search: "", results, success: true });
        })
        .catch(err => {
          this.setState({ err: true });
        });
    } else {
      e.preventDefault();
      this.setState({ search: "", err: true });
    }
  };

  handleChange = ({ target: { value, id } }) => {
    this.setState({
      [id]: value
    });
  };
}

export default Search;
