
export function coords2map(coords) {
    return [ coords[0], -coords[1] ]
}

export function heading2angle(heading) {
    return 30 * heading;
}
