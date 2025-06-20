import { _decorator, Component, Node, Input, input, KeyCode, Vec3, BoxCollider , log, RigidBody, SphereCollider} from 'cc';
const { ccclass, property } = _decorator;
import { EventTarget } from 'cc';
const eventTarget = new EventTarget();

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    moveSpeed: number = 10;
    @property
    jumpForce: number = 15; // 添加跳跃力属性

    private moveDirection: Vec3 = new Vec3(0, 0, 0);
    private isOnGround: boolean = true; // 是否在地面上
    private onKeyWDown: boolean = false;
    private onKeySDown: boolean = false;
    private onKeyADown: boolean = false;
    private onKeyDDown: boolean = false;
    private onKeyEDown: boolean = false;
    private onKeySpaceDown: boolean = false;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        let _BoxCollider = this.node.getComponent(BoxCollider);
        _BoxCollider.on('onCollisionEnter', (event) => {
            // 当玩家与地面碰撞时，重置跳跃状态
            console.log('onCollisionEnter', event.otherCollider.node.name);
            if (event.otherCollider.node.name === 'Block') {
                this.isOnGround = true;
            }
        })
        let _RangeCollider = this.node.getComponent(SphereCollider);
        _RangeCollider.on('onCollisionStay', (event) => {
            //获取碰撞对象
            let otherCollider = event.otherCollider;
            //获取碰撞对象的节点
            let otherNode = otherCollider.node;
            //获取碰撞对象的节点的名称
            let otherNodeName = otherNode.name;
            
            if (otherNodeName === 'Chest' && this.onKeyEDown) {
                // 当玩家与箱子碰撞时，触发事件
                eventTarget.emit('openChest');
            }
        })

        log('PlayerController start');
    }


    

    onKeyDown(event: any) {
        switch(event.keyCode) {
            case KeyCode.KEY_E:
                this.onKeyEDown = true;
                

                break;
            case KeyCode.KEY_W:
                this.onKeyWDown = true;
                break;
            case KeyCode.KEY_S:
                this.onKeySDown = true;
                break;
            case KeyCode.KEY_A:
                this.onKeyADown = true;
                break;
            case KeyCode.KEY_D:
                this.onKeyDDown = true;
                break;
            case KeyCode.SPACE:
                this.onKeySpaceDown = true;
                if (this.isOnGround) {
                    //设置刚体速度
                    this.node.getComponent(RigidBody).setLinearVelocity(new Vec3(0, this.jumpForce, 0));
                    this.isOnGround = false;
                }
                break;
        }
    }

    onKeyUp(event: any) {
        switch(event.keyCode) {
            case KeyCode.KEY_E:
                this.onKeyEDown = false;
                break;
            case KeyCode.KEY_W:
                this.onKeyWDown = false;
                break;
            case KeyCode.KEY_S:
                this.onKeySDown = false;
                break;
            case KeyCode.KEY_A:
                this.onKeyADown = false;
                break;
            case KeyCode.KEY_D:
                this.onKeyDDown = false;
                break;
            case KeyCode.SPACE:
                this.onKeySpaceDown = false;
                break;

        }
    }

    update(deltaTime: number) {
        let deltaVelocity = new Vec3(0, 0, 0);
        if (this.onKeyWDown) {
            deltaVelocity.z = this.moveSpeed;
        }
        if (this.onKeySDown) {
            deltaVelocity.z = -this.moveSpeed;
        }
        if (this.onKeyADown) {
            deltaVelocity.x = -this.moveSpeed;
        }
        if (this.onKeyDDown) {
            deltaVelocity.x = this.moveSpeed;
        }
        if (deltaVelocity.length() > 0) {
            deltaVelocity.normalize();
            deltaVelocity.multiplyScalar(this.moveSpeed);
            //获取当前速度
            let velocityOutput = new Vec3();
            this.node.getComponent(RigidBody).getLinearVelocity(velocityOutput);
            let currentVelocity = velocityOutput;
            // 计算新速度
            let newVelocity = currentVelocity.add(deltaVelocity);
            



        }
        if (this.isOnGround) {
            //取消重力影响
            this.node.getComponent(RigidBody).useGravity = false;
        }else {
            this.node.getComponent(RigidBody).useGravity = true;
        }
    }

}


