module.exports = function() {

    StructureSpawn.prototype.tryToSpawnCreep = function() {
        let energy = this.room.energyAvailable;
        let creepsInRoom = this.room.find(FIND_MY_CREEPS);

        let harvesters = _.filter(creepsInRoom, (c) => c.memory.role == 'harvester');
        if(harvesters.length < 2){
            this.spawnCustomCreep((energy <= 400)?energy:400, 'harvester');
        }

        let upgrader = _.filter(creepsInRoom, (c) => c.memory.role == 'upgrader');
        if(upgrader.length < 1){
            this.spawnCustomCreep(energy, 'upgrader');
        }

        let builder = _.filter(creepsInRoom, (c) => c.memory.role == 'builder');
        if(builder.length < 1){
            this.spawnCustomCreep(energy, 'builder');
        }

        let repairer = _.filter(creepsInRoom, (c) => c.memory.role == 'repairer');
        if(repairer.length < 1){
            this.spawnCustomCreep(energy, 'repairer');
        }

        let containers = this.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});

        //Check if any containers need miners or lorries.
        for(let container in containers){
            if(Memory.containers[containers[container].id].hasMiner == false){
                let result = this.spawnMiner(containers[container]);
                if(result != undefined && result == 0){
                    Memory.containers[containers[container].id].hasMiner = true;
                }
                break;
            }

            if(Memory.containers[containers[container].id].hasLorry == false){
                let result = this.spawnLorry(energy, containers[container]);
                if(result != undefined && result == 0){
                    Memory.containers[containers[container].id].hasLorry = true;
                }
                break;
            }
        }

        if(this.memory.creepsLimit != undefined){
            let defender = _.filter(creepsInRoom, (c) => c.memory.role == 'defender');
            let defenderLimit = this.memory.creepsLimit.defender;
            if(defenderLimit && defender < defenderLimit){
                this.spawnDefender();
            }
        }

    }

    StructureSpawn.prototype.spawnCustomCreep =
        function(enegery, roleName) {
            var numberOfParts = Math.floor(enegery / 200);
            // make sure the creep is not too big (more than 50 parts)
            numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
            var body = [];

            for(let i = 0; i < numberOfParts; i++){
                body.push(WORK);
            }
            for(let i = 0; i < numberOfParts; i++){
                body.push(CARRY);
            }
            for(let i = 0; i < numberOfParts; i++){
                body.push(MOVE);
            }

            return this.spawnCreep(body, roleName + '_' + Game.time, {memory: {role: roleName}});
        };

    /** @param {StructureContainer} container */
    StructureSpawn.prototype.spawnMiner = function(container) {
        return this.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], 'miner_' + Game.time, {memory: {role: 'miner', container: container.id}});
    };

    /** @param {StructureContainer} container */
    StructureSpawn.prototype.spawnLorry = function(energy, container) {

        // create a body with twice as many CARRY as MOVE parts
        var numberOfParts = Math.floor(energy / 150);
        // make sure the creep is not too big (more than 50 parts)
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
        var body = [];
        for (let i = 0; i < numberOfParts * 2; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        return this.spawnCreep(body, 'lorry_' + Game.time, {memory: {role: 'lorry', container: container.id}});
    };

    StructureSpawn.prototype.spawnDefender = function() {
        return this.spawnCreep([TOUGH, ATTACK, ATTACK, MOVE, MOVE], 'defender_' + Game.time, {memory: {role: 'defender'}});
    };

};