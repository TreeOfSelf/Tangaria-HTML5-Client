entities = {
    objects : [],
    monsters : [],
}


detectEntities = function(){
	//Read screen data

    let objects = [];
    let monsters = [];

	for(var x=0;x<mapx;x++){
    for(var y=0;y<mapy;y++){
        
        
        let id = getId(x,y+1)*4;
        let tileInfo = [renderTexture[id]+128,renderTexture[id+1]+128,renderTexture[id+2]+128,renderTexture[id+3]+128];


        let object, monster;


        if(objectData[tileInfo[0]] && objectData[tileInfo[0]][tileInfo[1]])  object = objectData[tileInfo[0]][tileInfo[1]];
        if(monsterData[tileInfo[0]] && monsterData[tileInfo[0]][tileInfo[1]])  monster = monsterData[tileInfo[0]][tileInfo[1]];



        if(object){
            objects.push({
                data : object,
                x : x,
                y : y,
            });
            console.log("SEEING OBJECT "+object[0]);
        }
        if(monster){
            monsters.push({
                data : monster,
                x : x,
                y : y,
            });
            console.log("SEEING MONSTER "+monster);
        }
        

    }
    }

    entities.objects = objects;
    entities.monsters = monsters;

}