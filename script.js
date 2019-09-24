var player = {
	hp:100, maxhp:100, 
	stamina:75, maxstamina:100, 
	xp:0, maxxp:100, lvl:1, 
	ability1timer:4.5, ability1cd:5, ability2timer:10, ability2cd: 10, ability3timer:7.0, ability3cd:20
};
var enemy = {hp:30, maxhp:50};

var framecount = 0;

function frame(){
	framecount++;

	if(framecount%1==0){
		player.hp-=1;
		if(player.hp<=0){player.hp = player.maxhp;}

		player.stamina-=2;
		if(player.stamina<=0){player.stamina = player.maxstamina;}

		player.xp+=1;
		if(player.xp>=player.maxxp){player.xp = 0;}

		player.ability1timer-=1/60;
		if(player.ability1timer<=0){player.ability1timer = player.ability1cd;}
		
		player.ability2timer-=1/60;
		if(player.ability2timer<=0){player.ability2timer = player.ability2cd;}

		player.ability3timer-=1/60;
		if(player.ability3timer<=0){player.ability3timer = 0;}

		enemy.hp-=1;
		if(enemy.hp<=0){enemy.hp = enemy.maxhp;}
	}

	update();
	requestAnimationFrame(frame);
}

function update(){
	document.getElementById("hp").innerHTML = player.hp;
	document.getElementById("maxhp").innerHTML = player.maxhp;
	document.getElementById("hpbar").style.width = player.hp/player.maxhp*100 + "%";

	document.getElementById("stamina").innerHTML = player.stamina;
	document.getElementById("maxstamina").innerHTML = player.maxstamina;
	document.getElementById("staminabar").style.width = player.stamina/player.maxstamina*100 + "%";

	document.getElementById("xp").innerHTML = player.xp;
	document.getElementById("maxxp").innerHTML = player.maxxp;
	document.getElementById("xpbar").style.width = player.xp/player.maxxp*100 + "%";

	document.getElementById("ability1timer").innerHTML = (player.ability1timer).toFixed(1);
	document.getElementById("ability1bar").style.width = (player.ability1cd-player.ability1timer)/player.ability1cd*20 + "%";
	document.getElementById("ability1bar").style.height = (player.ability1cd-player.ability1timer)/player.ability1cd*100 + "%";
	if((player.ability1cd-player.ability1timer)/player.ability1cd!==1){document.getElementById("ability1bar").style.borderRadius = "50%";}
	else{document.getElementById("ability1bar").style.borderRadius = "0%";}
	document.getElementById("ability2timer").innerHTML = (player.ability2timer).toFixed(1);
	document.getElementById("ability2bar").style.width = (player.ability2cd-player.ability2timer)/player.ability2cd*20 + "%";
	document.getElementById("ability2bar").style.height = (player.ability2cd-player.ability2timer)/player.ability2cd*100 + "%";
	if((player.ability2cd-player.ability2timer)/player.ability2cd!==1){document.getElementById("ability2bar").style.borderRadius = "50%";}
	else{document.getElementById("ability2bar").style.borderRadius = "0%";}
	document.getElementById("ability3timer").innerHTML = (player.ability3timer).toFixed(1);
	document.getElementById("ability3bar").style.width = (player.ability3cd-player.ability3timer)/player.ability3cd*20 + "%";
	document.getElementById("ability3bar").style.height = (player.ability3cd-player.ability3timer)/player.ability3cd*100 + "%";
	if((player.ability3cd-player.ability3timer)/player.ability3cd!==1){document.getElementById("ability3bar").style.borderRadius = "50%";}
	else{document.getElementById("ability3bar").style.borderRadius = "0%";}

	document.getElementById("enemyhp").innerHTML = enemy.hp;
	document.getElementById("enemymaxhp").innerHTML = enemy.maxhp;
	document.getElementById("enemyhpbar").style.width = enemy.hp/enemy.maxhp*100 + "%";
}

frame();