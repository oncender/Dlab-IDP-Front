import {useCallback, useRef} from "react";

function useInfiniteScroll(callbackF: Function, loadingTrigger: boolean, InfiniteLimitTrigger: boolean) {
    const observer = useRef();
    const lastCardRef = useCallback(
        // observer always refer last card div component
        (node: any) => {
            if (loadingTrigger) return;
            //
            if (observer.current) { // @ts-ignore
                observer.current.disconnect();
            }
            // if need to more load (hasMore == true), observer redefine & cardPage +1
            // @ts-ignore
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && InfiniteLimitTrigger) {
                    callbackF()
                }
            });
            if (node) {
                // @ts-ignore
                observer.current.observe(node);
            }
        },
        [loadingTrigger, InfiniteLimitTrigger]
    );
    return [observer, lastCardRef]
}

export default useInfiniteScroll;