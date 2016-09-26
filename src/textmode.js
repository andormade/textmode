import TextPage from './textPage';
import SpriteFont from 'spritefont';
import Promise from 'core-js/library/es6/promise';

/**
 * Rendering layer
 *
 *
 */
export default class TextMode extends TextPage {
	/**
	 * Constructor
	 *
	 * @returns {void}
	 */
	constructor(options) {
		super(options);
		this.canvas = options.canvas;
		this.characterSets = options.characterSets;
		this.colors = options.colors;
	}

	renderSpriteFonts() {
		this.areSpriteFontsRendered = false;
		this.spriteFonts = [];
		let spriteFontPromises = [];
		this.characterSets.forEach((characterSet) => {
			let spriteFont = new SpriteFont(
				characterSet, 16, 8, this.colors, this.colors
			);
			spriteFontPromises.push(spriteFont.render());
			this.spriteFonts.push(spriteFont);
		}, this);

		return Promise.race(spriteFontPromises).then(() => {
			this.areSpriteFontsRendered = true;
		});
	}

	/**
	 * Renders the page.
	 *
	 * @returns {void}
	 */
	render() {
		if (this.areSpriteFontsRendered) {
			this.renderSync();
		}
		else {
			this.renderSpriteFonts().then(() => {
				this.renderSync();
			});
		}
	}

	/**
	 * Renders the page.
	 *
	 * @returns {void}
	 */
	renderSync() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		for (var row = 0; row < this.rows; row++) {
			for (var col = 0; col < this.text[row].length; col++) {
				this.renderCharacter(row, col);
			}
		}
	}

	/**
	 * Renders the character at the sepcified coordinates.
	 *
	 * @returns {void}
	 */
	renderCharacter(row, col) {
		var spriteFont = this.spriteFonts[this.getCharacterSet(row, col)];

		spriteFont.letMeDrawIt(
			this.context,
			this.getCharacter(row, col),
		 	this.getBackgroundHexColor(row, col),
		 	this.getForegroundHexColor(row, col),
			spriteFont.characterWidth * col,
			spriteFont.characterHeight * row
		);
	}

	/**
	 * Gets the width of the rendered area.
	 *
	 * @returns {number}
	 */
	get width() {
		return this.cols * this.spriteFonts[0].characterWidth;
	}

	/**
	 * Gets the height of the rendered area.
	 *
	 * @returns {number}
	 */
	get height() {
		return this.rows * this.spriteFonts[0].characterHeight;
	}
}
