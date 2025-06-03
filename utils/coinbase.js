import Layout from '../../components/Layout'
import { getCoinbaseAccounts, createCoinbaseCharge } from '../../utils/coinbase'
import useSWR from 'swr'
import { useState } from 'react'

export default function CoinbaseDeposit() {
  const { data: accounts=[] } = useSWR('/coinbase/accounts', getCoinbaseAccounts)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')

  const deposit = async () => {
    const charge = await createCoinbaseCharge(parseFloat(amount), currency)
    window.location.href = charge.data.hosted_url
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Coinbase Deposit</h1>
        <select
          className="border rounded px-3 py-2 w-full mb-4"
          value={currency}
          onChange={e=>setCurrency(e.target.value)}
        >
          {accounts.map((a:any)=><option key={a.id}>{a.currency}</option>)}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e=>setAmount(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <button
          onClick={deposit}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Pay with Coinbase
        </button>
      </div>
    </Layout>
  )
}
