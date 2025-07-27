import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News apiKey={this.apiKey} key='general' pageSize={8} country="us" category="general" />} />
          <Route exact path="/entertainment" element={<News apiKey={this.apiKey} key='entertainment' pageSize={8} country="us" category="entertainment" />} />
          <Route exact  path="/business" element={<News apiKey={this.apiKey} key='business' pageSize={8} country="us" category="business" />} />
          <Route exact path="/general" element={<News apiKey={this.apiKey} key='general' pageSize={8} country="us" category="general" />} />
          <Route exact path="/health" element={<News  apiKey={this.apiKey} key='health' pageSize={8} country="us" category="health" />} />
          <Route exact path="/science" element={<News  apiKey={this.apiKey} key='science' pageSize={8} country="us" category="science" />} />
          <Route exact path="/sports" element={<News  apiKey={this.apiKey} key='sports' pageSize={8} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News apiKey={this.apiKey}  key='technology' pageSize={8} country="us" category="technology" />} />
        </Routes>
      </Router>
    );
  }
}
