import { configureStore } from '@reduxjs/toolkit'
import resumeDataSlice from './resumeDataSlice'

export default configureStore({
  reducer: {
    dataStore: resumeDataSlice
  }
})