import { useRef } from 'react';

//hook
function useMoveScrool(blockMove:any='start') {
  const element = useRef<HTMLDivElement>(null);
  const onMoveToElement = () => {
      element.current?.scrollIntoView({ behavior: 'smooth', block: blockMove});
  };
  return [element, onMoveToElement];
}

export default useMoveScrool;