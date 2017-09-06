/*inter component messagings
message: 'neuro:related', {artifact:value, checked: e.target.checked}
emitters: neuro-related
consumers: neuro-related-cares, graph-panel 
*/

export const allMessages = { 'neuroRelated': 'neuro:related' };
export const allHttpMessages = { 'httpGetMedications': 'http:get:medications' };
export const urlMaps = {
    "http:get:medications": "medications"
};

export const cds = {
    dmt: ['symptomStatus', 'typeStatus', 'dmt'],
    otherMeds: ['otherMeds'],
    vitaminD: ['vitaminD'],
    referrals: ['referrals'],
    edss: ['relapses'],
    labs: ['labs'],
    vaccinations: ['vaccinations']
};

export const medication = {
    "DMT": {
                "genericName":["MitoxantroneHCl","Glatiramer Acetate","Interferon Beta-1a","Interferon Beta-1b","Peginterferon Beta-1a","Teriflunomide","Alemtuzumab","Natalizumab","Dimethyl Fumarate","Dalfampridine","FingolimodHCl","Rituximab IV Soln","DaclizumabSoln","Ocrelizumab"]
           },
    "VitaminD": 
            {
                "id":[123943,130116,165257,86942,137499,158211,129927,157347,134362,117453,165255,136312,118181,117155,131102,127203,120020,65879,130017,62127,62081,61576,86945,23666,90551,157272,35197,130964,148413,41126,93253,152124,123003,131261,130016,116226,91720],
            },
    "OtherMeds": 
            {
                "id":[15987,40627,6545,28827,52604,32495,28826,6802,6538,31034,52603,32496,29292,48876,133042,51331,6801,133041,78895,25491,133043,24149,25490,157653,44951,13408,45558,44950,13410,157652,24148,13409,57985,85385,41276,57986,1130,54133,57988,1131,48967,57987,1127,36593,57991,1132,44062,57989,56142,44063,57984,56143,44897,54963,94748,48459,54962,54982,48968,54961,31022,31022,2388,27520,27520,2389,27521,27521,1644,30276,30276,64466,46461,46461,6507,30791,29319,6505,30792,29315,6506,14668,76987,69011,83093,16942,92951,49297,29948,26609,49298,2501,14184,53407,1130,36476,25473,1131,56873,26233,1127,56874,45862,1132,2388,40628,6544,2389,40626,64466,1644],
                "associatedDiagnosesId":["G35"]
            }
};

export const GRAPH_SETTINGS = {
    medications:{
        x:100,
        y:100
    }
}
