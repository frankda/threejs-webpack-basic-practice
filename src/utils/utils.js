import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

// initial renderer with general option
export function initRenderer(additionalProperties) {
    // check if props exists or not
    const props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};    // check if props exists or not
    const renderer = new THREE.WebGLRenderer(props);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl-output').appendChild(renderer.domElement);

    return renderer;
}

// use spot light as default light
export function initDefaultLighting(scene, initialPosition) {
    // create default light position if position is not given
    const position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-10, 30, 40);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.copy(position);
    spotLight.castShadow = true;
    spotLight.name = 'spotLight';

    // render a more realistic light
    // only has effect when physicallyCorrectLights is set
    spotLight.decay = 2;

    // set spotlight light edge
    spotLight.penumbra = 0.05;

    // shadow mapsize used to make shadow edge smoth
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;

    // add light to scene
    scene.add(spotLight);

    // add ambient light to soft shadow (optional)
    const ambientLight = new THREE.AmbientLight(0x343434);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);
}

export function initDirectionalLighting(scene, initialPosition) {
    const position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-10, 30, 40);

    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.copy(poistion)
    directionalLight.castShadow = false;
    directionalLight.shadow.camera.near = 2;
    directionalLight.shadow.camera.far = 80;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;

    directionalLight.intensity = 0.5;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    scene.add(directionalLight);
}

export function initCamera(initialPosition) {
    const position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
}

export function initTrackballControls(camera, renderer) {
    const trackballControls = new TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];

    return trackballControls;
}

export function addBackgroundPlane(scene, texture) {
    const withTexture = (texture !== undefined) ? texture : false;

    const planeGeometry = new THREE.PlaneGeometry(10000, 10000);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });
    if (withTexture) {
        planeMaterial.map = texture;
        planeMaterial.map.wrapS = THREE.RepeatWrapping;
        planeMaterial.map.wrapT = THREE.RepeatWrapping;
        planeMaterial.map.repeat.set(80, 80);
    }

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    scene.add(plane);
    
    return plane;
}