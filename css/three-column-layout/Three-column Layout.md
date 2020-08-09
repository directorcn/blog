# Three-column Layout

三栏布局，即两边定宽，中间自适应。



## Normal flow Layout

- **float**    [source code](https://github.com/directorcn/blog/blob/master/css/three-column-layout/float.html)
  - 由于左右的 `box` 设置了 `float`，且 `center` 未设置宽度，所以`DOM` 结构必须是先写 `float` 部分（`left`、`right`），再写 `center`（`center` 没有 `width`，会占满剩余部分，`right` 会 `float` 到下一行 ，不符合预期）。
  - 避免重叠，`center` 设置 `overflow: hidden`，产生新的 `BFC`。如果对 `BFC` 不是很了解，墙裂建议移步[我](https://www.infoq.cn/profile/A796AF20437B8A/publish) 发布在 `InfoQ` 写作平台的 [BFC "苦"前端久矣！](https://xie.infoq.cn/article/1d343e72a49ed641566b4ac5d)

***tips***：

`float` 会脱离文档流，父元素(**未设置 `height` 属性或者值为 `auto`**)不浮动，子元素都浮动，易造成父元素高度塌陷（表现：高度为 0，子元素撑不开父元素的高度，`background` 、`border` 等属性不符合正常直觉）。



- `float` + `margin`    [source code](https://github.com/directorcn/blog/blob/master/css/three-column-layout/float%20%2B%20margin.html)

  > 业界称其为双飞翼布局。

  - `DOM` 结构：`center`、`left`、`right`，`center` 中增加 `inner`
  - `center`、`left`、`right` 全部设置 `float: left`
  - `center` 设置 `width: 100%`，`left`、`right` 设置各自的 `width`
  - `left` 设置 `margin-left: -100%`，`right` 设置 `margin-left: -RightWidth`
  - `inner` 的 `margin` 或者 `wrapper` 的 `padding` 来模拟`left` 、`right`占位
  - `wrapper` 设置 `min-width: >= LeftWidth + RightWidth`



- absolute    [source code](https://github.com/directorcn/blog/blob/master/css/three-column-layout/absolute.html)

  - `left`、`center`、`right` 全部设置 `position: absolute`
  - `left` 设置 `width`，`left: 0`，`right` 设置 `width`，`right: 0`
  - `center` 设置 `left: LeftWidth;`、`right: RightWidth`  模拟 `width`

  缺点：设置 `absolute` 后会脱离文档流，如果容器 `wrapper` 不设置 `height` 属性，子元素撑不开父元素的高度，会影响后面的布局。



## Flexible Box Layout

- flex    [source code](https://github.com/directorcn/blog/blob/master/css/three-column-layout/flex.html)

  - 父容器 `wrapper` 设置 `display: flex`
  - `left`、`right` 设置各自的 `width`，`center` 设置 `flex: 1`，占满主轴剩余空间

  `flex: 1` 是缩写，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)，三值依次是 `flex-grow` 、`flex-shrink` 、`flex-basis`。



## Grid Layout

- grid    [source code](https://github.com/directorcn/blog/blob/master/css/three-column-layout/grid.html)
  - 父容器 `wrapper` 设置 `display: grid`
  - `left`、`right` 设置各自的 `width`，`center` 不设置 `width`
  - 父容器 `wrapper` 设置 `grid-template-columns: LeftWidth auto RightWidth`



## 总结

实际开发中，`Flexible Box Layout` 可以搞定绝大多数的布局。`flex` 真香~
