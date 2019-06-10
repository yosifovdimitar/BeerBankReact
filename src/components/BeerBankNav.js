import React from "react"

class BeerBankNav extends React.Component {
    
    render() {
        return (
            <div className="nav-menu-container">
                <div id="home-button" onClick={()=>{this.props.displayPage("home")}} >HOME</div>
                <div id="favorite-button" onClick={()=>{this.props.displayPage("favorites")}} >FAVORITE</div>
            </div>
        );
    }
}

export default BeerBankNav;