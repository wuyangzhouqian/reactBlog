import routers from 'koa-router';
import createWebAPIRequest from  '../util/fetch';

const router = routers();

router.get('/', async (ctx,next) => {
    return new Promise((resove,reject)=>{
        let cookie = ctx.cookie ? ctx.cookie : '';
        let data = {
            limit: ctx.query.limit || 30,
            offset: ctx.query.limit || 0,
            total: true,
            n: 1000,
            csrf_token: ''
        };
        createWebAPIRequest(
            '/weapi/personalized/playlist',
            'POST',
            data,
            cookie).then(data => {
                ctx.body = data.body;
                resove(next());
            });
    }) 
})
export default router;