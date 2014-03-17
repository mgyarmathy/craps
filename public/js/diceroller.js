'use strict';

var Roller = (function() {
    var render_stats, renderer, physics_stats, scene, light, camera, 
        dices = [], done = false, 
        ids = 0, options,
        availableDice = ['d6', 'd20'],
        simulationStopped = false, renderingStopped = false;

    options = {
        'requestedDice': [],
        'd6': 2,
        'd20': 0,
    }

    var play = function() {
        simulationStopped = false;
        renderingStopped = false;
        requestAnimationFrame(render);
        scene.simulate();
    }

    var stop = function() {
        simulationStopped = true;
        renderingStopped = true;
    }

    var calculateResults = function() {
        if (done || dices.length != options.requestedDice.length 
                 || !dices.length) {
            return;
        }
        var values = [];
        var dicesInActivity = dices.filter(function(die) {
            if (die.stillRolling) {
                var angularv = die.getAngularVelocity();
                var linearv = die.getLinearVelocity();
                var position = die.position;

                if (position.y < 0) {
                    // HACK: If a die ran off the scene, get it back
                    die.reposition();
                }

                if ((angularv.x == 0 && angularv.y == 0 && angularv.z == 0)
                 || (linearv.x == 0 && linearv.y == 0 && linearv.z == 0)) {
                    // HACK: Something is wrong, this shouldn't be possible
                    // unless we are extremely unlucky. Ignore this result.
                    console.warn('Dice ' + die.id + ' is weird!');
                    console.warn('Angular and/or Linear velocity at 0!');
                    console.log(position);
                    return true;
                }

                // Trick: we allow angular y velocity to be higher than the
                // rest, at this point it doesn't matter much, the die can't
                // roll over any more anyway.

                if (angularv.x < 0.3 && angularv.y < 2.0 && angularv.z < 0.3
                 && linearv.x < 0.3 && linearv.y < 0.3 && linearv.z < 0.3
                 && position.y < 6) {
                    console.log('Dice ' + die.id + ' has stopped');
                    console.log(angularv);
                    console.log(linearv);
                    console.log(position);
                    die.stillRolling = false;
                }
            }
            return die.stillRolling;
        });
        if (!dicesInActivity.length) {
            console.log('All ' + dices.length + ' dices have stopped...');
            done = true;
            dices.forEach(function(die) {
                var value, index, intersect;
                var near = new THREE.Vector3(die.position.x, 
                                             die.position.y, 
                                             die.position.z);
                var away = new THREE.Vector3(die.position.x, 
                                             50,
                                             die.position.z);
                var ray = new THREE.Raycaster(away, 
                                                near.sub(away).normalize());
                var intersects = ray.intersectObjects([die]);

                // Finding the number after we did the intersection could be
                // done by trying to match the correct face, but that would
                // not work with d12 which have extra faces, plus simply
                // having a material per side and checking materialIndex is
                // easier.
                // Note: for D4s, that won't work out of the box, since we 
                // dont have a face facing upwards. Instead, have the ray 
                // start from away = new THREE.Vector3(die.position.x, -50,
                // die.position.z); so that we check the face underneath. 
                // If each face is numbered correctly it should work.
                intersect = intersects[0];
                index = intersect.face.materialIndex;
                value = intersect.object.material.materials[index].name;
                values.push(parseInt(value, 10));
            });
            var results = values.join(', ');
            var total = 'Total: ' + values.reduce(function(a, b) {
				betsEval(a,b);
                return a + b;
            });
            document.getElementById('rollVal').textContent = values.reduce(function(a,b) { return a + b} );
            document.getElementById('rollVal').style.display = 'none';
            if (values.length > 1) {
                total += ' (' + results + ')';
            }
            console.log('... And the results are: ' + results);
            var totalElm = document.getElementById('total');
            totalElm.style.display = 'block';
            totalElm.textContent = total;
            setTimeout(stop, 500);
        };
    };

    var initDiceBox = function() {
        // Ground
        var ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ 
                map: THREE.ImageUtils.loadTexture('models/textures/ground.jpg')
            }),
            .7, // medium friction
            .3 // low restitution
        );

        var ground_geom = new THREE.CubeGeometry(50, 1, 30);
        var ground = new Physijs.BoxMesh(
            ground_geom,
            ground_material,
            0 // mass
        );
        ground.receiveShadow = true;
        scene.add(ground);

        var bumper_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ 
                map: THREE.ImageUtils.loadTexture('models/textures/bumper-wood.jpg')
            }),
            .7, // medium friction
            .3 // low restitution
        );
        bumper_material.visible = true;
        bumper_material.wireframe = false;

        var bumper_geom = new THREE.CubeGeometry(1, 15, 30);
        var bumper_geom_sides = new THREE.CubeGeometry(1, 15, 50);
        var bumper = new Physijs.BoxMesh(bumper_geom, bumper_material, 0);
        bumper.position.set(25, 3, 0);
        scene.add(bumper);
        
        bumper = new Physijs.BoxMesh(bumper_geom, bumper_material, 0);
        bumper.position.set(-25, 3, 0);
        scene.add(bumper);
        
        bumper = new Physijs.BoxMesh(bumper_geom_sides, bumper_material, 0);
        bumper.position.set(0, 3, -15);
        bumper.rotation.set(0, Math.PI / 2, 0);
        scene.add(bumper);
        
        bumper = new Physijs.BoxMesh(bumper_geom_sides, bumper_material, 0);
        bumper.position.set(0, 3, 15);
        bumper.rotation.set(0, Math.PI / 2, 0);
        scene.add(bumper);

        //var ceiling = new Physijs.BoxMesh(ground_geom, bumper_material, 0);
        //ceiling.position.set(0, 20, 0)
        //scene.add(ceiling);
    };

    var initScene = function() {
        var aspectRatio = window.innerWidth / window.innerHeight;
        var width = 1280;
        var width = 1280;
        var height = width / aspectRatio;
        var viewport = document.getElementById('viewport');

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        viewport.appendChild(renderer.domElement);

        /*render_stats = new Stats();
        render_stats.domElement.style.position = 'absolute';
        render_stats.domElement.style.top = '0px';
        render_stats.domElement.style.zIndex = 100;
        viewport.appendChild(render_stats.domElement);

        physics_stats = new Stats();
        physics_stats.domElement.style.position = 'absolute';
        physics_stats.domElement.style.top = '50px';
        physics_stats.domElement.style.zIndex = 100;
        viewport.appendChild(physics_stats.domElement);
        */
        scene = new Physijs.Scene({ 
            reportsize: options.requestedDice.length + 6,
            fixedTimeStep: 1 / 60,
        });
        scene.setGravity(new THREE.Vector3(0, -70, 0));
        scene.addEventListener('update', function() {
            if (!simulationStopped) {
                // FIXME: tweaking parameters sent to .simulate might
                // help us ensure the dice doesn't fall off the board, or
                // affect performance, look into that.
                scene.simulate(undefined, 2);
                //physics_stats.update();
                calculateResults();
            }
        });

        // Lights
        light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(60, 100, -60);
        light.target.position.copy(scene.position);
        light.castShadow = true;
        light.shadowCameraLeft = -60;
        light.shadowCameraTop = -60;
        light.shadowCameraRight = 60;
        light.shadowCameraBottom = 60;
        light.shadowCameraNear = 20;
        light.shadowCameraFar = 200;
        light.shadowBias = -.0001
        light.shadowMapWidth = light.shadowMapHeight = 2048;
        light.shadowDarkness = .7;
        scene.add(light);

        // Camera
        camera = new THREE.PerspectiveCamera(
            30, // Fov
            aspectRatio, // Aspect ratio
            1, // near
            1000 // far
        );
        //camera.position.set(0, 94, 0);
        camera.position.set(65, 65, 0); // for debugging purposes
        camera.lookAt(scene.position);
        scene.add(camera);

        // Action !
        initDiceBox();
        play();
        stop();
    };

    var spawnDice = function() {
        var friction = 0.3;
        var restitution = 0.7;
        var data = {}, totalLoaded = 0, loader = new THREE.JSONLoader(), 
            loaded = false;

        var onLoad = function() {
            if (++totalLoaded == availableDice.length) {
                loaded = true;
                createDie();
            }
        }

        if (loaded) {
            createDie();
        } else {
            availableDice.forEach(function(name) {
                var url = 'models/' + name + '.js?bc';
                loader.load(url, function (geometry, materials) {
                    data[name] = {
                        'mass': 3, // FIXME: change according to die
                        'geometry': geometry,
                        'material': Physijs.createMaterial(
                            new THREE.MeshFaceMaterial(materials), friction, 
                                                                   restitution)
                    };
                    onLoad();
                });
            });
        }

        var handleCollision = function (collidedWith, linearV, angularV) {
            if (collidedWith.mass == 0) {
                this.collisions++;
            }
            if (this.collisions > 42) {
                // HACK: If this die can't stop bouncing, help him stop by
                // setting its linear velocity to 0.
                console.warn('Dice can\'t stop, let\'s help him!');
                this.setLinearVelocity(new THREE.Vector3(0.01, 0.01, 0.01));
            }
        };

        var createDie = function() {
            var name, len = dices.length;

            if (len >= options.requestedDice.length) {
                return;
            }
            var name = options.requestedDice[len];
            var die = new Physijs.ConvexMesh(data[name].geometry,
                                             data[name].material, 
                                             data[name].mass);
            die.receiveShadow = false; // too complicated for the moment,
                                       // messes up lightning on the die
            die.castShadow = true;
            die.id = ++ids;

            die.reposition = function() {
                this.collisions = 0;
                this.stillRolling = true;
                this.position.set(
                    22,
                    THREE.Math.randInt(5, 15), 
                    THREE.Math.randInt(-10, 10));
                this.rotation.set(
                    Math.random() * Math.PI / 180 * 360,
                    Math.random() * Math.PI / 180 * 360,
                    Math.random() * Math.PI / 180 * 360
                );
                this.setLinearVelocity(new THREE.Vector3(0, 0, 0));
                this.__dirtyPosition = true;
            }

            die.applyInitialImpulse = function() {
                var force = [
                    THREE.Math.randInt(-225, -175),
                    THREE.Math.randInt(-100, -10),
                    THREE.Math.randInt(-15, 15)
                ], offset = [
                    THREE.Math.randInt(-1, 1),
                    THREE.Math.randInt(-1, 1),
                    THREE.Math.randInt(-1, 1)
                ];
                this.applyImpulse(
                    new THREE.Vector3(force[0], force[1], force[2]),
                    new THREE.Vector3(offset[0], offset[1], offset[2]));
            }

            die.reposition();
            die.addEventListener('collision', handleCollision);
            die.addEventListener('ready', function() {
                this.applyInitialImpulse();
                dices.push(this);
                setTimeout(createDie, 100);
            });
            scene.add(die);
        };
    };

    var render = function() {
        // FIXME let user stop rendering
        if (!renderingStopped) {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            //render_stats.update();
        }
    };
	
	var karan = function() {
	
	
	};

    var reRoll = function() {
        // build from options
        var i, type, die;

        stop();

        while (die = dices.pop()) {
            scene.remove(die);
        }
        options.requestedDice = [];
        availableDice.forEach(function(type) {
            for (i = 0; i < options[type]; i++) {
                options.requestedDice.push(type);
            }
        });
        document.getElementById('total').style.display = 'none';
		document.getElementById('currGameState').style.display = 'none';
        done = false;
        console.log(options.requestedDice);
        if (options.requestedDice.length) {
            console.log('Reroll complete')
            play();
            spawnDice();
        }
    }

    options['init'] = initScene;
    options['roll'] = reRoll;

    return options;
})();