import fs  from 'fs';
import os from 'os';

export const readFile = (path, encoding = 'utf8') => {
  return new Promise((res, rej) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) { rej(err); }
      res(data);
    })
  });
}

export const writeFile = (path, data, encoding = 'utf8') => {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, encoding, (err) => {
      if (err) { rej(err); }
      res(0);
    });
  });
}

export const mkdir = (dir, mode = '0o777') => {
  const options = { recursive: true };
  if(!os.platform() === 'win32') {
    options.mode = mode;
  }
  return new Promise((res, rej) => {
    fs.mkdir(dir, options, (err) => {
      if(err) { rej(err); };
      res(0);
    })
  });
}