import { _decorator, Component, Color, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundColorSetter')
export class BackgroundColorSetter extends Component {
    @property(Color)
    backgroundColor: Color = new Color(255, 0, 0, 255); // Default: Red

    onLoad() {
        // Get the Sprite component
        const sprite = this.node.getComponent(Sprite);
        if (sprite) {
            // Set the background color
            sprite.color = this.backgroundColor;
        }
    }
}
