// the mongo date time 
const getDateTime = () => {
    let date = new Date();

    const month = date.getMonth();
    let realMonth = '';
    if (month < 10) {
        realMonth = `0${month}`
    } else {
        realMonth = month;
    }

    const day = date.getDay();
    let realDay = '';
    if (day < 10) {
        realDay = `0${day}`
    } else {
        realDay = day;
    }

    const minutes = date.getMinutes()
    let realMin = '';
    if (minutes < 10) {
        realMin = `0${minutes}`
    } else {
        realMin = minutes;
    }

    const hours = date.getHours();
    let realHrs = '';
    if (hours < 10) {
        realHrs = `0${hours}`
    } else {
        realHrs = hours;
    }

    const result = `${date.getFullYear()}-${realMonth}-${realDay}T${realHrs}:${realMin}:${date.getSeconds()}.${date.getMilliseconds()}Z`;

    return result;
}

export default getDateTime;