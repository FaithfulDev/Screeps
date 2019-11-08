module.exports = function() {
    
    StructureTower.prototype.run = function() {

        var closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            this.attack(closestHostile);
        } else {
            var damagedStructures = this.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_WALL && s.hits / s.hitsMax <= 0.0002)
                                        || (s.structureType == STRUCTURE_RAMPART && s.hits / s.hitsMax <= 0.03)
                                        || (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART && s.hits < s.hitsMax)
            });
            if(damagedStructures) {
                
                damagedStructures.sort(function (a, b) {
                    if (a.hits < b.hits) {
                        return -1;
                    }
                    if (b.hits < a.hits) {
                        return 1;
                    }
                    return 0;
                });
                
                this.repair(damagedStructures[0]);
            }
        }        

        if(this.energy <= 800){
            if(Memory.towers == undefined){
                Memory.towers = {};
            }
            Memory.towers[this.id].needsFillUp = true;
        }else if(this.energy == 1000){
            if(Memory.towers == undefined){
                Memory.towers = {};
            }
            Memory.towers[this.id].needsFillUp = false;
        }

    };
        
    StructureTower.prototype.needsFillUp = function(){

        if(Memory.towers == undefined){
            Memory.towers = {};
        }

        if(Memory.towers[this.id].needsFillUp){
            return true;
        }else{
            return false;
        }

    };

};