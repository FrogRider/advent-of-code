import { readFile } from '../../read-file.js'

const transformGames = () => {
	const data = readFile('./sample-input.txt')

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

const multipliedNumbers = getMaxValuesPerGame().map((game) => {
	return Object.values(game).reduce((acc, curr) => (acc *= curr), 1)
})

const sumOfPowers = multipliedNumbers.reduce((acc, curr) => (acc += curr), 0)

console.log(sumOfPowers)
