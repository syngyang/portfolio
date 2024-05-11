import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <div className='flex flex-row'>
        <div className='w-10 h-10 bg-slate-100 rounded-full'></div>
        <div className='w-50 h-10 bg-slate-100 '></div>
    </div>
  )
}

export default loading