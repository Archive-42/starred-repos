import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '@/shared/components/common/Loader';
import Publications from '@/shared/components/publications';
import NewsList from './NewsList';
import { fetchNewsIfNeeded, fetchNews } from './reducer';

class News extends Component {
  static initialAction(host) {
    return fetchNews(null, host);
  }

  componentDidMount() {
    if (!this.props.news || this.props.news.length === 0) {
      this.props.onSourceSelected(this.publications.selectedSource || 'toi-in');
    }
  }

  render() {
    const articles = this.props.news;
    let newsRender = <Loader />;
    if (articles && articles.length > 0) {
      newsRender = <NewsList articles={articles} />;
    }
    return (
      <div>
        <Publications
          selectedSource={this.props.publications.selectedSource}
          sources={this.props.publications.listOfNewsSources}
          onSourceSelected={this.props.onSourceSelected}
        />
        {newsRender}
      </div>
    );
  }
}

const getNewsArticleForSource = (state) => {
  const sourceId = state.publications.selectedSource;
  const newsItem = state.news[sourceId];
  if (newsItem) {
    return newsItem.listOfArticles || [];
  }
  return [];
};

const mapStateToPros = state => ({
  publications: state.publications,
  news: getNewsArticleForSource(state),
});

const mapDispatchToPros = dispatch => ({
  onSourceSelected: sourceId => dispatch(fetchNewsIfNeeded(sourceId)),
});

export default connect(mapStateToPros, mapDispatchToPros)(News);
