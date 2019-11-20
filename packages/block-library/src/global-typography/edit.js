/**
 * External dependencies
 */
import { isUndefined } from 'lodash';

/**
 * WordPress dependencies
 */
import { config } from '@wordpress/bravas';
import { compose } from '@wordpress/compose';
import { PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Markup from './markup';

function GlobalTypographyEdit( { attributes, setAttributes, className } ) {
	const {
		fontSizeBase,
		lineHeight,
		lineHeightHeading,
		typeScale,
	} = attributes;

	const updateAttribute = ( prop, value ) => {
		configSet( `typography.${ prop }`, value );
		setAttributes( { [ prop ]: value } );
	};

	return (
		<div className={ className }>
			<Markup />
			<InspectorControls>
				<FontSizePanel
					{ ...{
						fontSizeBase,
						lineHeight,
						lineHeightHeading,
						typeScale,
						updateAttribute,
					} }
				/>
			</InspectorControls>
		</div>
	);
}

function FontSizePanel( {
	fontSizeBase,
	lineHeight,
	lineHeightHeading,
	typeScale,
	updateAttribute,
} ) {
	const updateHeadingSizes = ( headingSizes ) => {
		const headings = Object.keys( headingSizes );
		headings.forEach( ( heading ) => {
			const size = headingSizes[ heading ];
			configSet(
				`typography.fontSize${ heading.toUpperCase() }`,
				`${ size }px`
			);
		} );
	};

	const updateFontSize = ( value ) => {
		updateAttribute( 'fontSizeBase', value );
		const headingSizes = generateHeadingSizes( value, typeScale );
		updateHeadingSizes( headingSizes );
	};
	const updateLineHeight = ( value ) => {
		updateAttribute( 'lineHeight', value );
	};
	const updateLineHeightHeading = ( value ) => {
		updateAttribute( 'lineHeightHeading', value );
	};
	const updateTypeScale = ( value ) => {
		updateAttribute( 'typeScale', value );
		const headingSizes = generateHeadingSizes( fontSizeBase, value );
		updateHeadingSizes( headingSizes );
	};

	return (
		<PanelBody>
			<RangeControl
				label="Font Size"
				onChange={ updateFontSize }
				value={ fontSizeBase }
				min={ 8 }
				max={ 30 }
				initialPosition={ 16 }
			/>
			<RangeControl
				label="Type Scale"
				onChange={ updateTypeScale }
				value={ typeScale }
				min={ 1 }
				max={ 3 }
				initialPosition={ 1.4 }
				step={ 0.05 }
			/>
			<RangeControl
				label="Heading Line Height"
				onChange={ updateLineHeightHeading }
				value={ lineHeightHeading }
				min={ 0.5 }
				max={ 2 }
				initialPosition={ 1.25 }
				step={ 0.1 }
			/>
			<RangeControl
				label="Line Height"
				onChange={ updateLineHeight }
				value={ lineHeight }
				min={ 0 }
				max={ 2 }
				initialPosition={ 1.5 }
				step={ 0.1 }
			/>
		</PanelBody>
	);
}

function configSet( props, value ) {
	if ( value !== undefined ) {
		config.set( props, value );
	}
}

function valueOf( prop, fallback ) {
	return ! isUndefined( prop ) ? prop : fallback;
}

function generateHeadingSizes( fontSize = 16, typeScale = 1.25 ) {
	return {
		h1: fontSize * Math.pow( typeScale, 5 ),
		h2: fontSize * Math.pow( typeScale, 4 ),
		h3: fontSize * Math.pow( typeScale, 3 ),
		h4: fontSize * Math.pow( typeScale, 2 ),
		h5: fontSize * Math.pow( typeScale, 1 ),
		h6: fontSize,
	};
}

function withDefaults( WrappedComponent ) {
	return ( props ) => {
		const { attributes, ...restProps } = props;
		const {
			fontSizeBase,
			lineHeight,
			lineHeightHeading,
			typeScale,
			...otherAttributes
		} = attributes;

		const enhancedAttributes = {
			fontSizeBase: valueOf( fontSizeBase, 16 ),
			lineHeight: valueOf( lineHeight, 1.5 ),
			lineHeightHeading: valueOf( lineHeightHeading, 1.25 ),
			typeScale: valueOf( typeScale, 1.25 ),
			...otherAttributes,
		};

		return (
			<WrappedComponent { ...restProps } attributes={ enhancedAttributes } />
		);
	};
}

export default compose( [ withDefaults ] )( GlobalTypographyEdit );
