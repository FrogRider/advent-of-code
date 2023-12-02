import fs from 'fs'

export const readFile = (path) => {
	const content = fs.readFileSync(path, 'utf-8').split('\n')
	return content
}
