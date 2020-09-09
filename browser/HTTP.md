# HTTP

### GET 与 POST 的区别

- `GET`

  从服务器获取资源。既可以是静态的文本、页面、图片、视频，也可以是由服务端动态生成的页面或者其他格式的数据。

- `POST`

  将数据发送到服务器。数据就放在报文的 `body` 里。请求体的类型由 `Content-Type` 头表示。


**安全性**：不会对服务器上的资源造成实质的修改。

**幂等性**：多次执行相同的操作，结果也都是相同的。

1. 可以对 `GET` 请求的数据做缓存
2. `GET` 的参数是通过 `URL` 查询字符串传输的，`POST` 的参数放在 `body` 中
3. `POST` 没有数据大小限制，`GET` 不同浏览器对 `URL` 长度的限制略有不同
4. `GET` 是安全的也是幂等的，`POST` 不是幂等的（多次提交会创建多个资源），是“不安全”（增加、删除数据）的



### HTTP 状态码

- 2xx 表示成功
  - 200  **OK**  成功，表示一切正常，服务器如客户端所期望的那样返回了处理结果，如果是非 HEAD 请求，通常在响应头后都会有 body 数据。
  - 204  **No Content**  与 200 基本相同，但响应头后没有 body 数据
  - 206  **Partial Content** 是 HTTP 分块下载或断点续传的基础，在客户端发送“范围请求”、要求获取资源的部分数据时出现，它与 200 一样，也是服务器成功处理了请求，但 body 里的数据不是资源的全部，而是其中的一部分。通常还会伴随着头字段“Content-Range”，表示响应报文里 body 数据的具体范围。
- 3xx  表示重定向
  - 301 **Moved Permanently** 俗称“永久重定向”，含义是此次请求的资源已经不存在了，需要改用改用新的 URI 再次访问。
  - 302  **Found** 俗称“临时重定向”，意思是请求的资源还在，但需要暂时用另一个 URI 来访问。
  - 304 **Not Modified**  它用于 If-Modified-Since 等条件请求，表示资源未修改，用于缓存控制。它不具有通常的跳转含义，但可以理解成“重定向已到缓存的文件”（即“缓存重定向”）。
- 4xx 表示客户端的错误
  - 400 **Bad Request** 请求报文有错误，可能数据格式不对
  - 403  **Forbidden** 服务器禁止访问
  - 404  **Not Found** 资源在服务器上找不到
  - 405  **Method Not Allowed ** 不允许使用某些方法操作资源
- 5xx 表示服务器错误
  - 500  **Internal Server Error** 通用错误码
  - 501  **Not Implemented** 客户端请求的功能还不支持
  - 502  **Bad Gateway** 通常是服务器作为网关或者代理时返回的错误码，表示服务器自身可以正常工作，访问后端服务器发生了错误。
  - 503  **Service Unavailable** 当前服务忙，暂时无法响应服务。



### HTTP Head

- `Request Header`

<img src="https://static001.geekbang.org/resource/image/2b/a2/2be3e2457f08bdf624837dfaee01e4a2.png"/>

- `Response Header`

<img src="https://static001.geekbang.org/resource/image/ef/c9/efdeadf27313e08bf0789a3b5480f7c9.png" />

