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

	const cardsInfo = data.map((game) => {
		const matches = game.winningNumbers.filter((winningNumber) => {
			return game.numbers.includes(winningNumber)
		})

		return {
			matchesAmount: matches.length,
			amountOfCard: 1,
		}
	})

	return cardsInfo
}

const getCopies = () => {
	const data = getMatchedNumbers()

	data.forEach((card, indexOfCard) => {
		const matches = card.matchesAmount
		const indexesToIncrease = Array.from(
			{ length: matches },
			(_, index) => index + indexOfCard + 1
		)

		indexesToIncrease.forEach((index) => {
			if (index <= data.length - 1) {
				data[index].amountOfCard += card.amountOfCard
			}
		})
	})

	return data
}

const path = './full-input.txt'

console.log(getCopies().reduce((acc, curr) => (acc += curr.amountOfCard), 0))

// 45386
