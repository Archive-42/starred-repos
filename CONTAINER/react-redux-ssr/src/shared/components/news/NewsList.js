import React from 'react';
import NewsCard from './NewsCard';

export default ({ articles }) => (
  <section>
    <ul className="card-list">
      {
        articles.map((item, i) => <NewsCard item={item} key={i} />)
      }
    </ul>
  </section>);
