// Fully working scripts.js file

// why not use the imported books object directly ? matches array changes depending on whether we just loaded the page,
// or filtered for results , or showing more books. We desture {author , id , image ,title } from this array to create book elements

/* createDocumentFragment is a method that creates a new empty DocumentFragment object, which can be used as a temporary container to hold
 multiple DOM nodes before appending them to the document*/

 /*The document.createElement() method is used to dynamically create a new element node in the DOM (Document Object Model).
     It takes a string parameter representing the HTML tag name of the element you want to create. In this case, 'button' is
      passed as the parameter, indicating that a new <button> element should be created */

    /*assign a single class name 'preview' to the classList property of the element. However, the correct way to add a class
     to an element's class list is by using the add() method of the classList object.  e.g element.classList.add= 'preview'*/


    /* The setAttribute() method is a JavaScript DOM method used to set the value of an attribute on an element. It takes two
     parameters: the name of the attribute and the value to be assigned to that attribute. */
 

const defaultBooks = matches.slice(0, BOOKS_PER_PAGE)

const createBookElement = () => {
   
    const {author, id, image ,title } = defaultBooks
  
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






defaultBooks.forEach(createBookElement)




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



