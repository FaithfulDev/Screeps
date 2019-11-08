module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🚧 repair');
	    }

	    if(creep.memory.repairing) {
	        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, { //Tower repair walls & ramparts.
                    filter: (structure) => (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART && structure.hits < structure.hitsMax)
                                            || (structure.structureType == STRUCTURE_RAMPART && structure.hits < 1000) //ramparts decay, thus need at least some repair

            });
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            } else {
				return false;
			}
	    }
	    else {
	        creep.harvestEnergy();
			return true;
	    }
	}
};