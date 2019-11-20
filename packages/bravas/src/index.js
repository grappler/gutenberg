/**
 * Internal dependencies
 */
import { config } from './config';

const defaultThemeConfig = {
	typography: {
		fontSizeH1: '48px',
		fontSizeH2: '40px',
		fontSizeH3: '31px',
		fontSizeH4: '25px',
		fontSizeH5: '20px',
		fontSizeH6: '16px',
		lineHeightHeading: 1.25,
		lineHeight: 1.5,
	},
	button: {
		backgroundColor: '#32373c',
		padding: '12px 24px',
		textColor: 'white',
	},
};

config.apply( defaultThemeConfig );

window.bravas = {
	config,
};

export * from './config';
