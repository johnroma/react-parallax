const fs = require('fs')
const path = require('path')

const cssFilePath = path.join(__dirname, 'dist', 'styles.css')
const jsFilePath = path.join(__dirname, 'dist', 'index.mjs')

fs.readFile(cssFilePath, 'utf8', (err, cssContent) => {
  if (err) {
    console.error('Error reading CSS file:', err)
    return
  }

  // Sanitize the CSS content to be a valid JavaScript string
  const sanitizedCssContent = cssContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')

  // Create the JS snippet, including a check for document availability
  const jsSnippet = `
if (typeof document !== 'undefined') {
  (function() {
    const style = document.createElement('style');
    style.textContent = \`${sanitizedCssContent}\`;
    document.head.appendChild(style);
  })();
}
`

  fs.appendFile(jsFilePath, jsSnippet, (err) => {
    if (err) {
      console.error('Error appending CSS injection script to JS file:', err)
      return
    }
    console.log('CSS injection script successfully appended to JS bundle.')
  })
})
