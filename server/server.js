const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const LRUCache = require('lru-cache');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('@zeit/next-preact/alias')();

//设置缓存
const ssrCache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60 // 1hour
})

app.prepare()
    .then(() => {
        const server = new Koa()
        const router = new Router()

        router.get('/', async ctx => {
            await renderAndCache(ctx, '/')
            ctx.respond = false;
        })

        router.get('*', async ctx => {
            await handle(ctx.req, ctx.res)
            ctx.respond = false
        })

        server.use(async (ctx, next) => {
            ctx.res.statusCode = 200
            await next()
        })

        server.use(router.routes())
        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`)
        })
    });
/*
* 获取每个路由对应的缓存的key
* 去缓存里面取数据
*/
function getCacheKey(url) {
    return `${url}`
}

async function renderAndCache(ctx, pagePath, queryParams) {
    const key = getCacheKey(ctx.url)



    // 如果缓存中存在，则立即返回并修改header缓存设置标准 页面已经存在缓存中 
    if (ssrCache.has(key)) {
        ctx.res.setHeader('x-cache', 'HIT From Desktank')
        ctx.body = ssrCache.get(key);
        return
    }

    try {
        // If not let's render the page into HTML
        const html = await app.render(ctx.req, ctx.res, pagePath, queryParams);
        // 如果出错则跳出缓存
        if (ctx.state !== 200) {
            ctx.body = html
            return
        }
        // Let's cache this page
        ssrCache.set(key, html)

        ctx.res.setHeader('x-cache', 'MISS')
        ctx.body = html;
    } catch (err) {
    }
}