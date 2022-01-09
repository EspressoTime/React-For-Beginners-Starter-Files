import React from "react";
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"
import sampleFishes from '../sample-fishes'
import Fish from "./Fish"

class App extends React.Component {
    // set initial state in constructor or property
    state = {
        // can be any data type
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        // copy existing state to not modfiy/mutate state directly
        const fishes = {...this.state.fishes};
        // add new item to variable
        fishes[`fish${Date.now()}`] = fish;
        // set new object to state
        this.setState({fishes: fishes});
    };

    loadSampleFishes = () => {
        this.setState( { fishes: sampleFishes });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)}
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;