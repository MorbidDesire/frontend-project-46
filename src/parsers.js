import yaml from 'js-yaml';

const parser = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (data, typeOfFile) => parser[typeOfFile](data);
