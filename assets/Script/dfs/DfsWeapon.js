/**
 * 武器
 * 
 * 开火流程 - 模版方法模式
 * 在一个炒饭方法中定义算法的流程，其中某些步骤由子类完成。
 * 模版方法模式让子类在不变更原油算法的情况下，还能够重新定义其中的步骤。
 */


 let IWeapon = cc.Class({
     ctor(){
        this.m_atk = 0; // 攻击力
        this.m_range = 0; // 攻击距离
        this.m_extAtk = 0; // 额外攻击力

        this.m_model = null; // 模型
        this.m_icon = null; // 图像

        this.m_owner = null; // 拥有者
     },

     fire(target) {
        this.showEffectShoot();
        this.showEffectBullet();
        this.playSound();
        target.underAttack(this.m_owner);
     },

     showEffectShoot() {

     },

     showEffectBullet() {

    },

     playSound() {

     },

     setExtAttack(extAtk) {
        this.m_extAtk = extAtk;
     },

     getAttackRange() {
         return this.m_range;
     },
 });

 let WeaponGun = cc.Class({
    showEffectShoot() {

    },

    showEffectBullet() {

    },

    playSound() {
        
    },
 });


 let WeaponRifle = cc.Class({
    showEffectShoot() {

    },

    showEffectBullet() {

    },

    playSound() {
        
    },
 });

 let WeaponRocket = cc.Class({
    showEffectShoot() {

    },

    showEffectBullet() {

    },

    playSound() {
        
    },
 });

 let WeaponCannon = cc.Class({
    showEffectShoot() {

    },

    showEffectBullet() {

    },

    playSound() {
        
    },
 });

 module.exports.WeaponGun = WeaponGun;
 module.exports.WeaponRifle = WeaponRifle;
 module.exports.WeaponRocket = WeaponRocket;
 module.exports.WeaponCannon = WeaponCannon;