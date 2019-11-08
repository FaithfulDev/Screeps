var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.isWorking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.isWorking = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.isWorking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.isWorking = true;
	        creep.say('⚡ transfer');
	    }
        
	    if(!creep.memory.isWorking) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            } else {
                //Look for Towers that need fill up
                var towerInNeedofFIllUp = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_TOWER && s.needsFillUp() && s.room == creep.room
                }) ;

                if(towerInNeedofFIllUp){
                    if(creep.transfer(towerInNeedofFIllUp, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towerInNeedofFIllUp, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    return true;
                }else{
                    return false;
                }
            }
        }
	}
};

module.exports = roleHarvester;