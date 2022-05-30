// core module
const fs = require('fs');
const path = require('path');

module.exports = (userName, idCardFront, idCardBack) => {
    const photoFolderPath = path.join(__dirname, `../../public/img/users/${userName}/`);

    const idCardFrontOldPath = idCardFront.filepath;
    const idCardFrontNewPath = photoFolderPath + 'idCardFront.png';

    const idCardBackOldPath = idCardBack.filepath;
    const idCardBackNewPath = photoFolderPath + 'idCardBack.png';

    fs.mkdir(photoFolderPath, () => {
        fs.rename(idCardFrontOldPath, idCardFrontNewPath, (error) => {
            if (error) {
                console.log('Lưu ảnh mặt trước của CMND thất bại: ' + error);
            }

            console.log('Lưu ảnh mặt trước của CMND thành công');
        });

        fs.rename(idCardBackOldPath, idCardBackNewPath, (error) => {
            if (error) {
                console.log('Lưu ảnh mặt sau của CMND thất bại: ' + error);
            }

            console.log('Lưu ảnh mặt sau của CMND thành công');
        });
    });

    return ['idCardFront.png', 'idCardBack.png'];
}