// 塔防游戏主场景
const SceneDfsState = require("SceneDfsState");


cc.Class({
    extends: cc.Component,

    onClickBattle() {
        let ctrler = game.m_ctrler;
        let st = new SceneDfsState.SceneStateBattle();
        st.init(ctrler);
        ctrler.setState(st, "SceneDfsBattle");
    },
});
