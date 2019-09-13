// used in game.js
var loop;
var isOver = false;
var isRunning = false;
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

var context = canvas.getContext("2d");
context.font = "20px Arial";
context.fillStyle = "#ffffff";

// used in mechanic.js
var y_origin;

var gravity_power = 1;
var jump_power = 3;

var up_score = 0;
var down_score = 0;

var max_up = 23;
var max_down = 20;

var spawner_ground;
//var spawner_min;
//var spawner_med;
var spawner_max;

var game_speed = 1;