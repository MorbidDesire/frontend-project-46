import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatedData = (mainData, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(mainData);
    case 'json':
      return json(mainData);
    default:
      return stylish(mainData);
  }
};
export default formatedData;

// const gendiff = (formatter, filepath1, filepath2) => {
//   switch (formatter) {
//     case 'plain':
//       return genDiff(filepath1, filepath2, plain);
//     case 'json':
//       return genDiff(filepath1, filepath2, json);
//     default:
//       return genDiff(filepath1, filepath2, stylish);
//   }
// };
// export default gendiff;
