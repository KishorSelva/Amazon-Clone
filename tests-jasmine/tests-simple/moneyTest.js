import formatCurrency from "../../scripts/utils/money.js";

console.log('test suite: format currency')

console.log("Converts cents into dollars")
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('fail');
}

console.log('works with 0')
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed')
}

console.log('rounds up to the nearest cent')
if (formatCurrency(2000.6) === '20.01') {
    console.log("passed")
} else {
    console.log('failed')
}