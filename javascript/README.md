# JavaScript

## var、let 以及 const 的区别

* `var` 声明的变量存在**变量提升**，局部提升（只提升声明部分，值为 `undefined`）；
* `let`、`const` 的变量提升，只**提升声明部分**，不会赋值，也就是说，在 `BlockStatement` 内部，只要使用`let`、`const` 声明，读到块语句的开始，变量就已经声明好了，只是还没有赋值，也不是 `undefined`，只有读到变量声明的位置，变量才可用，这在语法上称作“暂时性死区”（TDZ）;
* `let`、`const` 支持块级作用域，`let` 可以只声明不赋值，`const` 声明的同时必须赋值，否则抛错；
* `let` 声明的变量可以被修改，`const` 一经声明不可改变（引用类型的值可以修改，不行被修改可以冻结对象 `Object.freeze()`）；

```js
console.log(a); // undefiend
var a = 100;

{
    console.log(b); // ReferenceError: Cannot access 'b' before initialization
	let b = 100;
}
```

*番外：*

`function` 关键字声明的函数会**整体提升**。

```js
foo(); // 1
function foo() {
    console.log(1);
}

/*******************************/
console.log(a); // undefined
var a = 100;

// 等同于
var a;
console.log(a); 
a = 100;
```



## for…of 与 for…in 区别

* 具有 `Iterator` 接口的数据结构（数组，字符串，类数组，`Arguments`、`Map`，`Set` 等）都可以用 `for...of` **迭代** ，`for...of` 内部调用的是数据结构的 `Symbol.iterator` 方法；

* `for...in...` 用来**枚举**对象的属性，会找原型链上的属性，只枚举自身的属性需借助 `hasOwnProperty` 属性。
* 拿 `k/v` 来讲，`for...of` **迭代**的是元素（值 `value`），`for...in` **枚举**的是属性（键 `key`）。 

*番外：*

`forEach` 遍历数组不能中断，且没有返回值。

```js
var arr = [1, 2, 3, 4, 5];
arr.forEach(v => {
    if (v === 2)
    	return false;
    console.log(v); // 1, 3, 4, 5
});
```

