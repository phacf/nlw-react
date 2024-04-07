import { Header } from "./components";
import { getUrlState } from "./helpers/getUrlState";
import { AttendeeList } from "./pages/Attendee-list";
import { EventsList } from "./pages/Events";

export function App() {
  return (
   <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
    <Header/>
    {{
      Participantes: <AttendeeList/>,
      Eventos: <EventsList/>
    }[getUrlState('section') || '']}
   </div>
  )
}

