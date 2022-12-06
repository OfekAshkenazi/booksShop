'use strict'
var gBooks = []
const gType = ['teror', 'comedy', 'science', 'action', 'children']
var gFilterBy = { type: '', maxPrice: 0 }
const PAGE_SIZE = 5
var gPageIdx = 0



_createBooks()

/// filter work only with type
function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
    document.querySelector('.page-number').innerText = `Page Number: ${gPageIdx + 1}`
    document.querySelector('body').classList.remove('.ltr')
    // document.querySelector('body').classList.add('.rtl')
}


function getFilterBooks() {
    var books = getBooks()
    var filterBooks = books.filter(book => book.type.includes(gFilterBy.type) &&
        book.maxPrice >= gFilterBy.maxPrice)
    var startIdx = gPageIdx * PAGE_SIZE

    return filterBooks.slice(startIdx,startIdx + PAGE_SIZE)

}

function setBookFilter(filterBy) {
    if (filterBy.type !== undefined) gFilterBy.type = filterBy.type
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    // console.log(gFilterBy.type)
    // console.log(gFilterBy)
    return gFilterBy
}

function setBookSort(sortBy) {
    // gPageIdx = 1
    if (sortBy.maxPrice !== undefined) {
        gBooks.sort((c1, c2) => (c2.maxPrice - c1.maxPrice) * sortBy.maxPrice)
    } else if (sortBy.rate !== undefined) {
        gBooks.sort((c1, c2) => (c2.rate - c1.rate) * sortBy.rate)
    }
}

function rateUp(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    if (gBooks[bookIdx].rate === 10) return
    gBooks[bookIdx].rate += 1
    saveBooksToStorage()
}

function rateDown(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    if (gBooks[bookIdx].rate === 0) return
    gBooks[bookIdx].rate -= 1
    saveBooksToStorage()
}

function updatePrice(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id)
    var newPrice = +prompt('how much it cost?')
    gBooks[bookIdx].maxPrice = newPrice
    saveBooksToStorage()
}

function removeBook(bookId) {
    var books = getBooks()
    var bookIdx = books.findIndex(book => bookId === book.id)
    books.splice(bookIdx, 1)
    saveBooksToStorage()
}

function addBook(type, price) {
    var randomNum = getRandomInt(0, 7)
    var imgLink = `<img src="image/${randomNum}.jpg" alt="no photo">`
    const book = createBook(type, imgLink)
    book.maxPrice = price
    gBooks.unshift(book)
    saveBooksToStorage()
    return book
}

function getBooks() {
    return gBooks
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // console.log(books)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 30; i++) {
            var imgLink = `<img onerror="src='image/0.jpg'" src="image/${i}.jpg" alt="no photo">`
            var type = gType[getRandomInt(0, gType.length)]
            books.push(createBook(type, imgLink))
        }
    }
    gBooks = books
    saveBooksToStorage()
}

function createBook(type, imgLink, name) {
    return {
        id: makeId(),
        type,
        maxPrice: getRandomInt(50, 500),
        imgLink,
        rate: 0
    }
}

/// utlis

function infoMsg(txt) {
    const elPopUpMsg = document.querySelector('.pop-up-msg')
    elPopUpMsg.style.display = 'block'
    elPopUpMsg.innerText = txt

    setTimeout(() => {
        elPopUpMsg.style.display = 'none'
    }, 2000);
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}


function makeLorem(wordCount = 30) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}