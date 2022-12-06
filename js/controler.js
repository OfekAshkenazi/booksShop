'use strict'
///// section done!
var iscards = false
function onInit() {
    renderTypeForBooks()
    renderFilterByQueryStringParams()
    rendingBooksMap()
}
function onCardInit() {
    iscards = !iscards
    console.log(iscards)
    // document.querySelector('.table-con').display = 'block'
    // document.querySelector('.card-con').display = 'none'
    renderTypeForBooks()
    renderFilterByQueryStringParams()
    rendingBooksMap()
}
function rendingBooksMap() {
    var books = getFilterBooks()
    if (!iscards) {
        var strHtml = `<table class="table">
            <thead class="table-dark">
                <tr>
                    <th data-trans="id">
                        Id
                    </th>
                    <th data-trans="price">
                        Price
                    </th>
                    <th data-trans="type">
                        Type
                    </th>
                    <th data-trans="actions" colspan="3">
                        Actions
                    </th>
                    <th data-trans="rate" colspan="3">
                        Rate
                    </th>
                </tr>
            </thead>
            <tbody>`
        var strHtmls = books.map(book => {
            return `<tr>
                    <td>${book.id}</td>
                    <td>${book.maxPrice}$</td>
                    <td>${book.type}</td>
                    <td><button onclick="onRead('${book.id}')" data-trans="read" class="read">Read</button></td>
                    <td><button onclick="onUpdatePrice('${book.id}')" data-trans="update" class="update">Update</button></td>
                    <td><button onclick="onRemoveBook('${book.id}')" data-trans="delete" class="delete">Delete</button></td>
                    <td><button onclick="onRateUp('${book.id}')" class="update">+</button></td>
                    <td>${book.rate}</td>
                    <td><button onclick="onRateDown('${book.id}')" class="update">-</button></td>
                </tr>`
        })
        strHtml += strHtmls.join('')
        strHtml += `</tbody></table>`
        document.querySelector('.book-con').innerHTML = strHtml

    } else cardsRend()


}
/// working with only type
function cardsRend() {
    var books = getFilterBooks()
    var strHtmls = books.map(book => {
        return `<article class="card card-preview">
        <button class="btn-remove" data-trans="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        <h5>${book.type}</h5>
        <h6>Up to <span>${book.maxPrice}</span> $</h6>
        <button data-trans="read" onclick="onRead('${book.id}')">Read</button>
        <button data-trans="update" onclick="onUpdatePrice('${book.id}')">Update</button>
        <img onerror="this.src='image/0.jpg'" src="image/book.jpg" alt="book type: ${book.type}">
        </article> `
    })

    document.querySelector('.book-con').innerHTML = strHtmls.join('')

}





function onNextPage() {
    nextPage()
    rendingBooksMap()

}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        type: queryStringParams.get('type') || '',
        maxPrice: queryStringParams.get('maxPrice') || 0
    }

    if (!filterBy.type && !filterBy.maxPrice) return

    document.querySelector('.filter-book-select').value = filterBy.type
    document.querySelector('.filter-book-range').value = filterBy.maxPrice
    setBookFilter(filterBy)
    rendingBooksMap()
}

function onSetFilterBy(filterBy) {
    var elType = document.querySelector('.filter-book-select')
    var elRange = document.querySelector('.filter-book-range')
    console.log(elType.value)
    // console.log(filterBy)
    setBookFilter(filterBy)
    rendingBooksMap()
    // console.log(filterBy)
    const queryStringParams = `?type=${elType.value}&maxPrice=${elRange.value}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderTypeForBooks() {

    const strHTMLs = gType.map(type => `<option data-trans="${type}" value="${type}">${type}</option>`)
    strHTMLs.unshift(`'<option data-trans="Select-Type" value="">Select Type</option>'`)
    document.querySelector('.filter-book-select').innerHTML = strHTMLs
    console.log(strHTMLs)
}

function rendingDataForModel(bookId) {
    var book = getBookById(bookId)
    var strHtml = `<div class="model-btn"> <button onclick="onRateUp('${book.id}')">+</button>
                    ${book.rate}
                    <button onclick="onRateDown('${book.id}')">-</button></div>`

    document.querySelector('.rateBtn').innerHTML = strHtml
    var elModel = document.querySelector('.model')
    elModel.querySelector('p').innerText = `book: ${book.id} \n price: ${book.maxPrice} $ \n type: ${book.type} \n rate: ${book.rate}`
    elModel.querySelector('h1').innerText = `the book: ${bookId}`
    elModel.querySelector('.img').innerHTML = `${book.imgLink}`

}

function onCloseModel() {
    var elModel = document.querySelector('.model')
    elModel.classList.remove('open')
}

function onSetSortBy() {
    const prop = document.querySelector('.sortBy').value
    const isDesc = document.querySelector('.sort').checked

    const sortBy = {}
    sortBy[prop] = (isDesc) ? -1 : 1

    setBookSort(sortBy)
    rendingBooksMap()
}

function onRead(bookId) {
    var elModel = document.querySelector('.model')
    elModel.classList.add('open')
    rendingDataForModel(bookId)
    // setTimeout(onCloseModel, 5000)
    // nice but bug the system a littele
}

function onUpdatePrice(bookId) {
    updatePrice(bookId)
    rendingBooksMap()
    infoMsg('Book UpDate')


}

function onRemoveBook(bookId) {
    const remove = confirm('Are You Sure You Want To Remove This Item?')
    if (remove) {
        removeBook(bookId)
        infoMsg('Book Remove')
        rendingBooksMap()

    } else return
}

function onAddBook() {
    var type = prompt('type of book')
    gType.push(type)
    saveTypeForBooks()
    var price = +prompt('how much it will cost')
    if (type) {
        addBook(type, price)
        rendingBooksMap()
        renderTypeForBooks()
        infoMsg('Book Add !')
    }
}

function onRateUp(bookId) {
    rateUp(bookId)
    rendingDataForModel(bookId)
    rendingBooksMap()
}

function onRateDown(bookId) {
    rateDown(bookId)
    rendingDataForModel(bookId)
    rendingBooksMap()
}

function onSetLang(lang) {
    setLang(lang)

    // done: if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
}