import months from '../constants/months';

const getDate = timestamp => {
    const d = new Date(timestamp);
    return { date: d.getDate(), month: months[d.getMonth()], year: d.getFullYear() };
};

export default getDate;
