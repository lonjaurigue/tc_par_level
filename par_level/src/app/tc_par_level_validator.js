define([
    'N/log',
    '../data/tc_par_level_gateway'
    ], function(
    log,
    ParLevelGateway
) {

    
    function ParLevelValidator(searchObj) {
        this.name = 'ParLevelValidator';
    }

    // Can be used for client side validation
    ParLevelValidator.prototype.validateItemRecord = function(params){
        const {rec} = params;

        let isValid = true;
        let message = '';
        const parLevelCount = rec.getLineCount({sublistId: 'recmachcustrecord_item_location'});

        let locations = [];
        let location;
        for(let i = 0; i < parLevelCount; i++) {
            location = rec.getSublistValue({
                sublistId:'recmachcustrecord_item_location',
                fieldId: 'custrecord_itemdetails_location',
                line: i
            });

            if (locations.includes(location)) {
                message = 'There is already an existing PAR Level record for this item in the same location.';
                isValid = false;
                break; 
            } else {
                locations.push(location)
            }
        }
        
        return {isValid, message};
    }

    ParLevelValidator.prototype.validateParLevelRecord = function(params){
        const {itemId, parLevelRecord} = params;
        let isValid = true;
        let message = '';
        const parLevelGateway = new ParLevelGateway();

        const currentParLevelRecLocation = parLevelRecord.getValue({
            fieldId: 'custrecord_itemdetails_location'
        })


        let parLevels = parLevelGateway.getParLevelsByItemId(itemId);
        if (parLevelRecord.id) {
            // exclude the current parLevel record from the list
            parLevels = parLevels.filter((rec)=> {
                return rec.id != parLevelRecord.id
            })
        }

        for (let i = 0; i < parLevels.length; i++) {
            if (parLevels[i].location == currentParLevelRecLocation) {
                message = 'There is already an existing PAR Level record for the item in the same location.';
                isValid = false;
                break; 
            } 
        }

        return {isValid, message};
    }

    return ParLevelValidator;
})