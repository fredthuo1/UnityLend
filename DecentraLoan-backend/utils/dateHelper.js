// utils/dateHelper.js

const moment = require('moment');

exports.formatDate = (date, format = 'YYYY-MM-DD') => {
    return moment(date).format(format);
};
