canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

UITiles = [];

tiles = {
	collision : [],
	path : [],
}

var textureBuffer = gl.createBuffer();
var coordsBuffer = gl.createBuffer();

var UIColorBuffer = gl.createBuffer();
var UICoordsBuffer = gl.createBuffer();

gl.activeTexture(gl.TEXTURE0);


renderTexture = [];
renderCoords = [];

function getId(x,y){
	return(x+(mapy-y)*mapx);
}

function changeTile(x,y,values){
	


	//Setting our own player sprite here

	if(values[2] == 133 && values[3] == 131 && x == curX - offsetX && y == curY-offsetY + 1){
		values[2]=gameClient.spriteX;
		values[3]=gameClient.spriteY;
	}

	let id = getId(x,y)*4;
	renderTexture[id]=values[2]-128;
	renderTexture[id+1]=values[3]-128;
	renderTexture[id+2]=values[0]-128;
	renderTexture[id+3]=values[1]-128;	
	
	
}

addPathTile = function(x,y,color){
	tiles.path.push({
		position : [x,y],
		color : color
	})
	updateUITiles();
}


addCollisionTile = function(x,y,color){
	tiles.collision.push({
		position : [x,y],
		color : color
	})
	updateUITiles();
}

addUITile = function(x,y,color){
	UITiles.push({
		position : [x,y],
		color : color
	})
}


clearTiles = function(){
	
	for(var type in tiles) {
		tiles[type] = [];
	}
	
	updateUITiles();
		
}


updateUITiles = function(){
	let coords = [];
	let colors = [];
	
	UITiles=[];
	
	for(var type in tiles) {
		for(var k=0;k<tiles[type].length;k++){
			addUITile(tiles[type][k].position[0],tiles[type][k].position[1],tiles[type][k].color);
		}
	}
	
	//todo only add if they are in screen space
	for(var k=0;k<UITiles.length;k++){
		let tile = UITiles[k];
		
		if(tile.position[0] < offsetX  || tile.position[1] < offsetY  || tile.position[0] > offsetX+mapx || tile.position[1] > offsetY + mapy) continue;
		
		colors.push(tile.color[0],tile.color[1],tile.color[2]);
		coords.push(tile.position[0]-offsetX,mapy-tile.position[1]-offsetY-1);
	}
	
	UIColor = new Uint8Array(colors);
	UICoords = new Uint8Array(coords);	
}



function rand(x,y){
	return(Math.round(Math.random()*128))
}




let texCoords = [215,419];

for(var y=0;y<mapy;y++){
	for(var x=0;x<mapx;x++){
        renderCoords.push(x,y,x,y);
		//renderTexture.push(rand(x,y),rand(x,y),rand(x,y),rand(x,y));

        renderTexture.push(texCoords[0],texCoords[1],0,0);

    }
}

renderTexture = new Uint8Array(renderTexture);
renderCoords = new Uint8Array(renderCoords);

UIColor = new Uint8Array([]);
UICoords = new Uint8Array([]);




function center_cam(){
	camXGoto=(curX-offsetX)*32;
	camYGoto= -(mapy - curY - offsetY -3)*32
	camX = camXGoto;
	camY = camYGoto;
}


function render(){
	
	updateUITiles();

	zoom += (zoomGoto-zoom)*0.3;
	camX += (camXGoto-camX)*0.25;
	camY += (camYGoto-camY)*0.25;	
	camXOff += (camXOffGoto-camXOff)*0.3;
	camYOff += (camYOffGoto-camYOff)*0.3;	

	if(centered == 0){
		if( Math.abs(camX - camXGoto) + Math.abs(camY - camYGoto) < 0.1){
					//center_cam();
					gameClient.write("%b", [PKT_CENTER], true);	
					centered=1;
		}
	}
	
	//Main tiles 
	gl.useProgram(tangarProgram)

	gl.bindTexture(gl.TEXTURE_2D, tileset);
	
    gl.uniform1f(tangarShaderProgram.uniforms.zoom, zoom);
    gl.uniform2fv(tangarShaderProgram.uniforms.camera, [camX+camXOff,mapy-camY+camYOff-2]);
    gl.uniform2fv(tangarShaderProgram.uniforms.screenSize, [canvas.width,canvas.height]);   
	gl.uniform1i(tangarShaderProgram.uniforms.sampler, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, renderCoords, gl.DYNAMIC_DRAW);
	gl.enableVertexAttribArray(tangarShaderProgram.attributes.position);
	gl.vertexAttribPointer(tangarShaderProgram.attributes.position, 2, gl.UNSIGNED_BYTE, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, renderTexture, gl.DYNAMIC_DRAW);
	gl.enableVertexAttribArray(tangarShaderProgram.attributes.texture);
	gl.vertexAttribPointer(tangarShaderProgram.attributes.texture, 2, gl.UNSIGNED_BYTE, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, renderCoords.length/2 ); 
	
	//UI Tiles	
	gl.useProgram(tangarUIProgram)
	
    gl.uniform1f(tangarUIShaderProgram.uniforms.zoom, zoom);
    gl.uniform2fv(tangarUIShaderProgram.uniforms.camera, [camX+camXOff,mapy-camY+camYOff-2]);
    gl.uniform2fv(tangarUIShaderProgram.uniforms.screenSize, [canvas.width,canvas.height]);   

	gl.bindBuffer(gl.ARRAY_BUFFER, UICoordsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, UICoords, gl.DYNAMIC_DRAW);
	gl.enableVertexAttribArray(tangarUIShaderProgram.attributes.position);
	gl.vertexAttribPointer(tangarUIShaderProgram.attributes.position, 2, gl.UNSIGNED_BYTE, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, UIColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, UIColor, gl.DYNAMIC_DRAW);
	gl.enableVertexAttribArray(tangarUIShaderProgram.attributes.color);
	gl.vertexAttribPointer(tangarUIShaderProgram.attributes.color, 3, gl.UNSIGNED_BYTE, false, 0, 0);

    gl.drawArrays(gl.POINTS, 0, UICoords.length/2 );

    requestAnimationFrame(render);
}

render();