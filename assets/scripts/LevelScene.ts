import { _decorator, Component, Button, director, Graphics, view, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectionScene')
export class LevelSelectionScene extends Component {

    @property(Graphics)
    bgGraphics: Graphics = null;

    @property(Button)
    level1Button: Button = null;

    @property(Button)
    level2Button: Button = null;

    @property(Button)
    level3Button: Button = null;

    @property(Graphics)
    smallGraphics: Graphics = null;

    onLoad() {
        this.drawBackground();
        this.drawSmallGraphic();

        // Ensure the buttons are assigned via the Inspector and have the correct nodes
        if (this.level1Button) {
            this.level1Button.node.on('click', () => this.loadLevel('Level1'), this);
        }
        if (this.level2Button) {
            this.level2Button.node.on('click', () => this.loadLevel('Level2'), this);
        }
        if (this.level3Button) {
            this.level3Button.node.on('click', () => this.loadLevel('Level3'), this);
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

    drawSmallGraphic() {
        // Ensure the node has a Graphics component to draw the small graphic
        if (this.smallGraphics) {
            this.smallGraphics.fillRect(this.smallGraphics.node._lpos.x, this.smallGraphics.node._lpos.y,this.smallGraphics.node.width,this.smallGraphics.node.height);
        } else {
            console.error("Small Graphics component not found on node!");
        }
    }

    loadLevel(levelSceneName: string) {
        // Load the selected level scene
        director.loadScene(levelSceneName);
    }
}
