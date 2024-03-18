import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './User/UserSlice'
import BalanceSlice from './Balance/BalanceSlice'
import UrlSlice from './Url/UrlSlice'
import HelpSlice from './Help/HelpSlice'
import ChartSlice from './ChartData/ChartSlice'
import SettingsSlice from './Settings/SettingsSlice'
import FaqSlice from './Faq/FaqSlice'
import FileSlice from './File/FileSlice'
import BankInfoSlice from './Balance/BankInfoSlice'
import PaparaSlice from './Balance/PaparaSlice'
import UrlFaqSlice from './Faq/UrlFaqSlice'

export default configureStore({
  reducer: {
      users: UserSlice,
      balance : BalanceSlice,
      url: UrlSlice,
      help:HelpSlice,
      chardata: ChartSlice,
      settings: SettingsSlice,
      faqs:FaqSlice,
      urlfaqs:UrlFaqSlice,
      file: FileSlice,
      bankinfo:BankInfoSlice,
      papara:PaparaSlice
  },
})