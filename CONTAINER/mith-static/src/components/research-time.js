import React from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const ResearchTime = ({start, end, active}) => {
  const format = ['YYYY', 'YYYY-M']
  start = dayjs(start, format)
  if (end) { end = dayjs(end, format) } else {
    end = ''
  }

  const startEl = start ? <time itemProp="startDate" dateTime={start.format('YYYY-MM')}>{start.format('MMMM YYYY')}</time> : ''

  let endEl = ''
  if (active === 'TRUE') {
    if (end) {
      endEl = <time itemProp="endDate" dateTime={end.format('YYYY-MM')}>{end.format('MMMM YYYY')}</time>
    } else {
      endEl = <span itemProp="endDate">Present</span>
    }
  } else {
    if (end) {
      endEl = <time itemProp="endDate" dateTime={end.format('YYYY-MM')}>{end.format('MMMM YYYY')}</time>
    } else {
      endEl = ''
    }
  }
  
  if (startEl && endEl) {
    return <span className="time date research-date">{startEl} &ndash; {endEl}</span>
  } else {
    return <span className="time date research-date">{startEl}</span>
  }
}

export default ResearchTime
