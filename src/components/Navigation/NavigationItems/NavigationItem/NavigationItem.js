import React from 'react'
import classes from './NavigationItem.css'
import {NavLink} from 'react-router-dom'



const navigationItem = (props) => (

<div>
 	<ul>
 		<li className={classes.NavigationItem}> 
 		<NavLink to={props.link}
 		 exact={props.exact}
 		activeClassName={classes.active}> {props.children} </NavLink>  </li>

 	</ul>
 	</div>

) 

export default navigationItem