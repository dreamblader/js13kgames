

function jump(sprite)
{
    console.log(up_score);
    up_score++;

    if(up_score < max_up)
    {
        sprite.playAnimation('jump');
        sprite.y -= jump_power;
    }
};

function stop_jump()
{
    up_score = max_up;
};

function jump_cooloff(sprite)
{
   sprite.playAnimation('walk');
   up_score = 0;
};

//NEED TO FIX
function slide()
{
    console.log(down_score);
    down_score++;

    if(down_score < max_down)
    {
        runner_sprite.y = y_origin + 5;
    }
    else
    {
        runner_sprite.y = y_origin;
    }
};

function spawn_obstacle(num)
{
    var choice = getRandomInt(1,3);
    console.log(choice);
    var image;
    var spawn = spawner_ground;
    var offset = 0;

    if(num==0)
    {
        switch (choice) 
        {
            case 1:
                image = kontra.imageAssets.rock;
                offset = 8;
                break;
            case 2:
                image = kontra.imageAssets.cactus;
                offset = 0;
                break;
            case 3:
                image = kontra.imageAssets.totem;
                offset = -8;
                break;   
            default:
                break;
        }
    }
    else if(num==1)
    {
        spawn = spawner_max;
        image = kontra.imageAssets.coin;
    }

    var sprite = kontra.Sprite(
        {
            x: -16,
            y: spawn+offset,
            dx: game_speed,
            image: image
        });

    return sprite;
}

function count_score(item)
{
    var image = item.image;
    isScoreChecked = false;

    switch(image)
    {
        case kontra.imageAssets.rock:
            score+=1;
            break;
        case kontra.imageAssets.cactus:
            score+=3;
            break;
        case kontra.imageAssets.totem:
            score+=5;
            break;
        case kontra.imageAssets.coin:
            score+=10;
            break;
    }
};

function check_score()
{
    if(!isScoreChecked)
    {
        isScoreChecked = true;
        if(score > 10*difficulty_level)
        {
            level_up();
        }
    }
};

function level_up()
{
    difficulty_level++;

    if(spawn_period > min_period)
    {
        spawn_period-=5;
    }

    if(game_speed<max_speed && difficulty_level%3 == 0)
    {
        game_speed+= 0.5;
    }
};

function gravity(sprite)
{
    sprite.y += gravity_power;
};

function screen_write(num)
{
    switch(num)
    {
        case 0: // CLEAR SCREEN
            text_box.innerHTML = "";
            context.clearRect(0, 0, width, height);
            break;
        case 1: // TITLE SCREEN
            text_box.innerHTML = intro_text;
            context.fillText("WE MUST ", 20, 50);
            context.fillText("GO BACK" , 20, 70);
            break;
        case 2: // GAME OVER
            loop.stop();
            text_box.innerHTML = over_text1+score+over_text2;
            /*
            context.clearRect(0, 0, width, height);
            context.fillText("GAME ", 33, 50);
            context.fillText("OVER" , 35, 70);
            */
            isOver = true;
            break;
    }
};

function reset()
{
    time = 0;
    score = 0;
    difficulty_level =1;
    spawn_period = 300;
    game_speed = 1;

    collects = [];
    obstacles = [];
    loop.start();
};

async function talk(text)
{
    var display= "";

    for(var i=0; i<text.length; i++)
    {
        display += text.charAt(i);
        text_box.innerHTML = display;
    }
    
};

function talk_decision()
{
    var old_text = text_box.innerHTML;

    if(old_text == dialogue_intro1)
    {
        talk(dialogue_intro2);
    }
    else if(old_text == dialogue_intro2)
    {
        talk(dialogue_intro3);
    }
    else
    {
        var random = getRandomInt(1,4);

        switch(random)
        {
            case 1:
                talk(dialogue1);
                break;
            case 2:
                talk(dialogue2);
                break;
            case 3:
                talk(dialogue3);
                break;
            case 4:
                talk(dialogue4);
                break;
        }
    }
                        
};

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};