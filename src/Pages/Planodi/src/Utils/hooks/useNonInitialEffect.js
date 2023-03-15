/* eslint-disable */
import { useEffect, useRef } from 'react';

const useNonInitialEffect = (effect, deps) => {
  const initialRender = useRef(true);
  useEffect(() => {
    let effectReturns = () => {};
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }
    if (effectReturns && typeof effectReturns === 'function') {
      return effectReturns;
    }
  }, deps);
};
export default useNonInitialEffect;
