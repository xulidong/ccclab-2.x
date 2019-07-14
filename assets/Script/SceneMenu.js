cc.Class({
    extends: cc.Component,

    properties: {
    },

    onClickScene(event, customData) {
        cc.director.loadScene(customData);
    },
});
