define([
    'N/log',
    'N/query',
    '../entity/parLevel'
    ], function(
    log,
    query,
    ParLevel
) {

    
    function ParLevelGateway(searchObj) {
        this.name = 'ParLevelGateway';
    }

    ParLevelGateway.prototype.getParLevelsByItemId = function(itemId){
        let parLevels = [];

        let q = `
            Select
                parLevel.id as id,
                parLevel.custrecord_itemdetails_location as location,
                parLevel.custrecord_item_location as item
            from 
                customrecord826 parLevel
            where 
                parLevel.custrecord_item_location = ${itemId}
        `;

        const recordList = query.runSuiteQL({
                query: q,
                params: []
            })
            .asMappedResults();

        log.error('getParLevelsByItemId | recordList', JSON.stringify(recordList));

        recordList.forEach((rec)=>{
            parLevel = new ParLevel();
            parLevel.id = rec.id;
            parLevel.location = rec.location;
            parLevel.item = rec.item;
            parLevels.push(parLevel);
        })

        return parLevels;
    }

    return ParLevelGateway;
})