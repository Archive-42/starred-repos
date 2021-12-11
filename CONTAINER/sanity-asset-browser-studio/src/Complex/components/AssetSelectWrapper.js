import React from 'react'
import { withDocument } from 'part:@sanity/form-builder'
import { ThemeProvider } from 'styled-components'
import theme from '../styled/theme'
import AssetSelect from './AssetSelect'

class AssetSelectWrapper extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AssetSelect {...this.props} />
      </ThemeProvider>
    )
  }
}

export default withDocument(AssetSelectWrapper)
