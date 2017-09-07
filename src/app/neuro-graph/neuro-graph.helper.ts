// export enum EnumMedicationtypes{     DMT,OtherMeds,VitaminD }
// function searchObject1(obj, key, val) {
//     var objects = [];
//     for (var i in obj) {
//         if (!obj.hasOwnProperty(i)) 
//             continue;
//         if (typeof obj[i] == 'object') {
//             objects = objects.concat(searchObject(obj[i], key, val));
//         } else if (i == key && obj[key] == val) {
//             objects.push(obj);
//         }
//     }
//     return objects;
// };

export function searchObject(obj, key, val : Array < any >) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) 
            continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(searchObject(obj[i], key, val));
        } else if (i == key && val.find(x => obj[key] == x)) {
            objects.push(obj);
        }
    }
    return objects;
};