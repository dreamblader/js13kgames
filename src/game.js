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
        
    // global mechanic variables
    var y_origin = runner_sprite.y;
        
        var loop = kontra.GameLoop(
        {
            update: function()
            {
                if(kontra.keyPressed('up')) // JUMP
                {
                    jump(runner_sprite);                   
                }
                else
                {
                    stop_jump();
                }

                if(kontra.keyPressed('down')) // SLIDE
                {
                    console.log(down_score);
                    down_score++;

                    if(down_score <20)
                    {
                        runner_sprite.y = y_origin + 5;
                    }
                    else
                    {
                        runner_sprite.y = y_origin;
                    }
                }
                else
                {
                    //runner_sprite.y = y_origin;
                    down_score = 0;
                }

                
                gravity(runner_sprite);
                

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


