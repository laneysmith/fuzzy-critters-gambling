import React, { PureComponent } from 'react';

export default class SectionHeading extends PureComponent {
  render() {
    const { title, children } = this.props;
    if (children) {
      return (
        <nav>
          <h2>{title}</h2>
          <div>{children}</div>
        </nav>
      );
    }
    return (
      <nav>
        <h2>{title}</h2>
      </nav>
    );
  }
}
