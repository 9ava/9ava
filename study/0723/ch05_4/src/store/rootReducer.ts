import {combineReducers} from 'redux'
import * as listEntities from './listEntities'
import * as cardEntities from './cardEntities'
import * as listidCardidOrders from './listidCardidOrders'
import * as listidOrders from './listidOrders'

export const rootReducer = combineReducers({
  listEntities: listEntities.reducer,
  cardEntities: cardEntities.reducer,
  listidCardidOrders: listidCardidOrders.reducer,
  listidOrders: listidOrders.reducer
})
