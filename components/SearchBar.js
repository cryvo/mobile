import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import Accordion from './Accordion'

export default function GeneralFAQ() {
  const { data: groups=[] } = useSWR('/admin/settings/general-faq', fetcher)
  return groups.map((g:any,i:number)=>(
    <Accordion key={i} title={g.category}>
      {g.items.map((item:any,j:number)=>(
        <div key={j} className="mb-2">
          <p className="font-medium">{item.q}</p>
          <p>{item.a}</p>
        </div>
      ))}
    </Accordion>
  ))
}
