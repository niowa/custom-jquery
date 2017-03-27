'use strict';

(function init() {
  window.$ = function(input) {
    return new Init(document.querySelectorAll(input));
  }
  
  function Init(elements) {
    this.elements = Array.from(elements);
    return this;
  }

  Init.prototype.addClass = function (value) {
    if (typeof value === 'function') value = value(0, this.elements);
        
		value = value.split(' ');
        this.each(function (index, sel) {
            value.forEach((current) => {
               sel.classList.add(current);
             })
           })
     return this;       
  }

  Init.prototype.each = function (callback) {
    for (let i = 0; i < this.elements.length; i++) {
      let result = callback.call(this.elements[i], i, this.elements[i]);
      if (result === false) break;
    }
    return this;
  }
  
  
  Init.prototype.append = function (newChild) {
    if (typeof newChild == 'string') {
        if (this.elements.length > 1) {
            this.elements.forEach(element =>
                element.innerHTML = newChild);
        } else {
            this.elements[0].innerHTML = newChild;
        }
 
    } else {
        this.elements.forEach((element, index) => {
            if (newChild.hasOwnProperty('elements')) {
                element.appendChild(newChild.elements[0].cloneNode(true))
            } else {
                element.appendChild(newChild.cloneNode(true))
            }
        });
 
    }
    return this;
  }
  
  Init.prototype.attr = function (attr, args) {
    if (arguments.length == 1) {
        return this.elements[0].getAttribute(attr);
    } else {
        this.elements.forEach(element => {
            for (let i = 0; i < arguments.length; i += 2) {
                element.setAttribute(arguments[i], arguments[i + 1]);
            }
        });
    }
    return this;
  }
  
  Init.prototype.children = function () {
    if (typeof this.elements.length == 'undefined') {
        this.elements.children;
    }
    return this.elements[0].children;
  }
  
  Init.prototype.html = function(arg) {
    if (!arg) return this.elements[0].innerHTML;
    if (typeof(arg) === "string") this.each(function (index, item) { item.innerHTML = arg; });
    if (typeof(arg) === "function") this.each(function (index, item) {item.innerHTML = arg(index); });
    return this;
  }    

}());
