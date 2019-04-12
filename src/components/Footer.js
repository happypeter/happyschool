import React from 'react';

import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a
            href="https://haoqicat.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            haoqicat.com
          </a>
        </div>
        <a
          href="https://mobile.twitter.com/happypeter1983"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/happypeter"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://talk.nervos.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Forum
        </a>
      </footer>
    );
  }
}

export default Footer;
