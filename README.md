# react-tap-or-click

fix memory leak in react(due to the global variable 'cache')

## How?

`npm i https://github.com/Winder6/react-tap-or-click.git`

### Babel and JSX

```jsx
import React from 'react'
import tapOrClick from 'react-tap-or-click'

const YourComponent = React.createClass({
    handleClick(event) {
        alert(event.type)
    },

    render() {
        return <div {...tapOrClick(this.handleClick)}>
            My Component
        </div>  
    }
})

export default YourComponent
```

### ES5

```js
'use strict'
var React = require('react')
var tapOrClick = require('react-tap-or-click')

var YourComponent = React.createClass({
    handleClick: function(event) {
        alert(event.type)
    },

    render: function() {
        var props = {
            style: {
                backgroundColor: '#EEE'
            }
        }

        // you can pass props as second argument to extend that props object
        return React.DOM.div(
            tapOrClick(this.handleClick, props),
            'My Component'
        )
    }
})

module.exports = YourComponent
```

## Notes

- `react-tap-or-click` always respects `event.preventDefault()`.
- Any existing `onTouchStart`, `onTouchEnd` or `onClick` will be overwritten.
