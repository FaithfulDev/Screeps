module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var closestHostile = this.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else{
            let flags = creep.room.find(FIND_FLAGS);
            if(flags.length > 0){
                creep.moveTo(flags[0]);
            }
        }
        return true;
	}

};