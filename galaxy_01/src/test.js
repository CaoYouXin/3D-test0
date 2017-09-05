import { globals, setBack } from './base';

let { w2, h2 } = globals;

export const mod = () => {
  w2 = 12;
  h2 = 21;

  setBack({ w2, h2 });
};