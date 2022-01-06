import React from 'react';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    myInput = React.createRef();

    // bind the method to the component so that `this` references the component
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    // or create custom methods as a property, set to an arrow function
    // to access `this` inside of a custom method use this syntax
    goToStore = (e) => {

        // stop form from submitting
        e.preventDefault();

        // get text from input without touching DOM
        const storeName = this.myInput.current.value;

        // change page URL with push state (does not refresh page)
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return (
            <React.Fragment>
                {/* React Fragment allows for multiple tags without a div wrapper */}
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Select A Store</h2>
                    <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} />
                    <button type="submit">Visit Store &gt;</button>
                </form>
            </React.Fragment>

        )
    }
}

export default StorePicker;