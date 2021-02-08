import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Listuser';
import Adduser from './Adduser';
import ViewUser from './ViewUser';
const Router = () => {
	return (
		<>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/adduser" component={Adduser}></Route>
				<Route exact path="/viewuser" component={ViewUser}></Route>
				<Route exact path="/adduser/:id" component={Adduser}></Route>
			</Switch>
		</>
	);
};
export default Router;
