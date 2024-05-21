import { _decorator, Component, AudioSource, AudioClip, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioClip)
    backgroundMusic: AudioClip = null;

    private static instance: AudioManager = null;
    private audioSource: AudioSource = null;

    onLoad() {
        if (AudioManager.instance) {
            this.destroy();
            return;
        }

        AudioManager.instance = this;
        director.addPersistRootNode(this.node);

        this.audioSource = this.getComponent(AudioSource);
        if (!this.audioSource) {
            this.audioSource = this.addComponent(AudioSource);
        }

        this.playBackgroundMusic();
    }

    playBackgroundMusic() {
        if (this.audioSource && this.backgroundMusic) {
            this.audioSource.clip = this.backgroundMusic;
            this.audioSource.loop = true;
            this.audioSource.play();
        } else {
            console.error("AudioSource or backgroundMusic not set!");
        }
    }

    stopBackgroundMusic() {
        if (this.audioSource) {
            this.audioSource.stop();
        } else {
            console.error("AudioSource not found!");
        }
    }
}
