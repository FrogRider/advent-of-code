import fs from 'fs'

const readFile = (path) => {
	const content = fs.readFileSync(path, 'utf-8').split('\n')
	return content
}

const calculate = (path) => {
	const data = readFile(path)
	let total = 0
	const digitsAsWords = {
		one: '1',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9',
	}

	data.forEach((line) => {
		const digits = [] // all the digits for the current line
		line
			.trim()
			.split('')
			.map((symbol, index) => {
				// loop through symbols in the line
				if (!isNaN(parseInt(symbol))) {
					// check if symbol is number
					digits.push(symbol)
				}
				Object.keys(digitsAsWords).map((digitAsWord) => {
					// loop through digits words
					const restOfTheWord = line.split('').slice(index).join('')
					// check if the rest of the line starts with digit word
					if (restOfTheWord.indexOf(digitAsWord) == 0) {
						digits.push(digitsAsWords[digitAsWord])
					}
				})
			})
		total += +(digits.at(0) + digits.at(-1))
	})

	return total
}

console.log(calculate('./full-input.txt'))

// 53254 / 53221
