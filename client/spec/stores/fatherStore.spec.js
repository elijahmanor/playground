import fatherStoreFactory from "inject!stores/fatherStore";

describe( "father store", () => {
	let fatherStore;

	beforeEach( () => {
		fatherStore = fatherStoreFactory( {} );
	} );

	afterEach( () => {
		fatherStore.dispose();
	} );

	describe( "when initializing", () => {
		it( "should add default state", () => {
			fatherStore.getState().should.eql( { } );
		} );
	} );

	describe( "handlers", () => {
		describe( "when handling noop", () => {
			it( "should not edit the state", () => {
				lux.publishAction( "noop" );
				const state = fatherStore.getState();
				state.should.be.empty;
			} );
		} );
	} );

	describe( "helper functions", () => {
		it( "should provide an example getter", () => {
			fatherStore.getExample().should.be.empty;
		} );
	} );
} );
