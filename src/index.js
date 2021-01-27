import * as THREE from 'three';
import { 
    initRenderer, 
    initDefaultLighting, 
    initCamera, 
    initTrackballControls, 
    addBackgroundPlane 
} from './utils/utils';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Model from './models/CesiumMan/CesiumMan.glb';
import PlaneTexture from './assets/images/background/grid-mesh.jpg';

function init() {
    const renderer = initRenderer();
    const camera = initCamera();
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
    const textureLoader = new THREE.TextureLoader();
    const trackballControls = initTrackballControls(camera, renderer);

    initDefaultLighting(scene);

    // add background plane
    const planeMesh = addBackgroundPlane(scene, textureLoader.load(PlaneTexture));

    // animation setting for loaded gltf model
    let mixer;
    let clipAction;
    let animationClip;

    // load gltf file
    const loader = new GLTFLoader();
    loader.load(Model, function (result) {
        result.scene.scale.set(6, 6, 6)
        result.scene.translateY(-3);
        result.scene.rotateY(-0.3 * Math.PI);
        scene.add(result.scene);

        // setup mixer
        mixer = new THREE.AnimationMixer( result.scene );
        animationClip = result.animations[0];
        clipAction = mixer.clipAction(animationClip).play();
    });


    function render() {
        // time difference between last render and this render
        const delta = clock.getDelta();

        // update control based on time difference
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