
export function coords2map(coords) {
    return [ 5*coords[0], -5*coords[1] ]
}

export function heading2angle(heading) {
    return 30 * heading;
}
