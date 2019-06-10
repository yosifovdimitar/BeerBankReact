import React from "react";

import MainList from "./MainList.js";
import Favorites from "./Favorites.js";

class PageContent extends React.Component {
    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();
        this.state = { endOfScroll: "0" }
        this.endCount = 0;
    }

    // Checks if scroll is at end of page and triggers the load of additional items.
    loadMore = () => {
        if (Math.round(this.scrollRef.current.scrollTop + this.scrollRef.current.clientHeight) >= this.scrollRef.current.scrollHeight) {
            this.endCount++;
            let currentCount = this.endCount.toString();
            this.setState({ endOfScroll: currentCount });
        }
    }

    render() {

        if (this.props.renderPage === "home") {
            return (
                <div onScroll={this.loadMore} ref={this.scrollRef} className="page-content-wrapper">
                    <MainList endOfScroll={this.state.endOfScroll} detailedTrigger={this.props.detailedTrigger}></MainList>
                </div>
            );
        } else {
            return (
                <div className="page-content-wrapper">
                    <Favorites showingStatus={this.props.renderPage} detailedTrigger={this.props.detailedTrigger}></Favorites>
                </div>
            );
        }

    }
}

export default PageContent;