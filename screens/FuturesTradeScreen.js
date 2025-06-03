import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { TextInput, Select } from '../components/Form'
import Button from '../components/Button'
import Toast from '../components/Toast'

interface Profile {
  name: string
  email: string
  phone: string
  language: string
  currency: string
  kycStatus: 'pending' | 'approved' | 'rejected'
}

const languages = ['en','es','ar','zh']
const currencies = ['USD','EUR','AED','BTC','ETH']

export default function ProfilePage() {
  const { data, mutate, error } = useSWR<Profile>('/user/profile', fetcher)
  const [form, setForm] = useState<Profile>()
  const [toast, setToast] = useState<{ message: string; type?: 'success'|'error' }|null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  const save = async () => {
    if (!form) return
    setLoading(true)
    try {
      await fetcher('/user/profile', {
        method:'PUT',
        body: JSON.stringify(form)
      })
      setToast({ message:'Profile updated!', type:'success' })
      mutate()
    } catch {
      setToast({ message:'Error saving profile', type:'error' })
    } finally {
      setLoading(false)
    }
  }

  if (error) return <p className="text-red-600 p-6">Failed to load profile.</p>
  if (!form) return <p className="p-6">Loading…</p>

  return (
    <>
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}
      <PageHeader title="My Profile" />
      <div className="p-6 space-y-6">
        <Card className="max-w-xl mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <TextInput
              value={form.name}
              onChange={e=>setForm({...form!,name:e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <TextInput
              type="email"
              value={form.email}
              onChange={e=>setForm({...form!,email:e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <TextInput
              type="tel"
              value={form.phone}
              onChange={e=>setForm({...form!,phone:e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Language</label>
              <Select
                value={form.language}
                onChange={e=>setForm({...form!,language:e.target.value})}
              >
                {languages.map(l=>(
                  <option key={l} value={l}>{l}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium">Currency</label>
              <Select
                value={form.currency}
                onChange={e=>setForm({...form!,currency:e.target.value})}
              >
                {currencies.map(c=>(
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <p className="text-sm">
              KYC Status: 
              <span className={
                form.kycStatus==='approved' ? 'text-green-600' :
                form.kycStatus==='pending'  ? 'text-yellow-600' :
                'text-red-600'
              }>
                {form.kycStatus.toUpperCase()}
              </span>
            </p>
            {form.kycStatus==='rejected' && (
              <p className="text-sm text-red-600">Your documents were rejected. Please re-upload.</p>
            )}
            {(form.kycStatus==='pending' || form.kycStatus==='rejected') && (
              <Button onClick={()=>{/* navigate to KYC upload page */}} className="mt-2">
                Upload Documents
              </Button>
            )}
          </div>
          <Button onClick={save} disabled={loading}>
            {loading ? 'Saving…' : 'Save Profile'}
          </Button>
        </Card>
      </div>
    </>
  )
}
