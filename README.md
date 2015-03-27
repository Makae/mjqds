# Makae JQuery Development Script

This Script provides simple insights to listeners registered on an dom element.


## Lists all the registered Functions on an element
```javascript
var css_selector = '#button'
makae_jqds.listListeners(css_selector);
```

## Lists the listeners Functions of a specific event on an element
```javascript
var css_selector = '#button'
var event = 'click';
makae_jqds.listListeners(css_selector, event);
```

## Prints all the registered Functions' code inside the console
```javascript
var css_selector = '#button'
makae_jqds.printListeners(css_selector);
```

## Prints all the registered Functions' code inside the console of a specific event
```javascript
var css_selector = '#button'
var event = 'click';
makae_jqds.printListeners(css_selector, event);
```