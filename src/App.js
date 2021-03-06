import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import Aux from './hoc/Auxiliary/auxiliary'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import {connect } from 'react-redux'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'


class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup()
  }

  render() {
  let routes = (
    <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/' />
    </Switch>
    )

  if (this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path='/checkout'  component={Checkout}/>
              <Route path='/orders'  component={Orders}/>  
              <Route path='/' exact component={BurgerBuilder}/>
              <Route path='/auth' component={Auth} />
               <Route path='/logout' exact component={Logout}/>
               <Redirect to='/' />
           </Switch>
        )
  }

    return (
      <Aux>
        <Layout>
        
          {routes} 
        
        </Layout>
      </Aux>
    );
  
}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch (actions.authCheckState())
  }
}

export default withRouter(connect (mapStateToProps,mapDispatchToProps) (App));

