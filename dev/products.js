const { clone, set, lensProp } = require('ramda')

const products = [
  {
    title: 'Trainspotting',
    author: 'Irvine Welsh',
    published: 'July 11th 1994',
    imageUrl: '/images/trainspotting.png',
    summary: 'Abhorrently dark and raw to the core, Trainspotting will always be a cult classic.',
    description: "<p>'An unremitting powerhouse of a novel that marks the arrival of a major new talent. Trainspotting is a loosely knotted string of jagged, dislocated tales that lay bare the hearts of darkness of the junkies, wide-boys and psychos who ride in the down escalator of opportunity in the nation's capital. Loud with laughter in the dark, this novel is the real McCoy. If you haven't heard of Irvine Welsh before-don't worry, you will' The Herald</p>\n",
    price: '7.22',
    id: '4af77e8c-57f1-4ada-a6ae-ca4ae852d253'
  },
  {
    title: 'Mr Nice',
    author: 'Howard Marks',
    published: 'August 1st 2003',
    imageUrl: '/images/mr-nice.png',
    summary: 'Marks weaves a fascinating story spiced with brilliant detail, far stronger than fiction.',
    description: '<p>During the mid 1980s Howard Marks had 43 aliases, 89 phone lines, and owned 25 companies throughout the world. Whether bars, recording studios, or offshore banks, all were money laundering vehicles serving the core activity: dope dealing.</p>\n<p>Marks began to deal small amounts of hashish while doing a postgraduate philosophy course at Oxford, but soon he was moving much larger quantities. At the height of his career he was smuggling consignments of up to 50 tons from Pakistan and Thailand to America and Canada and had contact with organizations as diverse as MI6, the CIA, the IRA, and the Mafia.</p>\n<p>This is his extraordinary story.</p>\n',
    price: '11.99',
    id: '97aabdc9-213c-4933-af8f-71a153bdb7e0'
  },
  {
    title: 'Wasp Factory',
    author: 'Iain Banks',
    published: '1998',
    imageUrl: '/images/wasp-factory.png',
    summary: 'A brilliant book, barmy and barnacled with the grotesque — read it if your dare.',
    description: '<p>The Wasp Factory is a work of horrifying compulsion: horrifying, because it enters a mind whose realities are not our own, whose values of life and death are alien to our society; compulsive, because the humour and compassion of that mind reach out to us all. A novel of extraordinary originality, imagination and comic ferocity.</p>\n',
    price: '11.11',
    id: 'c05bd80e-49c0-4675-965f-d2a5ae9ef6d2'
  }
]

const newProduct = {
  title: 'Mr Nice',
  author: 'Howard Marks',
  published: 'August 1st 1999',
  imageUrl: '/images/mr-nice.png',
  summary: 'Marks weaves a fascinating story spiced with brilliant detail, far stronger than fiction.',
  description: '<p>During the mid 1980s Howard Marks had 43 aliases, 89 phone lines, and owned 25 companies throughout the world. Whether bars, recording studios, or offshore banks, all were money laundering vehicles serving the core activity: dope dealing.</p>\n<p>Marks began to deal small amounts of hashish while doing a postgraduate philosophy course at Oxford, but soon he was moving much larger quantities. At the height of his career he was smuggling consignments of up to 50 tons from Pakistan and Thailand to America and Canada and had contact with organizations as diverse as MI6, the CIA, the IRA, and the Mafia.</p>\n<p>This is his extraordinary story.</p>\n',
  price: '15.99',
  id: '97aabdc9-213c-4933-af8f-71a153bdb7e0'
}

const newProdId = '97aabdc9-213c-4933-af8f-71a153bdb7e0'
const productIndex = products.findIndex(({ id }) => newProdId === id)

const copy = set(lensProp(productIndex), { ...newProduct }, clone(products))
console.log(copy)
// const id = '97aabdc9-213c-4933-af8f-71a153bdb7e0'
// const findId = R.findIndex(R.propEq('id', id))
// const copy = R.set(R.lensProp(findId(products)), newProduct, R.clone(products))
// console.log(copy)

// const copy = products.map(
//   (product) => ({ ...(product.id === newProduct.id) ? newProduct : product })
// )

// copy[1].price = 12.99
// console.log(products)
// console.log(copy)
