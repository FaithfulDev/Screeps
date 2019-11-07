module.exports = function() {

    StructureSpawn.prototype.tryToSpawnCreep = function() {
        let energy = this.room.energyAvailable;
        let creepsInRoom = this.room.find(FIND_MY_CREEPS);

        let harvesters = _.filter(creepsInRoom, (c) => c.memory.role == 'harvester');
        if(harvesters.length < 2){
            this.spawnCustomCreep(energy, 'H'+Game.time, 'harvester');
        }

        let upgrader = _.filter(creepsInRoom, (c) => c.memory.role == 'upgrader');
        if(upgrader.length < 1){
            this.spawnCustomCreep(energy, 'U'+Game.time, 'upgrader');
        }

        let builder = _.filter(creepsInRoom, (c) => c.memory.role == 'builder');
        if(builder.length < 1){
            this.spawnCustomCreep(energy, 'B'+Game.time, 'builder');
        }

        let repairer = _.filter(creepsInRoom, (c) => c.memory.role == 'repairer');
        if(repairer.length < 1){
            this.spawnCustomCreep(energy, 'R'+Game.time, 'repairer');
        }
    }

    StructureSpawn.prototype.spawnCustomCreep =
        function(enegery, creepName, roleName) {
            var numberOfParts = Math.floor(enegery / 200);
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

            return this.spawnCreep(body, creepName, {memory: {role: roleName}});
        };

};