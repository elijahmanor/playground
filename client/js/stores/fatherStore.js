import lux from "lux.js";

export default new lux.Store( {
	namespace: "father",
	state: {},
	handlers: {
		noop() {}
	},
	getExample() {
		const state = this.getState();
		return state;
	}
} );
