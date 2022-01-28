import React from "react"

class BeerDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.favIconRef = React.createRef();
        
    }

    componentDidMount(){
        this.checkIfFavorite();
    }

    // Check if items is in local storage, as favorite, in order to color the fav icon on page load.
    checkIfFavorite() {
        if (localStorage.getItem(this.props.id)) {
            this.favIconRef.current.classList.remove("bb-svg-star");
            this.favIconRef.current.classList.add("bb-svg-star-selected");
        }
    }

    favoriteButtonClicked = () => {
        if (!localStorage.getItem(this.props.id)) {
            localStorage.setItem(this.props.id, this.props.id);
            this.favIconRef.current.classList.remove("bb-svg-star");
            this.favIconRef.current.classList.add("bb-svg-star-selected");
        } else {
            localStorage.removeItem(this.props.id);
            this.favIconRef.current.classList.remove("bb-svg-star-selected");
            this.favIconRef.current.classList.add("bb-svg-star");
        }
    }

    itemClicked = () => {
        this.props.detailedTrigger(this.props);
    }

    render() {
        return (
            <div className="bb-item-element">
                <div onClick={this.itemClicked} className="bb-element-container">
                    <div className="list-element-photo-container">
                        <svg className="svg-photo-display" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                            <image href={this.props.photo} width="100%" height="100%" />
                        </svg>
                    </div>
                    <div className="bb-element-name">{this.props.name}</div>
                    <div className="bb-element-tagline">{this.props.tagline}</div>
                </div>
                <div className="bb-element-favorite-button">
                    <svg ref={this.favIconRef} onClick={this.favoriteButtonClicked} className="bb-svg-star" width="210mm" height="297mm" version="1.1" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
                        <path transform="rotate(.81368 -1152.9 3834)" d="m83.602 94.594-25.582-12.986-25.2 13.712 4.4448-28.343-20.829-19.73 28.329-4.5313 12.328-25.906 13.064 25.543 28.447 3.7189-20.255 20.317z" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default BeerDisplay;