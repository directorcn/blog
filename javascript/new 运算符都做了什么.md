# new 运算符都做了什么

> All ECMAScript function objects have the [[Call]] internal method defined here. ECMAScript functions that are also constructors in addition have the [[Construct]] internal method.

[ecma-262 原文](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-ecmascript-function-objects)

所有的函数都有 `[[Call]]` 内部方法，构造函数也是函数，还具有`[[Construct]]` 内部方法。

当我们执行函数的时候，其实就是在调用其内部的 `[[Call]]` 方法，`[[Call]]` 方法是宿主环境提供的，我们永远无法使用 `JavaScript` 代码去实现它。

```js
function Foo() {
    this.value = 100;
    return {
        getValue: () => this.value;
    }
}

var foo = new Foo;
foo.getValue(); // 100
```

`new` 调用，`[[Constructor]]` 的执行过程如下：

* 以 `Object.prototype` 为原型创建一个新的对象；
* 以新对象为 `this`，执行函数的 `[[Call]]`；
* 如果 `[[Call]]` 的返回值是对象，那么，返回这个对象，否则返回第一步创建的新对象。

模拟 `new` 的行为

```js
function myNew() {
    var o = Object.create(Object.prototype);
    var result = Array.prototype.shift.call(arguments).call(o, arguments);
    return typeof result === 'object' ? result : o;
}
```



```js
function F() {
    this.value = 100;
    return 1;
}
function Foo() {
    this.value = 100;
    return {
        getValue: () => this.value;
    };
}

myNew(F); // { value: 100 }
myNew(Foo); // f { getValue: () => this.value; }
myNew(Foo).getValue(); // 100
```



