window.addEventListener("load", function () {
    "use strict";
    
    var w = 500, h = 500;
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    var view = document.getElementById("view");
    view.appendChild(renderer.domElement);
    
    var camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
    camera.position.set(0, 0, 50);
    var controls = new THREE.TrackballControls(camera, view);
    
    var scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x666666));
    
    var light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(0, 100, 100);
    scene.add(light1);
    
    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0, -100, -100);
    scene.add(light2);

    //create material that can be added to the geom
    var mat = new THREE.MeshPhongMaterial({
        color: 0x339900, ambient: 0x339900, specular: 0x030303,
    });

    //creates obj that holds geom and mat, is replaced with the stl + mat
    var obj = new THREE.Mesh(new THREE.Geometry(), mat);
    scene.add(obj);
    
    var loop = function loop() {
        requestAnimationFrame(loop);
        //obj.rotation.z += 0.05;
        controls.update();
        renderer.clear();
        renderer.render(scene, camera);
    };
    loop();
    
    // file load
    var openFile = function (file) {
        //create new file reader
        var reader = new FileReader();

        //when a new file is added to the loader
        reader.addEventListener("load", function (ev) {

            //buffer = the file that is added when the event loader is triggered from the filereader
            var buffer = ev.target.result;

            //Geom = file
            var geom = loadStl(buffer);

            //Remove previous obj
            scene.remove(obj);

            //create new obj that is formed of the new geom, and the mat creation
            obj = new THREE.Mesh(geom, mat);

            //Add the new obj to the scene
            scene.add(obj);
        }, false);
        reader.readAsArrayBuffer(file);
    };
    
    // file input button
    var input = document.getElementById("file");
    input.addEventListener("change", function (ev) {
        var file = ev.target.files[0];
        openFile(file);

        //Try and make it load a model on page load (on chassis page, load chassis model etc.)
        //var fileURL = window.URL.createObjectURL(file);
        //console.log("CONSOLE LOG FILE URL");
        //console.log(fileURL);
        //file = "appx://b9bdac4d-ff26-4446-bfff-10361942b656/ac4ba7fd-893e-40d6-99c8-d4a4eed25b19"
        //http://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html

    }, false);
    
    // dnd
    view.addEventListener("dragover", function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
    }, false);
    view.addEventListener("drop", function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var file = ev.dataTransfer.files[0];
        openFile(file);
    }, false);
}, false);
