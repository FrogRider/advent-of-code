import { readFile } from '../../../read-file.js'

const hasOnlyDotsOnIndexes = (index) => {
	const data = readFile(path).filter(String)
	return data.every((line) => line[index] == '.')
}

const transformData = () => {
	const data = readFile(path).filter(String)

	const result = data
		.map((line) => line.split(''))
		.reduce((result, line) => {
			if (!line.includes('#')) {
				result = [...result, [line, line]]
			} else {
				result = [...result, [line]]
			}

			return [result].flat()
		}, [])
		.flat()

	for (let index = 0; index < result[0].length; index++) {
		const onlyDots = hasOnlyDotsOnIndexes(index)

		result.forEach(
			(line) => (line[index] = onlyDots ? ['.', '.'] : line[index])
		)
	}

	return result.map((line) => line.flat())
}

const getCoords = () => {
	const data = transformData()

	return data.reduce((result, line, indexOfLine) => {
		line.forEach((symbol, indexOfSymbol) => {
			if (symbol == '#') {
				result.push([indexOfSymbol, indexOfLine])
			}
		})

		return result
	}, [])
}

const getPaths = () => {
	const data = getCoords()

	return data.reduce((result, coordsA, indexOfCoordsA) => {
		// A -> B
		data.forEach((coordsB, indexOfCoordsB) => {
			const [xStart, yStart] = coordsA
			const [xEnd, yEnd] = coordsB
			if (indexOfCoordsB > indexOfCoordsA) {
				const x = Math.abs(xEnd - xStart)
				const y = Math.abs(yEnd - yStart)
				const length = x + y
				result.push(length)
			}
		})

		return result
	}, [])
}

const path = './full-input.txt'

//(xEnd - xStart) + (yEnd - yStart)

console.log(getPaths().reduce((acc, curr) => (acc += curr), 0))
// transformData().map((line) => line.join('')).filter()

// [(1, 2)].push()
