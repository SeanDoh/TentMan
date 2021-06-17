import React, { } from 'react';
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import { X, CheckCircle, SmileySad } from 'phosphor-react';

const eventSchema = Yup.object().shape({
  date: Yup.date('Invalid Date')
    .required('Required'),
  time: Yup.string()
    .required('Required')
    .test('is-time', 'Invalid Time', function (e) {
      if (/^[012][0-9]:[0-5][0-9]$/g.test(e)) {
        return true
      };
      return false;
    }),
  title: Yup.string().required('Title Required'),
});

export default function CalendarForm(props) {

  let date = new Date(props.event.date);
    
  return (
    // assign the forwarded ref to the child component, now parent component can access ref
    <div ref={props.forwardedRef} className='w-221px min-h-407px relative flex flex-col z-20 inset-center bg-gray-700 p-3 rounded-sm shadow-2xl'>
      {props.submitted ?
        (props.error ?
          <>
            <div onClick={props.onClose} className='absolute right-0 top-0 p-2'>
              <X weight='bold' size={20} />
            </div>
            <div className='text-2xl flex-1 flex text-center h-full justify-center items-center'>
              Error <SmileySad size={50} />
            </div>
          </>
          :
          <>
            <div onClick={props.onClose} className='absolute right-0 top-0 p-2'>
              <X weight='bold' size={20} />
            </div>
            <div className='flex-1 flex text-center h-full justify-center items-center'>
              <CheckCircle size={50} />
            </div>
          </>
        )
        :
        <>
          <div onClick={props.onClose} className='absolute right-0 top-0 p-2'>
            <X weight='bold' size={20} />
          </div>
          {props.event.id ?
            <div className='absolute right-0 bottom-0 p-3'>
              <button data_id={props.event.id} onClick={props.onDelete} className="mt-3 p-2 bg-gray-500 rounded-sm hover:bg-blue-700 w-1/2">Delete</button>
            </div> :
            <></>
          }

          <Formik
            enableReinitialize={true}
            className=''
            initialValues={{
              id: props.event.id,
              date: props.event.date.split('T')[0],
              time: `${date.getHours()}:${date.getMinutes()}`,
              title: props.event.title,
              details: props.event.details
            }}
            validationSchema={eventSchema}
            onSubmit={props.onSubmit}
          >
            {({ errors, touched }) => (
              <Form className='flex flex-col'>
                {props.event.title
                  ?
                  <div className="font-bold">
                    Edit Event
                  </div>
                  :
                  <div className="font-bold">
                    New Event
                  </div>}
                <div className='hidden'>
                  <label className="p-1 font-bold" htmlFor="date">id</label>
                  <Field className="select-none p-1 m-1 text-black" id="id" name="id" placeholder="id" disabled={true} />
                </div>
                <div className='flex flex-col'>
                  <label className="p-1 font-bold" htmlFor="date">Date</label>
                  <Field className="select-none p-1 m-1 text-black" id="date" name="date" placeholder="Date" disabled={true} />
                  {errors.date && touched.date ? (
                    <div className="text-red-500">{errors.date}</div>
                  ) : null}
                </div>

                <div className='flex flex-col'>
                  <label className="p-1 font-bold" htmlFor="time">Time</label>
                  <Field className="p-1 m-1 text-black" id="time" name="time" />
                  {errors.time && touched.time ? (
                    <div className="pl-1 text-red-500 font-bold">{errors.time}</div>
                  ) : null}
                </div>

                <div className='flex flex-col'>
                  <label className="p-1 font-bold" htmlFor="title">Title</label>
                  <Field className="p-1 m-1 text-black" id="title" name="title" placeholder="Flower Switch" />
                  {errors.title && touched.title ? (
                    <div className="pl-1 text-red-500 font-bold">{errors.title}</div>
                  ) : null}
                </div>

                <div className='flex flex-col'>
                  <label className="p-1 font-bold" htmlFor="details">Details</label>
                  <Field className="p-1 m-1 text-black" as='textarea' id="details" name="details" placeholder="Switched light cycle to 12/12 for flower" />
                </div>
                <div className='flex flex-row justify-between'>
                  <div className="w-full flex justify-center">
                    <button className="mt-3 p-2 bg-gray-500 rounded-sm hover:bg-blue-700 w-1/2" type="submit">
                      {props.event.title ? 'Update' : 'Submit'}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>}

    </div>
  );
}