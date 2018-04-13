
export function coords2map(coords) {
    return [ 50*coords[0], -50*coords[1] ]
}

export function heading2angle(heading) {
    return 30 * heading;
}
