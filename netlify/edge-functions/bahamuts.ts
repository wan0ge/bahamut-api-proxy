import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  // 目标服务路径（这里以 httpbin 为例）
  const target = `https://api.gamer.com.tw${url.pathname}${url.search}`;

  // 直接使用客户端的原始请求头
  const forwardedHeaders = new Headers(request.headers);

  const newRequest = new Request(target, {
    method: request.method,
    headers: forwardedHeaders,
    body: request.body,
    redirect: "manual",
  });

  const res = await fetch(newRequest);

  // 直接把目标服务器的响应返回给客户端
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: res.headers,
  });
};

export const config: { path: string | string[] } = {
  path: "/*",
};
