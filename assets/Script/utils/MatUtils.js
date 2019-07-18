/** 
 *  材质操作管理工具
 */
let MatUtils = {
    customChache: {}, // 保存自定义材质
};

MatUtils.getMaterial = function(sp, name, isBuildIn, cb) {
    if (isBuildIn) {
        let mat = cc.Material.getInstantiatedBuiltinMaterial(name, sp);
        cb(false, mat);
    } else {
        let url = "mat/" + name;
        if (this.customChache[url]) {
            cb(false, this.customChache[url]);
            return;
        }

        cc.loader.loadRes(url, cc.Material, (err, asset) => {
            if (err) {
                cc.error(err);
                cb(err, null);
            }
            this.customChache[url] = asset;
            cb(false, asset);
        });
    }
};

MatUtils.useShader = function(sp, shaderName, args, cb) {
    MatUtils.getMaterial(sp, shaderName, args.buildIn, (err, mat)=>{
        if (err) {
            cb(err, null);
        };
        mat.setProperty('texture', sp.spriteFrame.getTexture());
        sp.setMaterial(0, mat);
        sp.markForRender(true);

        if (cb) {
            cb(err, mat);
        } 
    });
};

module.exports = MatUtils;