const MaterialUtils = require("MaterialUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        spCocoa: cc.Sprite,
    },

    onLoad() {
        this.materialList = [MaterialUtils.MAT.DEFAULT, MaterialUtils.MAT.GRAY, 
            MaterialUtils.MAT.TIME, MaterialUtils.MAT.OVERLAY, MaterialUtils.MAT.GRADIENTS];
        this.setIndex = 0;
        this.mat = null;
        this.time = 0;
    },

    onClick() {
        let index = (this.setIndex + 1) % this.materialList.length;
        MaterialUtils.useMaterial(this.spCocoa, this.materialList[index], (err, mat) => {
            if (err) {
                return;
            }
            this.mat = mat;
            this.setIndex = index;
        });
    },

    update(dt) {
        this.time += dt;
        if (!this.mat) {
            return;
        }

        if (this.setIndex === 2) {
            this.mat.setProperty('time', this.time);
        } 
        
        if (this.setIndex === 3) {
            this.spCocoa.node.color = new cc.Color().fromHEX("#FFD700");
        } else {
            this.spCocoa.node.color = cc.Color.WHITE;
        }
    },
});
