module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        /** @type {StructureContainer} */
        let container = Game.getObjectById(creep.memory.container);

        if(creep.pos.isEqualTo(container.pos)) {
            let source = container.pos.findInRange(FIND_SOURCES, 1)[0];
            if(source){
                creep.harvest(source);
            }
            return true;
        }
        else {
            creep.moveTo(container);
            return true;
        }
    }

};