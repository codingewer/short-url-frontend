import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './User/UserSlice'
import BalanceSlice from './Balance/BalanceSlice'
import UrlSlice from './Url/UrlSlice'
import HelpSlice from './Help/HelpSlice'
import ChartSlice from './ChartData/ChartSlice'
import SettingsSlice from './Settings/SettingsSlice'

export default configureStore({
  reducer: {
      users: UserSlice,
      balance : BalanceSlice,
      url: UrlSlice,
      help:HelpSlice,
      chardata: ChartSlice,
      settings: SettingsSlice
  },
})