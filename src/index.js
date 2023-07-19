const { resolve } = require('path')
const { stat, readdir, readFile, writeFile } = require('fs').promises

const handler = async (filePath, maxLength, tabLength) => {
  let html = await readFile(filePath, 'utf-8')

  html = html.replace(/\n(\s*)(:?class=")(.*?)(")/g, (
    source, 
    whitespace, 
    prefix, 
    classNames, 
    suffix
  ) => {
    // slice(1) for remove `\n`
    if (source.slice(1).length <= maxLength) {
      return source
    }

    const res = []
    const segments = classNames.split(' ')
    const remaininglength = maxLength - (whitespace.length + tabLength)

    let str = ''

    for (let i = 0, l = segments.length; i < l; i++) {
      const segment = segments[i]

      if (str.length + segment.length <= remaininglength) {
        str += `${ segment } `
      } else {
        // remove last whitespace and add `\n`
        res.push(`${ whitespace }\t${ str.slice(0, -1) }\n`)
        str = `${ segment } `
      }
    }

    res.push(`${ whitespace }\t${ str.slice(0, -1) }\n`)

    return `\n${ whitespace }${ prefix }\n${ res.join('') }${ whitespace }${ suffix }`
  })

  await writeFile(filePath, html)
}

const multiLineTailwindcss = async (cwd, maxLength, tabLength) => {
  const dirs = await readdir(cwd)

  for (let i = 0, l = dirs.length; i < l; i++) {
    const dir = dirs[i]
    const _cwd = resolve(cwd, dir)
    const stats = await stat(_cwd)

    if (stats.isFile()) {
      if (dir.endsWith('.html')) {
        handler(_cwd, maxLength, tabLength)
      }
    } else {
      multiLineTailwindcss(_cwd, maxLength, tabLength)
    }
  }
}

module.exports = multiLineTailwindcss
