import { readFile } from '../../../read-file.js'

const transformData = () => {
	const data = readFile(path).map(string => string.split(' '))

	return data
}

const toString = (array) => JSON.stringify(array)

const removeElementAtIndex = (array, index) => {
    if (index < 0 || index >= array.length) {
        throw new Error("Index out of bounds");
    }
    return array.slice(0, index).concat(array.slice(index + 1));
}

// returns true only if ((allIncreasing || allDecreasing) && correctDiffs)
const makeCalculations = (array, allowRecursion = true) => {
		const item = {
			report: array, allIncreasing: false, allDecreasing: false, correctDiffs: false, includingDampener: 0
		}

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
		if (allowRecursion) {
			item.includingDampener = item.report.reduce((acc, curr, index, array) => {
				const newArrayToCheck = removeElementAtIndex(array, index)
				const checkedNewArray = makeCalculations(newArrayToCheck, false)

				if (checkedNewArray.correctDiffs) acc += 1

				return acc
			}, 0)
		}

		return item
}

const path = './input-full.txt'
// const path = './input-sample.txt'

// console.log(transformData())
// console.log(transformData().forEach(el => {
// 	console.log(makeCalculations(el));
// }));
console.log(transformData().map(el => {
	return makeCalculations(el);
}).filter(el => el.correctDiffs || el.includingDampener).length);
