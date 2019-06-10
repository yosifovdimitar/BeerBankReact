import React from "react";

import BeerDisplay from "./BeerDisplay.js"

class BeerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialItems: "empty",
            searchMode: "false",
            scrollCount: this.props.endOfScroll,
            searchPopulated: "false"
        };

        // Tracks if items are loaded from search input in order to prevent infinite scroll loading.
        this.searchMode = "false";
        // Tracks input in order to prevent infinite loop conditions.
        this.previousInput = "empty";
        // Tracks the page number for infinite scroll loading.
        this.pageCount = 1;
        // The list of items.
        this.itemsList = "";
    }

    // Loads initial 20 items.
    getInitial20Items() {
        fetch(`https://api.punkapi.com/v2/beers?page=${this.pageCount}&per_page=20`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                this.populateInitialList(myJson);
            }.bind(this));
    }

    // Adds additional 20 items when end of scroll is reached.
    add20ItemsToList() {
        this.pageCount++;
        fetch(`https://api.punkapi.com/v2/beers?page=${this.pageCount}&per_page=20`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                this.populateExtendedList(myJson);
            }.bind(this));
    }

    // Creates the initial list of items.
    populateInitialList(myJson) {
        this.itemsList = myJson.map((item) =>
            <BeerDisplay
                key={item.id}
                id={item.id}
                description={item.description}
                photo={item.image_url}
                name={item.name}
                tagline={item.tagline}
                ebc={item.ebc}
                abv={item.abv}
                ibu={item.ibu}
                foodPairing={item.food_pairing}
                detailedTrigger={this.props.detailedTrigger}></BeerDisplay>
        );
        this.setState({ initialItems: "populated" });
    }

    // Adds items to the initial list when end of scroll is reached.
    populateExtendedList(myJson) {
        let newItems = myJson.map((item) =>
            <BeerDisplay
                key={item.id}
                id={item.id}
                description={item.description}
                photo={item.image_url}
                name={item.name}
                tagline={item.tagline}
                ebc={item.ebc}
                abv={item.abv}
                ibu={item.ibu}
                foodPairing={item.food_pairing}
                detailedTrigger={this.props.detailedTrigger}></BeerDisplay>
        );

        this.itemsList = [this.itemsList, newItems];
        this.setState({ scrollCount: this.props.endOfScroll });
    }

    // Creates the list of items from Search input.
    populateSearchList(myJson) {
        let newItems = myJson.map((item) =>
            <BeerDisplay
                key={item.id}
                id={item.id}
                description={item.description}
                photo={item.image_url}
                name={item.name}
                tagline={item.tagline}
                ebc={item.ebc}
                abv={item.abv}
                ibu={item.ibu}
                foodPairing={item.food_pairing}
                detailedTrigger={this.props.detailedTrigger}></BeerDisplay>
        );

        this.searchMode = "true";
        this.itemsList = newItems;
        this.setState({ searchPopulated: "true" });
    }

    // Handles search input.
    handleAdvancedSearch(input) {
        if (input.beer_name === '' &&
            input.ibu_lt === '' &&
            input.ibu_gt === '' &&
            input.abv_lt === '' &&
            input.abv_gt === '' &&
            input.ebc_lt === '' &&
            input.ebc_gt === '' &&
            input.brewed_before === '' &&
            input.brewed_after === '') {
            this.searchMode = "false";
            this.pageCount = 1;
            this.getInitial20Items();
        } else {
            let composedQuery = this.composeAdvancedQuery(input);
            fetch("https://api.punkapi.com/v2/beers?"+composedQuery)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    this.populateSearchList(myJson);
                }.bind(this));
        }
    }

    // Creates a query from search inputs.
    composeAdvancedQuery(input) {
        let inputData = input;
        let composedQuery = "";

        for (let key in inputData) {
            if (inputData[key] !== "") {
                if (key === "beer_name") {
                    composedQuery += `${key}=${inputData[key].toString().toLowerCase().split(' ').join('_')}&`;
                } else {
                    composedQuery += `${key}=${inputData[key]}&`;
                }
            }
        }
        
        return composedQuery.slice(0, -1);
    }

    render() {
        // Creates the initial list on initial page load.
        if (this.state.initialItems === "empty" && this.props.searchInput === "empty") {
            this.getInitial20Items();
        // Creates the list of items when search is used.
        } else if (this.props.searchInput !== "empty" && this.previousInput !== this.props.searchInput) {
            this.previousInput = this.props.searchInput;
            this.handleAdvancedSearch(this.props.searchInput);
        // Loads additional 20 items when end of scroll is reached.
        } else if (this.props.endOfScroll !== this.state.scrollCount && this.searchMode !== "true") {
            this.add20ItemsToList();
        }
        return (
            <div className="list-container">
                {this.itemsList}
            </div>
        );
    }
}

export default BeerList;