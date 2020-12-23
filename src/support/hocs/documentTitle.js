import React, { Component } from 'react';
import env from '../../configs/app';

export function documentTitle(defaultTitle = '') {

  return WrappedComponent => class extends Component {
    componentDidMount() {
      console.log('documentTitle mounted');
      this.setDocumentTitle(defaultTitle);
    }

    setDocumentTitle(title) {
      if (title !== '') {
        document.title = env.APP_TITLE + ' | ' + title;
      } else {
        document.title = env.APP_TITLE
      }
    }

    replaceDocumentTitle(title) {
      document.title = title;
    }

    render() {
      return <WrappedComponent
        setDocumentTitle={::this.setDocumentTitle}
        replaceDocumentTitle={::this.replaceDocumentTitle}
        {...this.props}/>;
    }
  }
}