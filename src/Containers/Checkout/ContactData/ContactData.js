import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinnger from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {

    
    state = {
        name: '',
        email:'',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'newNynga',
                address: {
                    street: 'Noida',
                    pincode: '201301',
                    country: 'India'
                },
                email: 'newNyng@gai.com'
            },
            deliveryMethod: 'fastest'

        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });

    }

    render() {

        let form = (
            <form>
                    <input type="text" name="name" className={classes.Input} placeholder="Your Name" />
                    <input type="email" name="email" className={classes.Input} placeholder="Your Email" />
                    <input type="text" name="street" className={classes.Input} placeholder="Street" />
                    <input type="text" name="postalCode" className={classes.Input} placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>

                </form>
        );
        if(this.state.loading){
            form = <Spinnger />
        }


        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact details:</h4>
                {form}
            </div>
        );

    }
}


export default ContactData;