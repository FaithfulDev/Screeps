var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports = function() {

    Creep.prototype.run = function() {
        var result = false;

        if(!this.spawning){
            if(this.memory.role == 'harvester') {
                result = roleHarvester.run(this);
            }
            if(this.memory.role == 'upgrader') {
                result = roleUpgrader.run(this);
            }
            if(this.memory.role == 'builder') {
                result = roleBuilder.run(this);
            }
            if(this.memory.role == 'repairer'){
                result = roleRepairer.run(this);
            }

            if(!result){
            result = roleBuilder.run(this);
            }
            if(!result){
            result = roleUpgrader.run(this);
            }
        }
    };

    Creep.prototype.harvestEnergy = function() {
        var sources = this.room.find(FIND_SOURCES, {filter: (s) => s.id != '5bbcaba79099fc012e6340fc'});
        if(this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            this.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    };

};