import React from 'react';
import classes from './Order.css';

const order = (props) => {

    // let transformedIngredients = Object.keys(props.ingredients)
    // .map(igKey => {
    //     return [...Array(props.ingredients[igKey])].map((_, i) => {
    //         return <BurgerIngredient key={igKey + i} type={igKey} />;
    //     });
    // })
    // .reduce((arr, el) => {
    //     return arr.concat(el);
    // }, []);
    // alternative

    const ingredients =[];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => (
        <span key={ig.name} 
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
        >
        {ig.name} ({ig.quantity})
        </span>
    ));

    return (
    <div className={classes.Order}>
        <p>Customer Name: {props.customer} </p>
        <p>Ingredients: {ingredientOutput} </p>
        <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong> </p>
    </div>
    );
}

export default order;