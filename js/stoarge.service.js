const STORAGE_KEY = 'books'
const STORAGE_KEY_for_type = 'type'

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    const val = JSON.parse(str)
    return val
}

function saveToStorage(key, val) {
    const str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

function saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function saveTypeForBooks() {
    saveToStorage(STORAGE_KEY_for_type, gType)

}

function makeId(length = 5) {
    var txt = ''
    var possible = 'abcdefghijklmnopqrstuvwxyz'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}