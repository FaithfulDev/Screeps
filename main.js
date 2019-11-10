require('prototype.spawn')();
require('prototype.creep')();
require('prototype.tower')();
require('prototype.container')();

module.exports.loop = function () {

    //Delete Memory from dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            let creep = Memory.creeps[name];

            if(creep.role == 'miner'){
                Memory.containers[creep.container].hasMiner = false;
            }else if(creep.role == 'lorry'){
                Memory.containers[creep.container].hasLorry = false;
            }

            console.log(creep.role + " " + name + " died.");
            delete Memory.creeps[name];
        }
    }

    //Default run logic for all towers.
    for(let tower of _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER)){
        tower.run();
    }

    //Try to spawn creep, if it's necessary.
    for(let spawn in Game.spawns){

        let containers = Game.spawns[spawn].room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});

        //Register new container
        for(let containerName in containers){

            let container = containers[containerName];

            if(Memory.containers == undefined){
                Memory.containers = {};
            }

            if(Memory.containers[container.id] == undefined){
                Memory.containers[container.id] = {hasMiner: false, hasLorry: false};
            }

            //Check if they need to be closed.
            if(container.store[RESOURCE_ENERGY] <= 100){
                container.setClosed();
            }else if(container.store[RESOURCE_ENERGY] >= 300){
                container.setOpened();
            }

        }

        Game.spawns[spawn].tryToSpawnCreep();

        //If hostiles are in my room, capable of attack, activate the safe mode (or at least try).
        let hostiles = Game.spawns[spawn].room.find(FIND_HOSTILE_CREEPS);
        for(creep in hostiles){
            if(hostiles[creep].body.some(function(bodyPart) {
                if(bodyPart.type == ATTACK || bodyPart.type == RANGED_ATTACK){
                    return true;
                }
              }) == true)
            {
                Game.spawns[spawn].room.controller.activateSafeMode();
                break;
            }
        }
    }

    //Default run logic for all creeps.
    for(var name in Game.creeps) {
        Game.creeps[name].run();
    }
}