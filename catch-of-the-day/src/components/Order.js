import React from "react";
import { formatPrice} from '../helpers' ;
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        deleteFromOrder: PropTypes.func
    }

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const quantity = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key, 
            timeout: { enter: 250, exit: 250}
        }

        // make sure fish is loaded before generating order
        if (!fish) return null;
        if(!isAvailable){
            return (
                <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250}}>
                    <li key={key}>
                        {fish ? fish.name : 'Fish'} is no longer available :(
                    </li>
                </CSSTransition>
            )
        }

        return ( 
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            {/* classNames creates count-enter, count-exit, count-enter-active, etc */}
                            <CSSTransition classNames="count" key={quantity} timeout={{enter: 250, exit: 250}}>
                                <span>{quantity}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(quantity * fish.price)}
                        <button onClick={() => this.props.deleteFromOrder(key)}>Delete</button>
                    </span>
                </li>
            </CSSTransition>
        )
    }

    render () {
        const orderIds = Object.keys(this.props.order);
        const totalCost = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const quantity = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (quantity * fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2 className="order">Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>           
                <div className="total">
                    Total:
                    <strong>{formatPrice(totalCost)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;