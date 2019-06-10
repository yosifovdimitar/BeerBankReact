import React from "react"

import BeerDisplay from "./BeerDisplay.js";

class DetailedDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { displayRec: "hidden" };
        this.recommendationsRef = React.createRef();
        this.refreshRec = "false";
    }

    createFoodList(data) {
        let itemList = data.map((number) =>
            <li key={number.toString()}>{number}</li>
        );
        this.itemList = itemList;
    }

    provideRecommendations(ebc) {
        fetch(`https://api.punkapi.com/v2/beers?ebc_gt=${ebc}&per_page=3`)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                this.populateRecommendationsList(myJson);
            }.bind(this));
    }

    populateRecommendationsList(myJson) {
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

        this.recommendationsList = newItems;
        this.recommendationsRef.current.classList.remove("hide-item");
        this.recList = "populated";
        this.setState(this.state);
    }

    render() {
        if (this.props.showHide === "show") {
            this.createFoodList(this.props.foodPairing);
            if (this.recList !== "populated") {
                this.provideRecommendations(this.props.ebc);
            }
            return (
                <div className="bb-detailed-display-shadow">
                    <div className="bb-detailed-display-container">
                        <div onClick={this.props.closeDisplay} className="bb-detailed-display-close">✖</div>
                        <div className="bb-detailed-content">
                            <div className="bb-item-details-container">
                                <div className="bb-detailed-item-name">{this.props.name}</div>
                                <div className="bb-detailed-item-tagline">{this.props.tagline}</div>
                                <div className="bb-detailed-separator-line"></div>
                                <div className="bb-item-specifics">
                                    <div className="bb-item-ibu-container"><div className="bb-detailed-advanced-params">IBU:&nbsp;</div><div className="bb-detailed-item-ibu">{this.props.ibu}</div></div>
                                    <div className="bb-item-abv-container"><div className="bb-detailed-advanced-params">ABV:&nbsp;</div><div className="bb-detailed-item-abv">{this.props.abv}%</div></div>
                                    <div className="bb-item-ebc-container"><div className="bb-detailed-advanced-params">EBC:&nbsp;</div><div className="bb-detailed-item-ebc">{this.props.ebc}</div></div>
                                </div>
                                <div className="bb-detailed-item-description">{this.props.description}</div>
                                <div className="detailed-display-photo-container">
                                    <svg className="detailed-svg-photo-display" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                        <image href={this.props.photo} width="100%" height="100%" />
                                    </svg>
                                </div>
                                <div className="bb-best-served-with">Best served with:</div>
                                <div className="bb-detailed-item-food-pairing"><ul>{this.itemList}</ul></div>
                            </div>
                            <div className="bb-you-might-also-like">You might also like:</div>
                            <div ref={this.recommendationsRef} className="bb-item-recommendations-container hide-item">
                                {this.recommendationsList}
                            </div>
                        </div>
                    </div>
                </div >
            );
        } else {
            this.recList = "empty";
            return (
                <div className="hide-item"></div>
            );
        }
    }
}

export default DetailedDisplay;