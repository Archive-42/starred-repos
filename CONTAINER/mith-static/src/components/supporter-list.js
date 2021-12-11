import React from 'react'

const SupporterList = ({supporters, type}) => {

  const title = supporters.length > 1 
    ? `${type.charAt(0).toUpperCase() + type.slice(1)}s`
    : type.charAt(0).toUpperCase() + type.slice(1)
  const types = `${type}s`

  return(
    <div className={`supporters ${types}`}>
      <h2>{title}</h2>
      <ul>
        {supporters.map(s => {
          const umd = (s.slug !== "umdlib" && s.type === "Internal") 
            ? "University of Maryland " : ""
          const supporter_name = s.website 
            ? s.website.startsWith('http') 
              ? <a href={s.website} title={s.name} target="_blank" rel="noreferrer">{umd}{s.name}</a>
              : <a href={`http://${s.website}`} title={s.name} target="_blank" rel="noreferrer">{umd}{s.name}</a>
            : s.name
          return <li id={s.slug} className={s.type.toLowerCase()}>{supporter_name}</li>
        })}
      </ul>
    </div>
  )
}

export default SupporterList