//this is where our stuff that gets compiled by webpack will live

import HomepageScene from './HomepageScene/HomepageScene';
let hps = new HomepageScene(),
    homepageSceneContainer = document.getElementsByClassName('homepage-scene-container');

if(homepageSceneContainer.length > 0 ) {
    hps.render();
}