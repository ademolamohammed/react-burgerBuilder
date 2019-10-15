import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const CheckoutSummary =(props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1> we hope it taste well ! </h1>
			<div style={{width:'100%',height:'300px', margin:'auto'}}>
			  <Burger ingredients={props.ingredients}/>

			</div>
			<Button clicked={props.checkoutCancelled} btnType='Danger'> CANCEL </Button>
			<Button clicked={props.checkoutCountinued} btnType='Success'> COUNTINUE </Button>
		</div>


		)
}

export default CheckoutSummary