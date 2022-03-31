 # ![Image](./Images/jquery-vs-javascript.jpeg)

# JS-vs-jQuery
 To help people, here’s a jQuery to JavaScript cheat sheet that includes the JavaScript equivalents to the most frequently used jQuery functionality.

## Convert JavaScript to jQuery

***JavaScript:*** is an object orient programming language designed to make web development easier and more attractive.
***jQuery:*** is an open-source JavaScript library that simplifies the interactions between an HTML/CSS document, or more precisely the Document Object Model (DOM), and JavaScript.

### How to convert JavaScript to jQuery ?

**Selection:** In ***jQuery***, to select any element, we simply use the`$()`sign, but in JavaScript, to select any element, we can use`querySelector()`or`querySelectorAll()`.

#### Program

```javascript
// jQuery to select all instances
// of class "select"
$(".select");
  
// JavaScript to select only the
// first instance of class "select"
document.querySelector(".select");
  
// To select all the instances
// of class "select"  
document.querySelectorAll(".select");
```

##### Some other examples of selectors

**Select Elements:**

* ***jQuery:***

```javascript
// Syntax
jQuery();
$(); // Shortcut

// Example
// Selects all the links among the descendants of the 'my-class' class.
jQuery('.my-class a');
$('.my-class a');
$("html") // To select the entire html.
$("body") // To select the entire html body.
```

#### See more in the jQuery API docs:[jQuery() global function](https://api.jquery.com/jQuery/)

* ***JavaScript:***

```javascript
// Syntax
document.querySelectorAll();
// Example
document.querySelector(selector)
document.querySelector('.my-class a')
document.body
```

#### See more in the DOM API docs: [.querySelectorAll() method.](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

### Select First Element

* ***jQuery:***

```javascript
// Syntax
.first();

// Example
$('.my-class a').first();
```

#### See more in the jQuery API docs: [first() method.](https://api.jquery.com/first/)

* ***JavaScript:***

```javascript
// Syntax
document.querySelector();

// Example
document.querySelector('.my-class a');
```

#### See more in the DOM API docs: [.querySelector() method.](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

### Find Elements

* ***jQuery:***

```javascript
// Syntax
.find();

// Example
// Find all the span tags that are descendants of links within the 'my-class' class.
// Note: searches for all descendants not just for children.
$('.my-class a').find('span');
$('.my-class a').find('span').css('color', 'red');
```

#### See more in the jQuery API docs: [.find() method.](https://api.jquery.com/find/)

* ***JavaScript:***

```javascript
// Syntax
// To find the first element (also if there's only one)
document.querySelector();
 
// To find all elements
document.querySelectorAll();

// Example
// At first querySelectorAll() returns a NodeList, so we have to loop through it to find all the span tags we want.
// For the sake of testing, I made the selected elements red, you can find the 'style.color' property below in this cheat sheet.

// finds all '.my-class a'
let nodes = document.querySelectorAll('.my-class a');
 
// loops through all '.my-class a'
for (let i = 0; i < nodes.length; i++) {
     
    // checks if the individual '.my-class a' element has a 
    // 'span' descendant to avoid 'undefined' error
    if (nodes[i].querySelector('span')) {
         
      // colors span tags that are desdendants of '.my-class a'
      nodes[i].querySelector('span').style.color = 'red';
   }
}
```

#### See more in the DOM API docs: [.querySelector() method](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), [.querySelectorAll() method.](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

### Select Children

* ***jQuery:***

```javascript
// Syntax
.children();
.children('selector');

// Example
// Finds all the children of all '.my-class a' elements on the age
// Finds all the 'span' elements that are the children of any '.my-class a' element on the page
// Note: searches only for children (first-level of descendants)
$('.my-class a').children();
$('.my-class a').children('span');
$('.my-class a').children('span').css('color', 'blue'); // for testing
```

#### See more in the jQuery API docs: [.children() method.](https://api.jquery.com/children/)

* ***JavaScript:***

```javascript
// Syntax
parentNode.children;

// Example
// 2nd example of the jQuery version above, plus makes the selected span tags blue for the sake of easy testing.
// for 1st example, only leave out the if check at the end (we need this because the JS version is not a method but a property, so we need to check which children are 'span')

// selects all the elements with 'my-class a' on the page
let items = document.querySelectorAll('.my-class a');
 
// loops through all the elements with '.my-class a'
for (let i = 0; i < items.length; i++) {
     
        // finds the children of the current '.my-class a' element
        let kids = items[i].children;
         
        // loops through the children of the current '.my-class a' element
        for (let j = 0; j < kids.length; j++) {
             
            // checks if the child element is a span tag
            if (kids[j].tagName == 'SPAN') {
         
                  kids[j].style.color = 'blue';
       
            }
        }
}
```

#### See more in the DOM API docs: [.children property](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)

### Select Parent

* ***jQuery:***

```javascript
// Syntax
.parent();

// Example
// Selects the parent elements of ALL elements with 'my-class a' on the page.
  
$('.my-class a');
```

#### See more in the jQuery API docs: [.parent() method](https://api.jquery.com/parent/)

* ***JavaScript:***

```javascript
/* Syntax */
Node.parentNode;

// Example
// Selects the parent of the FIRST element with 'my-class a' on the page (for the sake of less repetition)
// For looping through all '.my-class a' elements, use the looping solution and querySelectorAll() from the two examples above.
 
let item = document.querySelector('.my-class a');
item.parentNode;
```

#### See more in the DOM API docs: [.parentNode property.](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)

### Select Siblings

* ***jQuery:***

```javascript
// Syntax
.siblings();

// Example
// Selects the siblings of ALL elements with the 'find-siblings' class on the page.

$('.find-siblings').siblings();
```

#### See more in the jQuery API docs: [.siblings() method.](https://api.jquery.com/siblings/)

* ***JavaScript:***

```javascript
// Syntax
Node.parentNode.querySelectorAll(":not(#elem)");

// Example
// Selects the siblings of the FIRST element with the 'find-siblings' class.
// For looping through all 'find-siblings' elements, see examples #3 and #4 the ':scope' pseudoclass is necessary for preventing the child elements of 'item' from being selected (otherwise querySelectorAll() searches through all descendants of 'item', with ':scope >' it loops through just the first level).
let item = document.querySelector('.find-siblings');
let siblings = item.parentNode.querySelectorAll(':scope > :not(.find-siblings)');
```

#### See more in the DOM API docs: [.parentNode property](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode), [.querySelectorAll() method](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), [:scope pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope)

### Select Next Sibling

* ***jQuery:***

```javascript
//Syntax
.next();

// Example
// Selects the next siblings of all elements with 'my-class a' on the page.
$('.my-class a').next();
```

#### See more in the jQuery API docs: [.next() method.](https://api.jquery.com/next/)

* ***JavaScript:***

```javascript
// Syntax
nonDocumentTypeChildNode.nextElementSibling;

// Example
// For declaring the 'item' variable by selecting elements with 'my-class a' on the page, see examples #3, #4, #5.
item.nextElementSibling;
```

#### See more in the DOM API docs: [.nextElementSibling property.](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)

### Select Previous Sibling

* ***jQuery:***

```javascript
// Syntax
.prev();

// Example
// Selects the previous siblings of all elements with 'my-class a' on the page.
$('.my-class a').prev();
```

#### See more in the jQuery API docs: [.prev() method.](https://api.jquery.com/prev/)

* ***JavaScript:***

```javascript
// Syntax
nonDocumentTypeChildNode.previousElementSibling;

// Example
// For declaring the 'item' variable by selecting elements with 'my-class a' on the page, see examples examples #3, #4, #5.
item.previousElementSibling;
```

#### See more in the DOM API docs: [.previousElementSibling property.](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)

### Add Class

* ***jQuery:***

```javascript
// Syntax
addClass();

// Example
// Adds the 'second-class' class to every 'my-class' element.
$('.my-class').addClass('second-class');
```

#### See more in the jQuery API docs: [.addClass() method.](https://api.jquery.com/addclass/)

* ***JavaScript:***

```javascript
// Syntax
// Example
// For declaring the 'item' variable by selecting elements with 'my-class' on the page, see examples examples #3, #4, #5.
item.classList.add('second-class');
```

#### See more in the DOM API docs: [.classList property](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) and [.add() method](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add)

### Remove Class

* ***jQuery:***

```javascript
//Syntax
.removeClass();

// Example
// Removes the 'second-class' class from every 'my-class' element.
// Removes 'second-class', then add 'third-class' to every 'my-class' element.
$('.my-class').removeClass('second-class');
$('.my-class').removeClass('second-class').addClass('third-class');
```

#### See more in the jQuery API docs: [.removeClass() method.](https://api.jquery.com/removeclass/)

* ***JavaScript:***

```javascript
// Syntax
Element.classList.remove();

// Example
// For declaring the 'item' variable by selecting elements with 'my-class' on the page, see examples examples #3, #4, #5.
  
item.classList.remove('second-class');
 
// To use it together with add(), you need two separate statements.
item.classList.remove('second-class');
item.classList.add('third-class');
```

#### See more in the DOM API docs: [.classList property](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), [.remove() method.](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove)

### Toggle Class

* ***jQuery:***

```javascript
// Syntax
.toggleClass();

// Example
// Adds the 'active' class to elements with 'my-class' if they don' have it remove it if they have it.
$('.my-class').toggleClass('active');
```

#### See more in the jQuery API docs: [.toggleClass() method.](https://api.jquery.com/toggleclass/)

* ***JavaScript:***

```javascript
// Syntax
Element.classList.toggle();

// Example 
// For declaring the 'item' variable, see examples #3, #4, #5.
item.classList.toggle('active');
```

#### See more in the DOM API docs: [.classList property](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), [.toggle() method.](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle)

### Has Class

* ***jQuery:***

```javascript
// Syntax
.hasClass();

// Example
// Checks if any element with 'my-class' has the 'active' class.
// Returns true or false
// If there's at least one element with 'active' it's true, otherwise false.
$('.my-class').hasClass('active');
```

#### See more in the jQuery API docs: [.hasClass() method.](https://api.jquery.com/hasclass/)

* ***JavaScript:***

```javascript
// Syntax
element.classList.contains();

// Example 
// Similar to the jQuery version, this one also checks if any element in the whole classList has the 'active' class
// If at least one element has 'active', it's true, otherwise false.
// For declaring the 'item' variable, see examples #3, #4, #5.
item.classList.contains('active');
```

#### See more in the DOM API docs: [.classList property](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), [.contains() method.](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains)

### Get Attribute

* ***jQuery:***

```javascript
// Syntax
.attr('attr-name');

// Example
// Returns the value of the href property of the FIRST occurrence of an element with 'my-class'
$('.my-class').attr('href');
```

#### See more in the jQuery API docs: [.attr() method.](https://api.jquery.com/attr/)

* ***JavaScript:***

```javascript
/* Syntax */
Element.getAttribute('attr-name');

// Example
// For declaring the 'item' variable, see examples #3, #4, #5.
 item.getAttribute('href');
```

#### See more in the DOM API docs: [.getAttribute() method.](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)

### Set Attribute

* ***jQuery:***

```javascript
// Syntax
.attr('attr-name', value);

// Example
// Sets the value of the href property for ALL contact links that have the 'contact-link' class
$('.contact-link').attr('href', 'contact.html');
```

#### See more in jQuery API docs: [.attr() method](https://api.jquery.com/attr/) (you need to use the same `.attr()` method as for getting an attribute value, but with two parameters instead of one)

* ***JavaScript:***

```javascript
// Syntax
Element.setAttribute();

// Example
// For declaring the 'item' variable, see examples #3, #4, #5.
item.setAttribute('href', 'contact.html');
```

#### See more in the DOM API docs: [.setAttribute() method.](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)

### Remove Attribute

* ***jQuery:***

```javascript
// Syntax
.removeAttr('attr-name');
// Example
// Removes 'target' attributes from contact links.
$('.contact-link').removeAttr('target');
```

#### See more in the jQuery API docs: [.removeAttr() method.](https://api.jquery.com/removeAttr/)

* ***JavaScript:***

```javascript
// Syntax
Element.removeAttribute();

// Example
// For declaring the 'item' variable, see examples #3, #4, #5.
 item.removeAttribute('target');
```

#### See more in the DOM API docs: [.removeAttribute() method.](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute)

### Append a New Child Element

* ***jQuery:***

```javascript
//Syntax
.append('html-string');

// Example
// Appends an extra list element to the end of every ordered list on the page.
$("ol").append("<li>");
```

#### See more in the jQuery API docs: [.append() method.](https://api.jquery.com/append/)

* ***JavaScript:***

```javascript
// Syntax
Node.appendChild();
// Example
// For declaring the 'ol' variable, see examples #3, #4, #5.
ol.appendChild(document.createElement("li"));
```

#### See more in the DOM API docs: [.appendChild() method](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) and [.createElement() method.](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

### Prepend a New Child Element

* ***jQuery:***

```javascript
// Syntax
  
.prepend('html-string');

// Example
// Prepends an extra list element to the beginning of every ordered list on the page.
$("ol").prepend("<li>");
```

#### See more in the jQuery API docs: [.prepend() method.](https://api.jquery.com/prepend/)

* ***JavaScript:***

```javascript
// Syntax
  
Node.insertBefore();

// Example 
// For declaring the 'ol' variable, see examples #3, #4, #5.
ol.insertBefore(document.createElement("li"), ol.firstChild);
```

#### See more in the DOM API docs: [.insertBefore() method](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore), [.createElement() method](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and [firstChild property.](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)

### Get or Set HTML Content

* ***jQuery:***

```javascript
// Syntax
.html();
.html('html-string');

// Example
// Gets the HTML content of the FIRST element that matches 'my-class'.
// Sets/resets the HTML content of EACH element that matches 'my-class'.
$('.my-class').html();
$('.my-class').html('<em>Hello</em>');
```

#### See more in the jQuery API docs: [.html() method.](https://api.jquery.com/html/)

* ***JavaScript:***

```javascript
// Syntax
Element.innerHTML;
// Example 
// For declaring the 'item' variable, see examples #3, #4, #5.
item.innerHTML; // gets the value.
item.innerHTML = '<em>Hello</em>'; // sets the value.
```

#### See more in the DOM API docs: [.innerHTML property.](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

### Get or Set CSS Property

* ***jQuery:***

```javascript
// Syntax
.css('property-name');
.css('property-name', value);

// Example
// Gets the 'color' value of the FIRST element that has 'my-class'.
// Sets the 'color' value to 'white' for EVERY element that has 'my-class'.
$('.my-class').css('color');
$('.my-class').css('color', 'white');
```

#### See more in the jQuery API docs: [.css() method.](https://api.jquery.com/css/)

* ***JavaScript:***

```javascript
// Syntax
ElementCSSInlineStyle.style.{propertyName};

// Example 
// For declaring the 'item' variable, see examples #3, #4, #5.
item.style.color; // getting value
item.style.color = 'white'; // setting value
```

#### See more in the DOM API docs: [.style property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) and [CSS Properties Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference) (for the JavaScript names of CSS properties)

### Get or Set Text Content of an Element and All of Its Descendants

* ***jQuery:***

```javascript
// Syntax
.text();
.text('text');

// Example
// Gets the text content of the FIRST element (and all of its descendants) that matches 'my-class'.
// Sets/resets the text content of EACH element that matches 'my-class'.
$('.my-class').text();
$('.my-class').text('<em>Hello</em>');
```

#### See more in the jQuery API docs: [.text() method.](https://api.jquery.com/text/)

* ***JavaScript:***

```javascript
// Syntax
Element.textContent;

// Example
// For declaring the 'item' variable, see examples #3, #4, #5.
item.textContent; // gets the value
item.textContent = '<em>Hello</em>'; // sets the value
```

#### See more in the DOM API docs: [.textContent property.](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

### Get or Set Input Values

* ***jQuery:***

```javascript
// Syntax
.val();
.val(val);

// Example
// Gets the value of the input with the 'name' name.
// Sets/resets the value of the input with the 'name' name.
$('input[name=name]').val();
$('input[name=name]').val('Marilyn Monroe');
```

#### See more in the jQuery API docs: [.val() method.](https://api.jquery.com/val/)

* ***JavaScript:***

```javascript
// Syntax
HTMLInputElement.value;

// Example
// For declaring the 'input' variable, see examples #3, #4, #5.
input.value; // gets the value
input.value = 'Marilyn Monroe'; // sets the value
```

#### See more in the DOM API docs: [.value property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) (in the list of ''Properties that apply to any type of input element that is not hidden")

### Hide Element

* ***jQuery:***

```javascript
// Syntax
.hide();

// Example
// Hides all elements with 'my-class'.
$('.my-class').hide();
```

#### See more in the jQuery API docs: [.hide() method.](https://api.jquery.com/hide/)

* ***JavaScript:***

```javascript
// Syntax
ElementCSSInlineStyle.style.display = 'none';

// Example
// For declaring the 'item' variable, see examples #3, #4, #5.
item.style.display = 'none';
```

#### See more in the DOM API docs: [.style property.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)

### Show Element

* ***jQuery:***

```javascript
// Syntax
.show();

// Example
// Displays all elements with 'my-class'.
$('.my-class').show()
```

#### See more in the jQuery API docs: [.show() method.](https://api.jquery.com/show/)

* ***JavaScript:***

```javascript
// Syntax
ElementCSSInlineStyle.style.display = '';

// Example
// For declaring the 'item' variable, see examples #3, #4, #5.
item.style.display = ''; // resets default.
item.style.display = 'block'; // sets display as block.
item.style.display = 'flex'; // sets display as flex.
```

#### See more in the DOM API docs: [.style property.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style#syntax)

### Add Event Listener

* ***jQuery:***

```javascript
// Syntax
.on();

// Example
// Adds or removes the 'active' class to/from all elements with '.submenu' when #toggle is clicked.
$('#toggle').on('click', function(){
    $('.submenu').toggleClass('active');
});
```

#### See more in the jQuery API docs: [.on() method](https://api.jquery.com/on/)

* ***JavaScript:***

```javascript
// Syntax
EventTarget.addEventListener('event', functionName);

// Example  
// The code below only selects the FIRST element with the 'submenu' class.
// To select all submenus, use the 'for' loop in // Example #3 and #4.
let toggle = document.querySelector("#toggle");
let submenu = document.querySelector(".submenu");
 
toggle.addEventListener('click', function() {
   submenu.classList.toggle('active'); 
});
```

#### See more in the DOM API docs: [.addEventListener() method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [DOM Event Reference.](https://developer.mozilla.org/en-US/docs/Web/Events)

### Remove Event Listener

* ***jQuery:***

```javascript
// Syntax
.off();

// Example
// Removes the listed event handler when #toggle is clicked.
$('#toggle').off('click', function(){
    $('.submenu').toggleClass('active');
});
```

#### See more in the jQuery API docs: [.off() method.](https://api.jquery.com/off/)

* ***JavaScript:***

```javascript
// Syntax
EventTarget.removeEventListener('event', functionName);

// Example
// The code below only selects the FIRST element with the 'submenu' class.
// To select all submenus, use the 'for' loop in Example #3 and #4.
let toggle = document.querySelector("#toggle");
let submenu = document.querySelector(".submenu");
  
toggle.removeEventListener('click', function() {
   submenu.classList.toggle('active'); 
});
```

#### See more in the DOM API docs: [.removeEventListener() method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) and [DOM Event Reference.](https://developer.mozilla.org/en-US/docs/Web/Events)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

