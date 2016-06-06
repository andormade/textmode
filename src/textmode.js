import TextPage from './textPage';
import LetterSprite from 'letter-sprite';

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
		this.renderLetterSprites(options.characterSets, options.colors);
		this.canvas = options.canvas;
	}

	renderLetterSprites(characterSets, colors) {
		this.characterSets = [];
		characterSets.forEach(function(characterSet) {
			this.characterSets.push(new LetterSprite(
				characterSet, 16, 8, colors, colors
			));
		}, this);
	}

	/**
	 * Renders the page.
	 *
	 * @returns {void}
	 */
	render() {
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
		var letterSprite = this.characterSets[this.getCharacterSet(row, col)];

		letterSprite.letMeDrawIt(
			this.context,
			this.getCharacter(row, col),
		 	this.getBackgroundColor(row, col),
		 	this.getForegroundColor(row, col),
			letterSprite.characterWidth * col,
			letterSprite.characterHeight * row
		);
	}

	/**
	 * Gets the width of the rendered area.
	 *
	 * @returns {number}
	 */
	get width() {
		return this.cols * this.characterSets[0].characterWidth;
	}

	/**
	 * Gets the height of the rendered area.
	 *
	 * @returns {number}
	 */
	get height() {
		return this.rows * this.characterSets[0].characterHeight;
	}
}
