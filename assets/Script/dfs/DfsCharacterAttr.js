/**
 * 角色属性
 * 角色属性 - 策略模式
 * 定义一组算法，并封装每个算法，让它们可以彼此交换使用。
 * 策略模式让这些算法在客户端使用他们时更加独立。
 */

let ICharactorAttr = cc.Class({
    ctor() {
        this.m_maxHp = 0; // 最大血量
        this.m_maxMp = 0; // 最大蓝量
        this.m_moveSpeed = 0; // 移动速度
        this.m_nowHp = 0; // 当前血量
        this.m_attrStrategy = null;// 属性计算策略
    },

    initAttr() {
        this.m_attrStrategy.initAttr(this);
        this.fullHp();
    },

    getNowHp() {
        return this.m_nowHp;
    },

    getMaxHp() {
        return this.m_maxHp;
    },

    fullHp() {
        this.m_nowHp = this.m_maxHp;
    },

    setAttrStrategy(strategy) {
        this.m_attrStrategy = strategy;
    },

    getAttrStrategy() {
        return this.m_attrStrategy;
    },

    getExtAttack() {
        return this.this.m_attrStrategy.getExtAttack(this);
    },

    calDmg(attacker) {
        let atk = attacker.getAttack();
        atk -= m_attrStrategy.getDescDmg();
        m_nowHp -= atk;
    },
});


let ISoldierAttr = cc.Class({
    extends: ICharactorAttr,

    ctor() {
        this.m_Lv = 0; // 等级
        this.m_lvHp = 0;// 升级增加的血量
    },

    getMaxHp() {
        return this.m_lvHp + this.m_maxHp;
    },

    setLvHp(hp) {
        this.m_lvHp = hp;
    },

    getLv() {
        return this.m_Lv;
    },
});


let IEnemyAttr = cc.Class({
    extends: ICharactorAttr,

    ctor() {
        this.m_critRate = 0.0; // 暴击率
    },

    setCritRate(rate) {
        this.m_critRate = rate;
    },

    getCritRate() {
        return this.critRate;
    },
});


let IAttrStrategy = cc.Class({
    initAttr(attr) {
    },

    // 获取等级血量加成
    getExtAttack(attr) {
        return 0;
    },

    // 获取等级减少伤害
    getDescDmg(attr) {
        return 0;
    },
});


let SoldierAttrStrategy = cc.Class({
    initAttr(attr) {
        let lv = attr.getLv();
        let hp = (lv - 1) * 2;
        attr.setLvHp(hp);
    },

    getDescDmg(attr) {
        let lv = attr.getLv();
        let dmg = (lv - 1) * 2;
        return dmg;
    },
});


let EnemyAttrStrategy = cc.Class({
    getExtAttack(attr) {
        let rand = 0.5;
        if (attr.getCritRate() >= rand) {
            return attr.getMaxHp() * 0.2;
        }
        return 0;
    },
});


module.exports.ISoldierAttr = ISoldierAttr;
module.exports.IEnemyAttr = IEnemyAttr;