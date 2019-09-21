var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", window.innerWidth-275);
canvas.setAttribute("height", window.innerHeight-50);

var player = {lvl:1, xp:0, dmg:10, hp:100, maxhp:100};
var slimes = {lvl:1, xp:0, dmg:10, hp:50};
var enemies = [{dmg:slimes.dmg, hp:slimes.hp, maxhp:slimes.hp}];

var framecount = 0;

function frame(){
	framecount++;

	if(framecount%60==0){
		attack();
	}

	if(framecount%120==0){
		spawn();
	}

	menu();
	draw();

	requestAnimationFrame(frame);
}

function attack(){
	for(var i = 0; i < enemies.length; i++){
		player.hp -= enemies[i].dmg;
		if(player.hp<=0){
			alert("you died");
			location.reload();

		}
	}

	for(var i = 0; i < enemies.length; i++){
		enemies[i].hp -= player.dmg;
		if(enemies[i].hp<=0){
			enemies.shift();
			player.hp=player.maxhp;
			player.xp += 50;
			if(player.xp>=player.lvl*100){
				player.xp = 0;
				player.lvl++;
				player.maxhp+=10;
				player.dmg+=10;
			}
		}
	}
}

function spawn(){
	enemies.push({dmg:slimes.dmg, hp:slimes.hp, maxhp:slimes.hp});
}

function menu(){
	document.getElementById("player_lvl").innerHTML = player.lvl;
	document.getElementById("player_xp").innerHTML = player.xp;
	document.getElementById("player_maxxp").innerHTML = player.lvl*100;
	document.getElementById("player_hp").innerHTML = player.hp;
	document.getElementById("player_maxhp").innerHTML = player.maxhp;
	document.getElementById("player_dmg").innerHTML = player.dmg;

	document.getElementById("enemies").innerHTML = "";
	for(var i = 0; i < enemies.length; i++){
		document.getElementById("enemies").innerHTML += "Hp: " + enemies[i].hp + "/" + enemies[i].maxhp + "<br>";
		document.getElementById("enemies").innerHTML += "Damage: " + enemies[i].dmg + "<br><br>";
	}
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.lineWidth = 5;

	ctx.fillStyle = "rgb("+Math.round(255-player.hp/100*255)+", "+Math.round(255-player.hp/100*255)+","+Math.round(255-player.hp/100*255)+")";
	ctx.strokeStyle = "rgb("+Math.round(255-player.hp/100*255)+", "+Math.round(255-player.hp/100*255)+","+Math.round(255-player.hp/100*255)+")";
	ctx.beginPath();
	ctx.arc(canvas.width/4,canvas.height/2,50,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	if(framecount%60<15){
		ctx.fillStyle = "red";
		ctx.strokeStyle = "red";
		ctx.beginPath();
		ctx.rect(canvas.width/4+50,canvas.height/2-5,canvas.width/4*3,10);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	for(var i = 0; i < enemies.length; i++){
		ctx.fillStyle = "rgb("+Math.round(255-enemies[i].hp/50*255)+", "+Math.round(255-enemies[i].hp/50*255)+","+Math.round(255-enemies[i].hp/50*255)+")";
		ctx.strokeStyle = "rgb("+Math.round(255-enemies[i].hp/50*255)+", "+Math.round(255-enemies[i].hp/50*255)+","+Math.round(255-enemies[i].hp/50*255)+")";
		if(framecount%60<15){ctx.strokeStyle = "red";}
		ctx.beginPath();
		ctx.arc(canvas.width/4*2+i*60,canvas.height/2,25,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
}

frame();