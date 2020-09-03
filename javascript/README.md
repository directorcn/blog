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



## 为什么 Promise 比 setTimeout 先执行

`setTimeout` 是浏览器（宿主环境）的 `API`，它产生宏任务，而 `promise` 产生的是 `JavaScript` 引擎内部的微任务；每一个宏任务都有一个微任务队列，当前宏任务执行完成后，判断微任务队列有木有等待的微任务，若有，依次执行微任务，若无，执行下一个宏任务**。**

```js
async function foo() {
    console.log('0');
    await new Promise(resolve => resolve());
    console.log('1');
}

new Promise(resolve => { console.log('0'); resolve()})
    .then(() => console.log('3'));

setTimeout(() => {
    console.log('4');
    new Promise(resolve => resolve())
        .then(() => console.log('5'));
}, 0);
console.log('6');
console.log('7');
foo();
```

<div><pre>  宏任务 <u>setTimeout、setInterval、Event 等都产生宏任务</u>
   2，6，7，0    # 第一个宏任务的同步代码
    微任务 <u>Promise、MutationObserver 产生微任务</u>
     3，1       # 第一个宏任务的异步代码
  >>>
  宏任务
   4           # 第二个宏任务的同步代码
    微任务
     5         # 第二个宏任务的异步代码</pre></div>

**在一个宏任务中，分别创建一个宏任务和微任务，微任务永远是先于宏任务执行的。**

*番外：*

[EventLoop]()

同步异步都是相对来说的，在一个异步任务里也会有同步代码，所以在区分同步异步前，应该先找好*参考系*。

