import {CategoryObj, FilterStateObj, FloatObj} from "./p2Usertyp";
import { INIT_FILST, INIT_DEBT } from "./p2Constant"

export function zip(a1: any, a2: any){
    return a1.map((x, i) => [x, a2[i]]);
}

export function parseFloatDef(val:string,defaultval:any){
    let newval = val.replace(/,/g,"")
    return parseFloat(newval) ? parseFloat(newval) : defaultval
}
export function parseIntDef(val:string,defaultval:any){
    let newval = val.replace(/,/g,"")
    return parseInt(newval) ? parseInt(newval) : defaultval
}

export function windowSizeStr(windowNow:{width:number|undefined,height:number|undefined}):string{
        var {width,height} = windowNow
        if (width && (width > 1180)){
            return 'large'
        } else if (width && (width >830)){
            return 'medium'
        } else if (width){
            return 'small'
        } else {
            return ''
        }
    }
export function groupbyCount(obArr: Array<any>, countBy: number) {
    return obArr.reduce(
        (r, o, idx) => {
            const key = parseInt(String(idx / countBy))
            r[key] = (r[key] || [])
            r[key].push(o)
            return r
        }, {}
    )
}



export function getTempRem(rempx:number,targetpx:number):string{
    return `${targetpx/rempx}rem`
}


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
            r[a.name+"From"] = a.value[0];
            r[a.name+"Until"] = a.value[1];
            return r},{})
  return {...cate_params, ...float_params};
}

export function urlGen(targetUrl:string,params:any):string{
    let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');
    return targetUrl+"?" + query;
}

interface queryParam {
    loancls?: string;
    seniorstr?: string;
}
export function detailQueryParser(q: queryParam) {
    let initialFilterState = INIT_FILST;
    let category = INIT_FILST.category;
    console.log("query",q)
    if (!q || Object.keys(q).length ===0) {
        return INIT_FILST;
    } 
    if('loancls' in q) {
        category = category.filter((item)=>{
            return item.name !== "loancls"
        });
        category.push({'name':'loancls', 'value':q.loancls!.replace("대출","")!})
    }
    if('seniorstr' in q) {
        category = category.filter((item)=>{
            return item.name !== "seniorstr"
        });
        category.push({'name':'seniorstr', 'value':q.seniorstr!.replace("순위","")!})
    }

    initialFilterState.category = category;
    return initialFilterState;
} 