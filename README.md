# bahamut-api-proxy
使用Netlify反向代理巴哈姆特api，实现[danmu_api](https://github.com/huangxd-/danmu_api)项目国内直连获取[巴哈姆特](https://ani.gamer.com.tw/)弹幕，适应国内机子/Docker部署后无法直连获取巴哈弹幕又不方便配置代理的场景，附带喂饭式教程🥰
> 请不要过度宣传Netlify的反代功能
---

## 目录（点击跳转）

- [前置准备](#前置准备)

- [适合专业宝宝的极简教程](#适合专业宝宝的极简教程本来就很简单)

- 三种方式：

  - [一键部署反代教程](#一键部署反代)

  - [Fork后部署反代教程](#复刻后部署反代推荐)

  - [手动创建仓库部署反代教程](#手动创建仓库部署反代推荐)

- [LogVar弹幕项目的具体使用方法](#LogVar弹幕项目的具体使用方法)

- [题外话（并非](#题外话并非)

---

## 前置准备

- 一个 [GitHub](https://github.com/) 账号
- 一个 [netlify](https://app.netlify.com/) 账号（可以使用 GitHub 登录）
- 推荐使用[GitHub 中文化插件](https://greasyfork.org/zh-CN/scripts/435208-github-%E4%B8%AD%E6%96%87%E5%8C%96%E6%8F%92%E4%BB%B6)和[Netlify 汉化脚本](https://greasyfork.org/zh-CN/scripts/484197-netlify-%E6%B1%89%E5%8C%96%E8%84%9A%E6%9C%AC)油猴脚本

---

## 适合专业宝宝的极简教程（本来就很简单）
请看二叉树树佬博客教程：[Netlify、Vercel反代网站 - AcoFork Blog](https://blog.2b2x.cn/posts/netlify-vercel-proxy/)

巴哈api为：`https://api.gamer.com.tw`

> 使用方式请看：[LogVar弹幕项目的具体使用方法](#LogVar弹幕项目的具体使用方法)

---

## 一键部署反代
点击以下按钮即可将本项目快速部署到 [Netlify](https://app.netlify.com/) 实现巴哈姆特api的反代：

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/wan0ge/bahamut-api-proxy&branch=beta"><img src="https://www.netlify.com/img/deploy/button.svg"></a>
> 使用一键部署时Netlify分配的是随机域名/项目名，建议部署完毕后点击“Quick setup”重新设置项目名/域名。
> <img width="1920" height="958" alt="image" src="https://github.com/user-attachments/assets/6c9b2e47-3c65-4cdb-8586-3d3681ce0dd7" />

> 使用方式请看：[LogVar弹幕项目的具体使用方法](#LogVar弹幕项目的具体使用方法)

---

## 复刻后部署反代（推荐）

咕（？

点击本项目右上角Fork按钮简单填写信息后跳转到手动创建教程的 [4.打开netlify使用github一键登录或者注册登录后导入我们刚刚创建/复刻的github仓库](#4打开netlify使用github一键登录或者注册登录后导入我们刚刚创建复刻的github仓库) 部分开始即可

---

## 手动创建仓库部署反代（推荐）
1.先在github新建一个仓库

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/d5d378f0-94cd-4807-9750-2fad0f7365ae" />

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/69e05665-4304-4506-9119-03e13599e5d2" />

> ↑这个界面内容都可以随意填

2.然后开始创建netlify.toml配置文件

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/909340c3-ace7-4649-8074-055be692a910" />

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/575b1d2e-1db4-4f37-9b0e-0546bac66872" />

3.创建一个文件名为 `netlify.toml` 内容为以下内容的文件
```
[[redirects]]
  from = "/*"
  to = "https://api.gamer.com.tw/:splat"
  status = 200
  force = true
  [redirects.headers]
    User-Agent = "Anime/2.29.2 (7N5749MM3F.tw.com.gamer.anime; build:972; iOS 26.0.0) Alamofire/5.6.4"
    Content-Type = "application/json"
```

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/f35c6a1b-1258-426a-8290-6d124431c134" />

> github配置部分就到此结束了，恭喜你成功创建了一个netlify配置文件🥳

#### 4.打开[netlify](https://app.netlify.com/)使用github一键登录或者注册登录后导入我们刚刚创建/复刻的github仓库

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/889dd9b2-3a35-457d-b44d-16a009415419" />

> ↑如果你是netlify新用户没有项目的情况下，这个页面会有一个很大的区域提示让你导入github项目开始

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/467ca9fe-65ce-4d9e-8904-b0252a69e984" />

> ↑授权部分一路默认点绿色的按钮允许就行了

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/ada7de9c-144a-428e-8dea-f74490e66eb3" />

5.为它在netlify命名/创建域名

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/b72eaa01-c3e2-4437-820f-316878f68bde" />

6.其他都不用管直接下滑到底部确认

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/638c4b97-3ffb-4f2c-9463-f5b14b4b0593" />

7.等待十秒后就部署反代成功了，绿色部分为你创建并待会要使用的域名

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/2bf98c63-a37d-44e3-bb6c-c72bfd596347" />

> 使用方式请看：[LogVar弹幕项目的具体使用方法](#LogVar弹幕项目的具体使用方法)

---

## [LogVar](https://github.com/huangxd-/danmu_api)弹幕项目的具体使用方法

### 使用PROXY_URL环境变量使用（LogVar版本>1.6.2）：
使用`PROXY_URL`环境变量使用，值为`RP@你通过netlify获取的反代后的域名`

示例：`PROXY_URL=RP@https://123.netlify.app`


然后开始使用即可，恭喜你实现了直连获取巴哈弹幕🥳

<img width="580" height="829" alt="image" src="https://github.com/user-attachments/assets/c9e14390-0696-4a0b-b846-1f8bf7cdfafc" />

> 另外现有的TMDB API也是支持直连的，巴哈姆特重度使用用户建议配置，配置方法详见弹幕项目的`TMDB_API_KEY`[环境变量](https://github.com/huangxd-/danmu_api#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E5%88%97%E8%A1%A8)部分

---

## 题外话（并非

### 意外报错

反代后在使用过程中有很小的概率会出现如下报错
```
- URL: https://123.netlify.app/......
- 错误类型: TypeError
- 消息: fetch failed
- 码: undefined
- 原因: [object Object]
fetchBahamutEpisodeDanmu error: {
  message: 'fetch failed',
  name: 'TypeError',
  stack: 'TypeError: fetch failed\n' +
    '    at Object.processResponse (node:internal/deps/undici/undici:7188:34)\n' +
    '    at node:internal/deps/undici/undici:7516:42\n' +
    '    at node:internal/process/task_queues:140:7\n' +
    '    at AsyncResource.runInAsyncScope (node:async_hooks:202:9)\n' +
    '    at AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)'
}
```
原因暂时不明可能是触发了反代防御措施，**只需要立即重试即可重试不会报错**，后续会针对这个报错让搜索尝试自动重试。

### 公益宣传

使用巴哈API的你一定很喜欢动画和弹幕，所以我要在这里给迄今为止最庞大的动画API弹弹play做个公益广告w 欢迎喜欢动画，喜欢弹幕文化的来为弹弹play~~做黑奴~~做贡献

贡献教程：[教程](https://github.com/Tony15246/uosc_danmaku?tab=readme-ov-file#%E6%9D%A5%E8%87%AA%E5%BC%B9%E5%BC%B9play%E7%9A%84%E5%BC%B9%E5%B9%95%E6%BA%90%E9%97%AE%E9%A2%98%E5%A6%82%E4%BD%95%E4%BB%8E%E6%A0%B9%E6%BA%90%E8%BF%9B%E8%A1%8C%E8%B0%83%E6%95%B4%E8%A7%A3%E5%86%B3)

### 感谢：
[Netlify大善人 通过反代获得公网IPV4？_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1L9eyz9Em7/)

[Netlify、Vercel反代网站 - AcoFork Blog](https://blog.2b2x.cn/posts/netlify-vercel-proxy/)

[巴哈姆特動畫瘋](https://ani.gamer.com.tw/)
