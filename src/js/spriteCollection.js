import CharacterSprite from './characterSprite';

const NUM_ROWS = 16;
const NUM_COLS = 8;

export default class SpriteCollection {
	constructor(options) {
		this.sprites = [];
		this.imageEl = options.imageEl;
		this.colors = options.colors;
		this.characterWidth = this.imageEl.width / NUM_COLS;
		this.characterHeight = this.imageEl.height / NUM_ROWS;
		this.rows = NUM_ROWS;
		this.cols = NUM_COLS;

		this.populateSprites();
	}

	populateSprites() {
		this.colors.forEach(function(fgColor) {
			this.colors.forEach(function(bgColor) {
				if (fgColor !== bgColor) {
					this.sprites[fgColor + bgColor] = new CharacterSprite({
						imageEl : this.imageEl,
						fgColor : fgColor,
						bgColor : bgColor,
						characterWidth : this.characterWidth,
						characterHeight : this.characterHeight,
						rows : this.rows,
						cols : this.cols
					});
				}
			}.bind(this));
		}.bind(this));
	}

	/**
	 * Returns with the image data of the specified character.
	 *
	 * @returns {void}
	 */
	getCharacter(char, fgColor, bgColor) {
		return this.sprites[fgColor + bgColor].getCharacter(char);
	}
}
