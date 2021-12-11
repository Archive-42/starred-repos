import React from 'react';

import articles from './ArticleContent';
import {Link} from 'react-router-dom';

const ArticleList = () => (
    <>
    {articles.map((article, key) => (
        <Link className="article-list-item" key={key} to={`/article/${article.name}`}>
            <h3>{article.title}</h3>
            <p>{article.content[0].substring(0, 300)}...</p>
        </Link>
    ))}
    </>
);


export default ArticleList;