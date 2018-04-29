import koa from 'koa';
import cors from 'koa-cors'
import router from './routers/router';

const app =new koa();

app.use(cors()) // 跨域访问
app.use(router.routes()).use(router.allowedMethods()); //将路由挂载在koa server上
app.listen(80, ()=>{
    console.log("server start.....");
});