export function formatDate(dateString) {
    if (!dateString) {
        return "No Date";
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed!
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

    return `${day}/${month}/${year}`;
}

export function formatDateTime(datetimeString) {
    if (!datetimeString) {
        return "No Date";
    }
    const date = new Date(datetimeString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed!
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of year
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minute}`;
}
