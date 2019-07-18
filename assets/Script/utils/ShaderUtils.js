/** 
 *  材质操作管理工具
 */
let MatUtils = {
    customCache: {}, // 保存自定义材质
};

MatUtils.createMaterial = function() {
    let mat = new cc.Material();

    return mat;
},


MatUtils.getMaterial = function(sp, name, isBuildIn, cb) {
    if (isBuildIn) {
        let mat = cc.Material.getInstantiatedBuiltinMaterial(name, sp);
        cb(false, mat);
    } else {
        let url = "mat/" + name;
        if (this.customCache[url]) {
            cb(false, this.customCache[url]);
            return;
        }

        cc.loader.loadRes(url, cc.Material, (err, asset) => {
            if (err) {
                cc.error(err);
                cb(err, null);
            }
            this.customCache[url] = asset;
            cb(false, asset);
        });
    }
};

MatUtils.useMaterial = function(sp, name, args, cb) {
    MatUtils.getMaterial(sp, name, args.buildIn, (err, mat)=>{
        if (err) {
            cb(err, null);
        }
        mat.setProperty('texture', sp.spriteFrame.getTexture());
        sp.setMaterial(0, mat);
        sp.markForRender(true);

        if (cb) {
            cb(err, mat);
        } 
    });
};

module.exports = MatUtils;