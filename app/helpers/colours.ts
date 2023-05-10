export const stringToColor = (string = '') => {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = Math.ceil(((hash >> (i * 8)) & 0xff) / 1.4)
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

const DATASET_COLOURS = [
  '#7839EE',
  '#FFB657',
  '#456BDE',
  '#12877E',
  '#F96868',
  '#FFB657',
  '#94c9ff',
  '#006e45',
  '#b37c30',
]

export function getDatasetColour(index: number) {
  return DATASET_COLOURS[index % DATASET_COLOURS.length]
}

// generated with https://coolors.co/gradient-palette/7839ee-ffffff?number=20
const GRADIENT_COLOURS = [
  '#7839EE',
  '#7F43EF',
  '#864EF0',
  '#8D58F1',
  '#9463F2',
  '#9C6DF2',
  '#A378F3',
  '#AA82F4',
  '#B18CF5',
  '#B897F6',
  '#BFA1F7',
  '#C6ACF8',
  '#CDB6F9',
  '#D4C0FA',
  '#DBCBFB',
  '#E3D5FB',
  '#EAE0FC',
  '#F1EAFD',
  '#F8F5FE',
]

export const getGradientValueColor = (
  value: number,
  minValue: number,
  maxValue: number
) => {
  const colourNumer = Math.round(
    ((value - minValue) / maxValue) * (GRADIENT_COLOURS.length - 1)
  )
  return GRADIENT_COLOURS[colourNumer]
}

export const getGradientIndexColor = (index: number) => {
  return GRADIENT_COLOURS[index]
}
