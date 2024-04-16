
clickPos = [0,0];
resetTimeout = null;

loggedIn=false;

	

window.onresize = function(){
	canvas.width=window.innerWidth;
	canvas.height= window.innerHeight;
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}


window.onwheel = function(e){
	if(!loggedIn) return;
 zoomGoto -= e.deltaY*0.001*zoom;
 if(zoomGoto<0.15) zoomGoto = 0.15;
 if(zoomGoto > 31) zoomGoto = 31;
}


window.onmousemove = function(e){
	if(!loggedIn) return;
	if(clicked){
		//console.log(e);
		camXOffGoto-=e.movementX/zoom;
		camYOffGoto+=e.movementY/zoom;
	}
}
window.onmouseup = function(e){
	if(!loggedIn) return;
	clicked=false;
	
	if( Math.abs(e.clientX - clickPos[0]) + Math.abs(e.clientY - clickPos[1]) < 5){
		
		
		let pos = [
		Math.floor( ((e.clientX-canvas.width/2) +(16+camXOff+camX)*zoom) / 32/zoom) + offsetX , 
		Math.floor( ((e.clientY-canvas.height/2) +(16-camYOff+camY)*zoom) / 32/zoom) + offsetY + mapy - 3
		];

		
		pos[0] = Math.max(Math.min(mapx+offsetX-1,pos[0]),offsetX);
		
		pos[1] = Math.max(Math.min(mapy+offsetY-1,pos[1]),offsetY);		

		if(loc.depth>0) cave_graph_clearMultipliers();
		
		if(!loc) return;
		
		let graph;
		
		if(loc.depth<=0) {
			graph = pathfind_town();
		}else{
			graph = pathfind_cave();
		}
		
		pathfind(graph,[curX,curY],pos);
	}
	
	clearTimeout(resetTimeout);
	
	
	resetTimeout=setTimeout(function(){
		camXOffGoto = 0;
		camYOffGoto=0;
	},2000);
}

window.onmousedown=function(e){
	if(!loggedIn) return;
	clearTimeout(resetTimeout);	
	clicked=true;
	
	clickPos = [e.clientX,e.clientY];

}


window.onkeydown = function(e) {
	if(!loggedIn) return;
	if (e.target.nodeName == 'INPUT') return;
	let code = e.keyCode;
	//console.log(e);
	const key_names = {
		13: 'return',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		27: 'escape',
		32: 'space',
		33: 'page_up',
		34: 'page_down',
		35: 'end',
		36: 'home',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		91: 'meta',
		97: 'kp_end',
		98: 'kp_down',
		99: 'kp_page_down',
		100: 'kp_left',
		101: 'kp_stay',
		102: 'kp_right',
		103: 'kp_home',
		104: 'kp_up',
		105: 'kp_page_up',
		112: 'f1', 113: 'f2', 114: 'f3', 115: 'f4', 116: 'f5', 117: 'f6',
		118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12',
	}
	let name = key_names[code];
	if (!name) name = 'undefined'+code;
	if (name == 'shift' || name == 'ctrl'
		|| name == 'alt' || name == 'meta')
		return false;
	if (e.ctrlKey) name = 'control-'+name;
	if (e.altKey) name = 'alt-' + name;
	if (e.shiftKey) name = 'shift-' + name;
	if (e.metaKey) name = 'meta-'+name;
	term_key_press({
		'code': code,
		'name': name,
		'key': e.key,
	});
	e.preventDefault();
	return false;
}

term_key_press = function(e) {
	let dir;
	const walkmap = {
		'left': 4, 'kp_left': 4,
		'right': 6, 'kp_right': 6,
		'up': 8, 'kp_up': 8,
		'down': 2, 'kp_down': 2,
		'home': 7, 'kp_home': 7,
		'end': 1, 'kp_end': 1,
		'page_up': 9, 'kp_page_up': 8,
		'page_down': 3, 'kp_page_down': 3,
	}
	dir = walkmap[e.name];
	if (dir !== undefined) {
		gameClient.cmd_walk(dir);
		return;
	}
	const runmap = {
		'shift-left': 4, 'shift-kp_left': 4,
		'shift-right': 6, 'shift-kp_right': 6,
		'shift-up': 8, 'shift-kp_up': 8,
		'shift-down': 2, 'shift-kp_down': 2,
		'shift-home': 7, 'shift-kp_home': 7,
		'shift-end': 1, 'shift-kp_end': 1,
		'shift-page_up': 9, 'shift-kp_page_up': 8,
		'shift-page_down': 3, 'shift-kp_page_down': 3,
	};
	dir = runmap[e.name];
	if (dir !== undefined) {
		gameClient.cmd_run(dir);
		return;
	}
	const digmap = {
		'control-left': 4, 'control-kp_left': 4,
		'control-right': 6, 'control-kp_right': 6,
		'control-up': 8, 'control-kp_up': 8,
		'control-down': 2, 'control-kp_down': 2,
		'control-home': 7, 'control-kp_home': 7,
		'control-end': 1, 'control-kp_end': 1,
		'control-page_up': 9, 'control-kp_page_up': 8,
		'control-page_down': 3, 'control-kp_page_down': 3,
	}
	dir = digmap[e.name];
	if (dir !== undefined) {
		gameClient.cmd_alter(dir);
		return;
	}
	if (e.key == 'R') {
		gameClient.cmd_rest(true);
		return;
	}
	
	if (e.key == '<'){
		gameClient.cmd_go_up();
		return;
	}
	
	if (e.key == '>'){
		gameClient.cmd_go_down();
		return;
	}
}