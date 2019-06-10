import React from "react";

import BeerSearch from "./BeerSearch.js";
import BeerList from "./BeerList.js";

class MainList extends React.Component {
    constructor(props){
        super(props);
        this.input = "empty";
    }

    // Takes the user input from the search bar and sends it to the beer list.
    searchInput = (userInput) => {
        this.input = userInput;
        this.setState({userInput:"updated"});
    }

    render(){
        return(
            <div>
                <BeerSearch searchInput={this.searchInput}></BeerSearch>
                <BeerList searchInput={this.input} endOfScroll={this.props.endOfScroll} detailedTrigger={this.props.detailedTrigger}></BeerList>
            </div>
        );
    }
}

export default MainList;