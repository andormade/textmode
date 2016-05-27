export default class TextPage {
	constructor(options) {
		this.colors = options.colors;
		this.setData(options);
	}

	get rows() {
		return this.text.length;
	}

	get cols() {
		if (this.text[0]) {
			return this.text[0].length;
		}
		return 0;
	}

	setText(text) {
		this.text = this.parseText(text);
	}

	setData(data) {
		this.setText(data.text);
		this.foregroundColors = data.foregroundColors;
		this.backgroundColors = data.backgroundColors;
		this.characterSetMap = data.characterSetMap;
	}

	parseText(text) {
		text.forEach(function(row) {
			if (typeof row === 'string') {
				row = row.split('');
			}
			if (Array.isArray(row)) {
				row.forEach(function(character, index) {
					if (typeof character === 'string') {
						row[index] = character.charCodeAt(0);
					}
					else if (typeof character === 'number') {
					}
					else {
						throw new Error(); // TODO
					}
				});
			}
			else {
				throw new Error(); // TODO
			}
		});

		return text;
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
}
