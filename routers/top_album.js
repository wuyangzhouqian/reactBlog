import routers from 'koa-router';
import createWebAPIRequest from  '../util/fetch';

const router = routers();

router.get('/', (ctx, next) => {
    return new Promise((resove,reject)=>{
        let cookie = ctx.cookie ? ctx.cookie : '';
        let data = {
            offset: ctx.query.offset || 0,
            total: true,
            limit: ctx.query.limit || 50,
            area: ctx.query.type,
            csrf_token: ''
        }
  createWebAPIRequest(
    '/weapi/album/new',
    'POST',
    data,
    cookie).then(data => {
        ctx.body = data.body;
        resove(next());
    });
});
})
export default router;