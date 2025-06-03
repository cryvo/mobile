import React from 'react'
import { View, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

export default function TradingViewChart({ symbol, style }) {
  const html = `
    <html><head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head><body>
      <div id="tv_chart"></div>
      <script src="https://s3.tradingview.com/tv.js"></script>
      <script>
        new TradingView.widget({
          container_id: "tv_chart",
          width: "100%", height: "100%",
          symbol: "${symbol.replace('/','')}",
          interval: "60",
          toolbar_bg: "#f1f3f6",
          theme: "Light"
        })
      </script>
    </body></html>`
  return <WebView originWhitelist={['*']} source={{ html }} style={style} />
}
