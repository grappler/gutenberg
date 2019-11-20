/**
 * Internal dependencies
 */
import { config } from './config';

const defaultConfig = {
	typography: {
		fontFamilyBase:
			'NonBreakingSpaceOverride, "Hoefler Text", Garamond, "Times New Roman", serif',
		fontFamilyHeading:
			'"Inter var", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif',
		fontSizeH1: '48px',
		fontSizeH2: '40px',
		fontSizeH3: '31px',
		fontSizeH4: '25px',
		fontSizeH5: '20px',
		fontSizeH6: '16px',
		lineHeightBase: 1.5,
		lineHeightHeading: 1.25,
	},
	button: {
		backgroundColor: '#32373c',
		padding: '12px 24px',
		textColor: 'white',
	},
};

config.apply( defaultConfig );

window.bravas = {
	config,
};

export * from './config';
