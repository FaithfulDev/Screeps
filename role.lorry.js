module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.isTransporting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.isTransporting = false;
            creep.say('🔄 Reload');
	    }
	    if(!creep.memory.isTransporting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.isTransporting = true;
	        creep.say('⚡ Move');
	    }

        if(creep.memory.isTransporting) {
            var closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if(closestTarget) {
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                //Look for Towers that need fill up
                var towerInNeedofFIllUp = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_TOWER && s.needsFillUp() && s.room == creep.room
                }) ;

                if(towerInNeedofFIllUp){
                    if(creep.transfer(towerInNeedofFIllUp, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towerInNeedofFIllUp, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {

            let droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(droppedEnergy){
               if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE){
                   creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffffff'}});
               }
            }

            /** @type {StructureContainer} */
            let container = Game.getObjectById(creep.memory.container);
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(container);
            }

        }
        return true;
    }

};