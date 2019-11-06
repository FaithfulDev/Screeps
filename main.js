require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var tower = Game.getObjectById('5dc2102f76e67f70e151fc82');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        } else {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }
    }

    var energy = Game.spawns.Capital.room.energyAvailable;
    var harvesters = _.filter(Game.creeps, (c) => c.memory.role == 'harvester');
    
    if(harvesters.length < 5){
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
        var creep = Game.creeps[name];
        
        var result = false;
        
        if(!creep.spawning){
            if(creep.memory.role == 'harvester') {
                result = roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                result = roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                result = roleBuilder.run(creep);
            }
            if(creep.memory.role == 'repairer'){
                result = roleRepairer.run(creep);
            }
            
            if(!result){
               result = roleBuilder.run(creep);
            }
            if(!result){
               result = roleRepairer.run(creep);
            }
            if(!result){
               result = roleUpgrader.run(creep);
            }
        }
    }
}