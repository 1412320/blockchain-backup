import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Header, SubHeader, AdminSubHeader } from '../components/Commons';
import { HomePage, WalletForm, AdminPage } from '../components/Home';
import { walletActions, alertActions, transactionActions } from '../actions';
import { TwoFactorForm } from '../components/TwoFactorAuth';
import { transactionServices } from '../services';
import { connect } from 'react-redux';
import { adminActions } from '../actions';

interface UserInfo {
  email: string,
  address: string,
  available_amount: string,
  real_amount: string,
}
interface HomeContainerProps {
  dispatch: any,
  wallet_address: string,
  real_amount: number,
  role: number,
  users: Array<UserInfo> ,
  system_real_amount: number,
  system_available_amount: number,
  user_count: number
  available_amount: number,
  transfer_info: TransferInfo,
  transactions: Array<TransactionInfo>
  system_transactions: Array<TransactionInfo> ,
  transactions_count: number 
}

interface HomeContainerState {
  wallet_address: string,
  real_amount: number,
  role: number,
  users: Array<UserInfo>,
  system_real_amount: number,
  system_available_amount: number,
  user_count: number
  available_amount: number,
  modal: boolean,
  otp_modal: boolean,
  confirm_id: string,
  otp_code: string,
  transfer_info: TransferInfo,
  is_me: boolean,
  is_newest: boolean,
  is_pending: boolean,
  transactions: Array<TransactionInfo>,
  system_transactions: Array<TransactionInfo>,    
  is_confirmed: boolean,
  transactions_count: number
}

interface TransferInfo {
  recipient_id: string,
  amount: number,
}

export interface TransactionInfo {
  hash:string;
  sender: string;
  receiver: string;
  value: number;
  id: string;
}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props);
    this.state = {
      wallet_address: this.props.wallet_address,
      real_amount: this.props.real_amount,
      role: this.props.role,
      users: this.props.users,
      user_count: this.props.user_count,
      system_available_amount: this.props.system_available_amount,
      system_real_amount: this.props.system_real_amount,
      available_amount: this.props.available_amount,
      modal: false,
      otp_modal: false,
      confirm_id: '',
      otp_code: '',
      transfer_info: {
        recipient_id: '',
        amount: 0
      },
      transactions: [],
      system_transactions: [],      
      is_me: false,
      is_newest: true,
      is_pending: false,
      is_confirmed: true,
      transactions_count: this.props.transactions_count
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

  closeOtpModal() {
    this.setState({
      otp_modal: false
    })
  }

  openOtpModal() {
    this.setState({
      otp_modal: true
    })
    this.props.dispatch(alertActions.clear());
  }

  componentDidMount() {
    this.props.dispatch(walletActions.getInfo());
    this.props.dispatch(transactionActions.getNewest());
    this.props.dispatch(adminActions.getAllUsersInfo(1));
    this.props.dispatch(adminActions.getSystemInfo());    
    this.props.dispatch(adminActions.getTransactions(1));
  }

  handleSuccess() {
    this.closeModal();
    this.props.dispatch(walletActions.getInfo());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(walletActions.transfer(this.state.transfer_info));
    this.closeModal();
    setTimeout(() => {
      this.setState({
        is_pending: true,
        is_newest: false,
        is_me: false
      })
      this.props.dispatch(walletActions.getInfo());
      this.props.dispatch(transactionActions.getPending());
    }, 1000)
  }

  handleMe(e) {
    e.preventDefault();
    this.setState({
      is_me: true,
      is_newest: false,
      is_pending: false
    })
    this.props.dispatch(transactionActions.getMy())
  }

  handleNewest(e) {
    e.preventDefault();
    this.setState({
      is_me: false,
      is_newest: true,
      is_pending: false
    })
    this.props.dispatch(transactionActions.getNewest())
  }

  handlePending(e) {
    e.preventDefault();    
    this.setState({
      is_me: false,
      is_newest: false,
      is_pending: true
    })
    this.props.dispatch(transactionActions.getPending())
  }
  handleAdminPending(){
    this.setState({
      is_confirmed: false,
      is_pending: true
    })
    this.props.dispatch(adminActions.getPendingTransactions(1));         
  }
  handleAdminConfirmed(){
    this.setState({
      is_confirmed: true,      
      is_pending: false
    })
    this.props.dispatch(adminActions.getTransactions(1));      
  }

  handleConfirm(e) {
    e.preventDefault();
    const t_id = e.target.getAttribute('data-content');
    this.setState({
      confirm_id: t_id
    })
    this.openOtpModal();
  }

  handleChangeOtp(e) {
    this.setState({
      otp_code: e.target.value
    })
  }

  handleSubmitConfirm(e) {
    e.preventDefault();
    this.props.dispatch(transactionActions.confirmTransaction(this.state.confirm_id, this.state.otp_code));
    this.closeOtpModal();
  }

  handleDelete(e) {
    const t_id = e.target.getAttribute('data-content');
    transactionServices.deleteTransaction(t_id).then( res => {
      this.props.dispatch(transactionActions.getPending());
      this.props.dispatch(walletActions.getInfo());
    });
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.name == 'transaction[recipient_id]')
      this.state.transfer_info.recipient_id = e.target.value
    if (e.target.name == 'transaction[amount]')
      this.state.transfer_info.amount = e.target.value
    this.setState(this.state);;
  }
  getUserPage(r){
    this.props.dispatch(adminActions.getAllUsersInfo(r));       
  }
  getTransactionsPage(r, type){
    if (type)
    this.props.dispatch(adminActions.getTransactions(r));  
    else
    this.props.dispatch(adminActions.getPendingTransactions(r));     
  }
  render() {
    return (
      <Header>
        {this.props.role == 1 ?<SubHeader toggle={this.openModal.bind(this)} wallet_address={this.props.wallet_address}></SubHeader>
        : <AdminSubHeader />}
        {this.props.role == 1 ? <HomePage real_amount={this.props.real_amount}
                  available_amount={this.props.available_amount}
                  dispatch={this.props.dispatch}
                  handleMe={this.handleMe.bind(this)}
                  handleNewest={this.handleNewest.bind(this)}
                  handlePending={this.handlePending.bind(this)}
                  handleConfirm={this.handleConfirm.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                  transactions={this.props.transactions ? this.props.transactions : new Array<TransactionInfo>()}
                  is_me={this.state.is_me}
                  is_newest={this.state.is_newest}
                  is_pending={this.state.is_pending}/>
                  : <AdminPage users={this.props.users}
                  user_count={this.props.user_count}
                  system_real_amount={this.props.system_real_amount}
                  system_available_amount={this.props.system_available_amount}
                  getUserPage={this.getUserPage.bind(this)}
                  is_confirmed={this.state.is_confirmed}
                  is_pending={this.state.is_pending}
                  transactions={this.props.system_transactions}
                  handleAdminPending={this.handleAdminPending.bind(this)}
                  handleAdminConfirmed={this.handleAdminConfirmed.bind(this)}
                  getTransactionsPage={this.getTransactionsPage.bind(this)}
                  transactions_count={this.props.transactions_count}/>}
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
                        handleChange={this.handleChange.bind(this)}
                        >
            </WalletForm>
          </ModalBody>
        </Modal>

        <TwoFactorForm closeModal={this.closeOtpModal.bind(this)}
                       openModal={this.openOtpModal.bind(this)}
                       modal={this.state.otp_modal}
                       handleSubmit={this.handleSubmitConfirm.bind(this)}
                       handleChange={this.handleChangeOtp.bind(this)}>
        </TwoFactorForm>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  const { wallet_address, real_amount, role, available_amount} = state.get_info;
  const { transfer_info } = state.transfer_kcoin;
  const { transactions } = state.get_my;
  const { users, user_count, system_real_amount, system_available_amount, system_transactions, transactions_count} = state.admin; 
  return {
    wallet_address,
    real_amount,
    available_amount,
    transfer_info,
    transactions,
    role,
    users,
    user_count,
    system_real_amount,
    system_available_amount,
    system_transactions,
    transactions_count
  };
}

const connectedHomeContainer = connect(mapStateToProps)(HomeContainer);
export { connectedHomeContainer as HomeContainer };
