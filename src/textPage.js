export default class TextPage {
	constructor(options) {
		this.colors = options.colors;
		this.setData(options);
	}

	get rows() {
		return this.text.length;
	}

	get cols() {
		return this.text[this.longestRow].length;
	}

	setData(data) {
		this.text = data.text;
		this.foregroundColors = data.foregroundColors;
		this.backgroundColors = data.backgroundColors;
		this.characterSetMap = data.characterSetMap;
		this._findLongestRow();
	}

	getCharacter(row, col) {
		if (
			this.text[row] &&
			this.text[row][col]
		) {
			return this.text[row][col];
		}
		else {
			return 0;
		}
	}

	getCharacterSet(row, col) {
		return this.characterSetMap[row][col];
	}

	getBackgroundColor(row, col) {
		return this.colors[this.backgroundColors[row][col]];
	}

	getForegroundColor(row, col) {
		return this.colors[this.foregroundColors[row][col]];
	}

	setBackgroundColor(row, col, backgroundColor) {
		this.backgroundColors[row][col] = backgroundColor;
	}

	setForegroundColor(row, col, foregroundColor) {
		this.foregroundColors[row][col] = foregroundColor;
	}

	setCharacterSet(row, col, characterSet) {
		this.characterSetMap[row][col] = characterSet;
	}

	setCharacter(row, col, character) {
		this.text[row][col] = character;
	}

	_findLongestRow() {
		this.longestRow = 0;
		this.text.forEach((row, index) => {
			if (this.text[this.longestRow].length < row.length) {
				this.longestRow = index;
			}
		});
	}
}
