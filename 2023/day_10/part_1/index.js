import { readFile } from '../../../read-file.js'

const connectionsMap = {
	'|': {
		// top, bottom
		horizontal: [],
		vertical: [1, -1],
	},
	'-': {
		// left, right
		horizontal: [1, -1],
		vertical: [],
	},
	L: {
		// top, right
		horizontal: [1],
		vertical: [-1],
	},
	J: {
		// top, left
		horizontal: [-1],
		vertical: [-1],
	},
	7: {
		// bottom, left
		horizontal: [-1],
		vertical: [1],
	},
	F: {
		// bottom, right
		horizontal: [1],
		vertical: [1],
	},
	S: {
		horizontal: [1, -1],
		vertical: [1, -1],
	},
}

const unnecessaryLoops = [
	'left right',
	'right left',
	'top bottom',
	'bottom top',
]

const directionsMutations = {
	top: [0, -1],
	right: [1, 0],
	bottom: [0, 1],
	left: [-1, 0],
}

const types = Object.keys(connectionsMap)

const transformData = () => {
	const data = readFile(path)

	return data.map((line) => line.split(''))
}

const checkSymbol = (
	siblingSymbol,
	orientation,
	value,
	symbolToCheckConnection
) => {
	return (
		types.includes(siblingSymbol) &&
		connectionsMap[siblingSymbol][orientation]
			// to match elements with opposite connections (element that has bottom connection with element that has top connection: '7' should connect with 'J' by bottom connection)
			.includes(-value) &&
		connectionsMap[symbolToCheckConnection][orientation].includes(value)
	)
}

/**
 *
 * @param symbol - what symbol to check
 * @param {*} coords  - coords of the symbol ([x, y])
 * @returns '{ top: symbol || false, bottom: symbol || false, left: symbol || false, right: symbol || false }'
 */
const getSiblingSymbols = (coords) => {
	const [X, Y] = coords
	const data = transformData()
	const symbol = data[Y][X]

	const siblingSymbols = {
		top: Y != 0 && data[+Y - 1][X],
		bottom: Y != data.length - 1 && data[+Y + 1][X],
		left: X != 0 && data[Y][+X - 1],
		right: X != data[0].length - 1 && data[Y][+X + 1],
	}

	return {
		top: {
			symbol: siblingSymbols.top,
			isValid: checkSymbol(siblingSymbols.top, 'vertical', -1, symbol),
		},
		right: {
			symbol: siblingSymbols.right,
			isValid: checkSymbol(siblingSymbols.right, 'horizontal', 1, symbol),
		},
		bottom: {
			symbol: siblingSymbols.bottom,
			isValid: checkSymbol(siblingSymbols.bottom, 'vertical', 1, symbol),
		},
		left: {
			symbol: siblingSymbols.left,
			isValid: checkSymbol(siblingSymbols.left, 'horizontal', -1, symbol),
		},
	}
}

const getConnections = () => {
	const data = transformData()
	const startingSymbol = 'S'
	const startY = data.findIndex((line) =>
		line.some((el) => el == startingSymbol)
	)
	const startX = data[startY].findIndex((el) => el == startingSymbol)

	const resultPath = []
	const coordsCollection = []

	let currentCoords = [startX, startY]
	let lastDirection = ''

	while (resultPath.length == 0 || resultPath.at(-1) != startingSymbol) {
		const startConnections = getSiblingSymbols(currentCoords)
		const [direction, connection] = Object.entries(startConnections).find(
			(connection) => {
				const validConnection =
					connection[1].isValid &&
					!unnecessaryLoops.includes(`${connection[0]} ${lastDirection}`)
				return validConnection
			}
		)
		lastDirection = direction
		const coordsMutation = directionsMutations[direction]
		currentCoords = currentCoords.map(
			(coord, index) => (coord += coordsMutation[index])
		)
		coordsCollection.push(currentCoords)
		resultPath.push(connection.symbol)
		console.log(currentCoords)
	}

	console.log(Math.ceil((resultPath.length - 1) / 2))
	// console.log(coordsCollection)
}

const path = './full-input.txt'

// console.log(getConnections())
console.log(transformData().length)

// | is a vertical pipe connecting north and south. => top, bottom
// - is a horizontal pipe connecting east and west. => left, right
// L is a 90-degree bend connecting north and east. => top, right
// J is a 90-degree bend connecting north and west. => top, left
// 7 is a 90-degree bend connecting south and west. => bottom, left
// F is a 90-degree bend connecting south and east. => bottom, right
// . is ground; there is no pipe in this tile. => no connections
// S is the starting position; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
// starting point has ONLY two connections
