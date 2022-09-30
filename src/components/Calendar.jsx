import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";

export const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    // console.log(event.end);
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      title: event.title,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
    });
  };
  const handleEventAdd = async (data) => {
    await axios.post("http://jpxserverjson.herokuapp.com/posts", data.event);
  };
  //   const handleDatesSet = async (data) => {
  //     const response = await axios.get(
  //       "http://jpxserverjson.herokuapp.com/posts?start=" +
  //         moment(data.start).toISOString() +
  //         "&end=" +
  //         moment(data.end).toISOString()
  //     );
  //     setEvents(response.data);
  //   };
  const getData = async () => {
    const response = await axios.get(
      "http://jpxserverjson.herokuapp.com/posts"
    );
    setEvents(response.data);
  };
  console.log(events);
  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <button
        onClick={() => setModalOpen(true)}
        style={{ borderRadius: "1%", marginLeft: "20%", width: "300px" }}
      >
        +
      </button>
      <div style={{ display: "flex", gap: "100px" }}>
        <div style={{ width: "50%", position: "relative", zIndex: 0 }}>
          <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventAdd={(event) => handleEventAdd(event)}
            //   datesSet={(date) => handleDatesSet(date)}
          />
        </div>

        <div>
          {events.map((el) => (
            <div key={el.id} style={{ display: "flex", margin: "20px" }}>
              <h1>{el.title}</h1>
              <p>{el.start}</p>
              <p>{el.end}</p>
            </div>
          ))}
        </div>
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};
