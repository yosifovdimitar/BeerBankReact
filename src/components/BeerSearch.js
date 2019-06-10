import React from "react";

class BeerSearch extends React.Component {
    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.ibuMinRef = React.createRef();
        this.ibuMaxRef = React.createRef();
        this.abvMinRef = React.createRef();
        this.abvMaxRef = React.createRef();
        this.ebcMinRef = React.createRef();
        this.ebcMaxRef = React.createRef();
        this.yearBeforeRef = React.createRef();
        this.yearAfterRef = React.createRef();
        this.SearchContainerRef = React.createRef();
        this.clearValuesRef = React.createRef();

        this.advancedList = {};
        this.advancedSearchShow = "false";
    }
    
    // Hides or shows the advanced inputs.
    advancedSearchClicked = () => {
        if(this.advancedSearchShow === "true"){
            this.SearchContainerRef.current.classList.remove("show-item");
            this.SearchContainerRef.current.classList.add("hide-item");
            this.clearValuesRef.current.classList.remove("show-item");
            this.clearValuesRef.current.classList.add("hide-item");
            this.advancedSearchShow = "false";
        } else {
            this.SearchContainerRef.current.classList.remove("hide-item");
            this.SearchContainerRef.current.classList.add("show-item");
            this.clearValuesRef.current.classList.remove("hide-item");
            this.clearValuesRef.current.classList.add("show-item");
            this.advancedSearchShow = "true";
        }
    }

    // Clears search values.
    clearAllValues = () => {
        this.searchRef.current.value = "";
        this.ibuMaxRef.current.value = "";
        this.ibuMinRef.current.value = "";
        this.abvMaxRef.current.value = "";
        this.abvMinRef.current.value = "";
        this.ebcMaxRef.current.value = "";
        this.ebcMinRef.current.value = "";
        this.yearBeforeRef.current.value = "";
        this.yearAfterRef.current.value = "";
        this.handleChange();
    }

    // Takes user input and sends it to the MainList component.
    handleChange = () => {
        this.advancedList = {
            beer_name: this.searchRef.current.value,
            ibu_lt: this.ibuMaxRef.current.value,
            ibu_lgt: this.ibuMinRef.current.value,
            abv_lt: this.abvMaxRef.current.value,
            abv_lgt: this.abvMinRef.current.value,
            ebc_lt: this.ebcMaxRef.current.value,
            ebc_lgt: this.ebcMinRef.current.value,
            brewed_before: this.yearBeforeRef.current.value.split("-").reverse().join("-"),
            brewed_after: this.yearAfterRef.current.value.split("-").reverse().join("-")
        }
        this.props.searchInput(this.advancedList);
    }

    render() {
        return (
            <div className="search-container">
                <div className="the-beer-bank-title">The Beer Bank</div>
                <div className="the-beer-bank-subtitle">Find your favorite beer here</div>
                <input ref={this.searchRef} type="text" onChange={this.handleChange} className="bb-search-bar-input" placeholder="Search for beer name" onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Search for beer name"} />
                <div className="bb-advanced-search" onClick={this.advancedSearchClicked}>Advanced Search</div>
                <div ref={this.SearchContainerRef} className="bb-advanced-inputs-container hide-item">
                    <div className="bb-input-container">
                        <div className="bb-advanced-input-text">Max IBU</div>
                        <input ref={this.ibuMaxRef} onChange={this.handleChange} className="bb-max-ibu-input" type="number" min="0" max="100" step="1" />
                        <div className="bb-advanced-input-text">Min IBU</div>
                        <input ref={this.ibuMinRef} onChange={this.handleChange} className="bb-min-ibu-input" type="number" min="0" max="100" step="1" />
                    </div>
                    <div className="bb-input-container">
                        <div className="bb-advanced-input-text">Max ABV</div>
                        <input ref={this.abvMaxRef} onChange={this.handleChange} className="bb-max-abv-input" type="number" min="0" max="900" step="1" />
                        <div className="bb-advanced-input-text">Min ABV</div>
                        <input ref={this.abvMinRef} onChange={this.handleChange} className="bb-min-abv-input" type="number" min="0" max="900" step="1" />
                    </div>
                    <div className="bb-input-container">
                        <div className="bb-advanced-input-text">Max EBC</div>
                        <input ref={this.ebcMaxRef} onChange={this.handleChange} className="bb-max-ebc-input" type="number" min="0" max="900" step="1" />
                        <div className="bb-advanced-input-text">Min EBC</div>
                        <input ref={this.ebcMinRef} onChange={this.handleChange} className="bb-min-ebc-input" type="number" min="0" max="900" step="1" />
                    </div>
                    <div className="bb-input-container">
                        <div className="bb-advanced-input-text">Year before</div>
                        <input ref={this.yearBeforeRef} onChange={this.handleChange} className="bb-year-before-input" type="month" />
                        <div className="bb-advanced-input-text">Year after</div>
                        <input ref={this.yearAfterRef} onChange={this.handleChange} className="bb-year-after-input" type="month" />
                    </div>
                </div>
                <div ref={this.clearValuesRef} className="bb-clear-values-container hide-item">
                    <div onClick={this.clearAllValues}>Clear Values</div>
                </div>
            </div>
        );
    }
}

export default BeerSearch;