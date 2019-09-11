// global mechanic variables
var y_origin;

var gravity_power = 2;
var jump_power = 6;

var up_score = 0;
var down_score = 0;

var max_up = 15;
var max_down = 20;

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

function gravity(sprite)
{
    if(sprite.y < y_origin) //GRAVITY
    {
        sprite.y += gravity_power;
    }
    else if(sprite.y == y_origin) //TOUCHED GROUND
    {
        up_score = 0;
    }
};