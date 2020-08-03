import ActorSheet5eNPC from "../../systems/dnd5e/module/actor/sheets/npc.js";

class DNDBeyondNPCSheet extends ActorSheet5eNPC {

    get template() {
        
        const path = "systems/dnd5e/templates/actors/";
        if (!game.user.isGM && this.actor.limited) return path + "limited-sheet.html";
        return "modules/dndbeyond-npc-sheet/template/dndb-npc-sheet.html";
    }

    static get defaultOptions() {
        const options = super.defaultOptions;

        mergeObject(options, {
            classes: ["dnd5e sheet actor npc npc-sheet dndb-npc-sheet"],
            width: 800,
            height: 750
        });
        return options;
    }

    async getData() {
        const sheetData = super.getData();

        if (game.user.isGM) sheetData.isGM = true;
        else sheetData.isGM = false;

        console.log(sheetData);
        return sheetData;
    }


    


}

//Register the loot sheet
Actors.registerSheet("dnd5e", DNDBeyondNPCSheet, {
    types: ["npc"],
    makeDefault: false
});

Hooks.on('ready', () => {
    try {
      window.BetterRolls.hooks.addActorSheet("DNDBeyondNPCSheet");
      window.BetterRolls.hooks.addItemSheet("DNDBeyondNPCSheet");
      console.log("DNDBeyondNPCSheet | Enabled support for Better Rolls 5e");
    } catch (error) {
      console.log("DNDBeyondNPCSheet | Better Rolls 5e module not installed - no big deal, carry on!");
    }
    
  });