const fs = require('fs')
const marked = require('marked')
const { markedSmartypants } = require('marked-smartypants')

const strong = (token) => `<strong>&rsaquo; ${token.text}</strong>`

const list = (token) => `
<ol>
${token.items
  .map(
    (item) =>
      `  <li>
    <label>
      <input type="checkbox" />
      <span>${item.text.trim()}</span>
    </label>
  </li>`
  )
  .join('\n')}
</ol>`

marked.use({ renderer: { strong, list } })
marked.use(markedSmartypants())

fs.readFile(process.argv[2], 'utf8', (err1, clues) => {
  if (err1) throw err1
  fs.readFile(process.argv[3], 'utf8', (err2, template) => {
    if (err2) throw err2
    const body = marked.parse(clues)
    const html = template.replace('{{clues}}', body)
    fs.writeFile(process.argv[4], html, (err3) => {
      if (err3) throw err3
    })
  })
})
