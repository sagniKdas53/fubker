const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const fubukerT = new THREE.TextureLoader().load('fubuker.jpg');
//const fubuker = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: fubukerT }));
const fubuker = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshStandardMaterial({ map: fubukerT }));
//fubuker.position.set(-90,-20,0);
scene.add(fubuker);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight)//, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

function animate(){
    requestAnimationFrame(animate);
    /*torus.rotation.x += 0.01;
    torus.rotation.y += 0.03;
    torus.rotation.z += 0.04;

    fubuker.position.z -= 0.2;
    fubuker.position.x += 0.2;
    fubuker.position.y += 0.2;*/

    fubuker.rotation.x += 0.05;
    fubuker.rotation.y += 0.05;
    fubuker.rotation.z += 0.05;
    renderer.render(scene, camera);
}

animate()


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    /* 
    fubuker.position.z = t * -0.01;
    fubuker.position.x = t * -0.0002;
    fubuker.position.y = t * -0.0002;
    */
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    //console.log(camera.position.x,camera.position.y,camera.position.z);
  }
  
document.body.onscroll = moveCamera;
moveCamera();

window.onload = function() {
  //document.getElementById("my_audio").play();
  //window.scroll(0,window.innerHeight/2);
}