import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { goToCheckout } from '../../lib/checkout';
const fetcher = (url)=> fetch(url).then(r=>r.json());
export default function ProductPage(){
  const router = useRouter(); const { id } = router.query;
  const { data: product } = useSWR(id ? `/api/products/${id}` : null, fetcher);
  const [qty, setQty] = useState(1);
  if(!product) return <div className='container mx-auto py-8'>Loading...</div>;
  return (<div className='container mx-auto py-8'>
    <div className='grid md:grid-cols-2 gap-8'>
      <div><img src={product.image||'/placeholder.jpg'} alt={product.name} className='w-full rounded-xl' /></div>
      <div>
        <h1 className='text-2xl font-bold'>{product.name}</h1>
        <p className='mt-4 text-gray-600'>{product.description}</p>
        <div className='mt-6'><div className='text-2xl font-semibold'>${product.price}</div>
          <div className='mt-4 flex items-center gap-2'><label>Qty</label><input type='number' min='1' value={qty} onChange={e=>setQty(Number(e.target.value))} className='w-20 p-2 border rounded'/></div>
          <div className='mt-6'><button className='btn btn-primary' onClick={()=> goToCheckout([{ id: product.id, name: product.name, price: product.price, quantity: qty }])}>Buy now</button></div>
        </div>
      </div>
    </div>
  </div>)
}
