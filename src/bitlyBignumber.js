import math from 'mathjs';
import BigNumber from 'bignumber.js';

BigNumber.config({ DECIMAL_PLACES: 10 });

export const cvt2BigNumber = (num) => {
    if (typeof(num) == 'string') {
        return BigNumber(num);
    }

    return BigNumber(num.toString());
};

export const sum = (a, b) => {
    a = cvt2BigNumber(a);
    b = cvt2BigNumber(b);
    return a.plus(b);
};

export const subtract = (a, b) => {
    a = cvt2BigNumber(a);
    b = cvt2BigNumber(b);
    return a.minus(b);
};

export const multiply = (a, b) => {
    a = cvt2BigNumber(a);
    b = cvt2BigNumber(b);
    return a.multipliedBy(b);
};

export const divide = (a, b) => {
    a = cvt2BigNumber(a);
    b = cvt2BigNumber(b);
    return a.dividedBy(b);
};

export const pow = (x, n) => {
    x = cvt2BigNumber(x);
    n = cvt2BigNumber(n);
    return x.pow(n);
};

export const shift = (x, n) => {
    x = cvt2BigNumber(x);
    return x.shiftedBy(n);
};

export const toFixed = (x, decimal=0) => {
    x = cvt2BigNumber(x);
    return cvt2BigNumber(x.toFixed(decimal));
};

export const point2Price = (point) => {
    if (point == undefined || point == -8388608) {
        return cvt2BigNumber(0);
    }
    return cvt2BigNumber(math.pow(1.0001, point));
    // point = cvt2BigNumber(point);
    // return pow(1.0001, point);
};

export const price2Point = (price) => {
    if (!price) {
        return undefined;
    }
    price = cvt2BigNumber(price);
    return toFixed(divide(math.log(price.toNumber()), math.log(1.0001)));
};

export const toActualBalance = (plainBalance, decimals) => {
    return shift(plainBalance, -decimals);
};

export const toPlainBalance = (actualBalance, decimals) => {
    return toFixed(shift(actualBalance, decimals));
};

export const eq = (x, y) => {
    x = cvt2BigNumber(x);
    y = cvt2BigNumber(y);
    return x.eq(y);
};

export const notEq = (x, y) => {
    x = cvt2BigNumber(x);
    y = cvt2BigNumber(y);
    return !x.eq(y);
};

export const gt = (x, y) => {
    x = cvt2BigNumber(x);
    y = cvt2BigNumber(y);
    return x.gt(y);
};

export const gte = (x, y) => {
    x = cvt2BigNumber(x);
    y = cvt2BigNumber(y);
    return x.gte(y);
};

export const lt = (x, y) => {
    x = cvt2BigNumber(x);
    y = cvt2BigNumber(y);
    return x.lt(y);
};

export const lte = (x, y) => {
    x = cvt2BigNumber(x);
    y = cvt2BigNumber(y);
    return x.lte(y);
};