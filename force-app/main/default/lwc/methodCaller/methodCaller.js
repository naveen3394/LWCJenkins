import { LightningElement } from 'lwc';
import waterFallContentAsset from '@salesforce/contentAssetUrl/waterfall';
export default class MethodCaller extends LightningElement {
    video =waterFallContentAsset;
    handlePlay() {
        this.template.querySelector('c-video-player').play();
    }

    handlePause() {
        this.template.querySelector('c-video-player').pause();
    }
}