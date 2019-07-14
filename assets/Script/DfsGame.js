/**
 * 游戏主程序 - 单利模式
 * 确认类只有一个对象，并提供一个全局的方法获取这个对象
 *
 * 管理各游戏子系统对外行为 - 外观模式
 * 为子系统定义一组统一的接口，这个高级的接口会让子系统更容易使用
 * 
 * 管理子系统之间的内部沟通 - 终结者模式
 * 定义一个接口用来封装一群对象的互动行为。
 * 中介者通过移除对象之间的引用，来减少他们之间的耦合度，并且能改变他们之间的互动独立性
 */
let DfsGame = cc.Class({
    init() {
        // 初始化游戏子系统
        console.log("初始化游戏子系统");
    },

    release() {
        // 清理游戏子系统
        console.log("清理游戏子系统");
    },

    update() {
        // 更新游戏子系统
        console.log("更新游戏子系统");
    },

    isGameOver() {
        return false;
    },
});

let _instance = null;

module.exports = {
    instance:()=>{
        if (!_instance) {
            _instance = new DfsGame();
        }
        return _instance;
    }
};