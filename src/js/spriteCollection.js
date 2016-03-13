import CharacterSprite from './characterSprite';

export default class SpriteCollection {
	constructor(options) {
		this.sprites = [];
		this.imageEl = options.imageEl;
		this.colors = options.colors;
		this.characterWidth = options.characterWidth;
		this.characterHeight = options.characterHeight;
		this.rows = options.rows;
		this.cols = options.cols;

		this.populateSprites();
	}

	populateSprites() {
		options.colors.forEach(function(fgColor) {
			options.colors.forEach(function(bgColor) {
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
		this.sprites[fgColor + bgColor].getCharacter(char);
	}
}
