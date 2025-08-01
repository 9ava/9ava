import type {AppState} from '../store'
import type {Card as CardType} from '../store/commonTypes'
import * as CE from '../store/cardEntities'

import {useCallback, useState, useEffect} from 'react'
import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Div, Avatar} from '../components'

import {Button} from '../theme/daisyui'
import useQueryString from '../hooks/useQueryString'

export default function Card() {
  const location = useLocation()
  const params = useParams() // 라우트 변수
  const navigate = useNavigate()
  //const [search] = useSearchParams() //
  const {from, to} = useQueryString()
  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const [card, setCard] = useState<CardType | null>(null)
  const {cardid} = params
  const cardEntities = useSelector<AppState, CE.State>(({cardEntities}) => cardEntities)

  useEffect(() => {
    if (!cardEntities || !cardid) return
    cardEntities[cardid] && setCard(notUsed => cardEntities[cardid])
  }, [cardEntities, cardid])

  if (!card) {
    return (
      <div className="p-4">
        <p>location: {JSON.stringify(location, null, 2)}</p>
        <p>params: {JSON.stringify(params, null, 2)}</p>
        <p>cardid: {params['cardid']}</p>
        <p>
          {/* from: {search.get('from')}, to: {search.get('to')} */}
          from: {from}, to: {to}
        </p>
        <p></p>
        <Button className="mt-4 btn-primary btn-xs" onClick={goBack}>
          go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Div src={card.image} className="w-full" minHeight="10rem" height="10rem" />
      <Div className="flex flex-row items-center mt-4">
        <Avatar src={card.writer.avatar} size="2rem" />
        <div className="ml-2">
          <p className="text-xs font-bold">{card.writer.name}</p>
          <p className="text-xs text-gray-500">{card.writer.jobTitle}</p>
        </div>
      </Div>
      <button className="mt-4 btn btn-primary btn-xs" onClick={goBack}>
        go Back
      </button>
    </div>
  )
}
