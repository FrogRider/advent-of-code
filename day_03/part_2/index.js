import { readFile } from '../../read-file.js'

const hasNumber = (where) => {
	return Boolean(where.match(/\d+/g))
}

const gatRange = (where, start, finish) => {
	// returns specific part of the string from "start" to "end"
	return where?.slice(start, finish) || ''
}

const path = './sample-input.txt'

const getStarsInfo = () => {
	const data = readFile(path)

	const result = data.map((line, indexOfLine) => {
		const result = []
		line.split('').forEach((symbol, indexOfSymbol) => {
			if (symbol == '*') {
				// check all the surrounding cells for numbers
				const currentLine = hasNumber(
					gatRange(line, indexOfSymbol - 1, indexOfSymbol + 2)
				)
				const prevLine = hasNumber(
					gatRange(data[indexOfLine - 1], indexOfSymbol - 1, indexOfSymbol + 2)
				)
				const nextLine = hasNumber(
					gatRange(data[indexOfLine + 1], indexOfSymbol - 1, indexOfSymbol + 2)
				)
				// each star's characteristics
				result.push({
					indexOfLine, // in which line is it located
					indexOfSymbol, // on which position in the line is it located
					currentLine, // is there numbers on the same line
					prevLine, // ... ont the line above
					nextLine, // ... on the line below
					isValid: currentLine || prevLine || nextLine, // is there a number on one of three lines
				})
			}
		})

		return result
	})

	// return only stars which has numbers nearby
	return [...result.flat()].filter((star) => star.isValid) // => object as shown above
}

const getCoordsOfNumbersForLine = (lineNumber = 0) => {
	const data = readFile(path)
	let line = data[lineNumber]
	const numbersInLine = line.match(/\d+/g)

	const lineInfo = numbersInLine.map((number) => {
		const indexOfNumberStart = line.indexOf(number)
		const rangeOfCurrentNumber = Array.from(
			{ length: number.length },
			(_, index) => index + indexOfNumberStart
		)
		// replace number with empty spaces to prevent errors for lines with same numbers
		line = line.replace(number, Array(number.length).fill(' ').join(''))
		return { number, range: rangeOfCurrentNumber } // => {number: "718", range: [4,5,6]}
	})

	return lineInfo // => array of objects {number: "718", range: [4,5,6]}
}

const getNumbers = () => {
	const validStars = getStarsInfo(path)

	const numbers = []

	validStars.forEach((starInfo) => {
		numbers.push([])

		const shiftsMap = [
			{
				lineModifier: 0, // current line
				key: 'currentLine',
			},
			{
				lineModifier: -1, // line above
				key: 'prevLine',
			},
			{
				lineModifier: 1, // line below
				key: 'nextLine',
			},
		]

		shiftsMap.forEach((shift) => {
			// check if star has numbers on the current, previous, next lines (determined by getStarsInfo function)
			if (starInfo[shift.key]) {
				// if so - grab numbers for specific line
				const numbersForLine = getCoordsOfNumbersForLine(
					starInfo.indexOfLine + shift.lineModifier
				)
				const matchingNumbers = numbersForLine
					// grab numbers on the specific line
					.filter((number) => {
						// filters only numbers in the current star's range (by comparing star's and number's ranges)
						return (
							number.range.includes(starInfo.indexOfSymbol - 1) ||
							number.range.includes(starInfo.indexOfSymbol + 1) ||
							number.range.includes(starInfo.indexOfSymbol)
						)
					})
					// grab the number that passes test (from object provided by getCoordsOfNumbersForLine function)
					.map((el) => el.number)

				numbers.at(-1).push(...matchingNumbers)
			}
		})
	})

	// filter only stars with 2 numbers in it's range
	return numbers.filter((numbers) => numbers.length == 2)
}

console.log(
	getNumbers()
		// multiply numbers (we already know theres only two of them)
		.map((el) => +el[0] * +el[1])
		// summarizes all the multiplied numbers
		.reduce((acc, curr) => (acc += +curr), 0)
)
