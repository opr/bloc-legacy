export default class HomepageScene {

    render(container) {
        const WIDTH = 400;
        const HEIGHT = 300;

        const VIEW_ANGLE = 45;
        const ASPECT = WIDTH / HEIGHT;
        const NEAR = 0.1;
        const FAR = 10000;

        const renderer = new THREE.WebGLRenderer();
        const camera =
            new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR
            );

        const scene = new THREE.Scene();

        scene.add(camera);
        renderer.setSize(WIDTH, HEIGHT);

        container.appendChild(renderer.domElement);
    }

}
