import {CategoryObj, FilterStateObj, FloatObj} from "./usertyp";


export function getKeyByValue(object: any, value : any) {
  return Object.keys(object).find(key => object[key] === value);
}

export function groupbyKeys(obArr: Array<any>, targetKey:string,keys: string[]) {
    return [...obArr.reduce((r, o) => {
        const key = keys.map((k) => o[k]).join("-")
        const item = r.get(key) || Object.assign({}, o, {
            [targetKey]: 0,
            count: 0
        });

        item[targetKey] += parseFloat(o[targetKey]) ? parseFloat(o[targetKey]) : 0;
        item.count += 1;

        return r.set(key, item);
    }, new Map).values()];
}

export function sortObjectVal(a: any,b: any,targetKey:string){
    if ( a[targetKey] < b[targetKey] ){
        return -1;
    }
    if ( a[targetKey] > b[targetKey] ){
        return 1;
    }
    return 0;
}

export function objectMap(object: any, mapFn: Function) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key])
    return result
  }, {})
}

export function apiParamGen(targetObject: FilterStateObj){
  let cate_params:any = targetObject.category.reduce(function (r:Object,a:CategoryObj){
            r[a.name] = r[a.name] || [];
            r[a.name].push(a.value);
            return r},{})
  cate_params = objectMap(cate_params,(x:string[])=>(x.join("-")))
  let float_params:any = targetObject.float.reduce(function (r:Object,a:FloatObj){
            r[a.name+"From"] = [];
            r[a.name+"Until"] = [];
            r[a.name+"From"].push(a.value[0]);
            r[a.name+"Until"].push(a.value[1]);
            return r},{})
  return {...cate_params, ...float_params};
}

export function urlGen(targetUrl:string,params:any):string{
    let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');
    return targetUrl+"?" + query;
}