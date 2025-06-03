import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import BalanceCard from './BalanceCard'
import api from '../utils/api'

export default function AssetCarousel() {
  const [balances, setBalances] = useState([])

  useEffect(() => {
    api.get('/wallet/balances').then(r=>setBalances(r.data))
  }, [])

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {balances.map(b=>(
        <BalanceCard
          key={b.asset}
          asset={b.asset}
          available={b.available}
          icon={{ uri: b.icon_url }}
        />
      ))}
    </ScrollView>
  )
}
