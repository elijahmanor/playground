import React from "react";
import lux from "lux.js";

import fatherStore from "stores/fatherStore";

import "./ElijahManor.less";

function getState() {
	return fatherStore.getState();
}

export default React.createClass( {
	mixins: [ lux.reactMixin.actionCreator, lux.reactMixin.store ],
	getActions: [ "exampleAction" ],
	stores: {
		listenTo: [ "father" ],
		onChange() {
			this.setState( getState() );
		}
	},
	getDefaultProps() {
		return {};
	},
	getInitialState() {
		return getState();
	},
	render() {
		return (
			<div></div>
		);
	}
} );
