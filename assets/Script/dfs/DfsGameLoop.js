/**
 * 引擎游戏循环接口
 *
 * 面向对象设计原则：
 * 单一职责：一个类只负责一件事
 * 开闭：对拓展开放，对修改关闭
 * 里氏替换：之类必须能够替换父类
 * 依赖倒置：模块之间只依赖接口，而不依赖实现
 * 接口抽离：不该被迫使用用不到的接口
 * 最少知识：尽量不使用其他类
 * 少继承多组合：推荐使用组合而不是继承来扩展功能
 *
 * 创建模式
 *
 * 结构模式
 *
 * 行为模式
 */

const DfsSceneState = require("DfsSceneState");

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        this.m_ctrler = new DfsSceneState.SceneStateCtrler();

        window.game = this;
        cc.game.addPersistRootNode(this.node);
    },

    start() {
        // 初始场景已加载，只需要要切换设置状态即可
        let st = new DfsSceneState.SceneStateStart();
        st.init(this.m_ctrler);
        this.m_ctrler.setState(st, "");
    },

    update(dt) {
        this.m_ctrler.update();
    },
});
