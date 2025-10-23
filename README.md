# bahamut-api-proxy
使用Netlify反向代理巴哈姆特api，辅助danmu_api项目直连获取巴哈姆特弹幕

## 目录

[一键部署](#一键部署)

[Fork后部署](#Fork（复刻）后部署（推荐）)

[手动创建仓库部署](#手动创建仓库部署（推荐）)

[danmu_api弹幕项目的具体使用](#[danmu_api](https://github.com/huangxd-/danmu_api)弹幕项目的具体使用)


### 一键部署
点击以下按钮即可将本项目快速部署到 Netlify：

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/wan0ge/bahamut-api-proxy"><img src="https://www.netlify.com/img/deploy/button.svg"></a>
> 使用一键部署时Netlify分配的是随机域名/项目名，建议部署完毕后点击“Quick setup”重新设置项目名/域名。
> <img width="1920" height="958" alt="image" src="https://github.com/user-attachments/assets/6c9b2e47-3c65-4cdb-8586-3d3681ce0dd7" />

### Fork（复刻）后部署（推荐）


### 手动创建仓库部署（推荐）
1.先在github新建一个仓库

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/d5d378f0-94cd-4807-9750-2fad0f7365ae" />
这个界面内容都可以随意

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/69e05665-4304-4506-9119-03e13599e5d2" />

2.然后开始创建netlify.toml配置文件

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/909340c3-ace7-4649-8074-055be692a910" />

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/575b1d2e-1db4-4f37-9b0e-0546bac66872" />

创建一个文件名为`netlify.toml`内容为以下内容的文件
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

github配置部分就到此结束了，恭喜你成功创建了一个netlify.toml配置文件

3.打开[netlify](https://app.netlify.com/)使用github一键登录或者注册登录后导入新项目

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/889dd9b2-3a35-457d-b44d-16a009415419" />

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/467ca9fe-65ce-4d9e-8904-b0252a69e984" />

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/ada7de9c-144a-428e-8dea-f74490e66eb3" />

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/b72eaa01-c3e2-4437-820f-316878f68bde" />

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/638c4b97-3ffb-4f2c-9463-f5b14b4b0593" />

等待十秒后就署反代成功了，绿色部分为你创建并待会要使用的域名

<img width="1920" height="966" alt="image" src="https://github.com/user-attachments/assets/2bf98c63-a37d-44e3-bb6c-c72bfd596347" />


### [danmu_api](https://github.com/huangxd-/danmu_api)弹幕项目的具体使用

#### 在我提pr，实现PROXY_URL环境变量的新功能后：
使用`PROXY_URL`环境变量，值为`RP@你通过netlify获取的反代后的域名`

示例：`PROXY_URL=RP@https://123.netlify.app`

#### PROXY_URL还没有这个功能前：
在你部署的平台找到worker.js文件，修改它将总共六个`https://api.gamer.com.tw`巴哈api地址替换为你通过netlify获取的反代后的地址
<img width="1232" height="559" alt="image" src="https://github.com/user-attachments/assets/bfe3d79d-f0c1-40d3-af6e-a89499234f5a" />
