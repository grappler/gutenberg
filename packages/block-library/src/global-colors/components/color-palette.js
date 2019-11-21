/**
 * External dependencies
 */
import colorUtil from 'tinycolor2';

function ColorPaletteItem( { color, index } ) {
	const isLight = colorUtil( color ).isLight();
	const textColor = isLight ? 'black' : 'white';

	const style = {
		backgroundColor: color,
		color: textColor,
		transitionDelay: `${ index * 20 }ms`,
	};

	const colorIndex = ( index + 1 ) * 100;

	return (
		<div className="wp-block-global-colors__palette-item" style={ style }>
			<div>{ color }</div>
			<div>{ colorIndex }</div>
		</div>
	);
}

export default function ColorPalette( { color } ) {
	const shades = generateColorShades( color || '#ccc' );

	return (
		<div className="wp-block-global-colors__palette">
			{ shades.map( ( shade, index ) => (
				<ColorPaletteItem color={ shade } key={ index } index={ index } />
			) ) }
		</div>
	);
}

function generateColorShades( color ) {
	const color100 = colorUtil( color )
		.lighten( 10 )
		.toString();
	const color200 = colorUtil( color )
		.lighten( 5 )
		.toString();
	const color300 = colorUtil( color ).toString();
	const color400 = colorUtil( color )
		.darken( 5 )
		.toString();
	const color500 = colorUtil( color )
		.darken( 10 )
		.toString();

	const shades = [ color100, color200, color300, color400, color500 ];

	return shades;
}
