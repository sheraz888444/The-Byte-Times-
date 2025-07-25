import React, { Component } from 'react';
import Newsitems from './Newsitems';
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize:'8',
    category:'entertainment',
  }
  static propTypes = {
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
};

  constructor() {
    super();
    this.state = {
      loading: false,
      articles: [],
      page: 1,
      totalResults: 0, // ✅ Initially 0, will be updated from API
      endReached: false,
    };
  }

  fetchData = async (page) => {
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=1dd129b4b2a240ea844d07720cebf119&page=${page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    const totalPages = Math.ceil(parsedData.totalResults / this.props.pageSize);

    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0, // ✅ update from API
      page: page,
      endReached: page >= totalPages,
      loading: false,
    });
  };

  componentDidMount() {
    this.fetchData(this.state.page);
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.fetchData(this.state.page - 1);
    }
  };

  handleNextClick = () => {
    const maxPage = Math.ceil(this.state.totalResults / this.props.pageSize);
    if (this.state.page < maxPage) {
      this.fetchData(this.state.page + 1);
    } else {
      this.setState({ endReached: true });
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center mb-5 display-6 fw-bold">📰 Latest News - Top Headlines</h2>

        {this.state.loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <Newsitems
                      title={element.title ? element.title.slice(0, 50) : ''}
                      description={element.description ? element.description.slice(0, 88) : ''}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={!element.author ? 'unknown resourse':element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>

            {this.state.endReached && (
              <div className="alert alert-info mt-4 text-center">
                <strong>You've reached the end of the news feed.</strong> Please go back to previous pages.
              </div>
            )}

            <div className="d-flex justify-content-between my-4">
              <button
                disabled={this.state.page <= 1 || this.state.loading}
                className="btn btn-dark"
                onClick={this.handlePrevClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={this.state.endReached || this.state.loading}
                className="btn btn-dark"
                onClick={this.handleNextClick}
              >
                Next &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
