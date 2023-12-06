import { readFile } from '../../read-file.js'

const transformData = () => {
	const data = readFile(path).map((string) =>
		string.split(':')[1].trim().split(' ').filter(Number)
	)

	const result = { time: data[0].join(''), distance: data[1].join('') }

	return result
}

const getAmountOfWinningCombos = () => {
	const record = transformData()

	const allTimes = Array.from({ length: ++record.time })
		.map((_, index) => index)
		.reverse()
	const distanceToBeat = record.distance
	// find index of th first time setting that satisfies the condition
	const indexOfFirstWinningVariant = allTimes.findIndex(
		(el, index) => el * index > distanceToBeat
	)
	// therefore we got amount of dissatisfying times from one side
	// amount of dissatisfying times from the other side is same
	return allTimes.length - indexOfFirstWinningVariant * 2
}

const path = './full-input.txt'

const t0 = performance.now()
const result = getAmountOfWinningCombos()
const t1 = performance.now()
console.log(`Result ${result} was calculated in ${(t1 - t0) / 1000} seconds.`)
