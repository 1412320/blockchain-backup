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
  available_amount: number,
  transfer_info: TransferInfo,
  transactions: Array<TransactionInfo>,
}

interface HomeContainerState {
  wallet_address: string,
  real_amount: number,
  available_amount: number,
  modal: boolean,
  transfer_info: TransferInfo,
  is_me: boolean,
  is_newest: boolean,
  is_pending: boolean,
  transactions: Array<TransactionInfo>,
}

interface TransferInfo {
  recipient_id: string,
  amount: number,
}

export interface TransactionInfo {
  transaction_hash:string;
  sender: string;
  recipient: string;
  value: number;
}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props);

    this.state = {
      wallet_address: this.props.wallet_address,
      real_amount: this.props.real_amount,
      available_amount: this.props.available_amount,
      modal: false,
      transfer_info: {
        recipient_id: '',
        amount: 0
      },
      transactions: [],
      is_me: false,
      is_newest: true,
      is_pending: false
    }
  }

  closeModal() {
    this.setState({
      modal: false
    })
    this.props.dispatch(alertActions.clear());
  }

  openModal() {
    this.setState({
      modal: true
    })
    this.props.dispatch(alertActions.clear());
  }

  componentWillMount() {
    this.props.dispatch(walletActions.getInfo());
  }

  handleSuccess() {
    this.closeModal();
    this.props.dispatch(walletActions.getInfo());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(walletActions.transfer(this.state.transfer_info));
  }

  handleMe(e) {
    e.preventDefault();
    this.setState({
      is_me: true,
      is_newest: false,
      is_pending: false
    })
  }

  handleNewest(e) {
    e.preventDefault();
    this.setState({
      is_me: false,
      is_newest: true,
      is_pending: false
    })
  }

  handlePending(e) {
    e.preventDefault();
    this.setState({
      is_me: false,
      is_newest: false,
      is_pending: true
    })
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.name == 'transaction[recipient_id]')
      this.state.transfer_info.recipient_id = e.target.value
    if (e.target.name == 'transaction[amount]')
      this.state.transfer_info.amount = e.target.value
  }

  render() {
    return (
      <Header>
        <SubHeader toggle={this.openModal.bind(this)} wallet_address={this.props.wallet_address}></SubHeader>
        <HomePage real_amount={this.props.real_amount}
                  available_amount={this.props.available_amount}
                  dispatch={this.props.dispatch}
                  handleMe={this.handleMe.bind(this)}
                  handleNewest={this.handleNewest.bind(this)}
                  handlePending={this.handlePending.bind(this)}
                  transcriptions={this.closeModal.bind(this)}
                  is_me={this.state.is_me}
                  is_newest={this.state.is_newest}
                  is_pending={this.state.is_pending}/>
        <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)}>
          <ModalHeader toggle={this.closeModal.bind(this)}>
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
    const { wallet_address, real_amount, available_amount } = state.get_info;
    const { transfer_info } = state.transfer_kcoin;
    return {
        wallet_address,
        real_amount,
        available_amount,
        transfer_info
    };
}

const connectedHomeContainer = connect(mapStateToProps)(HomeContainer);
export { connectedHomeContainer as HomeContainer };
