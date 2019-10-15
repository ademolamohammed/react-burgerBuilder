import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './Buildcontrol/BuildControl'



const controls= [

	{label:'Salad', type:'salad'},
	{label:'Bacon', type:'bacon'},
	{label:'Cheese', type:'cheese'},
	{label:'Meat', type:'meat'}
]

const buildcontrols = (props) => (
 	

 		<div className={classes.BuildControls}> 
 		 <p> current price: {props.price.toFixed(2) }</p>
 		 {controls.map(ctrl=> (
 		 	<BuildControl 
 		 	key={ctrl.label} 
 		 	label={ctrl.label} 
 		 	  added={()=> props.ingredientsAdded (ctrl.type)}
 		 	  removed= {()=> props.ingredientsRemoved (ctrl.type)}
 		 	  disabled={props.disabled[ctrl.type]} />
 		 	))}

 		 	<button 
 		 	 disabled={!props.purchaseable}
 		 	 onClick={props.ordered}
 		 	className={classes.OrderButton}> {props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'} </button>
 		
 		</div>

)




export default buildcontrols; 