import React from 'react';
import DefaultErrorPage from 'next/error';
import redirectToThisMonth from "../util/redirectToThisMonth";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    if (statusCode === 404) {
      redirectToThisMonth(res);
      return;
    }
    return { statusCode }
  }

  render() {
    return <DefaultErrorPage statusCode={this.props.statusCode} />
  }
}