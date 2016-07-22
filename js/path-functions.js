const mngaGetParent = (mypath) => {
  return path.parse(mypath).dir;
};

const mngaGetName = (mypath) => {
  return path.parse(mypath).base;
};

const mngaGetExt = (mypath) => {
  return path.parse(mypath).ext;
};

const mngaGetNameWithoutExt = (mypath) => {
  return path.parse(mypath).name;
};
