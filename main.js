require('prototype.spawn')();
require('prototype.creep')();
require('prototype.tower')();

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
        for(let container in containers){

            if(Memory.containers == undefined){
                Memory.containers = {};
            }

            if(Memory.containers[containers[container].id] == undefined){
                Memory.containers[containers[container].id] = {hasMiner: false, hasLorry: false};
            }
        }

        Game.spawns[spawn].tryToSpawnCreep();
    }

    //Default run logic for all creeps.
    for(var name in Game.creeps) {
        Game.creeps[name].run();
    }
}