import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class ColorLayer  extends Component {
    onload() {
  this.drawBackground();
    }
   color: cc.Color = cc.Color.WHITE;

    drawBackground() {
        // Ensure the Graphics component is attached
        let ctx = this.getComponent(cc.Graphics);
        if (!ctx) {
            ctx = this.addComponent(cc.Graphics);
        }

        // Draw a rectangle with the given color
        ctx.clear();
        ctx.rect(0, 0, cc.winSize.width, cc.winSize.height);
        ctx.fillColor = this.color;
        ctx.fill();
    }
   
}

