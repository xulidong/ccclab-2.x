// 塔防游戏主场景
const DfsSceneState = require("DfsSceneState");


cc.Class({
    extends: cc.Component,

    onClickBattle() {
        let ctrler = game.m_ctrler;
        let st = new DfsSceneState.SceneStateBattle();
        st.init(ctrler);
        ctrler.setState(st, "SceneDfsBattle");
    },
});
