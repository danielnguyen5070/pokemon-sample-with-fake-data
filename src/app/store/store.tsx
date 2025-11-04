import { configureStore, isAction } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import pokemonReducer from '@features/pokemon/slices/pokemonSlice'
import pokemonDetailReducer from '@features/pokemon/slices/pokemonDetailSlice'
import createSagaMiddleware from 'redux-saga'
import pokemonSaga from '@features/pokemon/sagas/pokemonDetailSaga'

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (isAction(action))
    console.log('🔹 Dispatching:', action.type)
  const result = next(action)
  console.log('🔸 Next state:', storeAPI.getState())
  return result
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonDetail: pokemonDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, loggerMiddleware),
})

sagaMiddleware.run(pokemonSaga)

// ✅ Type definitions for hooks and components
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
