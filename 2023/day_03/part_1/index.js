import { readFile } from '../../../read-file.js'

const transformData = (path) => {
	const data = readFile(path)

	const emptyLine = Array(data[0].length + 2)
		.fill('.')
		.join('')
	const splittedData = data.map((line) => {
		// add empty spaces (dots) by the both sides of each line
		line = line.split('')
		line.unshift('.')
		line.push('.')

		return line.join('')
	})

	// edd empty lines above the first and under the last lines
	return [emptyLine, ...splittedData, emptyLine]
}

const getValidNumbers = (input) => {
	// loop through lines
	const result = input.reduce((acc, currentLine, indexOfLine) => {
		// first and las lines are empty (due to the previous function)
		if (indexOfLine == 0 || indexOfLine == input.length - 1) return acc

		const numbersInLine = currentLine.match(/\d+/g) // => numbers in current line || null

		if (numbersInLine) {
			numbersInLine.forEach((number) => {
				const startIndex = currentLine.indexOf(number)
				const endIndex = startIndex + number.length - 1

				const elementsToCheckForSymbol = [
					// part of a line above
					...input[indexOfLine - 1].slice(startIndex - 1, endIndex + 2),
					// part of a current line
					...input[indexOfLine].slice(startIndex - 1, endIndex + 2),
					// part of a below line
					...input[indexOfLine + 1].slice(startIndex - 1, endIndex + 2),
				].join('')

				const hasSymbolAround =
					elementsToCheckForSymbol.match(/[=+\-*\/&%#@\$]/)

				if (hasSymbolAround) acc.push(number)
				// replace current number with empty spaces to avoid errors with similar numbers in the same lines (159 and 15 in the same line -> searching by 15 will return wrong result)
				const erasedNumber = Array(number.length).fill(' ').join('')
				currentLine = currentLine.replace(number, erasedNumber)
			})
		}

		return acc
	}, [])

	return result
}

const getSum = () => {
	const data = getValidNumbers(transformData('./full-input.txt'))

	return data.reduce((acc, number) => (acc += +number), 0)
}

console.log(getSum())
// getSum()
