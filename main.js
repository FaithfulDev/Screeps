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

    var energy = Game.spawns.Capital.room.energyAvailable;
    var harvesters = _.filter(Game.creeps, (c) => c.memory.role == 'harvester');
    
    if(harvesters.length < 2){
        Game.spawns.Capital.spawnCustomCreep(energy, 'H'+Game.time, 'harvester');   
    }
    
    var upgrader = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader');
    
    if(upgrader.length < 1){
        Game.spawns.Capital.spawnCustomCreep(energy, 'U'+Game.time, 'upgrader');  
    }

    var builder = _.filter(Game.creeps, (c) => c.memory.role == 'builder');
    
    if(builder.length < 1){
        Game.spawns.Capital.spawnCustomCreep(energy, 'B'+Game.time, 'builder');   
    }
    
    var repairer = _.filter(Game.creeps, (c) => c.memory.role == 'repairer');
    
    if(repairer.length < 1){
        Game.spawns.Capital.spawnCustomCreep(energy, 'R'+Game.time, 'repairer');    
    }

    for(var name in Game.creeps) {
        Game.creeps[name].run();
    }
}