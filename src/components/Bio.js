import React from 'react';
import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';
import { Link } from 'gatsby';

class Bio extends React.Component {
  render() {
    const { lang } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Peter Wang`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          {lang === 'en' ? (
            <span>
              Created with love by{' '}
              <a href="https://mobile.twitter.com/happypeter">Peter Wang</a>.{' '}
              I&nbsp;explain with words and code. Language:
              <Link to="/zh">中文</Link>
            </span>
          ) : (
            <span>
              <a href="https://mobile.twitter.com/happypeter">Peter</a>.{' '}
              用爱打造。 网站语言:
              <Link to="/">English</Link>
            </span>
          )}
        </p>
      </div>
    );
  }
}

export default Bio;
