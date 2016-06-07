import elijahManorFactory from "inject!ElijahManor";

describe( "ElijahManor", () => {
	let component, ElijahManor, dependencies, actions;

	beforeEach( () => {
		actions = {
			exampleAction: sinon.stub()
		};

		lux.customActionCreator( actions );

		dependencies = {
			"stores/fatherStore": {
				getState: sinon.stub().returns( {} )
			}
		};

		ElijahManor = elijahManorFactory( dependencies );
	} );

	function render( props = {} ) {
		component = ReactUtils.renderIntoDocument( <ElijahManor { ...props } /> );
	}

	afterEach( () => {
		Object.keys( actions ).forEach( key => delete lux.actions[ key ] );

		if ( component ) {
			ReactDOM.unmountComponentAtNode( ReactDOM.findDOMNode( component ).parentNode );
		}
	} );

	describe( "when handling props", () => {
		it( "should have default props", () => {
			render();
			component.props.should.eql( {} );
		} );
	} );

	describe( "when handling state", () => {
		it( "should have initial state", () => {
			render();
			component.state.should.eql( {} );
		} );
	} );

	describe( "when rendering", () => {
		it( "should render properly", () => {
			render();
			ReactDOM.findDOMNode( component ).nodeName.toLowerCase().should.equal( "div" );
		} );
	} );

	describe( "when handling clicks", () => {
		it( "should trigger the example action", () => {
			render();
			component.exampleAction();
			lux.actions.exampleAction.should.be.calledOnce;
		} );
	} );
} );
