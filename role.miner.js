module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        /** @type {StructureContainer} */
        let container = Game.getObjectById(creep.memory.container);

        if(creep.pos.isEqualTo(container.pos)) {
            let source = container.pos.findInRange(FIND_SOURCES, 1)[0];
            if(source){
                creep.harvest(source);
            }else{
                console.log('dsad');
            }
            return true;
        }
        else {
            console.log('aaaa');
            creep.moveTo(container);
            return true;
        }
    }

};