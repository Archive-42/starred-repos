const HEADER_HEIGHT_SMALL = '10.75rem'
const HEADER_HEIGHT_LARGE = '17.5rem'

const sizes = []
sizes.headerHeightLarge = HEADER_HEIGHT_LARGE
sizes.headerHeightSmall = HEADER_HEIGHT_SMALL

const space = ['0.0rem', '0.3rem', '0.6rem', '1.2rem', '2.4rem', '4.8rem']
space.headerHeightLarge = HEADER_HEIGHT_LARGE
space.headerHeightSmall = HEADER_HEIGHT_SMALL

export default {
  // Remember that em units in media queries are always relative to 16px / the user setting
  // and NOT the html font size!
  breakpoints: ['50em', '90em'],
  colors: {
    white: '#ffffff',
    lighterGray: '#eee',
    lightGray: '#ccc',
    gray: '#999',
    darkGray: '#555',
    darkerGray: '#222',
    black: '#000',
    blackOverlay: 'rgba(0, 0, 0, 0.6)',
    red: '#e66666',
  },
  // Perfect fourth / 1.333
  fontSizes: ['0.563rem', '0.75rem', '1.0rem', '1.333rem'],
  sizes,
  space,
  zIndices: {
    header: 1,
  },
}
