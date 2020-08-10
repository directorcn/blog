# BoxModel

![box model](https://raw.githubusercontent.com/directorcn/images/master/blog/css/box-model.png)

* content 内容
  * width
  * height
* padding 内填充
* border 边框
* margin 外边距(留白)

这里之所以叫留白是因为 `margin` 折叠看起来更像是留白，在同一个 `BFC` 内，上下 `margin`只要有留出来的空白即可，看起来就像是上下的留白重叠了一样。



## box-sizing

* `content-box`

![content-box](https://raw.githubusercontent.com/directorcn/images/master/blog/css/content-box.png)

如图所示，`content-box` 的 `width`、`height` 即为 `declaration` 中的 `properties`  

```css
div {
    width: 100px;
    height: 100px;
}
```

`Blocks` ：`{` 开始，`}` 结束

`Declaration`：每一条 `css rule`，以 `;` 分割

`propertie`：每一条 `css rule` `:` 前面的部分

`value`：每一条 `css rule` `:` 后面的部分



* `border-box`

![border-box](https://raw.githubusercontent.com/directorcn/images/master/blog/css/border-box.png)

如图所示，`border-box` 的 `width`、`height` 是包含 `padding`、`border` 的。