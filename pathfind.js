pathing = false;
pathfind_to = null;
pathfind_run = false;
pathfind_timeout = null;
pathfind_timeoutTime = 250;
pathfind_last = null;
gotoX = 0;
gotoY = 0;


//Our currently remembered grid 
caveGrid = [];
//Multipliers added when we have walked over a space to prevent back tracking unless needed 
caveGridMult = [];


cave_graph_new = function(){
	
	caveGrid = [];
	for(var k=0;k<66;k++){
		caveGrid[k]=[];
		for(var l=0;l<193;l++){
			caveGrid[k][l]=1;
		}
	}

	caveGridMult = [];
	for(var k=0;k<66;k++){
		caveGridMult[k]=[];
		for(var l=0;l<193;l++){
			caveGridMult[k][l]=0;
		}
	}
}


cave_graph_addMult = function(x,y){
	if(caveGrid[y] == null || caveGrid[y][x]==null) return;

	/*for(var xx=-1;xx<=1;xx++){
		for(var yy=-1;yy<=1;yy++){
			caveGridMult[y+xx][x+yy]+=1;
		}
	}*/

	caveGridMult[y][x]+=1;
	
}


cave_graph_clearMultipliers = function(){
	caveGridMult = [];
	for(var k=0;k<66;k++){
		caveGridMult[k]=[];
		for(var l=0;l<193;l++){
			caveGridMult[k][l]=0;
		}
	}
}

cave_graph_clearVision = function(){
	for(var k=offsetY;k<mapy;k++){
		for(var l=offsetX;l<mapx;l++){
			caveGrid[k][l]=1;
		}
	}
}


pathfind_dontDirCheck = false;


wallSprites = [
"house wall d5",
"house wall d6",
"house wall f0",
"house wall f8",
];


function distance(arr1, arr2) {
  var xDiff = arr2[0] - arr1[0];
  var yDiff = arr2[1] - arr1[1];
  return Math.sqrt(xDiff*xDiff + yDiff*yDiff);
}

pathfind = function(graph,from,to){
	tiles.path = [];
	pathfind_run = false;

	

	let start = graph.grid[from[1]][from[0]];
	let end = graph.grid[to[1]][to[0]];
	
	gotoX = to[0];
	gotoY = to[1];
	
	pathfind_to = to;
	
	let results = astar.search(graph, start, end, { heuristic: astar.heuristics.diagonal });
	
	for(var k=0;k<results.length;k++){
		let node = results[k];
		addPathTile(node.y,node.x,[200,0,255]);
	}
	
	
	
	path_start();	
}


path_start = function(){
	pathing=true;
	path_process();
}

path_stop = function(){
	gameClient.cmd_walk(5);
	tiles.path=[];
	pathing=false;
	pathfind_run = false;
	updateUITiles();
}

path_go = function(dir,doRun){
	if(doRun) {
		pathfind_run = true;
		gameClient.cmd_run(dir);
	}else{
		gameClient.cmd_walk(dir);
	}
}

path_process = function(){
	
	//Check if we are running or walking 
	if(!pathing) return;
	
	let pathSameDir = 1;
	
	let nextTile = tiles.path[0];
	
	if(!nextTile){
		return;
	}
	
	let pathDir = [curY - nextTile.position[1],curX - nextTile.position[0]];
	
	
	for(var k=1;k<tiles.path.length;k++){
		let tile = tiles.path[k];
		
		let dir = [nextTile.position[1] - tile.position[1], nextTile.position[0] - tile.position[0]];
		
		if(dir[0] != pathDir[0] || dir[1] != pathDir[1]) break;
		
		
		pathSameDir++;
	}
	
	
	if(pathSameDir>1){
		pathSameDir=true;
	}else{
		pathSameDir=false;
		if(pathfind_run){
			pathfind_run=false;
			//gameClient.cmd_walk(5);
		}
	}
	

	let strDir = pathDir[0]+","+pathDir[1];
	

	pathfind_last = strDir;
	if(!pathSameDir) {
		pathfind_last = null;
	}


	let doubleTurn = false;

	//Check if we have to preform a double turn, if so, we should walk as to not miss the turn :) 420 btw I smoke hella weed IRL and plus I do get a decent amount of bitches, especially for someone who runs a sick ass minecraft server. hmph, you might look at that and think, theres no way that guy gets hella pussy, well lemme tell ya ;)
	if(!pathSameDir && tiles.path[1]){
		let nextNextTile = tiles.path[1];
		let dir = [nextTile.position[1] - nextNextTile.position[1], nextTile.position[0] - nextNextTile.position[0]];
		if(dir[0] != pathDir[0] && dir[1] != pathDir[1]) doubleTurn = true;
	}



	let dist = tiles.path.length
	if(dist>=3 && !doubleTurn) pathSameDir=true;




	
	switch(strDir){
		
		
		case "-1,1":
			path_go(1,pathSameDir);
		break;
		case "0,1":
			path_go(4,pathSameDir);		
		break;
		case "1,1":
			path_go(7,pathSameDir);		
		break;
		case "1,0":
			path_go(8,pathSameDir);	
		break;
		case "1,-1":
			path_go(9,pathSameDir);		
		break;
		case "0,-1":
			path_go(6,pathSameDir);	
		break;
		case "-1,-1":
			path_go(3,pathSameDir);		
		break;
		case "-1,0":
			path_go(2,pathSameDir);	
		break;
	}
	
	clearTimeout(pathfind_timeout);
	
	pathfind_timeout = setTimeout(function(){
		if(!pathing) return;	
		let graph;
		if(loc.depth>0) {
			graph = pathfind_cave();
		}else{
			graph = pathfind_town();;
		}
		if(graph) pathfind(graph,[curX,curY],pathfind_to);
	},pathfind_timeoutTime);
	
}



pathfind_town = function(goX,goY){
	let data = town_data[loc.locname];
	
	if(!data) return;
	
	

	let grid = [];
	for(var k=0;k<data.length;k++){
		grid[k]=[];
		for(var l=0;l<data[0].length;l++){
			grid[k][l]=1;
		}
	}
	
	

	
	
	//Map data pass
	

	
	for(var y=0;y<data[0].length;y++){
	for(var x=0;x<data.length;x++){
		
		if(x == 0 || y == 0 || y == data[0].length-1 || x == data.length-1){
			grid[x][y]=500;
			continue;
		}
		
		let bg = data[x][y];

		if(bg){
			if(bg.indexOf("WALL")!=-1 || bg.indexOf("MOUNTAIN")!=-1) grid[x][y]=0;
			if(bg.indexOf("WATER")!=-1) grid[x][y]=10;
			//if(bg.indexOf("PASSABLE")==-1 && grid[x][y]!=0) grid[x][y]+=0.5;
		} 
		
	}
	}	
	
	
	//Player housing pass
	for(var x=0;x<mapx;x++){
	for(var y=0;y<mapy;y++){
		
		
		let id = getId(x,y+1)*4;
		let tileInfo = [renderTexture[id]+128,renderTexture[id+1]+128,renderTexture[id+2]+128,renderTexture[id+3]+128];

		if(tileData[tileInfo[0]] == null ||tileData[tileInfo[0]][tileInfo[1]] == null ) continue
		let bg = tileData[tileInfo[0]][tileInfo[1]];
		if(bg){
			if(bg.indexOf("WALL")!=-1 && bg.indexOf("HOUSE")!=-1){
				let onData = getTile(x+offsetX,y+offsetY);
				if(onData && onData[0]){
					if(onData.indexOf("HOUSE")==-1 && onData[0].search("house")==-1	
					&& onData.indexOf("WALL")==-1  && onData.indexOf("NO_HOUSE")==-1 
					&& onData.indexOf("DOOR_ANY")==-1 && onData[0].search("illusion")==-1   ){		
						grid[y+offsetY][x+offsetX]=0;
					}
				}
			}
		}
	}
	}
	return new Graph(grid,{ diagonal: true });
	
}

function trySet(grid,x,y,amount){
	if(grid[y+offsetY] && grid[y+offsetY][x+offsetX]){

		let id = getId(x,y+1)*4;
		let tileInfo = [renderTexture[id]+128,renderTexture[id+1]+128,renderTexture[id+2]+128,renderTexture[id+3]+128];


		if(tileData[tileInfo[0]] != null  && tileData[tileInfo[0]][tileInfo[1]] != null ) {

			let bg = tileData[tileInfo[0]][tileInfo[1]];

			if(bg[0]=='void' && grid[y+offsetY][x+offsetX]!=0)  {

				grid[y+offsetY][x+offsetX] += 5;
				//grid[x][y]+=amount;
			}

		}
	}

	return grid;
}

//ADD WEIGHT TO RECENTLY VISITED SQUARES UNTIL NEW TARGET
pathfind_cave = function(){
	


	
	cave_graph_clearVision();
	
	//Read screen data
	for(var x=0;x<mapx;x++){
	for(var y=0;y<mapy;y++){
		
		
		let id = getId(x,y+1)*4;
		let tileInfo = [renderTexture[id]+128,renderTexture[id+1]+128,renderTexture[id+2]+128,renderTexture[id+3]+128];


		//if we have data for the tile
		if(tileData[tileInfo[0]] != null  && tileData[tileInfo[0]][tileInfo[1]] != null ){

			let bg = tileData[tileInfo[0]][tileInfo[1]];

			if(bg[0] == "void") caveGrid[y+offsetY][x+offsetX]=30;

			if( (bg.indexOf("WALL")!=-1 && !wallSprites.includes(bg[0]))
			|| bg.indexOf("TREE")!=-1 ){
				caveGrid[y+offsetY][x+offsetX]=0;


				if(bg[0]!=="void"){
					for(var xx=-2;xx<=2;xx++){
						for(var yy=-2;yy<=2;yy++){
							//caveGrid = trySet(caveGrid,x+xx,y+yy,8-(Math.abs(xx)+Math.abs(yy)));
						}
					}
				}
			}
			
			if(bg.indexOf("WATER")!=-1) caveGrid[y+offsetY][x+offsetX]=15;
		
		}


	}
	}

	return new Graph(caveGrid,{ diagonal: true });
	
}





function drawCollisions(){
	
	//Load town data
	let data = town_data[loc.locname];
	
	
	//Map data pass
	for(var y=1;y<data[0].length-1;y++){
	for(var x=1;x<data.length-1;x++){
		
		let bg = data[x][y];

		if(bg){
			if(bg.indexOf("WALL")!=-1 || bg.indexOf("MOUNTAIN")!=-1) addCollisionTile(y,x,[255,0,0]);
			if(bg.indexOf("WATER")!=-1) addCollisionTile(y,x,[0,0,255]);
			//if(bg.indexOf("PASSABLE")==-1) addCollisionTile(y,x,[0,255,255]);
		} 
		
	}
	}	
	
	
	//Player housing pass
	for(var x=0;x<mapx;x++){
	for(var y=0;y<mapy;y++){
		
		
		let id = getId(x,y+1)*4;
		let tileInfo = [renderTexture[id]+128,renderTexture[id+1]+128,renderTexture[id+2]+128,renderTexture[id+3]+128];

		let bg;
		try{bg = tileData[tileInfo[0]][tileInfo[1]];}catch(e){}
		if(bg){
			if(bg.indexOf("WALL")!=-1 && bg.indexOf("HOUSE")!=-1){
				let onData = getTile(x+offsetX,y+offsetY);
				
				if(onData.indexOf("HOUSE")==-1 && onData[0].search("house")==-1	
				&& onData.indexOf("WALL")==-1  && onData.indexOf("NO_HOUSE")==-1 
				&& onData.indexOf("DOOR_ANY")==-1 && onData[0].search("illusion")==-1   ){		
					addCollisionTile(x+offsetX,y+offsetY,[255,255,0]);
				}
			}
		}
	}
	}
}



getTileHere=function(xOff=0,yOff=0){
	let id = getId(curX-offsetX+xOff,curY-offsetY+yOff+1)*4;
	let info = [renderTexture[id]+128,renderTexture[id+1]+128,renderTexture[id+2]+128,renderTexture[id+3]+128];
	
	console.log(info);
	console.log (tileData[info[2]][info[3]]);
	console.log (tileData[info[0]][info[1]]);
	if(loc.depth<=0) console.log(town_data[loc.locname][curY+yOff][curX+xOff]);
}


getTile=function(xOff=0,yOff=0){
	try{
	let tileInfo = town_data[loc.locname][yOff][xOff]
	return(tileInfo);
	}catch(e){
		console.log(x,y);
		return(null);
	}
}

