kontra.init();
kontra.initKeys();

var loop;
var isLoaded = false;
var obstacles = [];
var canvas = document.getElementById("screen");
var score_html = document.getElementById("score");
var text_box = document.getElementById("text-box");
var width= canvas.width;
var height= canvas.height;
var score = 0;
var time = 0;
var spawn_period = 300;

kontra.setImagePath('assets/images');

kontra.load('a.png', 'tomato.png').then(function()
{

    var runner_sprite = kontra.Sprite(
        {
            x: (width/2)-8,
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
    y_origin = runner_sprite.y;
    spawner_ground = y_origin;
    spawner_min = y_origin-8;
    spawner_med = y_origin-16;
    spawner_max = y_origin-24;
        
        loop = kontra.GameLoop(
        {
            update: function()
            {

                time++;

                if(kontra.keyPressed('up')) // JUMP
                {
                    jump(runner_sprite);                   
                }
                else
                {
                    stop_jump();
                }


                /*
                //TODO:FIXME
                if(kontra.keyPressed('down')) // SLIDE
                {
                    
                   slide(runner_sprite);
                }
                else
                {
                    //runner_sprite.y = y_origin;
                    down_score = 0;
                }
                */

                

                if(runner_sprite.y < y_origin) //GRAVITY
                {
                    gravity(runner_sprite);
                }
                else if(runner_sprite.y == y_origin) //TOUCHED GROUND
                {
                    jump_cooloff();
                }

                if(time%spawn_period == 0)
                {
                    score+=5;
                    var obstacle = spawn_obstacle();
                    obstacles.push(obstacle);
                }
                
                runner_sprite.update();
                ground.update();

                obstacles.forEach(function(obstacle) 
                {
                    obstacle.update();

                    if(obstacle.collidesWith(runner_sprite))
                    {
                        loop.stop();
                        text_box.innerHTML = "DEAD!";
                    }
                });

                score_html.innerHTML = score;
            },
        
            render: function()
            {  
                ground.render();
                runner_sprite.render();
                if(obstacles.length > 0)
                {
                    for(i=0;i<obstacles.length;i++)
                    obstacles[i].render();
                    //obstacles.array.forEach(function(obstacle) 
                    //{
                    //    obstacle.render();
                    //});
                }
            }
        });
        
        
        
        
        //}
        isLoaded = true;
});


///////////////////////////////////////////////// TODO
document.onkeypress = start_game();

function start_game()
{
    console.log("whaaat");
    if(isLoaded)
    {
        loop.start();
    }
}


