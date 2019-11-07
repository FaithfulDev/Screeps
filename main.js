require('prototype.spawn')();
require('prototype.creep')();
require('prototype.tower')();

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    //Default run logic for all towers.
    for(let tower of _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER)){
        tower.run();
    }

    //Try to spawn creep, if it's necessary.
    for(let spawn in Game.spawns){
        Game.spawns[spawn].tryToSpawnCreep();
    }

    //Default run logic for all creeps.
    for(var name in Game.creeps) {
        Game.creeps[name].run();
    }
}