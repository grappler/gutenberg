/**
 * Internal dependencies
 */
import ColorPalette from './color-palette';
import Section from '../../global-typography/components/section';

export default function Markup( { color } ) {
	return (
		<Section title="Colors">
			<ColorPalette color={ color } />
		</Section>
	);
}
