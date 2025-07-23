import React, { Component } from 'react';
import Newsitems from './Newsitems';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      articles: [],
      page: 1,
      pageSize: 4,
      totalResults: 36,
      endReached: false,
    };
  }

  fetchData = async (page) => {
    const { pageSize } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=1dd129b4b2a240ea844d07720cebf119&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles || [],
      page: page,
      endReached: page >= Math.ceil(this.state.totalResults / pageSize)
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
    const maxPage = Math.ceil(this.state.totalResults / this.state.pageSize);
    if (this.state.page < maxPage) {
      this.fetchData(this.state.page + 1);
    } else {
      this.setState({ endReached: true });
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center mb-4">📰 Latest News - Top Headlines</h2>

        <div className="row g-4">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <Newsitems
                  title={element.title ? element.title.slice(0, 50) : ''}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
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
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.endReached}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
