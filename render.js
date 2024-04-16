//tileset = new Image();
//tileset.src = "./lib/tiles/tangaria/32x32.png";

tileset = null;

async function start(){
	const imgblob = await fetch('./lib/tiles/tangaria/32x32.png')
		.then(r => r.blob());
	tileset = await createImageBitmap(imgblob);
}
renderTimeout = null;

start();

tilesize=32;
doDraw = false;


onmessage = function(e){
	let msg = e.data;

	switch(msg.name){
		case "start":
			canvas = new OffscreenCanvas(msg.mapx*32, msg.mapy*32);
			ctx = canvas.getContext("2d",{
				willReadFrequently : true,
			});	
			ROW_MAP = msg.ROW_MAP;
			COL_MAP = msg.COL_MAP;
			
			setInterval(function(){
				//if(doDraw){
					doDraw = false;
					postMessage({
						name : "render",
						data : ctx.getImageData(0,0,canvas.width,canvas.height),
					});
				//}
			},20);

		break;
		case "line_info":
			ctx.strokeStyle="black";
			ctx.fillStyle="black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);	
			
			let draws = msg.draws;
			
			for(var k=0;k<draws.length;k++){
				
				let draw = draws[k];
				ctx.drawImage(tileset,(draw[0]-128)*32,(draw[1]-128)*32,32,32,draw[2]*tilesize-ROW_MAP*tilesize,draw[3]*tilesize-COL_MAP*tilesize,tilesize,tilesize);	
				
			}
			
			postMessage({
				name : "render",
				data : ctx.getImageData(0,0,canvas.width,canvas.height),
				info : 'line',
			});
		break;
		case "char":
		{
			let draws = msg.draws;
			
			for(var k=0;k<draws.length;k++){
				
				let draw = draws[k];
				ctx.drawImage(tileset,(draw[0]-128)*32,(draw[1]-128)*32,32,32,draw[2]*tilesize-ROW_MAP*tilesize,draw[3]*tilesize-COL_MAP*tilesize,tilesize,tilesize);	
				
			}
			
			doDraw=1;
	

		}
		break;
	}
}