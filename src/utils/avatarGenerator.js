/**
 * Tạo mã màu dựa trên input
 * Author: pdanh (08/10/2023)
 */
const generateColorByString = (input) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < input.length; i += 1) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
};

/**
 * Lấy chữ cái đầu của tên
 * @param {*} name
 * @returns 2 chứ cái đầu
 * Author: pdanh (08/10/2023)
 */
const getFirstLetterOfName = (name) => {
    const subNames = name.split(" ");
    const firstLetter = subNames[0][0];
    const lastLetter = subNames[subNames.length - 1][0];
    const result = firstLetter + lastLetter;
    return result;
};

export default {
    generateColorByString,
    getFirstLetterOfName,
};
