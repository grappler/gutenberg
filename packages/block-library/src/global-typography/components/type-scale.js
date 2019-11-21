/**
 * Internal dependencies
 */
import { generateFontSizes } from '../utils';

function TypeScaleItem( { children, fontSize = 16, lineHeight = 1.25 } ) {
	return (
		<li className="wp-block-global-typography__type-scale-list-item">
			<div>{ children }</div>
			<div>
				{ Math.round( fontSize ) }px / { Math.round( fontSize * lineHeight ) }px
			</div>
		</li>
	);
}

export default function TypeScale( {
	fontSizeBase,
	lineHeightBase,
	lineHeightHeading,
	typeScale,
} ) {
	const fontSizes = generateFontSizes( fontSizeBase, typeScale );

	return (
		<div className="wp-block-global-typography__type-scale">
			<ul className="wp-block-global-typography__type-scale-list">
				<TypeScaleItem
					fontSize={ fontSizes.h1 }
					lineHeight={ lineHeightHeading }
				>
					<h1>Heading One</h1>
				</TypeScaleItem>
				<TypeScaleItem
					fontSize={ fontSizes.h2 }
					lineHeight={ lineHeightHeading }
				>
					<h2>Heading Two</h2>
				</TypeScaleItem>
				<TypeScaleItem
					fontSize={ fontSizes.h3 }
					lineHeight={ lineHeightHeading }
				>
					<h3>Heading Three</h3>
				</TypeScaleItem>
				<TypeScaleItem
					fontSize={ fontSizes.h4 }
					lineHeight={ lineHeightHeading }
				>
					<h4>Heading Four</h4>
				</TypeScaleItem>
				<TypeScaleItem
					fontSize={ fontSizes.h5 }
					lineHeight={ lineHeightHeading }
				>
					<h5>Heading Five</h5>
				</TypeScaleItem>
				<TypeScaleItem
					fontSize={ fontSizes.h6 }
					lineHeight={ lineHeightHeading }
				>
					<h6>Heading Six</h6>
				</TypeScaleItem>
				<TypeScaleItem
					fontSize={ fontSizes.body }
					lineHeight={ lineHeightBase }
				>
					<p>Body</p>
				</TypeScaleItem>
			</ul>
		</div>
	);
}
