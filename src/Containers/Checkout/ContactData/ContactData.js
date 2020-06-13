import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {


    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'pincode',
                },
                value:'',
                validation: {
                    required: true,
                    minlength: 6,
                    maxlength: 10,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country',
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email',
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest', displayValue:'fastest'}, 
                        {value:'cheapest', displayValue:'cheapest'}
                    ],
                },
                value:'fastest',
                validation:{},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    checkValidity (value, rules){
        let isValid = true;

        // if(!rules){
        //     return true;
        // }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        // other rules like for minLength
        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid;
        }
        if(rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({ loading: true });
        const formData = {};

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }



        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDate: formData

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

    inputChangedHandler = (event, inputIdentifier) => {
       // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] 
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //console.log(updatedFormElement);

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            console.log(updatedOrderForm[inputIdentifier]);
            console.log(updatedOrderForm[inputIdentifier].valid);
            
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        console.log(formIsValid)

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    render() {
        const formElementAry = [];
        for(let key in this.state.orderForm){
            formElementAry.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}> 
                {formElementAry.map(formElement => (
                    <Input key={formElement.id} elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                {/* <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postalCode" placeholder="Postal Code" /> */}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>

            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }


        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details:</h4>
                {form}
            </div>
        );

    }
}


export default ContactData;