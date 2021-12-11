import React, {useState, useEffect} from 'react';

import ArticleContent from './ArticleContent';
import NotFound from '../NotFound/NotFound';
import ArticleList from './ArticleList';
import CommentList from '../Comment/CommentList';
import UpvoteSection from '../Comment/UpvoteSection';
import AddCommentForm from '../Comment/AddCommentForm';

const ArticlePage = ({match}) => {
    
    const name = match.params.name;
    const article = ArticleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(()=> {
        
        // setArticleInfo({ upvotes : Math.floor(Math.random() *10)});

        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
            
        }
        fetchData();
 
    }, [name]);

    if(!article) return <NotFound/>;

    const otherArticles = ArticleContent.filter(article => article.name !== name);

    return(
        <>
            <h2>{article.title}</h2>
            <br/>
            <UpvoteSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}

            <CommentList comments={articleInfo.comments} />

            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />

            <h4><u> Other Articles </u></h4>
           <ArticleList articles={otherArticles} />
        </>
    );
}

export default ArticlePage;