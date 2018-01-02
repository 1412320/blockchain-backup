import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Header, SubHeader } from '../components/Commons';
import { HomePage } from '../components/Home';
import { walletActions } from '../actions';
import { connect } from 'react-redux';

interface HomeContainerProps {
  dispatch: any,
  wallet_address: string,
  real_amount: number
}

interface HomeContainerState {
  wallet_address: string,
  real_amount: number,
  modal: boolean
}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props);

    this.state = {
      wallet_address: this.props.wallet_address,
      real_amount: this.props.real_amount,
      modal: false
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentWillMount() {
    this.props.dispatch(walletActions.getInfo());
  }

  render() {
    return (
      <Header>
        <SubHeader toggle={this.toggle.bind(this)} wallet_address={this.props.wallet_address}></SubHeader>
        <HomePage real_amount={this.props.real_amount}></HomePage>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>
            <i className="send-icon fa fa-paper-plane"></i>
            Send
          </ModalHeader>
          <hr/>
          <ModalBody>

          </ModalBody>
        </Modal>
      </Header>
    );
  }
}

function mapStateToProps(state) {
    const { wallet_address, real_amount } = state.get_info;
    return {
        wallet_address,
        real_amount
    };
}

const connectedHomeContainer = connect(mapStateToProps)(HomeContainer);
export { connectedHomeContainer as HomeContainer };
