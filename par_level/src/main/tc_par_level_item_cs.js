/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define([
	'N/log',
    'N/ui/dialog',
    '../app/tc_par_level_validator'
], function(
	log,
    dialog,
    ParLevelValidator
) {

    const pageInit = (scriptContext) => {
		try {
            const currentRecord = scriptContext.currentRecord;
        } catch (e) {
            console.log('PAR Level | Item CS - pageInit | Error: '+e);
        }
		
    }

    const saveRecord = (scriptContext) => {
        let isValid = true;
        try {
            const currentRecord = scriptContext.currentRecord;
            isValid = validateParLevel({currentRecord});

        } catch (e) {
            console.log('PAR Level | Item CS - saveRecord | Error: '+e);
        }

        return isValid;
    }

    const validateParLevel = (params) => {
        const {currentRecord} = params;
        const validator = new ParLevelValidator();

        const validationResult =  validator.validateItemRecord({
            rec: currentRecord
        });

        if (!validationResult.isValid) {
            dialog.alert({
                title: 'PAR Level Validation',
                message: validationResult.message
            });
        }

        return validationResult.isValid;
    }

	return {
		pageInit,
        saveRecord
	};
});
