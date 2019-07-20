/**
 *  材质操作管理工具
 */
let MaterialUtils = {
    customCache: {}, // 保存自定义材质
    MAT: {
        // build in
        DEFAULT: {
            custom: false,
            name: "2d-sprite",
        },
        GRAY: {
            custom: false,
            name: "2d-gray-sprite"
        },

        // custom TODO(自定义shader暂时未实现，预计打Android包时实现)
        TIME: {
            custom: true,
            name: "MaterialTime",
        },
        OVERLAY: {
            custom: true,
            name: "MaterialOverlay",
        },
        ETC1: {
            custom: true,
            name: "MaterialEtc1",
        },
        ETC1_OVERLAY: {
            custom: true,
            name: "MaterialEtc1Overlay",
        },
    },
};

MaterialUtils.getMatCompress = function () {
    return cc.sys.os === cc.sys.OS_ANDROID ? MaterialUtils.MAT.ETC1 : MaterialUtils.MAT.DEFAULT;
};

MaterialUtils.getMatOverlay = function () {
    return cc.sys.os === cc.sys.OS_ANDROID ? MaterialUtils.MAT.ETC1_OVERLAY : MaterialUtils.MAT.OVERLAY;
};

MaterialUtils.updateOverlayColor = function (sprite, color) {
    let shaderName;
    if (color) {
        sprite.node.color = color;
        shaderName = MaterialUtils.getMatOverlay();
        MaterialUtils.useMaterial(sprite, shaderName)
    } else {
        sprite.node.color = cc.Color.WHITE;
        shaderName = MaterialUtils.getMatCompress();
        MaterialUtils.useMaterial(sprite, shaderName)
    }
};

MaterialUtils.getMaterial = function(sp, matCfg, cb) {
    if (matCfg.custom) {
        let url = "material/" + matCfg.name;
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
    } else {
        let mat = cc.Material.getInstantiatedBuiltinMaterial(matCfg.name, sp);
        cb(false, mat);
    }
};

MaterialUtils.useMaterial = function(sp, matCfg, cb) {
    if (!sp.spriteFrame) {
        if (cb) {
            cb('the sprite have no sprite frame', null);
        }
        return;
    }
    MaterialUtils.getMaterial(sp, matCfg, (err, mat)=>{
        if (err) {
            if (cb) {
                cb(err, null);
            }
            return;
        }

        mat.setProperty('texture', sp.spriteFrame.getTexture());
        sp.setMaterial(0, mat);
        sp.markForRender(true);

        if (cb) {
            cb(err, mat);
        }
    });
};

module.exports = MaterialUtils;