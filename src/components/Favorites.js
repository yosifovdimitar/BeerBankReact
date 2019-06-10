import React from "react";

import BeerDisplay from "./BeerDisplay"

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = { favorites: "empty" };
        this.item_ids_list = "";
    }

    // Takes the items from localStorage and lists them.
    getFavorites() {
        if (this.state.favorites !== "populated") {
            for (let i = 0, len = localStorage.length; i < len; ++i) {
                this.item_ids_list += localStorage.getItem(localStorage.key(i)) + "|";
            }
            fetch(`https://api.punkapi.com/v2/beers?ids=${this.item_ids_list.slice(0, -1)}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    this.populateExtendedList(myJson);
                }.bind(this));
        }
    }

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

        this.itemsList = newItems;
        this.setState({ favorites: "populated" });
    }

    render() {
        if (localStorage.length !== 0) {
            this.getFavorites();
            return (
                <div>
                    <div className="favorites-text">Favorites List</div>
                    <div className="list-container">

                        {this.itemsList}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="list-container no-favorites-text">
                    <div>There are no favorites at the moment.</div>
                </div>
            );
        }
    }
}

export default Favorites;