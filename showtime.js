// create a nicer look for dates and times

module.exports.showTime = (posttime) => {
    return (posttime = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Etc/GMT-2",
    }).format(posttime));
};
