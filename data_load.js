load_data = function(url, callback) {
    var xhr = new XMLHttpRequest();
	url = window.location.href.replace("react.html","")+url;
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
		 
		callback(xhr.response);
      } else {
		alert("error couldn't find"+url);
      }
    };
    xhr.send();
};




terrainData = [];
tileData = [];
monsterData = [];
objectData = [];

//Get flags for terrain 
load_data("/lib/gamedata/terrain.txt",function(data){
	data = data.split("name:");
	for(var k=1;k<data.length;k++){
		let feature = data[k].split("\n");
		let name = feature[0];
		let flags = [];
		//Find flags 
		for(var l=1;l<feature.length;l++){
			if(feature[l].indexOf("flags")==0){
				flags = feature[l].replace("flags:","").replace("\r","").split(" | ");
				flags.unshift(name);
			}
		}
		terrainData[name] = flags;
	}
		
	load_data("/lib/tiles/tangaria/graf-tan.prf",function(data){
		
		data = data.split("\n");
		let feats = [];
		let monsters = [];
		let objects = [];
		for(var k=0;k<data.length;k++){
			if(data[k].indexOf("feat:")==0){
				feats.push(data[k].split(":"));
			}
			if(data[k].indexOf("monster:")==0){
				monsters.push(data[k].split(":"));
			}
			if(data[k].indexOf("object:")==0){
				objects.push(data[k].split(":"));
			}
		}
		
		for(var k=0;k<feats.length;k++){
			let feat = feats[k];
			let name = feat[1];

			let light_idx;
			let lighting = feat[2];
			let y = parseInt(feat[3]);
			let x = parseInt(feat[4]);

			if(tileData[x] == null){
				tileData[x] = [];
			}
			tileData[x][y] = terrainData[name];
		}

		for(var k=0;k<monsters.length;k++){
			let monster = monsters[k];

			let name = monster[1];

			let y = parseInt(monster[2]);
			let x = parseInt(monster[3]);

			if(monsterData[x] == null){
				monsterData[x] = [];
			}

			monsterData[x][y] = name;
		}

		for(var k=0;k<objects.length;k++){
			let object = objects[k];

			let type = object[1];
			let name = object[2];

			let y = parseInt(object[3]);
			let x = parseInt(object[4]);

			if(objectData[x] == null){
				objectData[x] = [];
			}

			objectData[x][y] = [name,type];
		}



		
	});	
		
});

let monsterInfo = {}

//Get information for monster names
load_data("/lib/gamedata/monster.txt",function(data){
	data = data.split("name:");
	for(var k=2;k<data.length;k++){
		
		let info = data[k].split("\n");
		let parsedInfo = [];
		for(var l=0;l<info.length;l++){
			if(info[l][0]!='#'){
				parsedInfo.push(info[l]);
			}
		}


		let attributes = {

		};
		for(var l=1;l<parsedInfo.length;l++){
			let att = parsedInfo[l].split(":");
			if(att[1]) {
				if(attributes[att[0]]==null){
					attributes[att[0]]=att[1];
				}else{
					attributes[att[0]]+=" | "+att[1]
				}
			}
		}

;


		monsterInfo[parsedInfo[0]] = attributes;
	}
});



//Get flags for terrain 
load_data("/lib/gamedata/terrain.txt",function(data){
	data = data.split("name:");
	for(var k=1;k<data.length;k++){
		let feature = data[k].split("\n");
		let name = feature[0];
		let flags = [];
		//Find flags 
		for(var l=1;l<feature.length;l++){
			if(feature[l].indexOf("flags")==0){
				flags = feature[l].replace("flags:","").replace("\r","").split(" | ");
				flags.unshift(name);
			}
		}
		terrainData[name] = flags;
	}
});

town_features=[];
town_data = [];		

load_data("/lib/gamedata/town_feat.txt",function(data){
	
	data = data.split("\n");
	let feats = [];
	for(var k=0;k<data.length;k++){
		if(data[k].indexOf("feat:")==0){
			data[k] = data[k].replace("::",":☺");
			feats.push(data[k].split(":"));
		}
	}
	
	for(var k=0;k<feats.length;k++){
		let feat = feats[k];
		let symbol = feat[1];
		
		let mask = feat[2];
		let name = feat[3];
		
		if(symbol == '☺') symbol = ":";
		
		if(town_features[symbol] == null){
			town_features[symbol] = [];
		}
		town_features[symbol][mask] = name;

		
	}
	
});	
	

function load_town(coords){
	load_data("/lib/gamedata/town_"+coords+".txt",function(data){
	town_data[coords] = [];
	data = data.split("\n");
	let map = [];
	let mask = [];
	
	for(var k=0;k<data.length;k++){
		if(data[k].indexOf("map:")==0){
			map.push(data[k].replace("map:",""));
		}
	}
	
	for(var k=0;k<data.length;k++){
		if(data[k].indexOf("mask:")==0){
			mask.push(data[k].replace("mask:",""));
		}
	}
	
	for(var y=0;y<map.length;y++){
		town_data[coords][y] = [];
		for(var x=0;x<map[y].length;x++){
			let sym = map[y][x];
			let ma = mask[y][x];
			let name = town_features[sym][ma];
			let info = terrainData[name];
			town_data[coords][y][x] = info;
		}
	}
	
});	
	
}





sound_files = {};
sounds = [];
load_data("lib/customize/sound.prf",function(data){
	data = data.replaceAll("\r","");
	data = data.split("\n");
	for(var k=0;k<data.length;k++){
		let line = data[k];
		
		if(line.indexOf("sound:")==0){
			let path = line.split(":")[2];
			let name = line.split(":")[1];
			sound_files[name] = path;
		}
	}
	
	load_data("sounds.txt",function(data){
		data = data.replaceAll("\r","");
		data = data.split("\n");
		
		for(var k=0;k<data.length;k++){

			let sound = data[k].split(",")[1];
			let file = sound_files[sound];
			
			if(file){
				sounds.push(file.split(" "));
				let lastSound = sounds[sounds.length-1];
				for(var n=0;n<lastSound.length;n++){
					lastSound[n] = lastSound[n].replaceAll(" ","_");
				}
			}else {
				sounds.push(null);
			}
			
		}
	});

});


sprites = [];

load_data("/lib/tiles/tangaria/xtra-tan.prf",function(data){
	
	data = data.split("\n");
	
	let r = 0;
	let pclass, prace,gender;

	for(var k=0;k<data.length;k++){
		if(data[k][0]=="#" || data[k].length<=10) continue;
		
		
		//Read info 
		if(r==0){
			r=1;
			let d = data[k];
			d = d.replace("?:[AND [EQU $CLASS ","").replace("]","");
			d = d.split(" ");
			pclass = d[0];
			prace = d[3].replace("]","");
			gender = 0;
			if(d[6]) gender = 2;
			
			
		
		//Read location 
		}else{
			r=0;
			let d = data[k];
			d = d.split("<player>:");
			d = d[1].split(":");
			var x = parseInt(d[0]);
			var y = parseInt(d[1]);
			
			
			sprites.push([pclass,prace,gender,y,x]);
		}
	}
	

	
});	

