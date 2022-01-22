import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import base, { firebaseApp } from "../base";
import firebase from 'firebase';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        addFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    state = {
        uid: null,
        owner: null
    };

    // on page refresh check if firebase is already authenticated
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }

    authHandler = async (authData) => {
        // look up current store in firebase database
        const store = await base.fetch(this.props.storeId, {
            context: this
        });
        // claim it if there is no current owner - save to firebase
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // set state of inventory to reflect current user
        // set state that is local to one component if it doesn't need to be accessed by any other component
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        console.log("Logging out");
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render () {
        const logout = <button onClick={this.logout}>Log Out</button>

        // check if not logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        // check if not owner of store
        if (this.state.uid !== this.state.owner){
            return <div>Unauthorized inventory access<br />{logout}</div>
        }

        // owner sees inventory form
        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                    <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} />
                )}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;