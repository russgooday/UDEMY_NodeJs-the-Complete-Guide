const formatCurrency = (price) => {

  if (isNaN(price)) {
    throw new TypeError('price is not a Number')
  }

  const currency = new Intl.NumberFormat(
    'en-US', {
      style: 'currency',
      currency: 'GBP'
    }
  )

  return currency.format(price)
}

// expects an unformatted string and returns with paragraphs
// e.g. 'text\n\r\n\r' returns '<p>text</p>'
const formatParagraphs = (text) => (
  text.replaceAll(/([^\n\r]+)(?:[\n\r]+)?/gm, '<p>$1</p>\n')
)

module.exports = { formatCurrency, formatParagraphs }
