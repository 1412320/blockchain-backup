import * as React from 'react';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              <p className="footer-block text-center">Kcoin Project © 2018 | <strong>The Gears</strong> | Ho Chi Minh City, Vietnam</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
