const SCALE = 5;

export function scaled(length) { return SCALE * length; }

export function coords2map(coords) {
    return [ SCALE*coords[0], -SCALE*coords[1] ]
}

export function heading2angle(heading) {
    return 30 * heading;
}
