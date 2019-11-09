var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleMiner = require('role.miner');
var roleLorry = require('role.lorry');

module.exports = function() {

    Creep.prototype.run = function() {
        var result = false;

        if(!this.spawning){
            if(this.memory.role == 'harvester') {
                result = roleHarvester.run(this);
            }else if(this.memory.role == 'upgrader') {
                result = roleUpgrader.run(this);
            }else if(this.memory.role == 'builder') {
                result = roleBuilder.run(this);
            }else if(this.memory.role == 'repairer'){
                result = roleRepairer.run(this);
            }else if(this.memory.role == 'defender'){
                result = roleDefender.run(this);
            }else if(this.memory.role == 'defender'){
                result = roleDefender.run(this);
            }else if(this.memory.role == 'miner'){
                result = roleMiner.run(this);
            }else if(this.memory.role == 'lorry'){
                result = roleLorry.run(this);
            }

            //Fallback roles
            if(!result){
                result = roleHarvester.run(this);
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

    Creep.prototype.getEnergy = function() {
        let storages = this.room.find(FIND_STRUCTURES,
            {filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store.getUsedCapacity(RESOURCE_ENERGY) != 0})
        if(storages.length > 0){
            if(this.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(storages[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return;
        }

        let container = this.pos.findClosestByPath(FIND_STRUCTURES,
            {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.getUsedCapacity(RESOURCE_ENERGY) != 0
             && s.isOpen()})
        if(container){
            if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return;
        }

        //If no storage or container with energy is available, the creep will harvest it itself.
        this.harvestEnergy();
    };

};