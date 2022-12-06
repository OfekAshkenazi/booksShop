'use strict'
var gTrans = {
    title: {
        en: 'Yogo Book Shop',
        he: 'חנות הספרים של יוגו'
    },
    id: {
        en: 'id',
        he: 'ת.ז'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    type: {
        en: 'type',
        he: 'זאנר'
    },
    actions: {
        en: 'actions',
        he: 'פעולות'
    },
    rate: {
        en: 'rate',
        he: 'דירוג'
    },
    footer: {
        en: 'Made By Ofek Ashkenazi ©',
        he: 'נעשה על ידי אופק אשכנזי'
    },
    'add-book': {
        en: 'add-book',
        he: 'להוסיף ספר'
    },
    home: {
        en: 'home',
        he: 'בית'
    },
    'to-sell': {
        en: 'To sell',
        he: 'למכור'
    },
    'to-buy': {
        en: 'To Buy',
        he: 'לקנות'
    },
    read: {
        en: 'read',
        he: 'לקרוא'
    },
    update: {
        en: 'update',
        he: 'לעדכן'
    },
    delete: {
        en: 'delete',
        he: 'למחוק'
    },
    book: {
        en: 'The Book',
        he: 'הספר'
    },
    'next-page': {
        en: 'Next Page',
        he: 'לעמוד הבא'
    },
    teror: {
        en: 'Teror',
        he: 'אימה'
    },
    comedy: {
        en: 'comedy',
        he: 'קומדיה'
    },
    science: {
        en: 'science',
        he: 'מדע'
    },
    action: {
        en: 'action',
        he: 'אקשן'
    },
    children: {
        en: 'children',
        he: 'ילדים'
    },
    all: {
        en: 'all',
        he: 'הכל'
    },
    'Select-Type': {
        en: 'Select Type',
        he: 'תבחר סוג'
    },
}

var gCurrLang = 'en'


function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}


function doTrans() {
    // done: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        // console.log(transKey)
        const translation = getTrans(transKey)
        // console.log(translation)

        el.innerText = translation

        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}



