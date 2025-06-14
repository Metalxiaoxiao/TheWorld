import { _decorator, Component, Node, Input, input, KeyCode, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property
    moveSpeed: number = 10;
    @property
    jumpForce: number = 15; // 添加跳跃力属性

    private moveDirection: Vec3 = new Vec3(0, 0, 0);
    private isJumping: boolean = false; // 跳跃状态
    private velocityY: number = 0; // Y轴速度
    private gravity: number = -50; // 重力

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: any) {
        switch(event.keyCode) {
            case KeyCode.KEY_W:
                this.moveDirection.x = 1;
                break;
            case KeyCode.KEY_S:
                this.moveDirection.x = -1;
                break;
            case KeyCode.KEY_A:
                this.moveDirection.z = -1;
                break;
            case KeyCode.KEY_D:
                this.moveDirection.z = 1;
                break;
            case KeyCode.SPACE:
                if (!this.isJumping) {
                    this.velocityY = this.jumpForce;
                    this.isJumping = true;
                }
                break;
        }
    }

    onKeyUp(event: any) {
        switch(event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
                this.moveDirection.x = 0;
                break;
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.moveDirection.z = 0;
                break;
        }
    }

    update(deltaTime: number) {
        // 应用重力
        this.velocityY += this.gravity * deltaTime;
        
        const pos = this.node.position;
        const moveDelta = new Vec3(
            this.moveDirection.x * this.moveSpeed * deltaTime,
            this.velocityY * deltaTime, // 使用velocityY控制Y轴移动
            this.moveDirection.z * this.moveSpeed * deltaTime,
        );
        
        this.node.setPosition(pos.add(moveDelta));
        
        // 检测是否落地
        if (pos.y <= 0) {
            this.node.setPosition(pos.x, 0, pos.z);
            this.velocityY = 0;
            this.isJumping = false;
        }
    }
}


