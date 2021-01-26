import * as THREE from 'three';
import { initRenderer, initDefaultLighting, initCamera } from './utils/utils';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationClip } from 'three';
import Model from './models/CesiumMan/CesiumMan.glb';
import Tokoyo from './models/Little-tokyo/LittlestTokyo.glb'

function init() {
    const renderer = initRenderer();
    const camera = initCamera();
    const scene = new THREE.Scene();

    initDefaultLighting(scene);

    // setting camera
    // const trackballControls = new THREE.TrackballControls(camera);
    // trackballControls.rotateSpeed = 1.0;
    // trackballControls.zoomSpeed = 1.0;
    // trackballControls.panSpeed = 1.0;

    // load gltf file
    const loader = new GLTFLoader();
    loader.load(Model, function (result) {
        result.scene.scale.set(6, 6, 6)
        result.scene.translateY(-3);
        result.scene.rotateY(-0.3 * Math.PI);
        scene.add(result.scene);

        // setup mixer
        mixer = new THREE.AnimationMixer( result.scene );
        AnimationClip = result.animations[0];
        clipAction = mixer.clipAction(animationClip).play();
        animationClip = clipAction.getClip();
    });


    function render() {
        // trackballControls.update(clock.getDelta());
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        // if (mixer && clipAction && controls) {
        //     mixer.update( delta );
        //     controls.time = mixer.time;
        //     controls.effectiveTimeScale = clipAction.getEffectiveTimeScale();
        //     controls.effectiveWeight = clipAction.getEffectiveWeight();
        // }
    }

    render();
}

init();