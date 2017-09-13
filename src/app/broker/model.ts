export interface IQuery{
    urlId: string,
    queryParams?:Array<any>,
    headers?:[{name:string,value:string}]
}