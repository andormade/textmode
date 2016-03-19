import ColorMap from './colorMap';
import SpriteCollection from './spriteCollection';
import TextPage from './textPage';

/**
 *
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

		this.characterSets = [];
		options.characterSets.forEach(function(characterSet) {
			this.characterSets.push(new SpriteCollection({
				imageEl : characterSet.imageEl,
				colors  : options.colors
			}));
		}.bind(this));

		this.canvas = options.canvas;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');
	}

	/**
	 *
	 * @returns {void}
	 */
	render() {
		for (var row = 0; row < this.rows; row++) {
			for (var col = 0; col < this.cols; col++) {
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
		var characterSet = this.characterSets[this.getCharacterSet(row, col)];

		var imageData = characterSet.getCharacter(
			this.getCharacterCode(row, col),
			this.getForegroundColor(row, col),
			this.getBackgroundColor(row, col)
		);

		this.context.putImageData(
			imageData,
			characterSet.characterWidth * row,
			characterSet.characterHeight * col
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
