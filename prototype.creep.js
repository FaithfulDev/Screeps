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

};