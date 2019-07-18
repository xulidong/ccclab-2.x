let MatUtils = require("MatUtils");

cc.Class({
    extends: cc.Component,

    properties: {
        spCocoa: cc.Sprite,
    },

    onLoad() {
        this.isGray = false;
        this.mat = null;
        this.time = 0;
    },

    onClick() {
        this.isGray = !this.isGray;
        let shaderName = this.isGray ? "matGray" : "2d-sprite";
        MatUtils.useMaterial(this.spCocoa, shaderName, {buildIn: !this.isGray}, (err, mat) => {
            if (err) {
                return;
            }
            this.mat = mat;
        });
    },

    update(dt) {
        this.time += dt;
        if (this.mat && this.isGray) {
            this.mat.setProperty('time', this.time);
        }
    },
});
