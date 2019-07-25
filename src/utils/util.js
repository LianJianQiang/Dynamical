export const getDomRect = (dom) => {
    if (!dom) return {};
    return dom.getBoundingClientRect();
}

export const isNumZhEn = (value) => {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
    return reg.test(value);
}
export const isNumber = (value) => {
    let reg = /^[0-9]+([.][0-9]+)?$/;
    return reg.test(value);
}

/**
 * 验证数字是否符合规范
 * @param {str | num} value
 * @param {obj} rule { max：最大值, min：最小值, isInt：是否要求输入整数，maxLen：最大长度，minLen：最小长度 }
 */
export const validateNum = (value, rule = {}) => {
    let { max, min, isInt = false, maxLen, minLen } = rule;

    if (!isNumber(value)) return '请输入数字';

    value = Number(value);
    if (max && value > max) return `数值不能大于${max}`;
    if (min && value < min) return `数值不能小于${min}`;
    if (isInt && !Number.isInteger(value)) return `请输入整数`;
    if (maxLen && value.length > maxLen) return `数值长度不能大于${maxLen}`;
    if (minLen && value.length < minLen) return `数值长度不能小于于${maxLen};`
}

export const validateField = (rules) => (rule, value, cb) => {
    let result = validateNum(value, rules[rule.field]);

    if (result) {
        cb(new Error(result));
    }
    cb();
};

export const isNull = (value) => {
    if (!value && typeof (value) !== 'undefined' && value !== 0) return true;
    return false;
}

export const isUndefined = (value) => {
    if (typeof (value) === "undefined") return true;
    return false;
}


export const isNil = (value) => {
    if (isNull(value) || isUndefined(value)) return true;
    return false;
}

export default {
    isNumber,
    isNumZhEn,
    validateNum,
    isNull,
    isUndefined,
    isNil,
    validateField
}
