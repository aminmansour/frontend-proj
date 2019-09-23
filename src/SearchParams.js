import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
  handleFormSubmit() {
    navigate("/");
  }

  render() {
    return (
      <div className="search">
        <SearchBox search={this.handleFormSubmit} />
      </div>
    );
  }
}

export default SearchParams;
