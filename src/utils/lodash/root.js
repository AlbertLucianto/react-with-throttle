/* eslint-disable */
import freeGlobal from './freeGlobal';

const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self;

const root = freeGlobal || freeSelf || Function('return this')();

export default root;
