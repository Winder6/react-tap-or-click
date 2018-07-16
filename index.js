'use strict'

var isFunction = (function() {
    function typeOfFn(fn) {
        return typeof fn === 'function'
    }

    function objectFn(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]'
    }

    // typeof is fastest way to check if a function but older IEs don't support it for that and Chrome had a bug
    if (typeof typeOfFn === 'function' && typeof /./ !== 'function') {
        return typeOfFn
    }

    return objectFn
})()

function getCallbackHandlers(callback) {
        var state = {}

        handler = {
            callback: callback,
            touchStart: function(event) {
                if (event.defaultPrevented) {
                    return
                }

                clearTimeout(state.touchTimeout)
                state.touchClick = true
                callback(event)
            },
            touchEnd: function(event) {
                if (state.touchClick) {
                    state.touchTimeout = setTimeout(function() {
                        state.touchClick = false
                        state.touchTimeout = null
                    }, 50)
                }
            },
            click: function(event) {
                if (event.defaultPrevented || state.touchClick) {
                    return
                }
                callback(event)
            }
        }

    return handler
}

// event handlers are unnecessary server side
if (typeof window === 'undefined') {
    module.exports = function(callback, props) {
        if (props == null) {
            props = {}
        }
        return props
    }
} else {
    module.exports = function tapOrClick(callback, props) {
        if (props == null) {
            props = {}
        } else if (typeof props !== 'object') {
            throw new Error('Optional second argument to tapOrClick must be a mutable object')
        }

        var handlers = getCallbackHandlers(callback)

        props.onTouchStart = handlers.touchStart
        props.onTouchEnd = handlers.touchEnd
        props.onClick = handlers.click

        return props
    }
}
