// Lazy load 3D scene only when visible
let sceneInitialized = false;

const init3DScene = () => {
    if (sceneInitialized) return;
    sceneInitialized = true;

    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Fog for depth - dynamically set based on theme
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    scene.fog = new THREE.FogExp2(isDark ? 0x0f172a : 0xfafbfc, 0.002);

    // Update fog when theme changes
    const updateSceneFog = () => {
        const isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light';
        scene.fog.color.setHex(isDarkMode ? 0x0f172a : 0xfafbfc);

        // Update particle colors - White in dark, orange in light
        particlesMesh.material.color.setHex(isDarkMode ? 0xffffff : 0xf97316);
        particlesMesh.material.opacity = isDarkMode ? 0.9 : 0.8;

        // Update geometry colors - White/gray in dark, orange in light
        geoMesh.material.color.setHex(isDarkMode ? 0xffffff : 0xf97316);
        geoMesh.material.opacity = isDarkMode ? 0.15 : 0.12;
        geoMesh2.material.color.setHex(isDarkMode ? 0xe2e8f0 : 0xfb923c);
        geoMesh2.material.opacity = isDarkMode ? 0.1 : 0.08;
    };

    // Listen for theme changes
    const observer = new MutationObserver(updateSceneFog);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Reduced from 2
    container.appendChild(renderer.domElement);

    // Particles - optimized count
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 300; // Further reduced for performance
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material - Dynamic color based on theme
    const isDarkTheme = document.documentElement.getAttribute('data-theme') !== 'light';
    const material = new THREE.PointsMaterial({
        size: 0.3,
        color: isDarkTheme ? 0xffffff : 0xf97316, // White in dark, orange in light
        transparent: true,
        opacity: isDarkTheme ? 0.9 : 0.8,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Mouse Interaction - optimized
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Throttle mouse events for performance
    let mouseMoveTimeout;
    document.addEventListener('mousemove', (event) => {
        if (mouseMoveTimeout) return;
        mouseMoveTimeout = setTimeout(() => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
            mouseMoveTimeout = null;
        }, 16); // ~60fps
    }, { passive: true });

    // Geometric shapes for visual effect - Dynamic colors
    const geoGeometry = new THREE.IcosahedronGeometry(15, 0);
    const geoMaterial = new THREE.MeshBasicMaterial({
        color: isDarkTheme ? 0xffffff : 0xf97316, // White in dark, orange in light
        wireframe: true,
        transparent: true,
        opacity: isDarkTheme ? 0.15 : 0.12 // Increased opacity for visibility
    });
    const geoMesh = new THREE.Mesh(geoGeometry, geoMaterial);
    scene.add(geoMesh);

    const geoGeometry2 = new THREE.IcosahedronGeometry(20, 0);
    const geoMaterial2 = new THREE.MeshBasicMaterial({
        color: isDarkTheme ? 0xe2e8f0 : 0xfb923c, // Light gray in dark, lighter orange in light
        wireframe: true,
        transparent: true,
        opacity: isDarkTheme ? 0.1 : 0.08 // Increased opacity for visibility
    });
    const geoMesh2 = new THREE.Mesh(geoGeometry2, geoMaterial2);
    scene.add(geoMesh2);

    // Animation Loop - optimized
    const clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
        frameCount++;
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        const elapsedTime = clock.getElapsedTime();

        // Rotate particles
        particlesMesh.rotation.y = 0.1 * elapsedTime;
        particlesMesh.rotation.x = 0.05 * elapsedTime;

        // Mouse interaction with easing
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        // Animate geometric shapes
        geoMesh.rotation.x = elapsedTime * 0.1;
        geoMesh.rotation.y = elapsedTime * 0.1;

        geoMesh2.rotation.x = -elapsedTime * 0.05;
        geoMesh2.rotation.y = -elapsedTime * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    // Resize Handler - debounced
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 250);
    }, { passive: true });

    animate();
};

// Intersection Observer for lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                init3DScene();
                observer.disconnect();
            }
        });
    }, { rootMargin: '100px' });

    observer.observe(container);
});
