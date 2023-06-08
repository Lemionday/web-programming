export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function FormatDateToString(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`
}

export function MstoDays(length: number): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return length / msInDay;
}

export function daysBetweenDate(to: Date, from: Date): number {
    const unixDiffTime = to.getTime() - from.getTime();
    return Math.floor(MstoDays(unixDiffTime));
}

