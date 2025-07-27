import React, { Component } from 'react';
import Newsitems from './Newsitems';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar'; // ✅ NEW IMPORT

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'entertainment',
    //apiKey:process.env.REACT_APP_NEWS_API,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      loading: false,
      articles: [],
      page: 1,
      totalResults: 0,
      endReached: false,
      progress: 0, // ✅ NEW STATE FOR LOADING BAR
    };
    this.loadingBarRef = React.createRef(); // ✅ create ref
  }

  fetchData = async (page) => {
    this.loadingBarRef.current.continuousStart(); // ✅ START LOADING BAR
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    const totalPages = Math.ceil(parsedData.totalResults / this.props.pageSize);

    this.setState({
      articles: page === 1 ? parsedData.articles : [...this.state.articles, ...parsedData.articles],
      totalResults: parsedData.totalResults || 0,
      page: page,
      endReached: page >= totalPages,
      loading: false,
    });

    this.loadingBarRef.current.complete(); // ✅ STOP LOADING BAR
  };

  componentDidMount() {
    this.fetchData(this.state.page);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (
      !this.state.loading &&
      !this.state.endReached &&
      scrollTop + clientHeight >= scrollHeight - 100
    ) {
      this.fetchData(this.state.page + 1);
    }
  };

  render() {
    return (
      <div className="container-fluid px-4">
        {/* ✅ Top Loading Bar */}
        <LoadingBar color="#f11946" height={3} ref={this.loadingBarRef} />

      <h2
  className="text-center display-6 fw-bold"
  style={{ marginTop: '90px' }}
>
  📰 Latest News - Top Headlines
</h2>

        <div className="row g-4">
          {this.state.articles.map((element) => (
            <div className="col-md-3" key={element.url}>
              <Newsitems
                title={element.title ? element.title.slice(0, 50) : ''}
                description={element.description ? element.description.slice(0, 88) : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={!element.author ? 'unknown resource' : element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>

        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: '3rem', height: '3rem' }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {this.state.endReached && (
          <div className="alert alert-info mt-4 text-center">
            <strong>You've reached the end of the news feed.</strong>
          </div>
        )}
      </div>
    );
  }
}
