import React from 'react'
import styled from 'styled-components'
import Box from '../styled/Box'

const Container = styled(Box)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => `${100 / props.aspectRatio}%`};
`

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const ResponsiveBox = props => {
  const { children } = props

  return (
    <Container {...props}>
      <Content>{children}</Content>
    </Container>
  )
}

export default ResponsiveBox
