import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get("/orders.json")
            .then(res => {
                console.log(res);

                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log("fetchOrder: ", fetchedOrders);
                this.setState({orders: fetchedOrders});
                this.setState({loading: false});
            })
            .catch(err => {

                this.setState({loading: false});
            });
    }


    render() {

        return (
            <div>
                {this.state.orders.map(order => {
                    return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        customer={order.customer.name}
                        />
                    );
                 })}
            </div>

        );


    }
}

export default withErrorHandler(Orders,axios);