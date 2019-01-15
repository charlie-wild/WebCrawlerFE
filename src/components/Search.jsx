import React, { Component } from "react";
import Results from "../components/Results";
import * as api from "./api";

class Search extends Component {
  state = {
    search: "",
    results: "",
    performedSearches: [],
    err: null,
    success: false,
    searched: false
  };
  render() {
    return (
      <div className="search">
        <h1 className="search_header title is-1">Enter A URL To Find The Broken Links</h1>

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
        {this.state.err && (
          <p>There has been an error! Please try with a valid Url.</p>
        )}
        {this.state.success && <p>successful search!</p>}
        <div className="results">
          <Results results={this.state.results} />
        </div>
      </div>
    );
  }

  handleSubmit = e => {
    const { search, performedSearches } = this.state;
    const validUrls = [
      "https://broken-links-api.herokuapp.com/",
      "https://web-crawler-test1.herokuapp.com/",
      "https://web-crawler-test2.herokuapp.com/",
      "https://random-static-linky-site-01.herokuapp.com/",
      "https://random-static-linky-site-02.herokuapp.com/"
    ];
    if (validUrls.includes(search)) {
      if (performedSearches.includes(search)) {
        const cachedResult = JSON.parse(sessionStorage.getItem(search));
        this.setState({ results: cachedResult, err: false });
      } else {
        e.preventDefault();
        performedSearches.push(search);
        api
          .getLinkData(search)
          .then(results => {
            this.setState({ search: "", results, success: true, err: false });
            sessionStorage.setItem(search, JSON.stringify(results));
          })
          .catch(err => {
            this.setState({ err: true });
          });
      }
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
