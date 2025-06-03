import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import api from '../utils/api'

export default function DepthChart({ symbol, style }) {
  const [data, setData] = useState([0,0,0,0])

  useEffect(() => {
    api.get(`/orderbook?symbol=${symbol}`).then(r=>{
      // stub: combine bids & asks volumes
      setData([r.data.bids[0][1], r.data.bids[1][1], r.data.asks[0][1], r.data.asks[1][1]])
    })
  }, [symbol])

  return (
    <AreaChart style={style} data={data} contentInset={{ top:20, bottom:20 }}>
      <Grid/>
    </AreaChart>
  )
}
