import type { ThemeConfig } from 'antd'

export const asuTheme: ThemeConfig = {
  token: {
    colorPrimary: '#8C1D40',
    colorInfo: '#8C1D40',
    colorWarning: '#FFC627',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#191919',
    borderRadius: 0,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 24,
      borderRadiusLG: 24,
      borderRadiusSM: 24,
    },
    Input: {
      borderRadius: 24,
      borderRadiusLG: 24,
    },
    Card: {
      borderRadiusLG: 0,
      boxShadowTertiary: 'none',
    },
    Select: {
      borderRadius: 24,
    },
  },
}
