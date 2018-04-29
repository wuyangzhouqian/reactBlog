import routers from 'koa-router';
import createWebAPIRequest from  '../util/fetch';

const router = routers();

router.get('/', (ctx, next) => {
    return new Promise((resove,reject)=>{
        let cookie = ctx.cookie ? ctx.cookie : '';
        let data = {
            offset: 0,
            total: true,
            limit: 20,
            csrf_token: ''
        }
        createWebAPIRequest(
            '/api/v2/discovery/recommend/songs',
            'POST',
            data,
            cookie
        ).then(data => {
            ctx.body = data.body;
            resove(next());
        });
    });
})
export default router;