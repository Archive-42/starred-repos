import React, { Component } from 'react';

export default ({ sources, selectedSource, onSourceSelected }) => {
  let filtered = (sources || [])
    .filter(x => x.sourceId === selectedSource);
  filtered = filtered.length > 0 ? filtered[0] : undefined;
  const sourceName = filtered ? filtered.name : '';
  return (
    <header>
      <nav>
        <h3>{sourceName}</h3>
        <i id="menu-icon" className="fa fa-bars" />
        <div>
          <ul>
            {
              sources.map((item, i) => {
                const css = item.name === sourceName ? 'current' : '';
                return (<li
                  key={i}
                  onClick={e => onSourceSelected(item.sourceId)}
                >
                  <a
                    href=""
                    className={css}
                    onClick={e => e.preventDefault()}
                  >
                    {item.name}
                  </a>
                  <div className="divider" />
                        </li>);
              })
            }
          </ul>
        </div>
      </nav>
    </header>
  );
};
