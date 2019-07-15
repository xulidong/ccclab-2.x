/**
 * 角色
 * 
 * 角色和武器 - 桥接模式
 * 将抽象与现实分离，使二者可以独立变化
 * 
 */

let ICharactor = cc.Class({
    ctor() {
        this.m_name = ""; // 名称
        this.m_model = null; // 模型
        this.m_icon = null; // 图像
        this.m_weapon = null; // 武器
        this.m_extAtk = 0; // 额外攻击力
        this.m_die = false;// 是否死亡

        this.m_attr = null; // 角色属性
        this.m_ai = null;// ai 控制器
    },

    setAttr(attr) {
        this.m_attr = attr;
        attr.initAttr();
    },

    setExtAtk(atk) {
        this.m_extAtk = atk;
    },

    setName(name) {
        this.m_name = name;
    },

    setModel(model) {
        this.m_model = model;
    },

    setIcon(icon) {
        this.m_icon = icon;
    },

    attack(target) {
        this.setExtAtk(this.m_attr.getExtAttack());
        this.m_weapon.fire(target);
    },

    setDie(die) {
        this.m_die = die;
    },

    isDie() {
        return this.m_die;
    },

    underAttack(attacker) {
        m_attr.calDmg(attacker);
        if (m_attr.getNowHp() <= 0) {
            this.setDie(true);
        }
    },

    getPos() {

    },

    getAttackRange() {
        this.m_weapon.getAttackRange();
    },

    moveTo(pos) {

    },

    stopMove() {

    },

    updateAI(targetList) {
        this.m_ai.update(targetList);
    },

    update() {
        this.updateAI();
    },
 });


 let ISoldier = cc.Class({
     extends: ICharactor,
 });


 let IEnemy = cc.Class({
     extends: ICharactor,
});

module.exports.ISoldier = ISoldier;
module.exports.IEnemy = IEnemy;