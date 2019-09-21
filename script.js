var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", window.innerWidth-275);
canvas.setAttribute("height", window.innerHeight-50);

var player = {lvl:0, xp:0, dmg:10, hp:100};
var slimes = {lvl:0, xp:0, hp:50, dmg:5};
var enemies = [{hp:slimes.hp, dmg:slimes.dmg}];

var framecount = 0;

function frame(){
	framecount++;

	if(framecount%60==0){
		attack();
		spawn();
	}

	menu();
	draw();

	requestAnimationFrame(frame);
}

function attack(){
	enemies[0].hp -= player.dmg;
	if(enemies[0].hp<=0){
		enemies.shift();
		player.xp += 25;
		if(player.xp>=100){
			player.xp = 0
			player.lvl++;
			player.hp+=10;
			player.dmg+=10;
		}
	}
}

function spawn(){
	if(enemies.length == 0){
		enemies.push({hp:slimes.hp, dmg:slimes.dmg});
	}
}

function menu(){
	document.getElementById("player_lvl").innerHTML = player.lvl;
	document.getElementById("player_xp").innerHTML = player.xp;
	document.getElementById("player_hp").innerHTML = player.hp;
	document.getElementById("player_dmg").innerHTML = player.dmg;

	document.getElementById("enemy_hp").innerHTML = enemies[0].hp;
	document.getElementById("enemy_dmg").innerHTML = enemies[0].dmg;

	document.getElementById("slimes_lvl").innerHTML = slimes.lvl;
	document.getElementById("slimes_xp").innerHTML = slimes.xp;
	document.getElementById("slimes_hp").innerHTML = slimes.hp;
	document.getElementById("slimes_dmg").innerHTML = slimes.dmg;
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle = "rgb("+Math.round(255-player.hp/100*255)+", "+Math.round(255-player.hp/100*255)+","+Math.round(255-player.hp/100*255)+")";
	ctx.beginPath();
	ctx.arc(canvas.width/4,canvas.height/2,50,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();

	if(framecount%60<15){
		ctx.beginPath();
		ctx.rect(canvas.width/4+50,canvas.height/2-10,50,20);
		ctx.closePath();
		ctx.fill();
	}

	ctx.fillStyle = "rgb("+Math.round(255-enemies[0].hp/50*255)+", "+Math.round(255-enemies[0].hp/50*255)+","+Math.round(255-enemies[0].hp/50*255)+")";
	ctx.beginPath();
	ctx.arc(canvas.width/4*3,canvas.height/2,25,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();
}

frame();