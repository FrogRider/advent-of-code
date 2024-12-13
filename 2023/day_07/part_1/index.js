import { readFile } from '../../../read-file.js'

const powers = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const transformData = () => {
	const data = readFile(path)

	const transformedData = data.map((element) => {
		const [hand, bid] = element.split(' ')
		return { hand, bid }
	})

	return transformedData
}

const sortByPowers = () => {
	const data = transformData()

	const powers = data.map((el) => {
		const countedCards = el.hand.split('').reduce((result, card) => {
			if (result.hasOwnProperty(card)) {
				result[card] += 1
			} else {
				result[card] = 1
			}
			return result
		}, {})
		return Object.values(countedCards)
			.sort((a, b) => b - a)
			.splice(0, 2)
			.map((power) => (power == 5 ? 50 : power))
			.join('')
	})

	const sorted = data
		.map((el, index) => {
			return { ...el, power: powers[index] }
		})
		.sort((a, b) => b.power[0] - a.power[0] || b.power[1] - a.power[1])
		.reduce((result, obj) => {
			const power = obj.power

			// Check if there is an existing group for the power, otherwise create one
			if (!result[power]) {
				result[power] = []
			}

			// Add the object to the corresponding power group
			result[power].push(obj)

			return result
		}, {})

	return Object.values(sorted)
}

const getPowerOfCard = (card) => powers.indexOf(card)

const sortInGroups = () => {
	return sortByPowers().map((powerGroup) => {
		return powerGroup.sort((a, b) => {
			return (
				getPowerOfCard(b.hand[0]) - getPowerOfCard(a.hand[0]) ||
				getPowerOfCard(b.hand[1]) - getPowerOfCard(a.hand[1]) ||
				getPowerOfCard(b.hand[2]) - getPowerOfCard(a.hand[2]) ||
				getPowerOfCard(b.hand[3]) - getPowerOfCard(a.hand[3]) ||
				getPowerOfCard(b.hand[4]) - getPowerOfCard(a.hand[4])
			)
		})
	})
}

const path = './sample-input.txt'

console.log(
	sortInGroups()
		.flat()
		.reduce((acc, el, index) => (acc += +el.bid * (index + 1)), 0) // from smallest power to largest
)

//['21','5', '22'].sort((a,b) => b[0] - a[0] || b[1] - a[1]) => [ '5', '22', '21' ]

// 5 similar
// 4 similar
// 3 similar + 2 similar
// 3 similar
// 2 similar + 2 similar
// 2 similar
// no similar cards
