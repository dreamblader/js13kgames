kontra.init();
kontra.initKeys();

var canvas = document.getElementById("screen");
var width= canvas.width;
var height= canvas.height;

kontra.setImagePath('assets/images');

kontra.load('a.png').then(function()
{

    var runner_sprite = kontra.Sprite(
        {
            x: (width/2),
            y: height-50,
            image: kontra.imageAssets.a
        });

    var ground = kontra.Sprite(
        {
            x: 0,
            y: height-35,
            color: 'green',
            height: 50,
            width: width
        });
        
        console.log(runner_sprite.x);
        console.log(runner_sprite.y);
        
        var loop = kontra.GameLoop(
        {
            update: function()
            {
                if(kontra.keyPressed('up'))
                {
                    console.log("UP");
                    jump(runner_sprite);}
                else if(kontra.keyPressed('down'))
                {}

                runner_sprite.update();
                ground.update();
            },
        
            render: function()
            {
                ground.render();
                runner_sprite.render();
            }
        });
        
        
        
        loop.start();
});


