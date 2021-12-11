import React from 'react';

export default ({ item }) => (
  <li>
    <h3>{item.title}</h3>
    <img src={item.imageUrl} />
    <p>{item.description}<a className="readmore" href={item.url}>Read More</a></p>
  </li>
);
