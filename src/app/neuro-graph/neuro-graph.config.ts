/*inter component messagings
message: 'neuro:related', {artifact:value, checked: e.target.checked}
emitters: neuro-related
consumers: neuro-related-cares, graph-panel 
*/

let urlMaps = {
    "http:get:medications": "medications"
};
export {urlMaps};

let cds = {
dmt:['typeOrStatus','msType','dmt'],
otherMeds:['otherMeds'],
vitaminD:['vitaminD'],
referrals:['referrals'],
edss:[]
};
export {cds};