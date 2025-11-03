import type { Context } from "@netlify/edge-functions";

// --- 代理配置模板 ---
const PROXY_CONFIG = {
  "/bahamut": {
    name: "巴哈姆特 API",
    targetHost: "https://api.gamer.com.tw",
    headerStrategy: 0, 
  },
  "/tmdb": {
    name: "The Movie Database (TMDB) API",
    targetHost: "https://api.tmdb.org",
    headerStrategy: 0, 
  },
  // 后续新增路径，在此处添加即可
};

// 辅助函数：生成可用的代理路径列表的 HTML
function generateAvailablePathsHtml(hostname: string): Response {
  let listItems = '';
  
  // 遍历配置，构建列表项
  for (const [pathKey, config] of Object.entries(PROXY_CONFIG)) {
    const fullPath = `https://${hostname}${pathKey}`;
    listItems += `
      <li>
        <strong>${config.name}:</strong> 
        <a href="${fullPath}/" target="_blank">${pathKey}</a>
        <br>
        <small>(代理目标: ${config.targetHost})</small>
        <br>
        <small>(反代地址: ${fullPath})</small>
        <button onclick="navigator.clipboard.writeText('${fullPath}'); this.innerText='已复制'; setTimeout(()=>this.innerText='复制',1000)" style="margin-left:6px; padding:2px 6px; font-size:0.8em; cursor:pointer;">复制</button>
      </li>
    `;
  }
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>反向代理服务可用路径</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 2em; line-height: 1.6; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 0.5em; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom: 1em; padding: 0.5em; border: 1px solid #ddd; border-radius: 4px; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>可用的反向代理服务列表</h1>
      <p>请访问以下路径来使用对应的 API 代理服务：</p>
      <ul>
        ${listItems}
      </ul>
      <hr>
      <small>此页面由 Netlify Edge Function 动态生成。</small>
    </body>
    </html>
  `;

  return new Response(htmlContent, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}


export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  let configKey = "";
  let config: typeof PROXY_CONFIG[keyof typeof PROXY_CONFIG] | undefined;

  // 1. 查找匹配的配置
  for (const key in PROXY_CONFIG) {
    if (path.startsWith(key)) {
      configKey = key;
      config = PROXY_CONFIG[key];
      break;
    }
  }

  // 2. 根目录或不匹配路径的处理
  if (!config) {
    if (path === '/') {
      // 访问根目录时，列出所有可用路径
      return generateAvailablePathsHtml(url.host);
    } else {
      // 其他不匹配路径，返回 404
      return new Response("Not Found", { status: 404 });
    }
  }
  
  // --- 以下是反向代理逻辑 (保持不变) ---

  // 3. 构建目标 URL
  const apiPath = path.substring(configKey.length);
  const targetUrl = `${config.targetHost}${apiPath}${url.search}`;
  const targetHostDomain = new URL(config.targetHost).host;

  // 4. 处理请求头 (使用客户端原始请求头)
  const forwardedHeaders = new Headers(request.headers);
  forwardedHeaders.set("Host", targetHostDomain);

  // 5. 发起请求
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: forwardedHeaders,
    body: (request.method !== 'GET' && request.method !== 'HEAD') ? request.body : null,
    redirect: "manual",
  });

  try {
    const res = await fetch(newRequest);

    // 6. 返回响应
    return new Response(await res.arrayBuffer(), {
      status: res.status,
      headers: res.headers,
    });
  } catch (error) {
    return new Response("Proxy Error", { status: 500 });
  }
};

export const config: { path: string | string[] } = {
  path: "/*",
};
