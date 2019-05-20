module.exports = {
    thieves: async (message, pool) => {
        const sql = "SELECT * FROM fa_discord";
        const results = await pool.query(sql);

        console.log(results);

        let thiefIterator = 0;
        let thiefNames = [];
        for(let i = 0; i<results.length; i++){
            for(let j = i+1; j<results.length; j++){
                if(results[i].api === results[j].api){
                    thiefIterator++;
                    let thiefObj = {};
                    thiefObj[results[i].uid] = results[i].api;
                    thiefObj[results[j].uid] = results[j].api;
                    thiefNames.push(thiefObj)
                }
            }
        }

        message.channel.send(thiefIterator + " out of " + results.length + " players have duplicate APIs and need to be investigated.");
        if(thiefNames.length > 0){
            for(let player of thiefNames) {
                message.channel.send("Player named has duplicate APIs <@" + Object.keys(player) + ">")
            }
        }
    }
};