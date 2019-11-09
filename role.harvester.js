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
            creep.getEnergy();
			return true;
        }
        else {
            var closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if(closestTarget) {
                if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            } else if(creep.memory.role == 'harvester') {
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