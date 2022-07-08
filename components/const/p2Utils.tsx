import {CategoryObj, FilterStateObj, FloatObj} from "./p2Usertyp";
import {INIT_FILST} from "./p2Constant"

export function zip(a1: any, a2: any) {
    return a1.map((x, i) => [x, a2[i]]);
}

export function parseFloatDef(val: string, defaultval: any) {
    let newval = val.replace(/,/g, "")
    return parseFloat(newval) ? parseFloat(newval) : defaultval
}

export function parseIntDef(val: string, defaultval: any) {
    let newval = val.replace(/,/g, "")
    return parseInt(newval) ? parseInt(newval) : defaultval
}

export function windowSizeStr(windowNow: { width: number | undefined, height: number | undefined }): string {
    var {width, height} = windowNow
    if (width && (width > 1180)) {
        return 'large'
    } else if (width && (width > 830)) {
        return 'medium'
    } else if (width) {
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


export function getTempRem(rempx: number, targetpx: number): string {
    return `${targetpx / rempx}rem`
}


export function getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);
}

export function groupbyKeys(obArr: Array<any>, targetKey: string, keys: string[]) {
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

// export function groupbyKeysObject(obArr: Array<any>,keys: string[]) {
//     return [...obArr.reduce((r, o) => {
//         const key = keys.map((k) => o[k]).join("-")
//         if (r.has(key)){
//             var item = r.get(key)
//             item = Object.keys(item).map((k)=>{
//                 if (item[k] === o[k]){
//                     return item[k]
//                 } else {
//                     return [...item[k],o[k]]
//                 }
//             })
//             return r.set(key, item)
//             } else {
//             const item = Object.assign({}, o);
//             return r.set(key, item);
//         }
//     }, new Map).values()];
// }


export function sortObjectVal(a: any, b: any, targetKey: string) {
    if (a[targetKey] < b[targetKey]) {
        return -1;
    }
    if (a[targetKey] > b[targetKey]) {
        return 1;
    }
    return 0;
}

export function to_date(date_str:string){
    // date_str : yyyy-mm-dd
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0,4);
    var sMonth = yyyyMMdd.substring(5,7);
    var sDate = yyyyMMdd.substring(8,10);

    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
    return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
}

export function sortForChartOnly(a: any, b: any, targetKey: string) {
    if (a[targetKey] == b[targetKey]) {
        if (a['lpcorp'] === "기타(상위 10개 대주 제외)" && b['lpcorp'] !== "기타(상위 10개 대주 제외)") {
            return 1
        } else if (b['lpcorp'] === "기타(상위 10개 대주 제외)" && a['lpcorp'] !== "기타(상위 10개 대주 제외)") {
            return -1
        } else {
            return 0
        }
    } else {
        return a[targetKey] - b[targetKey];
    }
}

export function objectMap(object: any, mapFn: Function) {
    return Object.keys(object).reduce(function (result, key) {
        result[key] = mapFn(object[key])
        return result
    }, {})
}

export function apiParamGen(targetObject: FilterStateObj) {
    let cate_params: any = targetObject.category.reduce(function (r: Object, a: CategoryObj) {
        r[a.name] = r[a.name] || [];
        r[a.name].push(a.value);
        return r
    }, {})
    cate_params = objectMap(cate_params, (x: string[]) => (x.join("-")))
    let float_params: any = targetObject.float.reduce(function (r: Object, a: FloatObj) {
        r[a.name + "From"] = [];
        r[a.name + "Until"] = [];
        r[a.name + "From"] = a.value[0];
        r[a.name + "Until"] = a.value[1];
        return r
    }, {})
    return {...cate_params, ...float_params};
}

export function urlGen(targetUrl: string, params: any): string {
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    return targetUrl + "?" + query;
}

interface queryParam {
    loancls?: string;
    seniorstr?: string;
}

export function detailQueryParser(q: queryParam) {
    let initialFilterState = INIT_FILST;
    let category = INIT_FILST.category;
    console.log("query", q)
    if (!q || Object.keys(q).length === 0) {
        return INIT_FILST;
    }
    if ('loancls' in q) {
        category = category.filter((item) => {
            return item.name !== "loancls"
        });
        category.push({'name': 'loancls', 'value': q.loancls!.replace("대출", "")!})
    }
    if ('seniorstr' in q) {
        category = category.filter((item) => {
            return item.name !== "seniorstr"
        });
        category.push({'name': 'seniorstr', 'value': q.seniorstr!.replace("순위", "")!})
    }

    initialFilterState.category = category;
    return initialFilterState;
}

export function setCookie(name: string, value: any, options: any = {}) {
    options = {
        path: '/',
        // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    if (typeof document != 'undefined') {
        document.cookie = updatedCookie;
    }
}

export function getCookie(name: string) {
    if (typeof document != 'undefined') {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    } else {
        return undefined
    }
}

export function deleteCookie(name: string) {
    setCookie(name, "", {
        'max-age': -1
    });
}

export function downloadExcel(title:string, dataJsonArray:Object[], orderedColumnArray:{NAME:string,CODE:string}[]) {

    var columnCodeArray = [];
    var columnNameArray = [];
    orderedColumnArray.forEach(function (orderedColumn) {
        columnCodeArray.push(orderedColumn.CODE);
        columnNameArray.push(orderedColumn.NAME);
    });

    var wb = XLSX.utils.book_new();
    var arrJSON = JSON.parse(JSON.stringify(dataJsonArray));
    var dataJsonKeyLength = dataJsonArray.length > 0 && Object.keys(dataJsonArray[0]).length;
    var returnColumnCount = columnNameArray.length;

    //열순서 및 시트화
    var ws = XLSX.utils.json_to_sheet(arrJSON, {header: columnCodeArray});

    //엑셀파일정보
    wb.Props = {
        Title: title,
        Subject: "Excel",
        Author: "Master",
        CreatedDate: new Date()
    };
    //엑셀 첫번째 시트네임
    wb.SheetNames.push(title);

    //열이름변경
    changeColName(ws, columnNameArray);

    //필요없는 열 삭제
    if (dataJsonKeyLength - returnColumnCount > 0) {
        delete_cols(ws, returnColumnCount + 1, dataJsonKeyLength - returnColumnCount);
    }

    //시트에 데이터를 연결
    wb.Sheets[title] = ws;

    //다운로드
    saveAs(new Blob([
        s2ab(XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'binary'
        }))
    ], {
        type: "application/octet-stream"
    }), title + '.xlsx');

}
