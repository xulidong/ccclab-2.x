/**
 * 场景状态管理 - 状态模式
 * 让一个对象的行为随着内部状态的改变而改变，而该对象也像是换了类一样
 */
const DfsGame = require("DfsGame");


// 状态基类
let ISceneState = cc.Class({
    name: "ISceneState",

    ctor() {
        this.m_stName = "ISceneState";
        this.m_ctrler = null;
    },

    init(ctrler) {
        this.m_ctrler = ctrler;
    },

    begin() {

    },

    end() {

    },

    update() {
    },
});


// 初始场景状态
let SceneStateStart = cc.Class({
    name: "SceneStateStart",
    extends: ISceneState,

    ctor() {
        this.m_stName = "SceneStateStart";
    },

    update() {
        if (!this.m_ctrler) {
            return;
        }
        // 加载完成后，自动切换到主场景
        let st = new SceneStateMain();
        st.init(this.m_ctrler);
        this.m_ctrler.setState(st, "SceneDfsMain");
    },
});


// 主场景状态
let SceneStateMain = cc.Class({
    name: "SceneStateMain",
    extends: ISceneState,

    ctor() {
        this.m_stName = "SceneStateMain";
    },
});

// 战斗场景状态
let SceneStateBattle = cc.Class({
    name: "SceneStateBattle",
    extends: ISceneState,

    ctor() {
        this.m_stName = "SceneStateBattle";
    },

    begin() {
        DfsGame.instance().init();
    },

    end() {
        DfsGame.instance().release();
    },

    update() {
        if (!this.m_ctrler) {
            return;
        }

        DfsGame.instance().update();

        if (DfsGame.instance().isGameOver()) {
            let st = new SceneStateMain();
            st.init(this.m_ctrler);
            this.m_ctrler.setState(st, "SceneStateBattle");
        }
    },
});


// 场景状态控制器
let SceneStateCtrler = cc.Class({
    name: "SceneStateCtrler",

    ctor() {
        this.m_state = null;
        this.m_bRunBegin = false;
        this.m_bLoading = false;
    },

    setState(state, sceneName) {
        this.m_bRunBegin = false;

        this.loadScene(sceneName);

        if (this.m_state) {
            this.m_state.end();
        }
        this.m_state = state;
    },

    loadScene(sceneName) {
        if (sceneName) {
            this.m_bLoading = true;
            cc.director.loadScene(sceneName, () => {
                this.m_bLoading = false;
            });
        }
    },

    update() {
        if (this.m_bLoading) {
            return;
        }

        if (this.m_state && !this.m_bRunBegin) {
            this.m_state.begin();
            this.m_bRunBegin = true;
        }

        if (this.m_state) {
            this.m_state.update();
        }
    },
});

module.exports.SceneStateStart = SceneStateStart;
module.exports.SceneStateMain = SceneStateMain;
module.exports.SceneStateBattle = SceneStateBattle;
module.exports.SceneStateCtrler = SceneStateCtrler;