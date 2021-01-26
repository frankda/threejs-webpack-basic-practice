import * as THREE from 'three';

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

export function initCamera(initialPosition) {
    const position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
}