export function getProviderColor(value: string): string {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = ((hash << 5) - hash) + value.charCodeAt(i);
        hash |= 0;
    }
    const hue = Math.abs(hash) % 360;
    const saturation = 70;
    const lightness = 50;
    return `${hue}, ${saturation}%, ${lightness}%`;
}
