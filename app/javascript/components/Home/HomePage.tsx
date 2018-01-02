import * as React from 'react';
import { Row, Col, Button, Card, CardText,
         CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import { connect } from 'react-redux';

interface HomePageProps {
  real_amount: number
}

export class HomePage extends React.Component<HomePageProps, {}> {
  constructor(props: HomePageProps) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col sm="12" md="3">
          <div className="wallet-card">
            <Card className="card-balance">
              <CardTitle>YOUR REAL BALANCE</CardTitle>
              <hr/>
              <CardText>{this.props.real_amount}</CardText>
            </Card>
            <Card className="card-balance">
              <CardTitle>YOUR ACTIVE BALANCE</CardTitle>
              <hr/>
              <CardText>{this.props.real_amount}</CardText>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}
