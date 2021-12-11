import React from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

dayjs.extend(localizedFormat)

const EventTime = ({start, end, icon}) => {

  const iconCalendar = icon ? <FontAwesomeIcon icon="calendar-alt" /> : ''
  const iconClock = icon ? <FontAwesomeIcon icon="clock" /> : ''

  start = dayjs(start)

  let startEl = ''
  if (start.hour() === 0) {
    startEl = <time itemProp="startDate" className="start" dateTime={start.format('YYYY-MM-DD')}>
      <span className="date">{iconCalendar} {start.format('LL')}</span>
    </time>
  } else {
    startEl = <time itemProp="startDate" className="start" dateTime={start.format()}>
      <span className="date">{iconCalendar} {start.format('LL')}</span>
      <span className="time">{iconClock} {start.format('LT')}</span>
    </time>
  }

  let endEl = ''
  if (end) {
    end = dayjs(end)
    if (end.hour() === 0) {
      endEl = <time itemProp="endDate" className="end" dateTime={end.format('YYYY-MM-DD')}>
        <span class="date">{end.format('LL')}</span>
    </time>
    } else {
      endEl = <time itemProp="endDate" className="end" dateTime={end.format()}>
        <span class="time">{end.format('LT')}</span>
      </time>
    }
  }

  if (startEl && endEl) {
    return <span className="event-date">{startEl}{endEl}</span>
  } else {
    return <span className="event-date">{startEl}</span>
  }
}

export default EventTime
