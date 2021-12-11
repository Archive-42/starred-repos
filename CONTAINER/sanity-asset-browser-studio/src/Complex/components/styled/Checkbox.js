import styled from 'styled-components'
import css from '@styled-system/css'
import { space } from 'styled-system'

const Checkbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  appearance: none;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid;
  opacity: 0.75;
  cursor: pointer;

  ${css({
    borderColor: 'darkerGray',
  })}

  &:disabled {
    opacity: 0.25;
  }

  &:focus {
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }

  :checked {
    opacity: 1;
    ${css({
      bg: 'black',
      borderColor: 'black',
    })}
  }

  ${space};
`

export default Checkbox
