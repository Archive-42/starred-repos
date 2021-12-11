import styled from 'styled-components'
import {
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  space,
  system,
  typography,
} from 'styled-system'

const Box = styled.div`
  box-sizing: border-box;
  ${border};
  ${color};
  ${flexbox};
  ${grid};
  ${layout};
  ${position};
  ${space};
  ${typography};

  ${system({
    boxShadow: true,
    boxSizing: true,
    cursor: true,
    overflowY: true,
    pointerEvents: true,
    textOverflow: true,
    transform: true,
    transition: true,
  })}
`

export default Box
