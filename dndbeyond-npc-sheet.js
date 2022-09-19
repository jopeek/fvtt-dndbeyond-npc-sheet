class DNDBeyondNPCSheet extends dnd5e.applications.actor.ActorSheet5eNPC {

    get template() {
        
        const path = "systems/dnd5e/templates/actors/";
        if (!game.user.isGM && this.actor.limited) return path + "limited-sheet.hbs";
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

        return sheetData;
    }


    


}

Hooks.once('init', async function () {

    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });
    
    Handlebars.registerHelper('ifnoteq', function (a, b, options) {
        if (a != b) { return options.fn(this); }
        return options.inverse(this);
    });
    
    //console.log("DNDBeyondNPCSheet | Loaded");
  
    //Register the loot sheet
    Actors.registerSheet("dnd5e", DNDBeyondNPCSheet, {
        types: ["npc"],
        makeDefault: false
    });
    
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
