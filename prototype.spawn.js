module.exports = function() {
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