import {CategoryObj, FilterStateObj} from "./usertyp";


export function getKeyByValue(object: any, value : any) {
  return Object.keys(object).find(key => object[key] === value);
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
  let float_params:any = targetObject.float.reduce(function (r:Object,a:CategoryObj){
            r[a.name+"From"] = [];
            r[a.name+"Until"] = [];
            r[a.name+"From"].push(a.value[0]);
            r[a.name+"Until"].pusn(a.value[1])
            return r},{})
  return {...cate_params, ...float_params};
}

