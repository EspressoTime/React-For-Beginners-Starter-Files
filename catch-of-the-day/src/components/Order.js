import React from "react";
import { formatPrice} from '../helpers' 

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const quantity = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';

        // make sure fish is loaded before generating order
        if (!fish) return null;
        if(!isAvailable){
            return <li key={key}>
                {fish ? fish.name : 'Fish'} is no longer available :(
            </li>
        }

        return <li key={key}>
            {quantity}lbs {fish.name}
            {formatPrice(quantity * fish.price)}
        </li>
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
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>           
                <div className="total">
                    Total:
                    <strong>{formatPrice(totalCost)}</strong>
                </div>

            </div>
        )
    }
}

export default Order;