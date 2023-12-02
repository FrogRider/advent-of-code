import { readFile } from '../../read-file.js'

const maxValues = {
	red: 12,
	green: 13,
	blue: 14,
}

const transformGames = () => {
	const data = readFile('./full-input.txt')

	// split games strings and remove "Game #" labels
	const result = data.map((game) => game.split(/: |, |; /).splice(1))

	return result
	// returns arrays of strings like "number color": '7 blue', '10 green' etc
}

const getMaxValuesPerGame = () => {
	const data = transformGames()

	return data.map((game) => {
		// loop through colors per game
		const totals = game.reduce((acc, currentColor) => {
			const color = currentColor.split(' ')[1]
			const number = currentColor.split(' ')[0]
			// find maximum value for each color
			if (!acc.hasOwnProperty(color) || +acc[color] < +number) {
				acc[color] = number
				return acc
			}
			return acc
		}, {})

		return totals
		// returns array of objects with colors as keys and max values as values: { red: '5', green: '18', blue: '10' }
	})
}

const possibleGames = getMaxValuesPerGame().map((game) => {
	const colors = Object.keys(game)
	// compare each color with maximum values
	const result = colors.findIndex((color) => {
		return game[color] > maxValues[color]
	})
	return result == -1
	// returns true if the game is possible (each color <= this color's max value)
})

const calculateIndexes = possibleGames.reduce((acc, currentStatus, index) => {
	if (currentStatus) {
		return (acc += index + 1)
	}

	return acc
}, 0)

console.log(calculateIndexes)
