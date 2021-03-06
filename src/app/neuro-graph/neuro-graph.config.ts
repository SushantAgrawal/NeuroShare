/*inter component messagings
message: 'neuro:related', {artifact:value, checked: e.target.checked}
emitters: neuro-related
consumers: neuro-related-cares, graph-panel
*/

export const allMessages = {
    'neuroRelated': 'neuro:related',
    'invokeAddRelapses': 'invoke:add:relapses',
    'invokeAddEdss': 'invoke:add:edss',
    'virtualCaseload': 'virtual:Caseload'
};

export const manyHttpMessages = {
    'httpGetTestMany': 'http:get:test:many',
    'httpGetInitialApiCall': 'http:get:initial:api:call',
    'httpGetMedicationSecondLayerApiCall': 'http:get:medication:second:layer:api:call'
};
export const allHttpMessages = {
    'httpGetMedications': 'http:get:medications',
    'httpGetEdss': 'http:get:edss',
    'httpGetCdsInfo': 'http:get:cds:info',
    'httpGetCdsUserData': 'http:get:cds:user:data',
    'httpPutCdsUserData': 'http:put:cds:user:data',
    'httpPostCdsUserData': 'http:post:cds:user:data',
    'httpGetDmt': 'http:get:dmt',
    'httpGetRelapse': 'http:get:relapse',
    'httpPutRelapse': 'http:put:relapse',
    'httpPostRelapse': 'http:post:relapse',
    'httpDeleteRelapse': 'http:delete:relapse',
    'httpGetAllQuestionnaire': 'http:get:all:questionnaire',
    'httpGetOtherMeds': 'http:get:otherMeds',
    'httpGetImaging': 'http:get:imaging',
    'httpGetLabs': 'http:get:labs',
    'httpGetVirtualCaseLoad':'http:get:virtualCaseLoad'
};
export const urlMaps = {
    
    // "http:get:medications": "https://private-242c4d-ehrmedicationorders.apiary-mock.com/maestro/api/ehr/medications-orders/?pom_id=82043",
    "http:get:medications":"http://private-242c4d-ehr2.apiary-mock.com/maestro/api/ehr/medications-orders/?pom_id=82043",
    "http:get:edss": "https://private-anon-517d57d1fe-neuroshareapis.apiary-mock.com/neuroshare/api/ms/edss-score/?pom_id=82043",
    "http:get:cds:info": "http://private-anon-293c93a712-neuroshareapis.apiary-mock.com/neuroshare/api/ms/cds-info/",
    "http:get:cds:user:data": "https://private-anon-293c93a712-neuroshareapis.apiary-mock.com/neuroshare/api/ms/cds/?pom_id=82043",
    "http:put:cds:user:data": "https://private-anon-293c93a712-neuroshareapis.apiary-mock.com/neuroshare/api/ms/cds/",
    "http:post:cds:user:data": "https://private-anon-293c93a712-neuroshareapis.apiary-mock.com/neuroshare/api/ms/cds/",
    "http:get:dmt": "https://private-anon-a39e22dbbe-neuroshareapis.apiary-mock.com/neuroshare/api/ms/dmt/?pom_id=82043",
    "http:get:relapse": "https://private-anon-221223bd22-neuroshareapis.apiary-mock.com/neuroshare/api/ms/relapses/?pom_id=82043",
    "http:put:relapse": "https://private-anon-221223bd22-neuroshareapis.apiary-mock.com/neuroshare/api/ms/relapse",
    "http:post:relapse": "https://private-anon-221223bd22-neuroshareapis.apiary-mock.com/neuroshare/api/ms/relapses",
    "http:delete:relapse": "https://private-anon-221223bd22-neuroshareapis.apiary-mock.com/neuroshare/api/ms/relapse",
    "http:get:all:questionnaire": "https://private-anon-a39e22dbbe-neuroshareapis.apiary-mock.com/neuroshare/api/all-questionnaire-responses/?pom_id=82043",
    "http:get:otherMeds": "https://private-anon-a39e22dbbe-neuroshareapis.apiary-mock.com/neuroshare/api/ms/other-meds/?pom_id=82043",
    "http:get:imaging": "https://private-anon-221223bd22-neuroshareapis.apiary-mock.com/neuroshare/api/ms/imaging-orders/?pom_id=82043",
    "http:get:labs": "http://private-anon-f773a6f996-ehr2.apiary-mock.com/maestro/api/ehr/lab-orders/?pom_id=82043",
    "http:get:virtualCaseLoad":"https://private-anon-221223bd22-neuroshareapis.apiary-mock.com/neuroshare/api/ms/ms-population-data/?pom_id=82043"
    
};

// export const cds = {     dmt: ['dmt'],     otherMeds: ['otherMeds'],
// vitaminD: ['vitaminD'],     referrals: ['referrals'],     edss:
// ['symptomStatus'],     walk25Feet: ['symptomStatus'],     imaging:
// ['imaging'],     symptoms: ['symptomStatus'],     labs: ['labs'],
// vaccinations: ['vaccinations'],     relapses: ['relapses'] };

export const cdsMap = {
    dmt: ['review_dmts'],
    otherMeds: ['review_other_meds'],
    vitaminD: ['review_vitamin_d'],
    referrals: ['review_symptoms_referrals'],
    edss: ['review_symptom_status'],
    walk25Feet: ['review_symptom_status'],
    imaging: ['review_mri_images'],
    symptoms: ['review_symptom_status'],
    labs: ['review_monitoring_labs'],
    vaccinations: ['review_vaccinations'],
    relapses: ['review_relapses']
};

export const medication = {
    dmt: {
        genericNames: [
            "MitoxantroneHCl",
            "Glatiramer Acetate",
            "Interferon Beta-1a",
            "Interferon Beta-1b",
            "Peginterferon Beta-1a",
            "Teriflunomide",
            "Alemtuzumab",
            "Natalizumab",
            "Dimethyl Fumarate",
            "Dalfampridine",
            "FingolimodHCl",
            "Rituximab IV Soln",
            "DaclizumabSoln",
            "Ocrelizumab"
        ]
    },
    vitaminD: {
        ids: [
            123943,
            130116,
            165257,
            86942,
            137499,
            158211,
            129927,
            157347,
            134362,
            117453,
            165255,
            136312,
            118181,
            117155,
            131102,
            127203,
            120020,
            65879,
            130017,
            62127,
            62081,
            61576,
            86945,
            23666,
            90551,
            157272,
            35197,
            130964,
            148413,
            41126,
            93253,
            152124,
            123003,
            131261,
            130016,
            116226,
            91720
        ]
    },
    otherMeds: {
        ids: [
            15987,
            40627,
            6545,
            28827,
            52604,
            32495,
            28826,
            6802,
            6538,
            31034,
            52603,
            32496,
            29292,
            48876,
            133042,
            51331,
            6801,
            133041,
            78895,
            25491,
            133043,
            24149,
            25490,
            157653,
            44951,
            13408,
            45558,
            44950,
            13410,
            157652,
            24148,
            13409,
            57985,
            85385,
            41276,
            57986,
            1130,
            54133,
            57988,
            1131,
            48967,
            57987,
            1127,
            36593,
            57991,
            1132,
            44062,
            57989,
            56142,
            44063,
            57984,
            56143,
            44897,
            54963,
            94748,
            48459,
            54962,
            54982,
            48968,
            54961,
            31022,
            31022,
            2388,
            27520,
            27520,
            2389,
            27521,
            27521,
            1644,
            30276,
            30276,
            64466,
            46461,
            46461,
            6507,
            30791,
            29319,
            6505,
            30792,
            29315,
            6506,
            14668,
            76987,
            69011,
            83093,
            16942,
            92951,
            49297,
            29948,
            26609,
            49298,
            2501,
            14184,
            53407,
            1130,
            36476,
            25473,
            1131,
            56873,
            26233,
            1127,
            56874,
            45862,
            1132,
            2388,
            40628,
            6544,
            2389,
            40626,
            64466,
            1644
        ],
        mappedCodes: ["G35"]
    }
};

export const GRAPH_SETTINGS = {
    panel: {
        offsetHeight: 640,
        offsetWidth: 710,
        marginTop: 5,
        marginRight: 20,
        marginBottom: 20,
        marginLeft: 25
    },
    medications: {
        positionTop: 520,
        containerHeight: 110,
        dmtColor: "#607D8B",
        vitaminDColor: "#FBC02D",
        otherMedsColor: "#D8DFE2"
    },
    edss: {
        positionTop: 300,
        chartHeight: 200,
        maxValueY: 9,
        color: "#EA700D"
    },
    relapse: {
        positionTop: 265,
        chartHeight: 30,
        color: "#E53935"
    },
    imaging: {
        positionTop: 240,
        chartHeight: 30,
        color: "#BE90D4"
    },
    labs: {
        positionTop: 200,
        chartHeight: 30,
        color: "#00AAA5"
    }
}

export const edssPopup = [{ score: '0.0', title: 'Normal neurological exam.' }
    , { score: '1.0', title: 'No Disability, minimal signs in one FS.' }
    , { score: '1.5', title: 'No disability, minimal signs in more than one FS.' }
    , { score: '2.0', title: 'Minimal disability in one FS.' }
    , { score: '2.5', title: 'Mild disability in one FS or minimal disability in two FS.' }
    , { score: '3.0', title: 'Moderate disability in on FS, or mild disability in three or four FS. No impairment to walking.' }
    , { score: '3.5', title: 'Moderate disability in one FS and more than minimal disability in several others. No impairment to walking.' }
    , { score: '4.0', title: 'Significant disability but self-sufficient and up and about some 12 hours a day. Able to walk without aid or rest for 500m.' }
    , { score: '4.5', title: 'Significant disability but up and about much of the day, able to work a full day, may otherwise have some limitation of full activity or require minimal assistance. Able to walk without aid or rest for 300m.' }
    , { score: '5.0', title: 'Disability severe enough to impair full daily activities and ability to work a full day without special provisions. Able to walk without aid or ret for 200m.' }
    , { score: '5.5', title: 'Disability severe enough to preclude full daily activities. Able to walk without aid or rest for 100m.' }
    , { score: '6.0', title: 'Requires a walking aid, cane, crutch, etc – to walk about 100m with our without resting.' }
    , { score: '6.5', title: 'Requires two walking aids – pair of canes, crutches, etc – to walk about 20m without resting.' }
    , { score: '7.0', title: 'Unable to walk beyond approximately 5m even with aid. Essentially restricted to wheelchair, though wheels self in standard wheelchair and transfers alone. UP and about in wheelchair some 12 hours a day.' }
    , { score: '7.5', title: 'Unable to take more than a few steps. Restricted to wheelchair and may need aid in transferring. Can wheel self but cannot carry on in a standard wheelchair for a full day and may require a motorized wheelchair.' }
    , { score: '8.0', title: 'Essentially restricted to bed or chair or pushed in wheelchair. May be out of bed itself much of the day. Retains many self-care functions. Generally has effective use of arms.' }
    , { score: '8.5', title: 'Essentially restricted to bed most of the day. Has some effective use of arms retains some self-care functions.' }
    , { score: '9.0', title: 'Confined to bed. Can still communicate and eat.' }
    , { score: '9.5', title: 'Confined to bed and totally dependent. Unable to communicate effectively or eat/swallow.' }
    , { score: '10', title: 'Death due to MS.' }];
