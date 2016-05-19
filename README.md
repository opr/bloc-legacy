## Synopsis

A collection of files that make it easy to rapidly prototype front-end components using JavaScript, Sass and [CSStyle's](https://github.com/geddski/csstyle) implementation of the BEM methodology.

## Code Example

HTML to make a component called "my fancy component" with two pieces of text in, one with a fancy option and one without. 

File: **components/my-fancy-component.php**

```html
<div class="my-fancy-component">
    <span class="my-fancy-component__my-fancy-part">Hello</span>
    <span class="my-fancy-component__my-fancy-part --inactive">Hello</span>
</div>
```

The sass below sets up the component: "my-fancy-component", the parts of the component: "my-fancy-part" and an option that can be applied to the parts: "inactive".
File: **assets/styles/scss/components/_my-fancy-component.scss**

```sass
@include component('my-fancy-component') {
  
  @include part(my-fancy-part) {
    color: green;
    
    @include option(inactive) {
      color: #444;
    }
  }
}
```

## Installation

Grab the repo, put it somewhere a web server that can handle PHP files can see it, and navigate to it!


## License

Do what you want.
