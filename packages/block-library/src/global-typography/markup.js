/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { generateFontSizes } from './utils';

function Section( props ) {
	const { className, ...restProps } = props;
	const classes = classnames(
		'wp-block-global-typography__section',
		className
	);

	return <div { ...restProps } className={ classes } />;
}

function Header( { children } ) {
	return (
		<div className="wp-block-global-typography__header">
			<div className="wp-block-global-typography__title">{ children }</div>
		</div>
	);
}

function Alphabet() {
	return (
		<p>
			<strong>ABCDEFGHIJKLMNOPQRSTUVWXYZ</strong>
			<br />
			abcdefghijklmnopqrstuvwxyz
			<br />
			{ '1234567890!@#$%^&*()_+=' }
			<br />
		</p>
	);
}

function TypeScaleItem( { children, fontSize, lineHeight } ) {
	return (
		<li className="wp-block-global-typography__type-scale-list-item">
			<div>{ children }</div>
			<div>
				{ Math.round( fontSize ) }px / { Math.round( fontSize * lineHeight ) }px
			</div>
		</li>
	);
}

function TypeScale( {
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

export default function GlobalTypographyMarkup( {
	fontSizeBase,
	typeScale,
	lineHeightBase,
	lineHeightHeading,
} ) {
	return (
		<div className="wp-block-global-typography">
			<Section className="wp-block-global-typography__headings">
				<Header>Type Scale</Header>
				<TypeScale
					{ ...{
						fontSizeBase,
						lineHeightBase,
						lineHeightHeading,
						typeScale,
					} }
				/>
			</Section>
			<Section>
				<Header>Body</Header>
				<Alphabet />
			</Section>
			<Section>
				<Header>Font Example</Header>
				<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
				<p>
					Duis blandit nulla lorem, vitae elementum lacus tempor sed.
					Mauris iaculis est et ligula fermentum, efficitur bibendum
					leo volutpat. Proin sagittis commodo arcu, vel pharetra
					mauris luctus ut. Proin condimentum a lorem et varius. Nam
					congue nec magna eget viverra. Etiam dignissim orci dui, in
					lobortis sapien volutpat quis. Nulla a tristique orci. Nam
					maximus, sapien sed mattis egestas, elit magna aliquam
					ligula, in pharetra urna libero non ligula.
				</p>
				<h3>Maecenas tincidunt pulvinar nibh</h3>
				<p>
					Proin mauris lectus, feugiat sed est at, interdum efficitur
					nulla. Nullam odio libero, efficitur quis volutpat sed,
					pellentesque finibus felis. Nam sed est luctus, tempor nulla
					sit amet, lobortis elit. Sed ut molestie purus. Maecenas vel
					est dolor. Sed sodales elementum mi sed pharetra. Mauris
					eget purus id erat convallis dapibus.
				</p>
			</Section>
		</div>
	);
}
