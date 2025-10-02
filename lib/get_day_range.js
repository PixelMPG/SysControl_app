function getDayRange() {
    const now = new Date();


    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);


    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1000);

    return {
        date_ini: Math.floor(start.getTime() / 1000),
        date_fin: Math.floor(end.getTime() / 1000),
    };
}


// get_day_range.js
function getLast24Hours() {
    const now = Math.floor(Date.now() / 1000);
    return {
        date_ini: now - 24 * 60 * 60,
        date_fin: now, 
    };
}

export default getDayRange;


