module.exports = function() {

    StructureContainer.prototype.setClosed = function() {

        if(Memory.containers == undefined){
            Memory.containers = {};
        }

        Memory.containers[this.id].isOpen = false;

    };

    StructureContainer.prototype.setOpened = function() {

        if(Memory.containers == undefined){
            Memory.containers = {};
        }

        Memory.containers[this.id].isOpen = true;

    };

    StructureContainer.prototype.isOpen = function(){

        if(Memory.containers == undefined){
            Memory.containers = {};
        }

        if(Memory.containers[this.id].isOpen){
            return true;
        }else{
            return false;
        }

    };

};