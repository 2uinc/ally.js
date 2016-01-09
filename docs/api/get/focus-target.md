---
layout: doc-api.html
tags: internal, argument-list
---

# ally.get.focusTarget

Identifies the element that would get focus upon click


## Description

When clicking on the `<span>` element, focus is given to the `<div>`, because it's the first focusable parent element.

```html
<div tabindex="-1">
  <p>Hello <span>World</span>!</p>
</div>
```


## Usage

```js
var element = ally.get.focusTarget({
  context: '#element-to-start-from',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to start searching from. The first element of a collection is used. |

### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified.


## Examples


## Notes


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/focus-target.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/focus-target.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.focus-target.test.js)

