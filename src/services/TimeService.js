const combineDateTime = (dateString, date) => {
    const date2 = new Date(dateString);
    const combinedDateTime = new Date(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    );
    return combinedDateTime;
}

const addHour = (date, hour) => {
    date.setHours(date.getHours() + hour);
    return date;
}

module.exports = {
    combineDateTime,
    addHour
}