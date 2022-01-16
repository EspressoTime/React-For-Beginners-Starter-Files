import React from "react";
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"
import sampleFishes from '../sample-fishes'
import Fish from "./Fish"
import base from '../base'

class App extends React.Component {
    // set initial state in constructor or property
    state = {
        // can be any data type
        fishes: {},
        order: {}
    };

    componentDidMount() {
        // first reinstate from localStorage
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    addFish = (fish) => {
        // copy existing state to not modfiy/mutate state directly
        const fishes = {...this.state.fishes};
        // add new item to variable
        fishes[`fish${Date.now()}`] = fish;
        // set new object to state
        this.setState({fishes: fishes});
    };

    updateFish = (key, updatedFish) => {
        // copy current state
        const fishes = {...this.state.fishes};
        // update state
        fishes[key] = updatedFish;
        // set to state
        this.setState({ fishes: fishes });

    }

    loadSampleFishes = () => {
        this.setState( { fishes: sampleFishes });
    }

    addToOrder = (key) => {
        // copy existing state
        const order = {...this.state.order};
        // add or update number in order
        order[key] = order[key] + 1 || 1;
        // setState to update state object
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;