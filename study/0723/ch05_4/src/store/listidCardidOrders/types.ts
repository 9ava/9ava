import type {Action} from 'redux'
import * as CT from '../commonTypes'

export type State = Record<CT.UUID, CT.UUID[]>

export type SetListidCardids = Action<'@listidCardids/set'> & {
  payload: {listid: CT.UUID; cardids: CT.UUID[]}
}

export type RemoveListidAction = Action<'@listidCardids/remove'> & {
  payload: CT.UUID
}

export type PrependCardidToListidAction = Action<'@listidCardids/prependCardid'> & {
  payload: CT.ListidCardid
}

export type AppendCardidToListidAction = Action<'@listidCardids/appendCardid'> & {
  payload: CT.ListidCardid
}

export type RemoveCardidFromListidAction = Action<'@listidCardids/removeCardid'> & {
  payload: CT.ListidCardid
}
export type Actions =
  | SetListidCardids
  | RemoveListidAction
  | PrependCardidToListidAction
  | AppendCardidToListidAction
  | RemoveCardidFromListidAction
