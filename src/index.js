import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const extname1 = path.extname(filepath1);
  const extname2 = path.extname(filepath2);

  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');

  if (data1.length === 0 || data2.length === 0) {
    return undefined;
  }

  const dataParsed1 = parser(data1, extname1);
  const dataParsed2 = parser(data2, extname2);

  if (dataParsed1 === undefined || dataParsed2 === undefined) {
    return undefined;
  }

  const iterFunction = (obj1, obj2) => {
    const sortedKeys = Object.keys({ ...obj1, ...obj2 }).sort();
    const filteredData = sortedKeys.reduce((acc, key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        acc[`  ${key}`] = iterFunction(obj1[key], obj2[key]);
        return acc;
      }
      if (obj1[key] === obj2[key]) {
        acc[`  ${key}`] = obj2[key];
        return acc;
      }
      if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
        acc[`- ${key}`] = obj1[key];
        return acc;
      }
      if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        acc[`+ ${key}`] = obj2[key];
        return acc;
      }
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
      return acc;
    }, {});
    return filteredData;
  };
  return iterFunction(dataParsed1, dataParsed2);
};

export default genDiff;

//   if (dataParsed1[key] === dataParsed2[key]) {
//     acc.push(`  ${key}: ${dataParsed1[key]}`);
//     return acc;
//   }
//   if (dataParsed1.hasOwnProperty(key) && !dataParsed2.hasOwnProperty(key)) {
//     acc.push(`- ${key}: ${dataParsed1[key]}`);
//     return acc;
//   }
//   if (dataParsed2.hasOwnProperty(key) && !dataParsed1.hasOwnProperty(key)) {
//     acc.push(`+ ${key}: ${dataParsed2[key]}`);
//     return acc;
//   }
//   acc.push(`- ${key}: ${dataParsed1[key]}`);
//   acc.push(`+ ${key}: ${dataParsed2[key]}`);
//   return acc;
// }, {});
// return filteredData;

// const sortedKeys = Object.keys({ ...dataParsed1, ...dataParsed2 }).sort();
// console.log(sortedKeys);

// const filteredData = sortedKeys.reduce((acc, key) => {
//   if (dataParsed1[key] === dataParsed2[key]) {
//     acc[`  ${key}`] = dataParsed1[key];
//     return acc;
//   }
//   if (Object.hasOwn(dataParsed1, key) && !Object.hasOwn(dataParsed2, key)) {
//     acc[`- ${key}`] = dataParsed1[key];
//     return acc;
//   }
//   if (Object.hasOwn(dataParsed2, key) && !Object.hasOwn(dataParsed1, key)) {
//     acc[`+ ${key}`] = dataParsed2[key];
//     return acc;
//   }
//   acc[`- ${key}`] = dataParsed1[key];
//   acc[`+ ${key}`] = dataParsed2[key];
//   return acc;
// }, {});

// return filteredData;
// };
