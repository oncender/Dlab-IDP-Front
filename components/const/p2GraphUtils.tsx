const STATUS_ACTIVE = "active";
const STATUS_UNACTIVE = "inactive";
const STATUS_SELECTED = "selected";


export function SelectedHighLight(vars: any) {
    const elements: Element[] = vars[0].view.geometries[0].elements
    var hasSelected: boolean = false
    for (var dat of elements) {
        if (dat.hasState(STATUS_SELECTED)) {
            hasSelected = true
            break
        }
    }
    console.log(hasSelected)
    elements.forEach((dat) => {
        if (hasSelected) {
            if (!dat.hasState(STATUS_SELECTED)) {
                dat.setState(STATUS_UNACTIVE, true)
                dat.setState(STATUS_ACTIVE, false)
            }
        } else {
            dat.setState(STATUS_UNACTIVE, false)
            dat.setState(STATUS_ACTIVE, false)
        }
    })
}

export function TargetSelect(dat) {
    if (dat.hasState(STATUS_SELECTED)) {
        dat.setState(STATUS_SELECTED, false)
    } else {
        dat.setState(STATUS_SELECTED, true)
    }
}

export function ClickedZindexChanging(vars, dat) {
    if (dat.hasState(STATUS_SELECTED)) {
        vars[0].data.style = Object.assign({}, vars[0].data.style, {zIndex: -1})
        dat.shape.cfg.zIndex = -1
    } else {
        vars[0].data.style = Object.assign({}, vars[0].data.style, {zIndex: dat.elementIndex})
        dat.shape.cfg.zIndex = dat.elementIndex
    }
}

export function TriggerActive(isTriggered: boolean, dat: Element) {
    if (isTriggered) {
        if (dat.hasState(STATUS_UNACTIVE)) {
            dat.setState(STATUS_UNACTIVE, false);
        }
        dat.setState(STATUS_ACTIVE, true)
    } else {
        if (!dat.hasState(STATUS_SELECTED)) {
            dat.setState(STATUS_UNACTIVE, true)
        }
    }
}
