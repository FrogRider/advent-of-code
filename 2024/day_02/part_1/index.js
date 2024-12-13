import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path).map(string => string.split(' ')).map(report => {
		return {
			report, allIncreasing: false, allDecreasing: false, correctDiffs: false
		}
	})

	return data
}

const toString = (array) => JSON.stringify(array)

const makeCalculations = () => {
	return transformData().map(item => {

		const sortedAB = [...item.report].sort((a,b) => a - b);
		const sortedBA = [...item.report].sort((a,b) => b - a);

		// comparing sorted arrays to the original one
		item.allIncreasing = toString(sortedAB) === toString(item.report);
		item.allDecreasing = toString(sortedBA) === toString(item.report);
		item.correctDiffs = item.report.every((el, index) => {
			// acceptable diffs to compare
			const correctDiffs = [1,2,3];
			const length = item.report.length
			const isLastElement = index == length - 1
				
			if (item.allDecreasing) {
				// skip last element and compare diff th the acceptable ones for correct decreasing reports
				return isLastElement || correctDiffs.includes(el - item.report[index + 1])
			}

			if (item.allIncreasing) {
				// skip last element and compare diff th the acceptable ones for correct increasing reports
				return isLastElement || correctDiffs.includes(item.report[index + 1] - el)
			}
			
			return false
		})

		return item
		// allIncreasing = toString(sortedAB) === toString(report)
	}).filter(el => {
		// correctDiffs will be true only if allDecreasing or allIncreasing is true also
		return el.correctDiffs
	}).length
}

const path = './input-full.txt'
// const path = './input-sample.txt'

// console.log(transformData())
console.log(makeCalculations());
