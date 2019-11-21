/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose, withInstanceId } from '@wordpress/compose';
import {
	InspectorControls,
	PanelColorSettings,
	withColors,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Markup from './components/markup';

function GlobalColorEdit( {
	attributes,
	backgroundColor,
	setBackgroundColor,
	className,
} ) {
	const {
		title,
	} = attributes;

	const handleOnSetBackground = ( newBackground ) => {
		setBackgroundColor( newBackground );
	};

	return (
		<div className={ className } title={ title }>
			<Markup { ...{ color: backgroundColor.color } } />
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Palette' ) }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: handleOnSetBackground,
							label: __( 'Color' ),
						},
					] }
				/>
			</InspectorControls>
		</div>
	);
}

export default compose( [
	withInstanceId,
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( GlobalColorEdit );
