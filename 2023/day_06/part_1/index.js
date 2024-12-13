import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path).map((string) =>
		string.split(':')[1].trim().split(' ').filter(Number)
	)

	return data[0].reduce((result, time, index) => {
		result.push({ time, distance: data[1][index] })
		return result
	}, [])
}

const getAmountOfWinningCombos = () => {
	const data = transformData()

	const result = data.map((record) => {
		const allTimes = Array.from({ length: ++record.time })
			.map((_, index) => index)
			.reverse()
		const distanceToBeat = record.distance
		return allTimes.filter((el, index) => el * index > distanceToBeat).length
	})

	return result
}

// each 1 millisecond adds 1 mm/ms speed (starting from 0 mm/ms)
// each ms of charging decreases travel time
// time = time hold (to receive speed) + time travel (with received speed)
// distance = distance to beat
// total goal - get all the
// time 7, dist 9    -> 8  variants, 4 valid ->  2...5  (4 from 8)
// time 15, dist 40  -> 16 variants, 8 valid ->  4...11 (8 from 16)
// time 30, dist 200 -> 31 variants, 9 valid -> 11...19 (9 from 31)
// speed grows till the middle of a time range

const path = './full-input.txt'

console.log(getAmountOfWinningCombos().reduce((acc, curr) => (acc *= curr), 1))
