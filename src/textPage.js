export default class TextPage {
	constructor(options) {
		this.colors = options.colors;
		this.setData(options);
	}

	setData(data) {
		this.text = data.text;
		this.foregroundColors = data.foregroundColors;
		this.backgroundColors = data.backgroundColors;
		this.characterSetMap = data.characterSetMap;
		this.rows = data.rows || this.text.length;
		this.cols = data.cols || this.text[this._findLongestRow()].length;
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

	getBackgroundHexColor(row, col) {
		return this.colors[this.getBackgroundColor(row, col)];
	}

	getForegroundHexColor(row, col) {
		return this.colors[this.getForegroundColor(row, col)];
	}

	getBackgroundColor(row, col) {
		return this.backgroundColors[row][col];
	}

	getForegroundColor(row, col) {
		return this.foregroundColors[row][col];
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

		return this.longestRow;
	}
}
