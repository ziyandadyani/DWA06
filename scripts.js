// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books // why not use the imported books object directly ?

/* a method that creates a new empty DocumentFragment object, which can be used as a temporary container to hold
 multiple DOM nodes before appending them to the document*/

const starting = document.createDocumentFragment() 

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) { 

    /*The document.createElement() method is used to dynamically create a new element node in the DOM (Document Object Model).
     It takes a string parameter representing the HTML tag name of the element you want to create. In this case, 'button' is
      passed as the parameter, indicating that a new <button> element should be created */

    /*assign a single class name 'preview' to the classList property of the element. However, the correct way to add a class
     to an element's class list is by using the add() method of the classList object.  e.g element.classList.add= 'preview'*/


    /* The setAttribute() method is a JavaScript DOM method used to set the value of an attribute on an element. It takes two
     parameters: the name of the attribute and the value to be assigned to that attribute. */

    

    const element = document.createElement('button')
    element.classList= 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    starting.appendChild(element)
}

document.querySelector('[data-list-items]').appendChild(starting)

const genreHtml = document.createDocumentFragment() // abstract this process by making a function that creates document fragments then  calling it multiple times
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name // name of genre is also innerText in  select option 
    genreHtml.appendChild(element)
}

document.querySelector('[data-search-genres]').appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)

/* */

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255'); //  CSS variable color dark = white
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');  //  CSS variable color light = black
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20'); // black
    document.documentElement.style.setProperty('--color-light', '255, 255, 255'); // white
}

document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0  // ?? why not matches.length - (page* BOOKS_PER_PAGE) === 0

document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true 
    document.querySelector('[data-search-title]').focus()
})

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true 
})

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})

/*When form is submitted
 a) default behaviour i.e page reload is prevented
 b) formData is a means to capture/retrieve data after submitting a form 
 c) theme is an object that stores the retrieved from field data as object entries (either "night" or "day" is selected in the selection menu
 d) CSS variable color-dark and color-light will be set according to the theme 
 e) Everything outlined above happens when the submit event is triggered , moments before that the settings overlay is closed*/

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255'); 
    }
    
    document.querySelector('[data-settings-overlay]').open = false
})

/* When the filters form is submitted (event listener listens for the event)
a) default form submit behaviour is prevented , ie. page reload
b) formData is a means to capture/retrieve data after submitting a form 
c) filters and object containg  captured form fields (filters) as object entries is created 
d) an empty results array is created to store filtered books
e) you loop through entries in books array, where each item is assigned to variable book 
f) if grenre match is a boolean that indicates if the genre is at the staring point "any" or not 
g) for of loop / single genre loops through each genre 
h) if genre is at "any" break / stop looping process 
j)   
*/

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target) // What data type does new FormData create  
    const filters = Object.fromEntries(formData) // how does filters object know what to name the properties,
    //assuming the form fields are the values in key-value pairs of the object . Answer : name attribute in html elements
    const result = []

    /* book loops through each entry in the array books
    for each entry 
    a) let a variable ,genreMatch be true if if the user select option is all genres and false if its not // checks if we're at the default genre 
    b)   */

    for (const book of books) {
        let genreMatch = filters.genre === 'any'  // firstGenreElement  property: id (where  element.value = id) // checks if we're at the default genre

        for (const singleGenre of book.genres) {
            if (genreMatch) break; // stop looping through book genre match has been found 
            if (singleGenre === filters.genre) { genreMatch = true } // if one or more of the genres of a book match the user selected genre , then genreMatch = true 
        }

        /* After finding a genre match i.e genreMatch = true 
        if all the following conditions are true , then we push the book ( entry in books array) to the results array

        Condition 1 : the title is an empty string or title filter matches ( and or included ) a title in a book
        Condition 2 : the auther filter is at the default (All books , value = 'any') or the auther filter matches an author in a book
        Condition 3 : genreMatch = true  */


        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    ///////////////////////////////////////////////////////////////////////////////

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    //////////////////////////////////////////////////////////////////////////////

    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment()

    /* After  assigning the innerHTML of the main content to an empty string  and creating an hmtl fragment 
    a) Loop through each filtered book in the results array up to book 36
    b) Destructure relavant properties in the book object 
    c) Now each filtered book is represented by an object that contains the author , id, image, and title 
    d) for each  filtered book create a button element , assign the class 'preview to that button and set the value 
    of the data- preview attribute to its id
    e) Now using the properties from the destructured object, assign the inner html (content) in the button element to
     an image element that sources the image from ${image} , a header element containg ${title} and div element containing
     ${author} from the authors object
    f) Now that you have all the contents of the button for up to 36 books per page, go ahead and append the button 
    elemnts to the document fragment you created in the beginning , this fragment will  later be appendended to a 
    traditional html element at some point too */

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(newItems) // append html fragmnet with book buttons to a div nested in main content html 
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1  // show more button, when the difference 
    // between total books (or matches) and books displayed is zero , i.e no more books to be displayed , button is disabled.  

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span> 
    `
// in the case where matches is the filtered books and they happen to be less than 36 books , the show more button is disabled , in this case you 
// do not need a sho more button as there are no additional books dto display.

    window.scrollTo({top: 0, behavior: 'smooth'}); // set smooth scrolling behaviour to top. 
    document.querySelector('[data-search-overlay]').open = false
})




document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>7y
        `

        fragment.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
})

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook /* When the book Id matches to that of active 
                elements currently on display. The data-preview attribut can only be found on the button elements we create 
                from the books array, based on the BOOK_PER_PAGE constant. These are on the screen, either filtered or there 
                or there by default filtering */
            } 
        
            active = result // Active book (on display)
        }
    }

    /*
    -If you click on the data list items div and any of its child elements loop through the books array to pull up singleBook 
    objects.
    -Now match the book IDs on each book object to the currently active books.
    -Active = activebook , books that match the active book element(buttons on the screen)
    -If a book is active and the click event on the button element node , on the path happens, then 
    - A preview overlay should open and ...
    - the contents of the overlay should be determined based on the code inside the if statement.   
      */
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})