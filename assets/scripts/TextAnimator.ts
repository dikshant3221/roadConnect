import { _decorator, Component, Label, Node, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TextAnimator')
export class TextAnimator extends Component {
    @property(Label)
    animatedLabel: Label = null;

    onLoad() {
        // Automatically find the Label component if not assigned
        if (!this.animatedLabel) {
            this.animatedLabel = this.getComponent(Label);
        }

        // Ensure the label component is attached before starting the animation
        if (this.animatedLabel) {
            this.startAnimation();
        } else {
            console.error("Label component not found on node!");
        }
    }

    startAnimation() {
          // Get the starting position of the label node
        const startPos = this.node.position.clone();

        // Define the end position for the tween
        const endPos = v3(startPos.x + -500, startPos.y, startPos.z);

        // Create a tween to move the label node to the end position
        tween(this.node)
            .to(0.5, { position: endPos })  // Move to the end position over 1 second
            .start();
    }
}
