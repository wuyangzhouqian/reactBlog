import router from 'koa-router';
import album from './album';
import personalized from './personalized';
import recommendResource from './recommend_resource';
import programRecommend from './program_recommend';
import recommendSongs from './recommend_songs';
import topAlbum from './top_album';

const route = router();

//route.use('/album',album.routes(),album.allowedMethods());
route.use("/personalized",personalized.routes(),personalized.allowedMethods());
route.use("/recommend/resource",recommendResource.routes(),recommendResource.allowedMethods());
route.use("/program/recommend",programRecommend.routes(),programRecommend.allowedMethods());
route.use("/recommend/songs",recommendSongs.routes(),recommendSongs.allowedMethods());
route.use("/top/album",topAlbum.routes(),topAlbum.allowedMethods());

export default route;