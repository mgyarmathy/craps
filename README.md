Web Dice Roller
===============

Description
-----------

Web Dice Roller is a simple web demo that allows you to roll some dice.
It's built using [three.js][three.js] and [Physijs][Physijs], and requires a
modern, WebGL-enabled browser to run.

I wrote this to play with Three.js, and for the moment it's pretty limited and
somewhat unstable but I hope to improve that and build an useful app (well,
useful for rolists and wargamers at least :) that can run on both mobile and
desktop browsers.

[three.js]: https://github.com/mrdoob/three.js
[Physijs]: https://github.com/chandlerprall/Physijs

Usage
-----

Try the demo directly without cloning the project: 
http://diox.github.com/webdiceroller/

Use the GUI on the top-left corner of the page to select the number and type of
dice you want, and select 'roll'!

Should you want to clone the project and play around with it, remember that some 
browsers forbid you to load ressources from file:/// URLs. If you don't want to
publish your clone on some web host, you can simply do the following in a 
terminal:

```shell
    $ cd /path/to/webdiceroller/
    $ python -m SimpleHTTPServer
```

And then point your browser to http://localhost:8000/ and you're good to go!

Warnings
--------

There are a couple of issues you need to know about before trying the demo.

1. First, it appears to be too slow to run on mobile at the moment. I have a 
couple things I want to try (disabling shadows, reducing renderer size, etc) but
I suspect this won't be enough. I'd love to be proven wrong, though. Submit pull
requests :-)

2. Second, it can sometimes hang your browser. From my initial testing it 
appears to be caused my too many collisions in Physijs, but I haven't been able
to pinpoint it yet, and I might be completely wrong. In any case, be careful, 
treat this demo as experimental, and be prepared to have to kill your browser if
things go wrong. I've restricted the number in the GUI and in the engine to 
reduce the chance of having that bug, but it might still happen if you are
unlucky.

Roadmap
-------

Some random ideas for the future:

- Implement Web GL detection.

- Implement d4, d8, d10, d12 (or even d2, which would be a coin flip).

- Implement high-poly models, keeping low-poly versions for collision detection.

- Implement better textures and lightning.

- Implement a true GUI to change various settings, dices being rolled, etc.

- Add an option to disable CPU/GPU-hungry features.

- Implement offline-mode and actually publish the app !