import { _decorator, Component, Node, PhysicsSystem, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PhysicsController')
export class PhysicsController extends Component {
    start() {
        PhysicsSystem.instance.enable = true;
        PhysicsSystem.instance.gravity = new Vec3(0, -50, 0);
        PhysicsSystem.instance.allowSleep = true;
    }

    update(deltaTime: number) {
        
    }
}


