const fs = require('fs');
const path = require('path');
const images = require('images');

const blackList = ['node_modules'];
const imgSuffixs = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

const quality = process.argv[2] ? process.argv[2] : 30;

console.log(quality);

function getAllImgs(pathUrl) {
  const files = fs.readdirSync(pathUrl);

  for (const file of files) {
    
    if (!blackList.includes(file) && fs.statSync(path.join(pathUrl, file)).isDirectory()) {
      getAllImgs(path.join(pathUrl, file));
    }

    const fileNameArr = file.split('.');

    if (imgSuffixs.includes(fileNameArr[fileNameArr.length - 1])) {

      fileNameArr[fileNameArr.length - 2] = fileNameArr[fileNameArr.length - 2] + '_preview';
      fileNameArr[fileNameArr.length - 1] = 'jpg';  // 如果压缩后是png格式，可能会出现压缩失败。甚至是反向压缩，文件大小变大

      const newFileName = fileNameArr.join('.');

      images(path.join(pathUrl, file))
      .save(path.join(pathUrl, newFileName), {
        quality   
      })
    }
  }
}

getAllImgs(__dirname);