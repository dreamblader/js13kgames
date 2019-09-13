kontra.init();
kontra.initKeys();

kontra.setImagePath('assets/images');
kontra.setAudioPath('assets/sounds')

kontra.load('run.png','cactus.png','totem.png','rock.png', 'coin.png').then(function()
{
    screen_write(1);

    var spriteSheet = kontra.SpriteSheet({
        image: kontra.imageAssets.run,
        frameWidth: 16,
        frameHeight: 15,
        animations: 
        {
            walk: 
            {
              frames: '0..1',  
              frameRate: 10
            },

            jump:
            {
              frames: 0,  
              frameRate: 30
            }
        }
    });

    /*
    var runner_sprite = kontra.Sprite(
        {
            x: (width/2)-8,
            y: height-50,
            image: kontra.imageAssets.a
        });
    */

   var runner_sprite = kontra.Sprite(
    {
        x: (width/2)-8,
        y: height-50,
        animations: spriteSheet.animations
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
    //spawner_min = y_origin-8;
    //spawner_med = y_origin-16;
    spawner_max = y_origin-24;
        
        loop = kontra.GameLoop(
        {
            update: function()
            {
                if(!isRunning)
                {
                    isRunning = true;
                    //intro dialogue here!!!!
                    talk(dialogue_intro1);
                }
                else if(isOver)
                {
                    runner_sprite.y = y_origin; //reset runner position
                    isOver = false;
                }

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
                //TODO:FIXME DEPRECATED
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
                    jump_cooloff(runner_sprite);
                }

                if(time%coin_period == 0)
                {
                    var collect = spawn_obstacle(1);
                    collects.push(collect);
                }
                if(time%spawn_period == 0)
                {
                    score++;
                    var obstacle = spawn_obstacle(0);
                    obstacles.push(obstacle);
                }
                else if(time%talk_period == 0)
                {
                    talk_decision();
                }
                
                runner_sprite.update();
                ground.update();

                obstacles.forEach(function(obstacle, index) 
                {
                    obstacle.update();

                    if(obstacle.collidesWith(runner_sprite))
                    {
                        screen_write(2);
                    }
                    else if(obstacle.x >= width+obstacle.width)
                    {
                        count_score(obstacle);
                        obstacles.splice(index,1);
                    }
                });

                collects.forEach(function(collect, index) 
                {
                    collect.update();

                    if(collect.collidesWith(runner_sprite))
                    {
                        count_score(collect);
                        collects.splice(index,1);
                    }
                    else if(collect.x >= width+collect.width)
                    {
                        collects.splice(index,1);
                    }
                });

                score_html.innerHTML = score;
                check_score();
            },
        
            render: function()
            {  
                ground.render();
                runner_sprite.render();

                if(obstacles.length > 0)
                {
                    for(i=0;i<obstacles.length;i++)
                    obstacles[i].render();
                }

                if(collects.length > 0)
                {
                    for(i=0;i<collects.length;i++)
                    collects[i].render();
                }
            }
        });
        
        
        
        
        //}
        isLoaded = true;
});


// Start Screen

document.addEventListener('keyup',function(k){start_game(k);});

function start_game(k)
{
    //console.log(k.code);
    if(isLoaded && !isRunning && k.code =="Enter")
    {
        canvas.style.backgroundColor = "lightblue";
        text_box.innerHTML = "";
        loop.start();
    }
    else if(isLoaded && isOver && k.code =="Enter")
    {
        canvas.style.backgroundColor = "lightblue";
        text_box.innerHTML = "";
        isRunning = false; //just to reset inner text
        reset();
    }
}



