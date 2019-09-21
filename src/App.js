import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>

        <Router>
          <SearchParams path="/search-params" />
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
