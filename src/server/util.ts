export function getSpotType(index: number) {
  if ([0, 4, 10, 20, 30, 38].includes(index % 40)) {
    return 'Special'
  } else if ([12, 28].includes(index % 40)) {
    return 'Utility'
  } else if ([5, 15, 25, 35].includes(index % 40)) {
    return 'Railroad'
  } else if ([2, 7, 17, 22, 33, 36].includes(index % 40)) {
    return 'Drawable'
  } else return 'Property'
}
