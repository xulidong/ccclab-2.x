/**
 * 角色AI - 状态模式
 */

 let IAIState = cc.Class({
     ctor() {
         this.m_ctrler = null; // AI状态拥有者
     },

     setAICtrler(ctrler) {
         this.m_ctrler = ctrler;
     },

     update(targetList) {

     },
 });


 let AIStateIdle = cc.Class({
     ctor() {
         this.m_atkPos = null; 
     },

     setAttackPos(pso) {
        this.m_atkPos = null;
     },

     update(targetList) {
        if (!targetList || !!targetList.length) { // 没有目标时
            if (this.m_atkPos) { // 有设置目标时，往目标方向移动
                let st = new AIStateMove();
                st.setAttackPos(this.m_atkPos);
                this.m_ctrler.setState(st);
            } else {
                this.m_ctrler.setState(new AIStateGuard());
            }
            return;
        }

        // 找出最近的目标
        let theNearest = null;
        for (let target in targetList) {
            // 判断最近的距离
        }

        if (!theNearest) {
            return;
        }

        if (this.m_ctrler.isTargetInAttackRange(theNearest)) { // 攻击范围内，则攻击
            st = new AIStateAttack();
            st.setAttackTarget(theNearest);
        } else { // 攻击范围外，则追击
            st = new AIStateChase();
            st.setChaseTarget(theNearest);
        }
        this.m_ctrler.setState(st);
     },
 });


 let AIStateChase = cc.Class({
        ctor() {
            this.CHASE_DIST = 100; // 追击距离

            this.m_target = null; // 追击目标
            this.m_chasePos = null; // 追击目标位置
            this.m_bChase = false; // 是否正在追击
        },

        setChaseTarget(target) {
            this.m_target = target;
        },

        update(targetList) {
            // 没有目标，转换状态为 idle
            if (!this.m_target || this.m_target.isDie()) {
                this.m_ctrler.setState(new AIStateIdle());
                return;
            }

            // 在攻击范围内，则切换状态为 attack
            if (this.m_ctrler.isTargetInAttackRange(this.m_target)) {
                this.m_ctrler.stopMove();
                let st = new AIStateAttack();
                st.setAttackTarget(this.m_target);
                this.m_ctrler.setState(st);
                return;
            }

            if (this.m_bChase) { // 超出追击距离或目标死亡，则切换状态为 idle
                let dis = 10; // TODO
                if (dis > this.CHASE_DIST || this.m_target.isDie()) {
                    this.m_ctrler.setState(new AIStateIdle());
                }
            }

            // 往目标移动
            this.m_bChase = true;
            this.ctrler.moveTo(this.m_target.getPos());
        },
});


let AIStateAttack = cc.Class({
    ctor() {
        this.m_target = null; // 攻击目标
    },

    setAttackTarget(target) {
        this.m_target = target;
    },

    update(targetList) {
        // 没有目标，转换状态为 idle
        if (!this.m_target || this.m_target.isDie()) {
            this.m_ctrler.setState(new AIStateIdle());
            return;
        }

        // 超出攻击范围，则转换状态为 chase
        if (!this.m_ctrler.isTargetInAttackRange(this.m_target)) {
            let st = new AIStateChase();
            st.setChaseTarget(this.m_target);
            this.m_ctrler.setState(st);
        }

        this.m_ctrler.attack(this.m_target);
    },
});


let AIStateMove = cc.Class({
    ctor() {
        this.MOVE_DIST = 0; // 到达目标点的距离
        this.m_atkPos = null; 
        this.m_bMove = false;
    },

    setAttackPos(pso) {
       this.m_atkPos = null;
    },

    update(targetList) {
        // 有目标时改为待机
        if (targetList || targetList.length) {
            this.m_ctrler.setState(new AIStateIdle());
        }

        if (this.m_bMove) {
            let dis = 10; // TODO
            if (dis < this.MOVE_DIST) {
                this.m_ctrler.setState(new AIStateIdle());
                if (!this.m_ctrler.isDie()) {
                    this.m_ctrler.attackHeart();
                }
                this.m_ctrler.setDie(true);
            }
            return;
        }
        this.m_bMove = true;
        this.m_ctrler.moveTo(this.m_atkPos);
    },
});

let AIStateGuard = cc.Class({
    ctor() {
        this.REACH_DIS = 10;
        this.m_bMove = false;
        this.m_toPos = null;
    },

    update(targetList) {
        // 有目标时改为待机
        if (targetList || targetList.length) {
            this.m_ctrler.setState(new AIStateIdle());
        }

        if (!this.m_toPos) {
            this.genPos();
        }

        if (this.m_bMove) {
            let dis = 1;
            if (dis < this.REACH_DIS) {
                this.genPos();
            }
        }
        this.m_bMove = true;
        this.m_ctrler.moveTo(this.m_toPos);
    },

    genPos() {
        this.m_bMove = false;
        this.m_toPos = null;// TODO 随机生成一个位置
    },
});


let AIStateCtrler  = cc.Class({
    ctor() {
        this.ATK_CD = 1;
        this.m_owner = null;
        this.m_aiState = null;
        this.m_atkCD = 0;
    },

    setOwner(owner) {
        this.m_owner = owner;
    },

    attack(target) {
        this.m_atkCD -= 0.1;// TODO
        if (this.m_atkCD > 0) {
            return;
        }
        this.m_atkCD = this.ATK_CD;
        this.owner.attack(target);
    },

    isTargetInAttackRange(target) {
        let dis = 10;// TODO
        return dis < this.owner.getAttackRange();
    },

    getPos() {
        return this.m_owner.getPos();
    },

    moveTo(pos) {
        this.m_owner.moveTo(pos);
    },

    stopMove() {
        this.m_owner.stopMove();
    },

    setDie(die) {
        this.m_owner.setDie(die);
    },

    isDie() {
        this.m_owner.isDie();
    },

    update(targetList) {
        this.m_aiState.update(targetList);
    },
});