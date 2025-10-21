import { EventsCalendar } from './features/EventsCalendar'

function App() {

  return (
    <div className='w-screen h-screen bg-gray-200'>
      <div className='md:w-[1300px] mx-auto md:grid md:grid-cols-4 gap-5 md:p-10 h-full'>
        <EventsCalendar />
        <div className='bg-white col-span-3'>
          <h2 className='font-bold'>Olá,</h2>
          <h2>Como você está?</h2>
        </div>
      </div>
    </div>
  )
}

export default App
