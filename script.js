
// script.js
const updateTime = () => {
    const d = new Date();

    document.getElementById('usa').innerHTML = `USA (PST): ${d.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`;
    document.getElementById('nigeria').innerHTML = `Nigeria (NGA): ${d.toLocaleString("en-US", { timeZone: "Africa/Lagos" })}`;
    document.getElementById('china').innerHTML = `China (CST): ${d.toLocaleString("en-US", { timeZone: "Asia/Shanghai" })}`;
    document.getElementById('london').innerHTML = `London (GMT): ${d.toLocaleString("en-US", { timeZone: "Europe/London" })}`;
    document.getElementById('japan').innerHTML = `Japan (JST): ${d.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })}`;
};

setInterval(updateTime, 1000);
updateTime(); // Initial call to display time immediately

