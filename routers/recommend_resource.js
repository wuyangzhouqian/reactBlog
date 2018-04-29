import routers from 'koa-router';
import createWebAPIRequest from  '../util/fetch';

const router = routers();

router.get('/', (ctx, next) => {
    return new Promise((resove,reject)=>{
        let cookie = ctx.cookie ? ctx.cookie : '';
        let data = {
            csrf_token: ''
        };
        createWebAPIRequest(
            '/api/discovery/recommend/resource',
            'POST',
            data,
            cookie
          ).then(data => {
            ctx.body = data.body;
            resove(next());
        });
    });
});
export default router;