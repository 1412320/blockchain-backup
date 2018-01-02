import * as React from 'react';
import { Row, Col, Button, Card, CardText,
         CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';

interface HomePageProps {
  dispatch: any,
}

interface HomePageState {
  is_all: boolean
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.setState({
      is_all: false
    })
    this.handleAll = this.handleAll.bind(this);
    this.handleNewest = this.handleNewest.bind(this);
  }
  handleAll() {
    this.setState({
      is_all: true
    })
  }

  handleNewest() {
    this.setState({
      is_all: false
    })
  }
}
