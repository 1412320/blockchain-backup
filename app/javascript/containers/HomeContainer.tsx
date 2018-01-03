import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Header, SubHeader } from '../components/Commons';
import { HomePage, WalletForm } from '../components/Home';
import { walletActions, alertActions } from '../actions';
import { connect } from 'react-redux';

interface HomeContainerProps {
  dispatch: any,
  wallet_address: string,
  real_amount: number,
  transfer_info: TransferInfo
}

interface HomeContainerState {
  wallet_address: string,
  real_amount: number,
  modal: boolean
  transfer_info: TransferInfo
}

interface TransferInfo {
  recipient_id: string,
  amount: number,
  desc: string
}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props);

    this.state = {
      wallet_address: this.props.wallet_address,
      real_amount: this.props.real_amount,
      modal: false,
      transfer_info: {
        recipient_id: '',
        amount: 0,
        desc: ''
      }
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
    this.props.dispatch(alertActions.clear());
  }

  componentWillMount() {
    this.props.dispatch(walletActions.getInfo());
  }

  handleSuccess() {
    this.toggle();
    this.props.dispatch(walletActions.getInfo());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(walletActions.transfer(this.state.transfer_info));
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.name == 'transaction[recipient_id]')
      this.state.transfer_info.recipient_id = e.target.value
    if (e.target.name == 'transaction[amount]')
      this.state.transfer_info.amount = e.target.value
    if (e.target.name == 'transaction[description]')
      this.state.transfer_info.desc = e.target.value
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
            <WalletForm sender_id={this.props.wallet_address}
                        handleSuccess={this.handleSuccess.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        handleChange={this.handleChange.bind(this)}>
            </WalletForm>
          </ModalBody>
        </Modal>
      </Header>
    );
  }
}

function mapStateToProps(state) {
    const { wallet_address, real_amount } = state.get_info;
    const { transfer_info } = state.transfer_kcoin;
    return {
        wallet_address,
        real_amount,
        transfer_info
    };
}

const connectedHomeContainer = connect(mapStateToProps)(HomeContainer);
export { connectedHomeContainer as HomeContainer };
