var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
			//Some sites have priority
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: (s) => s.id == '63c46e3f555158424dcf10f9'});

			if(targets){
				var target = targets[0];
			}else{
				var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			}

            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            } else {
			    return false;
			}
	    }
	    else {
			creep.getEnergy();
			return true;
	    }
	}
};

module.exports = roleBuilder;