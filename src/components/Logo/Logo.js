import React from 'react'
import BurgerLogo from '../../assests/images/burger.png'
import classes from './Logo.css'


const logo = (props) => (
	<div className={classes.Logo} style={{ height:props.height}} > 
		<img src={BurgerLogo} alt='markburger'/>

	</div>

)


export default logo   