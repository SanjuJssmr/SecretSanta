import { useState, useRef } from 'react'
import bg from './assets/bg2.jpg'
import downloadExcel from './util/helper.js'
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
toastConfig({ theme: 'dark' });

function App() {
  const [empList, setEmpList] = useState('')
  const [lastYearReport, setLastYearReport] = useState('')
  const empRef = useRef();
  const prevREf = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault()
    let payload = new FormData()
    payload.append('empList', empList)
    payload.append('lastYearReport', lastYearReport)
    let response = await fetch("http://localhost:3000/employees/assignSanta", {
      method: 'POST',
      body: payload
    })
    response = await response.json()
    empRef.current.value = '';
    prevREf.current.value = ''
    setEmpList('')
    setLastYearReport('')
    if (response.status !== 200) {

      return toast(`${response.response} ⚠️`)
    }
    downloadExcel(response.data, 'AssignedSanta(2024).xlsx')

    return toast(`${response.response} 🎁🎉`)
  }


  return (
    <div style={{ backgroundImage: `url(${bg})` }} className='flex text-white bg-no-repeat bg-cover bg-center w-full h-screen font-mono items-center justify-center'>

      <section className='flex flex-col w-[400px] rounded-md shadow-md mb-16 drop-shadow-md items-start justify-center p-10 gap-8 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border'>
        <h1 className='text-2xl'>Let's shuffle santa's</h1>
        <section className='flex flex-col items-center justify-center gap-5'>
          <div className='flex flex-col gap-2'>
            <h3>Employee List:</h3>

            <input type="file" onChange={(e) => setEmpList(e.target.files[0])} ref={empRef} className='border-b-[1px] pb-1' />
          </div>
          <div className='flex flex-col gap-2'>
            <h3>Previous Santa List:</h3>
            <input type="file" onChange={(e) => setLastYearReport(e.target.files[0])} ref={prevREf} className='border-b-[1px] pb-1' />
          </div>
          <button onClick={handleSubmit} className=' bg-gradient-to-tr from-red-500 to-amber-200 w-full py-2  rounded-md font-semibold text-xl '>Shuffle</button>
        </section>
      </section>
    </div>
  )
}

export default App
