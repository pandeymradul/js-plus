/* js-plus v1.0.0 16-03-2014 

Copyright 2013 mradul pandey

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/

//Array.isArray

if (!Array.isArray) {
    Array.isArray = function (vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    };
}

//String.prototype.trim

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

//Array.prototype.forEach

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function forEach(callback, thisArg) {
        'use strict';
        var T, k;

        if (this === null) {
            throw new TypeError("this is null or not defined");
        }

        var kValue,
        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            O = Object(this),

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
            len = O.length >>> 0; // Hack to convert O.length to a UInt32

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if ({}.toString.call(callback) !== "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length >= 2) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

//Array.prototype.filter

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp*/) {
        'use strict';

        if (!this) {
            throw new TypeError();
        }

        var objects = Object(this);
        var len = objects.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisp = arguments[1];
        for (var i in objects) {
            if (objects.hasOwnProperty(i)) {
                if (fun.call(thisp, objects[i], i, objects)) {
                    res.push(objects[i]);
                }
            }
        }

        return res;
    };
}
/**
 * Created by mradul on 10/01/14.
 */
var $ = $ || {};
$.jsp = $.jsp || {};
$.jsp.base = $.jsp.base || {};

$.jsp.base.JSPlusBaseException = function(message) {
    this.name = "JS Plus Base Exception";
    this.message = message;
};

// subclass extends superclass
$.jsp.base.JSPlusBaseException.prototype = Object.create(Error.prototype);

// fixed constructor
$.jsp.base.JSPlusBaseException.prototype.constructor = $.jsp.base.JSPlusBaseException;


$.jsp.base.JSPlusBaseException.prototype.toString = function() {
    return '[' + this.name + '] ' + this.message;
};
var $ = $ || {};
$.helper = $.helper || {};

$.helper.Splitter = function () {

    var that = this;

    var _on = " ";
    var _trim = false;
    var _omit = false;

    that.on = function (argument) {
        _on = argument;
        return that;
    };
    that.trimResult = function () {
        _trim = true;
        return that;
    };

    that.omitEmptyString = function () {
        _omit = true;
        return that;
    };

    that.split = function (str) {
        var _arr = str.split(_on);
        var _tempArr = null;
        if (_trim || _omit) {
            _tempArr = [];
            for (var i = 0; i < _arr.length; i++) {

                var val = _arr[i].replace(/^\s+|\s+$/g, '');

                if ((_omit && _trim) && val.length) {
                    _tempArr.push(val);
                }
                else if (_trim) {
                    _tempArr.push(val);
                }
                else if (_omit && val.length) {
                    _tempArr.push(_arr);
                }

            }
        }
        else {
            _tempArr = _arr;
        }


        return _tempArr;
    };

    return that;

};
var $ = $ || {};
$.helper = $.helper || {};

$.helper.Joiner = function () {

    var that = this;

    var _on = " ";
    var _useForNull = null;
    var _skipNulls = false;

    that.on = function (argument) {
        _on = argument;
        return that;
    };

    that.skipNulls = function () {
        _skipNulls = true;
        return that;
    };

    that.useForNull = function (argument) {
        _useForNull = argument;
        return that;
    };

    that.join = function () {
        var val = "";

        if (!arguments.length) return val;

        for (var i = 0; i < arguments.length; i++) {
            if (_useForNull) {
                val += (arguments[i] === null ? _useForNull + _on : arguments[i] + _on);
            }
            else if (_skipNulls) {
                val += (arguments[i] === null ? "" : arguments[i] + _on);
            }
            else {
                val += (arguments[i] + _on);
            }
        }

        return val.slice(0, val.length - _on.length);
    };

    return that;

};
/**
 * Created by mradul on 10/01/14.
 */
var $ = $ || {};
$.jsp = $.jsp || {};
$.jsp.collection = $.jsp.collection || {};

$.jsp.collection.JSPlusCollectionException = function(message) {
    $.jsp.base.JSPlusBaseException.call(this,message);
};

// subclass extends superclass
$.jsp.collection.JSPlusCollectionException.prototype = Object.create($.jsp.base.JSPlusBaseException.prototype);

// fixed constructor
$.jsp.collection.JSPlusCollectionException.prototype.constructor = $.jsp.collection.JSPlusCollectionException;
var $ = $ || {};
$.jsp = $.jsp || {};
$.jsp.collection = $.jsp.collection || {};


$.jsp.collection.Collection = function () {


    /***** ***** ***** *****   PRIVATE   ***** ***** ***** *****/

    var internalArray = [];

    var modCount = 0;

    var expectedModCount = 0;

    var checkModifiedCount = function()
    {
        if(modCount!=expectedModCount)
        {
            throw new $.jsp.collection.JSPlusCollectionException("Collection modified after getting iterator");
        }
    };

    var checkIndex = function(index,message)
    {
        if(internalArray.length === 0 || index < 0 || index >= internalArray.length)
        {
            throw new $.jsp.collection.JSPlusCollectionException(message);
        }
    };

    /***** ***** ***** *****  END PRIVATE ***** ***** ***** *****/


    /***** ***** ***** *****     PUBLIC   ***** ***** ***** *****/

    this.add = function (element,index) {

        modCount++;

        if (index !== undefined && index !== null)
        {
            checkIndex(index,"Exception in adding element on index : "+index+", index not exist in Collection");
            internalArray.splice(index, 0, element);
        }
        else
        {
            internalArray.push(element);
        }
    };


    this.length = function () {
        return internalArray.length;
    };

    this.indexOf = function (element) {

        if (element !== undefined && element !== null) {
            throw new $.jsp.collection.JSPlusCollectionException("element is null in $.jsp.collection.Collection.indexOf(element ,[start])");
        }
        var index = -1;
        for(var i = 0 ; i<internalArray.length;i++)
        {
            if(element.equals(internalArray[i]))
            {
                index = i;
                break;
            }
        }
        return  index;
    };

    this.lastIndexOf = function (element) {

        if (element !== undefined && element !== null) {
            throw new $.jsp.collection.JSPlusCollectionException("element is null in $.jsp.collection.Collection.lastIndexOf(element ,[start])");
        }
        var index = -1;
        for(var i = internalArray.length-1 ; i>=0;i--)
        {
            if(element.equals(internalArray[i]))
            {
                index = i;
                break;
            }
        }
        return  index;

    };

    this.contains = function (element) {

         return indexOf(element) >= 0;

    };


    this.iterator = function(){
            var index = 0;

            var length = internalArray.length;

            expectedModCount = modCount;

            return {
                next:function () {
                    checkModifiedCount();
                    var element;
                    if (!this.hasNext()) {
                        return null;
                    }
                    element = internalArray[index];
                    index = index + 2;
                    return element;
                },

                hasNext:function () {
                    checkModifiedCount();
                    return index < length;
                },

                current:function () {
                    checkModifiedCount();
                    return internalArray[index];
                },

                reset:function () {
                    index = 0;
                    expectedModCount = modCount;
                }
        };
    };

    /***** ***** ***** *****   END  PUBLIC   ***** ***** ***** *****/

};