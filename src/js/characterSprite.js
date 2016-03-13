export default class CharacterSprite {
	/**
	 *
	 *
	 * @param {object} options
	 *
	 * @returns {void}
	 */
	constructor(options) {
		this.imageEl = options.imageEl;
		this.fgColor = options.fgColor;
		this.bgColor = options.bgColor;
		this.characterWidth = options.characterWidth;
		this.characterHeight = options.characterHeight;
		this.rows = options.rows;
		this.cols = options.cols;

		this._createCanvas();
		this._drawImage();
		this._renderTextColor();
		this._renderBackgroundColor();
	}

	/**
	 * Creates a canvas element for cacheing the sprite.
	 *
	 * @returns {void}
	 */
	_createCanvas() {
		this.canvas = document.createElement('canvas');
		document.body.appendChild(this.canvas);
		this.canvas.width = this.imageEl.width;
		this.canvas.height = this.imageEl.height;
		this.context = this.canvas.getContext('2d');
	}

	/**
	 * Draws the image to the canvas.
	 *
	 * @returns {void}
	 */
	_drawImage() {
		this.context.imageSmoothingEnabled = false;
		this.context.drawImage(this.imageEl, 0, 0);
	}

	/**
	 * Sets the color of the non-transparent pixels.
	 *
	 * @returns {void}
	 */
	_renderTextColor() {
		this.context.globalCompositeOperation = 'source-in';
		this.context.fillStyle = this.fgColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.globalCompositeOperation = 'source-over';
	}

	/**
	 * Sets the color of the transparent pixels.
	 *
	 * @returns {void}
	 */
	_renderBackgroundColor() {
		this.context.globalCompositeOperation = 'destination-over';
		this.context.fillStyle = this.bgColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.globalCompositeOperation = 'source-over';
	}

	/**
	 * Returns with the image data of the specified character
	 *
	 = @returns {void}
	 */
	getCharacter(char) {
		var x = Math.floor(char / this.rows) * this.characterWidth,
			y = Math.floor(char % this.rows) * this.characterHeight;

		return this.context.getImageData(x, y, this.characterWidth,
			this.characterHeight);
	}
}
