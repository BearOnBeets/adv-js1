function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("battles.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
    attacker_king=[]
    defender_king=[]
    region=[]
    names=[]
    battle_type=[]
    most_active={}
    attacker_outcome={win:0,loss:0}
    size=[]
    defender_size={}
    output={}
    for(var i = 0; i < data.length; i++) {
        var obj = data[i];
        attacker_king.push(obj.attacker_king)
        defender_king.push(obj.defender_king)
        region.push(obj.region)
        names.push(obj.name)
        if(!battle_type.includes(obj.battle_type) && obj.battle_type!=""){battle_type.push(obj.battle_type)}   
        if(obj.attacker_outcome=="win"){attacker_outcome.win=attacker_outcome.win+1} 
        else{attacker_outcome.loss=attacker_outcome.loss+1}    
        if(obj.defender_size!=null){size.push(obj.defender_size)}

    }
    most_active.attacker_king=mode(attacker_king)
    most_active.defender_king=mode(defender_king)
    most_active.region=mode(region)
    most_active.name=mode(names)
    const sum = size.reduce((partialSum, a) => partialSum + a, 0);
    defender_size.average=sum/size.length
    defender_size.min = Math.min.apply(Math, size)
    defender_size.max = Math.max.apply(Math, size)
    output.most_active=most_active
    output.attacker_outcome=attacker_outcome
    output.battle_type=battle_type
    output.defender_size=defender_size
    console.log(output)
});


