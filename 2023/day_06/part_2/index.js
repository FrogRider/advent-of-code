import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path).map((string) =>
		string.split(':')[1].trim().split(' ').filter(Number)
	)

	const result = { time: data[0].join(''), distance: data[1].join('') }

	return result
}

const getAmountOfWinningCombos = () => {
	const record = transformData()

	const { time, distance } = record
	let firstWinningIndex = 0

	// find the index of the first time setting that satisfies the condition
	for (let i = time; i > 1; --i) {
		if (i * (time - i) >= distance) {
			firstWinningIndex = i
			break
		}
	}

	// therefore we get an amount of dissatisfying times from one side
	// amount of dissatisfying times from the other side is the same
	return Math.abs(time - firstWinningIndex * 2 - 1)
}

const path = './full-input.txt'

const t0 = performance.now()
const result = getAmountOfWinningCombos()
const t1 = performance.now()
console.log(`Result ${result} was calculated in ${(t1 - t0) / 1000} seconds.`)
