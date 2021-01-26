import * as THREE from 'three';
import { initRenderer, initDefaultLighting, initCamera, initTrackballControls } from './utils/utils';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationClip } from 'three';
import Model from './models/CesiumMan/CesiumMan.glb';

function init() {
    const renderer = initRenderer();
    const camera = initCamera();
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();

    // animation setting for loaded gltf model
    let mixer;
    let clipAction;
    let animationClip;

    initDefaultLighting(scene);
    const trackballControls = initTrackballControls(camera, renderer);

    // load gltf file
    const loader = new GLTFLoader();
    loader.load(Model, function (result) {
        console.log(result);
        result.scene.scale.set(6, 6, 6)
        result.scene.translateY(-3);
        result.scene.rotateY(-0.3 * Math.PI);
        scene.add(result.scene);

        // setup mixer
        mixer = new THREE.AnimationMixer( result.scene );
        animationClip = result.animations[0];
        clipAction = mixer.clipAction(animationClip).play();
        // animationClip = clipAction.getClip();
    });


    function render() {
        const delta = clock.getDelta();
        trackballControls.update(delta);
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        if (mixer && clipAction) {
            mixer.update(delta);
        }
    }

    render();
}

init();