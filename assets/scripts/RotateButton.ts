import { _decorator, Component, Node, Button, v3, tween, view, Graphics, director, CCString, CCInteger, Label, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RotateButton')
export class RotateButton extends Component {

    @property(Graphics)
    bgGraphics: Graphics = null;
	
	@property(Button)
    exitButton: Button = null;

    @property([Button])
    buttons: Button[] = [];

    @property({ type: [CCInteger] })
    finalAngles: CCInteger[] = [];

    @property(Label)
    levelText: Label = null;

    @property(CCString)
    currentSceneName: CCString = '';
	
	@property(AudioClip)
    buttonClickSound: AudioClip = null;
	
    @property(AudioClip)
    levelComplete: AudioClip = null;
	
	@property(AudioClip)
    buttonAppear: AudioClip = null;

    private buttonsRotated: Set<Node> = new Set();
    private currentRotations: Map<Node, number> = new Map();
    private static readonly EPSILON = 1e-6;
    private animating: boolean = false;
	private audioSource: AudioSource = null;

    onLoad() {
		// Draw the background when the scene loads
        this.drawBackground();

        if (this.buttons.length !== this.finalAngles.length) {
            console.error("Each button must have a corresponding final angle.");
            return;
        }
            this.scaleButtonTween(1);
			this.exitButton.node.on('click', () =>  director.loadScene('LevelsScene'), this);
        // Initialize button states and set up click listeners
        for (let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];
            const finalAngle = this.finalAngles[i];

            this.currentRotations.set(button.node, button.node.eulerAngles.z);
            button.node.on('click', () => this.onRotateButtonClick(button.node, finalAngle), this);
            button.node.on('rotation-complete', () => this.onButtonReachedFinalAngle(button.node), this);

            // Check if the button is already at its final angle
            if (this.isButtonAtFinalAngle(button.node, finalAngle)) {
                this.buttonsRotated.add(button.node);
            }
        }

        // Check if all buttons are already rotated to their final angles
        if (this.buttonsRotated.size === this.buttons.length) {
            this.animateEndSequence();
        }
		 this.audioSource = this.node.addComponent(AudioSource);
		if (this.audioSource && this.buttonAppear) {
            this.audioSource.playOneShot(this.buttonAppear);
        }
    }

    drawBackground() {
        if (this.bgGraphics) {
            const winSize = view.getVisibleSize();
            this.bgGraphics.fillRect(-winSize.width / 2, -winSize.height / 2, winSize.width, winSize.height);
        } else {
            console.error("Graphics component not found on node!");
        }
    }

    onRotateButtonClick(node: Node, finalAngle: number) {
        if (this.animating) return;  // Here we Prevent clicks during animation
		
        if (this.audioSource && this.buttonClickSound) {
            this.audioSource.playOneShot(this.buttonClickSound);
        }
        const currentRotation = node.eulerAngles.z;
        const newRotation = currentRotation + 90;

        this.animating = true;
        tween(node)
            .to(0.2, { eulerAngles: v3(node.eulerAngles.x, node.eulerAngles.y, newRotation) })
            .call(() => {
                this.currentRotations.set(node, newRotation);
                this.checkRotationComplete(node, finalAngle);
                this.animating = false;
            })
            .start();
    }

    checkRotationComplete(node: Node, finalAngle: number) {
        const rotation = this.currentRotations.get(node) || 0;
        const normalizedRotation = rotation % 360;
        const normalizedFinalAngle = finalAngle % 360;

        if (Math.abs(normalizedRotation - normalizedFinalAngle) < RotateButton.EPSILON) {
            node.emit('rotation-complete', node);
        } else {
            this.buttonsRotated.delete(node);
        }
    }

    isButtonAtFinalAngle(node: Node, finalAngle: number): boolean {
		// Here we checking button angles is already at final angle
        const rotation = node.eulerAngles.z;
        const normalizedRotation = rotation % 360;
        const normalizedFinalAngle = finalAngle % 360;
        return Math.abs(normalizedRotation - normalizedFinalAngle) < RotateButton.EPSILON;
    }

    onButtonReachedFinalAngle(node: Node) {
        this.buttonsRotated.add(node);
        if (this.buttonsRotated.size === this.buttons.length) {
            this.animateEndSequence();
        }
    }

    animateEndSequence() {
        this.scaleButtonTween(0);
        this.tweenOnLevelComplete();
    }
    
    scaleButtonTween(scaleValue) {
        console.log("Starting button scale-down tweens...");

        // Ensure that all buttons are scaled down
        for (let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];
            console.log(`Scaling down button: ${button.node.name}, Current scale: ${button.node.scale}`);
            
            // Start the scale-down tween for the button
            tween(button.node)
                .to(0.5, { scale: v3(scaleValue, scaleValue, scaleValue) })
                .start();
        }
    }

    tweenOnLevelComplete() {
		if (this.audioSource && this.levelComplete) {
            this.audioSource.playOneShot(this.levelComplete);
        }
        // Get the starting position of the label node
        const startPos = this.levelText.node.position.clone();

        // Define the end position for the tween
        const endPos = v3(startPos.x - view.getVisibleSize().width, startPos.y, startPos.z);

        // Create a tween to move the label node to the end position
        tween(this.levelText.node)
            .to(0.5, { position: endPos })  // Move to the end position over 1 second
            .call(() => {
                this.loadNextLevel();
            })
            .start();
    }

    loadNextLevel() {
		// From here we move to next level
        let nextLevelSceneName = '';

        switch (this.currentSceneName) {
            case 'Level1':
                nextLevelSceneName = 'Level2';
                break;
            case 'Level2':
                nextLevelSceneName = 'Level3';
                break;
            case 'Level3':
                nextLevelSceneName = 'LevelsScene';
                break;
            default:
                console.error("Current scene name is not defined.");
                return;
        }

        director.loadScene(nextLevelSceneName);
    }
}
