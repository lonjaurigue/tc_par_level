/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */

define([
    'N/log',
    'N/error',
    '../app/tc_par_level_validator'
 ], (
    log,
    error,
    ParLevelValidator
) => {
    const beforeSubmit = (scriptContext) => {
        const form = scriptContext.form;
        const newRecord = scriptContext.newRecord;
        
        try{
            const itemId = newRecord.getValue({fieldId: 'custrecord_item_location'});
            validateLocation({
                itemId, 
                parLevelRecord: newRecord
            });
        } catch(e) {
            log.error('PAR Level | PAR Level Record UE - beforeSubmit | Error', e);
            if (e.name == 'PAR_LEVEL_LOCATION_MUST_BE_UNIQUE') {
                throw e.message;
            }
        }
            
    }

    const validateLocation = (params) => {
        const validator = new ParLevelValidator();
        const {itemId, parLevelRecord} = params;
        const validationResult = validator.validateParLevelRecord({
            itemId,
            parLevelRecord
        });

        log.error('validationResult', JSON.stringify(validationResult));

        if (!validationResult.isValid) {
            throw error.create({
                name: 'PAR_LEVEL_LOCATION_MUST_BE_UNIQUE',
                message: validationResult.message,
                notifyOff: true
            })
        }
    }
        
    return {
        beforeSubmit
    }
});
