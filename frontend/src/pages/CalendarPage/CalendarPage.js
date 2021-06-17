import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarForm from '../../components/CalendarForm/CalendarForm';
import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'phosphor-react';
import './CalendarPage.css'

export default function CalendarPage() {
  const [formPopup, setFormPopup] = useState(<></>);
  const [events, setEvents] = useState([]);

  // create null reference to pass to child component
  const formPopupRef = useRef(null);

  useEffect(() => {
    // get events
    const callAPI = async () => {
      let res = await fetch('/events');
      let data = await res.json();
      setEvents(data.data);
    }

    // add to detect click outside of popup
    document.addEventListener('click', handleClick);

    callAPI();
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = e => {
    // if the formPopupRef has been assigned (i.e. popup has been rendered)
    // UPDATE:this didnt really work, needs refactoring, leaving for reminder?
    // remove popup
    if (formPopupRef.current && !formPopupRef.current.contains(e.target)) {
      //setFormPopup(<></>)
    }
    return;
  }

  // when user clicks calendar, add popup
  const handleDateClick = (e) => {
    let date = new Date();
    date.setHours(date.getHours() - 4);
    let newDate = new Date(`${e.dateStr} ${date.toISOString().split('T')[1].slice(0, 5)}`);
    // forward the null child ref to the child component
    setFormPopup(<CalendarForm
      forwardedRef={formPopupRef}
      event={{
        id:'',
        title:'',
        date: newDate.toISOString(),
        details:''
      }}
      onSubmit={handleFormSubmit}
      onClose={handleFormClose}
      onDelete={handleFormDelete}
      submitted={false}
    />)
  }

  // when user clicks event on calendar
  const handleEventClick = (e) => {
    events.forEach(event => {
      if(event.id.toString() === e.event._def.publicId){
        setFormPopup(<CalendarForm
          forwardedRef={formPopupRef}
          event={event}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          onDelete={handleFormDelete}
          submitted={false}
        />)
      }
    });
  }

  // when user sumbits popup form
  const handleFormSubmit = (data) => {
    const postData = {
      id: data.id,
      title: data.title,
      details: data.details,
      event_date: new Date(`${data.date} ${data.time}`)
    }
    const postForm = async () => {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        }
        let res = await fetch('/events', options)
        if (res.ok) {
          const id = (await res.json()).id;
          setFormPopup(<CalendarForm
            forwardedRef={formPopupRef}
            event={{
              id: id > 0 ? id : data.id,
              title: data.title,
              date: (new Date(`${data.date} ${data.time}`)).toISOString(),
              details: data.details
            }}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            onDelete={handleFormDelete}
            submitted={true}
            error={false}
          />)
          if (id > 0){
            setEvents(events => [...events, {
              id: id,
              title: data.title,
              details: data.details,
              date: (new Date(`${data.date} ${data.time}`)).toISOString()
            }])
          }
          else{
            let tempEvents = [...events]
            tempEvents = tempEvents.filter(el => el.id != data.id)
            setEvents([...tempEvents, {
              id: data.id,
              title: data.title,
              details: data.details,
              date: (new Date(`${data.date} ${data.time}`)).toISOString()
            }])
          }
          setTimeout(
            () => {setFormPopup(<></>)
            },1000
          )
      }
        else {
          setFormPopup(<CalendarForm
            forwardedRef={formPopupRef}
            event={{
              id:data.id,
              title: data.title,
              date: (new Date(`${data.date} ${data.time}`)).toISOString(),
              details: data.details
            }}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            onDelete={handleFormDelete}
            submitted={true}
            error={true}
          />)
        }
      } catch (error) {
        setFormPopup(<CalendarForm
          forwardedRef={formPopupRef}
          event={{
            id:'',
            title: data.title,
            date: (new Date(`${data.date} ${data.time}`)).toISOString(),
            details: data.details
          }}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          onDelete={handleFormDelete}
          submitted={true}
          error={true}
        />)
      }
    }
    postForm();
  }

  const handleFormDelete = (e) => {
    const deleteData = {
      id: e.target.attributes.data_id.value
    }
    const deleteForm = async () => {
      try {
        const options = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(deleteData)
        }
        let res = await fetch('/events', options)
        if(res.ok){
          setFormPopup(<CalendarForm
            forwardedRef={formPopupRef}
            event={{
              id:'',
              title: '',
              date: '',
              details: ''
            }}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            onDelete={handleFormDelete}
            submitted={true}
            error={false}
          />)
          let tempEvents = [...events]
          tempEvents = tempEvents.filter(el => el.id != e.target.attributes.data_id.value)
          setEvents(tempEvents)
          setTimeout(
            () => {setFormPopup(<></>)
            },1000
          )
        }
        else{
          setFormPopup(<CalendarForm
            forwardedRef={formPopupRef}
            event={{
              id:'',
              title: '',
              date: '',
              details: ''
            }}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
            onDelete={handleFormDelete}
            submitted={true}
            error={true}
          />)
        }
      } catch (error) {
        setFormPopup(<CalendarForm
          forwardedRef={formPopupRef}
          event={{
            id:'',
            title: '',
            date: '',
            details: ''
          }}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
          onDelete={handleFormDelete}
          submitted={true}
          error={true}
        />)
      }
    }
    deleteForm();
  }

  // when user clicks close on form, remove popup
  const handleFormClose = (e) => {
    setFormPopup(<></>)
  }

  return (
    <div id='GrowTentPage' className='relative p-2'>
      {formPopup}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next today'
        }}
        events={events}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        dayCellContent={renderDay}
      />
    </div>
  );
}

function renderDay(day) {
  return (
    <div className='flex flex-row items-center justify-between'>
      <Plus />
      {day.dayNumberText}
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <div className='flex flex-col sm:flex-row bg-gray-700 p-1 rounded-sm text-xs overflow-hidden'>
      <div className='pr-1'>{eventInfo.timeText}</div>
      <div className='font-bold'>{eventInfo.event.title}</div>
    </div>
  )
}