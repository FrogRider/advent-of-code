import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path)

	const game = data.map((game) => {
		const splittedGame = game.split(/[|:]/).splice(1)
		return {
			winningNumbers: splittedGame[0]
				.trim()
				.split(' ')
				.filter((el) => el >= 1),
			numbers: splittedGame[1]
				.trim()
				.split(' ')
				.filter((el) => el >= 1),
		}
	})

	return game
}

const getMatchedNumbers = () => {
	const data = transformData()

	return data.map((game) => {
		const matchedNumbers = game.winningNumbers.filter((winningNumber) => {
			return game.numbers.includes(winningNumber)
		})

		return matchedNumbers
	})
}

const getPointsForEachGame = () => {
	const data = getMatchedNumbers()

	const points = data.map((game) => {
		const length = game.length
		return Array.from({ length }, (_, index) => 2 ** index).at(-1) || 0
	})
	console.log(points)

	return points
}

const path = './sample-input.txt'

console.log(getPointsForEachGame().reduce((acc, number) => (acc += number), 0))
