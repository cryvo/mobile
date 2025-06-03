import { useState } from 'react'
import fetcher from '../utils/fetcher'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { TextInput } from '../components/Form'
import Button from '../components/Button'

export default function OptionsPage() {
  const [S, setS]         = useState('50000')
  const [K, setK]         = useState('51000')
  const [T, setT]         = useState('30')
  const [r, setR]         = useState('1.5')
  const [sigma, setSigma] = useState('60')
  const [type, setType]   = useState<'call'|'put'>('call')
  const [premium, setPremium] = useState<number|null>(null)

  const calculate = async () => {
    const res = await fetcher(`/options/price?S=${S}&K=${K}&T=${T}&r=${r}&sigma=${sigma}&type=${type}`)
    setPremium(res.premium)
  }

  return (
    <>
      <PageHeader title="Options Pricing" />
      <div className="p-6 max-w-lg mx-auto space-y-4">
        <Card className="space-y-2">
          <div>
            <label>Underlying Price (S)</label>
            <TextInput value={S} onChange={e=>setS(e.target.value)} />
          </div>
          <div>
            <label>Strike Price (K)</label>
            <TextInput value={K} onChange={e=>setK(e.target.value)} />
          </div>
          <div>
            <label>Time to Expiry (Days)</label>
            <TextInput value={T} onChange={e=>setT(e.target.value)} />
          </div>
          <div>
            <label>Risk-Free Rate (%)</label>
            <TextInput value={r} onChange={e=>setR(e.target.value)} />
          </div>
          <div>
            <label>Volatility (%)</label>
            <TextInput value={sigma} onChange={e=>setSigma(e.target.value)} />
          </div>
          <div>
            <label>Type</label>
            <select
              value={type}
              onChange={e=>setType(e.target.value as 'call'|'put')}
              className="mt-1 block w-full border-gray-300 rounded p-2"
            >
              <option value="call">Call</option>
              <option value="put">Put</option>
            </select>
          </div>
          <Button onClick={calculate}>Calculate Premium</Button>
        </Card>

        {premium !== null && (
          <Card>
            <p className="text-lg">
              Option Premium: <strong>{premium}</strong>
            </p>
          </Card>
        )}
      </div>
    </>
  )
}
