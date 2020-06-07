import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0

    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsObj = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price') {
                price = +param[1];
            }else{
                ingredientsObj[param[0]] = +param[1];
            }
            
        }

        console.log("inside chekcout : " + JSON.stringify(ingredientsObj));

        this.setState({
            ingredients: ingredientsObj,
            totalPrice: price
        });

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }


    render() {

        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />

                {/* <Route path={this.props.match.path + "/contact-data"} 
                       component={ContactData}
                /> */}
                <Route path={this.props.match.path + "/contact-data"} 
                       render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        );

    }
}



export default Checkout;
