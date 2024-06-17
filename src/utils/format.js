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
