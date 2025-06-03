import { DefaultTheme, DarkTheme } from '@react-navigation/native'

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'linear-gradient(90deg,#7C3AED 0%,#38BDF8 100%)',
    text: '#000',
  }
}

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#141517',
    text: '#fff',
  }
}
