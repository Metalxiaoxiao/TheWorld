import { Animation, _decorator, Component, Node, Camera, geometry, input, Input, EventTouch, PhysicsSystem } from 'cc';
const { ccclass, property } = _decorator;
import { EventTarget } from 'cc';
const eventTarget = new EventTarget();

@ccclass('ChestController')
export class ChestController extends Component {
     // Specify the camera rendering the target node.
     @property(Camera)
     readonly cameraCom!: Camera;
 
     @property(Node)
     public targetNode!: Node

     @property({type: Animation})
    public BodyAnim: Animation | null = null;
 
     private _ray: geometry.Ray = new geometry.Ray();
 
     onEnable () {
        eventTarget.on('openChest', this.openChest, this);
     }
 
     onDisable () {
        eventTarget.off('openChest', this.openChest, this);
     }
 
     openChest () {
         //播放开箱动画
         if (this.BodyAnim) {
             this.BodyAnim.play('OpenChest');
         }
     }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}


