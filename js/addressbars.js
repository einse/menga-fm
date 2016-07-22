let upbuttonleft = document.getElementById('upbuttonleft');
let upbuttonright = document.getElementById('upbuttonright');

upbuttonleft.onclick = (e) => {
  prevDirLeft = dirLeft;
  backbuttonleft.setAttribute('style', '-webkit-filter:opacity(1.0)');
  dirLeft = mngaGetParent(dirLeft);
  mngaUpdate(dirLeft, 1);
};

upbuttonright.onclick = (e) => {
  prevDirRight = dirRight;
  backbuttonright.setAttribute('style', '-webkit-filter:opacity(1.0)');
  dirRight = mngaGetParent(dirRight);
  mngaUpdate(dirRight, 2);
};

let addrleft = document.getElementById('pathfieldleft');
let addrright = document.getElementById('pathfieldright');

addrleft.onchange = (e) => {
  console.log('new path on left');
};

addrright.onchange = (e) => {
  console.log('new path on right');
};

let backbuttonleft = document.getElementById('backbuttonleft');
let backbuttonright = document.getElementById('backbuttonright');

backbuttonleft.onclick = (e) => {
  if (prevDirLeft !== '') {
    dirLeft = prevDirLeft;
    mngaUpdate(dirLeft, 1);
    prevDirLeft = '';
    backbuttonleft.setAttribute('style', '-webkit-filter:opacity(0.5)');
  }
};

backbuttonright.onclick = (e) => {
  if (prevDirRight !== '') {
    dirRight = prevDirRight;
    mngaUpdate(dirRight, 2);
    prevDirRight = '';
    backbuttonright.setAttribute('style', '-webkit-filter:opacity(0.5)');
  }
};
