import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'




export const addIngredient = (name) => {

	return {
		type:actionTypes.ADD_INGREDIENT,
		ingredientName: name

	}
}



export const removeIngredient = (name) => {

	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name

	}
}


// this is our synchronous code and will get to the reducer to manipulate the state
export const setIngredients = (ingredients) => {

	return{

		type:actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
}


// this is our synchronous code and will get to the reducer to manipulate the state
export const fetchIngredientsFailed = () => {
	return {
		type:actionTypes.FETCH_INGREDIENTS_FAILED
	}
}



//this is our asynchronous code and will never get to the reducer
export const initIngredients = () => {
	return dispatch => {
		axios.get('https://react-burger-real.firebaseio.com/ingredients.json')
		.then(response=> {
			dispatch(setIngredients(response.data))
		}).catch(error => {
			dispatch(fetchIngredientsFailed())
		})
	}
}