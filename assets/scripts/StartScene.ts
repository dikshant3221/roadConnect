import { _decorator, Component, Label, director, Graphics, tween, Node, Color, Vec3, view} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartScene')
export class StartScene extends Component {
    @property(Graphics)
    bgGraphics: Graphics = null;

    @property(Label)
    playButton: Label = null;

    @property(Label)
    roadLabel: Label = null;
	
    @property(Label)
    connectLabel: Label = null;
    onLoad() {
        // Draw the background when the scene loads
        this.drawBackground();
        // Automatically find the Label components if not assigned
        if (!this.playButton) {
            this.playButton = this.getComponent(Label);
        }

        if (!this.roadLabel) {
            this.roadLabel = this.getComponent(Label);
        }

        if (!this.connectLabel) {
            this.connectLabel = this.getComponent(Label);
        }

        // Ensure the button component is attached before starting the animation
        if (this.playButton) {
            this.playButton.node.on(Node.EventType.TOUCH_END, this.onPlayButtonClick, this);
        } else {
            console.error("Play button component not found on node!");
        }

        // Ensure labels are assigned via the Inspector and start their animations
        if (this.roadLabel && this.connectLabel) {
            this.startLabelAnimations();
        } else {
            console.error("Label components not found on node!");
        }
    }

    drawBackground() {
        // Ensure the node has a Graphics component to draw the background
        if (this.bgGraphics) {
            const winSize = view.getVisibleSize();
            this.bgGraphics.fillRect(-winSize.width / 2, -winSize.height / 2, winSize.width, winSize.height);
        } else {
            console.error("Graphics component not found on node!");
        }
    }

    onPlayButtonClick() {
        // Scale up and down the play button before loading the next scene
        const originalScale = this.playButton.node.scale;
        const scaleUp = new Vec3(1.2, 1.2, 1.2); // Scale up value
        const scaleDown = new Vec3(1, 1, 1); // Original scale value

        tween(this.playButton.node)
            .to(0.03, { scale: scaleUp }) // Scale up duration
            .to(0.03, { scale: scaleDown }) // Scale down duration
            .call(() => {
                // Load the Levels Scene
                director.loadScene('LevelsScene');
            })
            .start();
    }

    startButtonAnimation() {
        // Scale the play button from 0 to 1
        this.playButton.node.setScale(new Vec3(0, 0, 0));
        tween(this.playButton.node)
            .to(0.3, { scale: new Vec3(1, 1, 1) })
            .start();
    }

    startLabelAnimations() {
        // Tween roadLabel from right to left
        const roadLabelStartPos = new Vec3(640, this.roadLabel.node.position.y, 0);
        const roadLabelEndPos = new Vec3(0, this.roadLabel.node.position.y, 0);

        this.roadLabel.node.setPosition(roadLabelStartPos);
        tween(this.roadLabel.node)
            .to(0.3, { position: roadLabelEndPos })
            .start();

        // Tween connectLabel from left to right
        const connectLabelStartPos = new Vec3(-640, this.connectLabel.node.position.y, 0);
        const connectLabelEndPos = new Vec3(0, this.connectLabel.node.position.y, 0);

        this.connectLabel.node.setPosition(connectLabelStartPos);
        tween(this.connectLabel.node)
            .to(0.3, { position: connectLabelEndPos })
            .call(() => {
                this.startButtonAnimation();
            })
            .start();
    }
}
