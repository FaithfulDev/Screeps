module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.isHarvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.isHarvesting = false;
            creep.say('⚡ transfer');

	    }
	    if(!creep.memory.isHarvesting && creep.store.getUsedCapacity() == 0) {
	        creep.memory.isHarvesting = true;
	        creep.say('🔄 harvest');
	    }

	    if(creep.memory.isHarvesting) {

            var minerals = creep.room.find(FIND_MINERALS, {filter: (m) => m.mineralAmount > 0});

            if(minerals.length > 0){
                if(creep.harvest(minerals[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(minerals[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            }
            return false;

        }
        else {
            var closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE) && s.store.getFreeCapacity() > 0
            });

            if(closestTarget){
                if(creep.transfer(closestTarget, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return true;
            }

            return false;
        }
	}

};