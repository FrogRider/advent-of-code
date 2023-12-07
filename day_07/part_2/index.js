import { readFile } from '../../read-file.js'

// powers list from strongest to weakest
const powers = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

const transformData = () => {
	const data = readFile(path)

	const transformedData = data.map((element) => {
		const [hand, bid] = element.split(' ')
		return { hand, bid } // => { hand: '32T3K', bid: '765' }
	})

	return transformedData
}

const sortByPowers = () => {
	const data = transformData()

	const powers = data.map((el) => {
		const countedCards = el.hand.split('').reduce((result, card, index) => {
			// count each card symbol instead of "J"
			if (card !== 'J') {
				if (result.hasOwnProperty(card)) {
					result[card] += 1
				} else {
					result[card] = 1
				}
			}
			// if we have already passed all the symbols
			if (index == 4) {
				// transform objects to arrays to sort them
				result = Object.entries(result)
				result = result.sort((a, b) => b[1] - a[1])

				// count jokers in the current combination
				const amountOfJokers = el.hand
					.split('')
					.filter((card) => card == 'J').length

				// grab all the cards symbols (without J's)
				const cardsInResult = result.map((el) => el[0])

				// if we have some symbols - increase first symbol's (which has the biggest amount after sorting) count by J's amount
				if (cardsInResult.length) {
					result[0][1] += amountOfJokers
					// if we have no symbols - there were only jokers in the combination
				} else {
					result.push(['J', amountOfJokers])
				}
				// turn the array of arrays back to the array of objects
				result = Object.fromEntries(result)
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
		// combine each object (which contains cards combination and bid) with it's power
		.map((el, index) => {
			return { ...el, power: powers[index] }
		})
		.sort((a, b) => b.power[0] - a.power[0] || b.power[1] - a.power[1])
		.reduce((result, obj) => {
			const power = obj.power

			// check if there is an existing group for the power, otherwise create one
			if (!result[power]) {
				result[power] = []
			}

			// add the object to the corresponding power group
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
				// compare powers of two combination card by card
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
