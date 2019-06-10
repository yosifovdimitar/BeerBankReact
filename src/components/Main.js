import React from "react";
import BeerBankNav from "./BeerBankNav.js";
import PageContent from "./PageContent.js";
import DetailedDisplay from "./DetailedDisplay.js";

class Main extends React.Component {
    constructor(props) {
        super(props);
        // Controls which page to display and the beer detailed info element.
        this.state = {
            currentPage: "home",
            detailedDisplay: "hide"
        };
    }

    // Passed down function that grabs the clicked element details and provides them to the detailed display.
    detailedDisplayTrigger = (item) => {
        this.detailedSwitch = "show";
        this.itemName = item.name;
        this.itemTagline = item.tagline;
        this.itemPhoto = item.photo;
        this.itemDescription = item.description;
        this.itemAbv = item.abv;
        this.itemIbu = item.ibu;
        this.itemEbc = item.ebc;
        this.itemFoodPairing = item.foodPairing;
        this.setState({ detailedDisplay: "show" });
    }

    // Hides the detailed display. 
    closeDetailedDisplay = () => {
        this.detailedSwitch = "hide";
        this.setState({ detailedDisplay: "hide" });
    }

    // Controls which page to display.
    selectPage = (page) => {
        switch (page) {
            case "home":
                this.pageToDisplay = "home";
                this.setState({ currentPage: "home" })
                break;

            case "favorites":
                this.pageToDisplay = "favorites";
                this.setState({ currentPage: "favorites" })
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <DetailedDisplay showHide={this.detailedSwitch || "hide"}
                    closeDisplay={this.closeDetailedDisplay}
                    name={this.itemName}
                    tagline={this.itemTagline}
                    photo={this.itemPhoto}
                    description={this.itemDescription}
                    abv={this.itemAbv}
                    ibu={this.itemIbu}
                    ebc={this.itemEbc}
                    foodPairing={this.itemFoodPairing}
                    detailedTrigger={this.detailedDisplayTrigger}></DetailedDisplay>
                <BeerBankNav displayPage={this.selectPage}></BeerBankNav>
                <PageContent renderPage={this.pageToDisplay || "home"} detailedTrigger={this.detailedDisplayTrigger}></PageContent>
            </div>
        );
    }
}

export default Main;