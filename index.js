const fs = require('fs');
const path = require('path');
const lqip = require('lqip');

const Readable = require('stream').Readable;

const blackList = ['node_modules'];

const imgSuffixs = ['png', 'jpg', 'jpeg', 'webp'];

function getAllImgs(pathUrl) {
  const files = fs.readdirSync(pathUrl);

  for (const file of files) {
    
    if (!blackList.includes(file) && fs.statSync(path.join(pathUrl, file)).isDirectory()) {
      getAllImgs(path.join(pathUrl, file));
    }

    const fileNameArr = file.split('.');

    if (imgSuffixs.includes(fileNameArr[fileNameArr.length - 1])) {

      fileNameArr[fileNameArr.length - 2] = fileNameArr[fileNameArr.length - 2] + '_preview';
      fileNameArr[fileNameArr.length - 1] = fileNameArr[fileNameArr.length - 1];  // 如果压缩后是png格式，可能会出现压缩失败。甚至是反向压缩，文件大小变大

      const newFileName = fileNameArr.join('.');

      lqip.base64(path.join(pathUrl, file))
        .then(res => {
          // base64只需要取内容部分，不需要前面的描述
          res = res.split(',')[1];

          // 创建可读流，并将base64转换城的Bugger传递给可写流
          const imgBuffer = Buffer.from(res, 'base64');

          const s = new Readable();

          s.push(imgBuffer);
          s.push(null);

          s.pipe(fs.createWriteStream(path.join(pathUrl, newFileName)))
        })
    }
  }
}

getAllImgs(__dirname);