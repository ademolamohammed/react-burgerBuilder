import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls' 
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'


class BurgerBuilder extends Component  {

	state = {	
		purchasing:false,
	}

	componentDidMount() {
		
		this.props.onInitIngredients()
	}



	purchaseHandler = () => {
		
		if (this.props.isAuthenticated){
			this.setState({purchasing:true})
		} else{ 

			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
	}



	updatePurchaseState (ingredients) {
		
		const sum = Object.keys(ingredients).map(igKey=>{
			return ingredients[igKey]

		})
		.reduce((sum,el)=> {
			return sum + el 
		}, 0)
		return sum >0
	}



	purchaseCancelHandler= () => {
		this.setState({purchasing:false})
	}

	purchaseCountinueHandler = () => {

		
		this.props.onInitPurchase();
		this.props.history.push('/checkout')
			
	}


	
	render() {

		const disabledInfo  = {
			...this.props.ings
		}

		for (let key in disabledInfo)  {
			disabledInfo[key] = disabledInfo[key] <= 0}

		

			let orderSummary = null
			
			let burger = this.props.error ? <p> there is an error loading the page </p> : <Spinner />

			if (this.props.ings) {
				 burger = (
						<Aux>
							<Burger ingredients={this.props.ings}/>

							<BuildControls 
							ingredientsAdded={this.props.onIngredientAdded}
							ingredientsRemoved={this.props.onIngredientRemoved}
							disabled={disabledInfo}
							price={this.props.price} 
							isAuth = {this.props.isAuthenticated}
							ordered={this.purchaseHandler} 
							purchaseable={this.updatePurchaseState(this.props.ings)} />
						</Aux>
						)

						orderSummary  =  
										<OrderSummary 
										ingredients={this.props.ings}
										 purchaseCanclled={this.purchaseCancelHandler}
										 purchaseCountinued={this.purchaseCountinueHandler}
										 
										 totalPrice={this.props.price} />
										 

			 }

		

		return(

			<Aux>

				<Modal show={this.state.purchasing} ModalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal >

				{burger}


			</Aux>

			)
	}

}

const mapStateToProps = state => {

return {

	ings : state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	error: state.burgerBuilder.error,
	isAuthenticated: state.auth.token !==  null

}

}




const mapDispatchToProps = dispatch => {

	return {
		onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch (actions.initIngredients()),
		onInitPurchase: () => dispatch (actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

	}
}






export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)); 