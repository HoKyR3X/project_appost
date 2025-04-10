import { useDispatch, useSelector } from 'react-redux'
import type { RootState, RootDispatch } from './store'

export const useRootDispatch = useDispatch.withTypes<RootDispatch>()
export const useRootSelector = useSelector.withTypes<RootState>()