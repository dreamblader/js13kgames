// global mechanic variables
var y_origin;

var gravity_power = 2;
var jump_power = 6;

var up_score = 0;
var down_score = 0;

var max_up = 15;
var max_down = 20;

var spawner_ground;
var spawner_min;
var spawner_med;
var spawner_max;

var game_speed = 1;

function jump(sprite)
{
    console.log(up_score);
    up_score++;

    if(up_score < max_up)
    {
        sprite.y -= jump_power;
    }
};

function stop_jump()
{
    up_score = max_up;
};

function jump_cooloff()
{
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

function spawn_obstacle()
{
    var choice = getRandomInt(1,4);
    console.log(choice);
    var spawn;

    switch (choice) 
    {
        case 1:
            spawn = spawner_ground;
            break;
        case 2:
            spawn = spawner_min;
            break;
        case 3:
            spawn = spawner_med;
            break;
        case 4:
            spawn = spawner_max;
            break;    
        default:
            break;
    }

    var sprite = kontra.Sprite(
        {
            x: 0,
            y: spawn+8,
            dx: game_speed,
            image: kontra.imageAssets.tomato
        });

    return sprite;
}

function gravity(sprite)
{
    sprite.y += gravity_power;
};

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

