import { createTheme, ThemeProvider } from '@mui/material/styles'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } })
export const theme = createTheme({
  palette: {
    jet: createColor('#333333'),
  },
})
