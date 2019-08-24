cc.Class({
    extends: cc.Component,

    properties: {
        tmxMap: cc.TiledMap,
    },


    onLoad () {
        let url = "map/1001"
        cc.loader.loadRes(url, cc.TiledMapAsset, (error, tmx) =>{
            if (error) {
                cc.error(error)
                return;
            }
            this.tmxMap.tmxAsset = tmx;
        });
    },
});
