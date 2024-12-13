import { readFile } from '../../../read-file.js'

const getCalibrationCodes = (input) => {
	const data = readFile(input)
	const firstAndLastDigit = data.map((el) => {
		const digits = el.match(/\d+/g).join('').split('')

		return [digits.at(0), digits.at(-1)].join('')
	})

	return firstAndLastDigit
}

const getTotalCalibrationNumber = (numbers) => {
	return numbers.reduce((acc, current) => {
		return (acc += +current)
	}, 0)
}

console.log(
	getTotalCalibrationNumber(getCalibrationCodes('./sample-input.txt'))
)
console.log(getTotalCalibrationNumber(getCalibrationCodes('./full-input.txt')))
