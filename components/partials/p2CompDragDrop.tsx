import styles from "../../styles/DnD.module.scss"
import {useDrag, useDrop} from 'react-dnd';
import React, {ReactNode, useEffect, useState} from "react";
import {ItemTypes} from "../const/p2Constant";

const CompDragDrop = ({id, index, moveContentZero, someDragging, setsomeDragging,content,itemType,style}: {
    id: string,
    index: number,
    moveContentZero: Function,
    someDragging: boolean,
    setsomeDragging: Function,
    content: ReactNode
    itemType: string
    style: {[key:string]:string}
}) => {
    const [{isDragging}, dragRef, previewRef] = useDrag(
        () => ({
            type: itemType,
            item: {id, index},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),//isDragging 변수가 현재 드래깅중인지 아닌지를 리턴해주는 부분.
            }),
            end: (item, monitor) => { //드래그가 끝났을때 작동하는 부분.
                const {id: originId, index: originIndex} = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {//didDrop이 !(아니다)라는 것은 dropRef로 선언한 태그위에 드랍되지 않음 을 의미한다.
                    //그때는 원래의 위치대로 이동.
                    moveContentZero(originId, originIndex);
                    //moveNemo는 변경할 네모의 id와 변경될 index를 주면 순서를 바꾸어주는 함수다.
                    //네모들의 state가 상위 컴포넌트인 page에 선언되어있기 때문에 page에 선언되어 있다.
                }
            },
        }),
        [id, index, moveContentZero]
    );
    const [, dropLeft] = useDrop(
        () => ({
            accept: itemType,
            canDrop: () => false,
            hover({id: draggedId, index: orgIndex}: { id: string, index: number }) {
                console.log('left,draggedId,id');
                if (draggedId !== id) {
                    moveContentZero(draggedId, index);
                }
            },
        }),
        [moveContentZero]
    );
    const [, dropRight] = useDrop(
        () => ({
            accept: ItemTypes.ContentS,
            canDrop: () => false,
            hover({id: draggedId, index: orgIndex}: {id :string, index: number}) {
                console.log('right,draggedId,id');
                if (draggedId !== id) {
                    orgIndex !== index + 1 && moveContentZero(draggedId, index + 1);
                }
            },
        }),
        [moveContentZero]
    );
    useEffect(() => {
        isDragging ? setsomeDragging(true) : setsomeDragging(false);
    }, [isDragging, setsomeDragging]);
    //이 부분은 두가지 dropRef 네모를 가리게되면서 드래깅될때만 dropRef의 z-index가 최상위로 올라와 기능을 하고
    //평소에는 맨뒤로 내려가 네모안의 비디오를 클릭할수있게 상위컴포넌트에서 someDragging이라는 변수를 만들었다.
    const new_style = Object.assign({},style, {'opacity': isDragging ? '0.3' : '1',});

    return (
        <div ref={previewRef} style={new_style} //previewRef  처음에는 프리뷰와 dropRef 이곳에 지정했다.
            >
            <div ref={dragRef}>
                {content}
            </div>
            <div className={`${styles.drop} ${styles.right}`}
                ref={dropLeft}
                // className={`${styles.drop} ${styles.left}`}
                style={{zIndex: someDragging ? 30 : 0}}
            />
            <div className={`${styles.drop} ${styles.right}`}
                ref={dropRight}
                // className={`${styles.drop} ${styles.right}`}
                style={{zIndex: someDragging ? 30 : 0}}
            />
        </div>
    );
}

export default CompDragDrop
