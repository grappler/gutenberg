/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { config } from '@wordpress/bravas';
import { __ } from '@wordpress/i18n';
import { useEffect, useCallback } from '@wordpress/element';
import { compose, withInstanceId } from '@wordpress/compose';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	withFallbackStyles,
} from '@wordpress/components';
import {
	__experimentalGradientPickerPanel,
	__experimentalUseGradient,
	ContrastChecker,
	InspectorControls,
	PanelColorSettings,
	RichText,
	URLInput,
	withColors,
} from '@wordpress/block-editor';

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;
	const textColorValue = textColor && textColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode =
		! textColorValue && node ?
			node.querySelector( '[contenteditable="true"]' ) :
			null;
	return {
		fallbackBackgroundColor:
			backgroundColorValue || ! node ?
				undefined :
				getComputedStyle( node ).backgroundColor,
		fallbackTextColor:
			textColorValue || ! textNode ?
				undefined :
				getComputedStyle( textNode ).color,
	};
} );

const NEW_TAB_REL = 'noreferrer noopener';
const MIN_BORDER_RADIUS_VALUE = 0;
const MAX_BORDER_RADIUS_VALUE = 50;
const INITIAL_BORDER_RADIUS_POSITION = 5;

function BorderPanel( { borderRadius = '', setAttributes } ) {
	const setBorderRadius = useCallback(
		( newBorderRadius ) => {
			setAttributes( { borderRadius: newBorderRadius } );
		},
		[ setAttributes ]
	);
	return (
		<PanelBody title={ __( 'Border Settings' ) }>
			<RangeControl
				value={ borderRadius }
				label={ __( 'Border Radius' ) }
				min={ MIN_BORDER_RADIUS_VALUE }
				max={ MAX_BORDER_RADIUS_VALUE }
				initialPosition={ INITIAL_BORDER_RADIUS_POSITION }
				allowReset
				onChange={ setBorderRadius }
			/>
		</PanelBody>
	);
}

function CustomStyles( { applyGlobally, padding, shadow, setAttributes } ) {
	const setPadding = useCallback(
		( newPadding ) => {
			setAttributes( { padding: newPadding } );
			if ( applyGlobally ) {
				configSet( 'button.padding', newPadding );
			}
		},
		[ applyGlobally, setAttributes ]
	);
	const setShadow = useCallback(
		( newShadow ) => {
			setAttributes( { shadow: newShadow } );
			if ( applyGlobally ) {
				configSet( 'button.shadow', newShadow );
			}
		},
		[ applyGlobally, setAttributes ]
	);

	const initialOpen = true;

	return (
		<PanelBody initialOpen={ initialOpen } title={ __( 'Custom Styles' ) }>
			<TextControl
				placeholder="12px 24px"
				label={ __( 'Padding' ) }
				value={ padding }
				onChange={ setPadding }
				autoComplete="off"
			/>
			<RangeControl
				value={ shadow }
				label={ __( 'Shadow' ) }
				min={ 0 }
				max={ 24 }
				initialPosition={ 0 }
				allowReset
				onChange={ setShadow }
			/>
		</PanelBody>
	);
}

function configSet( props, value ) {
	if ( value !== undefined ) {
		config.set( props, value );
	}
}

function ButtonEdit( {
	attributes,
	backgroundColor,
	textColor,
	setBackgroundColor,
	setTextColor,
	fallbackBackgroundColor,
	fallbackTextColor,
	setAttributes,
	className,
	isSelected,
} ) {
	const {
		borderRadius,
		linkTarget,
		padding,
		placeholder,
		rel,
		shadow,
		text,
		title,
		url,
		applyGlobally = true,
	} = attributes;

	const setBravasVariables = () => {
		configSet( 'button.backgroundColor', backgroundColor.color );
		configSet( 'button.textColor', textColor.color );
		configSet( 'button.padding', padding );
		configSet( 'button.shadow', shadow );
	};

	const setBravasVariablesGlobally = () => {
		if ( applyGlobally ) {
			setBravasVariables();
		}
	};

	useEffect( () => {
		setBravasVariablesGlobally();
	}, [ setBravasVariablesGlobally ] );

	const onSetLinkRel = useCallback(
		( value ) => {
			setAttributes( { rel: value } );
		},
		[ setAttributes ]
	);

	const onToggleOpenInNewTab = useCallback(
		( value ) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		},
		[ rel, setAttributes ]
	);

	const {
		gradientClass,
		gradientValue,
		setGradient,
	} = __experimentalUseGradient();

	const handleSetTextColor = ( newTextColor ) => {
		if ( applyGlobally ) {
			configSet( 'button.textColor', newTextColor );
		}

		setTextColor( newTextColor );
	};

	const handleOnSetBackground = ( newBackground ) => {
		setAttributes( {
			customGradient: undefined,
		} );
		setBackgroundColor( newBackground );
		if ( applyGlobally ) {
			configSet( 'button.backgroundColor', newBackground );
		}
	};

	const handleOnSetGradient = ( newGradient ) => {
		setGradient( newGradient );
		if ( applyGlobally ) {
			config.apply( {
				button: {
					backgroundColor: newGradient,
				},
			} );
		}
		setBackgroundColor();
	};

	let localStyles = {};

	if ( ! applyGlobally ) {
		localStyles = {
			'--bravas-button-backgroundColor': gradientValue || backgroundColor.color,
			'--bravas-button-boxShadow': shadow,
			'--bravas-button-padding': padding,
			'--bravas-button-textColor': textColor.color,
		};
	}

	const classes = classnames( 'wp-block-button__link', {
		'has-background': backgroundColor.color || gradientValue,
		[ backgroundColor.class ]: ! gradientValue && backgroundColor.class,
		'has-text-color': textColor.color,
		[ textColor.class ]: textColor.class,
		[ gradientClass ]: gradientClass,
		'no-border-radius': borderRadius === 0,
	} );

	return (
		<div className={ className } title={ title }>
			<RichText
				placeholder={ placeholder || __( 'Add text…' ) }
				value={ text }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				withoutInteractiveFormatting
				className={ classes }
				style={ {
					...localStyles,
					borderRadius,
					background: 'var(--bravas-button-backgroundColor)',
					padding: 'var(--bravas-button-padding)',
					color: 'var(--bravas-button-textColor)',
				} }
			/>
			<URLInput
				label={ __( 'Link' ) }
				className="wp-block-button__inline-link"
				value={ url }
				/* eslint-disable jsx-a11y/no-autofocus */
				// Disable Reason: The rule is meant to prevent enabling auto-focus, not disabling it.
				autoFocus={ false }
				/* eslint-enable jsx-a11y/no-autofocus */
				onChange={ ( value ) => setAttributes( { url: value } ) }
				disableSuggestions={ ! isSelected }
				isFullWidth
				hasBorder
			/>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: handleOnSetBackground,
							label: __( 'Background Color' ),
						},
						{
							value: textColor.color,
							onChange: handleSetTextColor,
							label: __( 'Text Color' ),
						},
					] }
				>
					<ContrastChecker
						{ ...{
							// Text is considered large if font size is greater or equal to 18pt or 24px,
							// currently that's not the case for button.
							isLargeText: false,
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackBackgroundColor,
							fallbackTextColor,
						} }
					/>
				</PanelColorSettings>
				<__experimentalGradientPickerPanel
					onChange={ handleOnSetGradient }
					value={ gradientValue }
				/>
				<CustomStyles
					applyGlobally={ applyGlobally }
					padding={ padding }
					setAttributes={ setAttributes }
					shadow={ shadow }
				/>
				<BorderPanel
					borderRadius={ borderRadius }
					setAttributes={ setAttributes }
				/>
				<PanelBody title={ __( 'Link settings' ) }>
					<ToggleControl
						label={ __( 'Open in new tab' ) }
						onChange={ onToggleOpenInNewTab }
						checked={ linkTarget === '_blank' }
					/>
					<TextControl
						label={ __( 'Link rel' ) }
						value={ rel || '' }
						onChange={ onSetLinkRel }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}

export default compose( [
	withInstanceId,
	withColors( 'backgroundColor', { textColor: 'color' } ),
	applyFallbackStyles,
] )( ButtonEdit );
