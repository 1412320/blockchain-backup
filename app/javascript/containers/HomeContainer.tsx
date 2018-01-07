import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Header, SubHeader } from '../components/Commons';
import { AdminPage } from '../components/Home';
import { HomePage } from '../components/Home';
import { walletActions } from '../actions';
import { UserActions } from '../actions';
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
}

interface HomeContainerState {
  wallet_address: string,
  real_amount: number,
  role: number,
  users: Array<UserInfo>,
  system_real_amount: number,
  system_available_amount: number,
  user_count: number  
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
      system_real_amount: this.props.system_real_amount
    }
  }

  componentWillMount() {
    this.props.dispatch(walletActions.getInfo());
    this.props.dispatch(adminActions.getAllUsersInfo(1)); 
    this.props.dispatch(adminActions.getSystemInfo());     
  }

  render() {
    console.log(this.props)
    return (
      <Header>
        <SubHeader wallet_address={this.props.wallet_address}></SubHeader>
        {this.state.role == 0 ? 
        <HomePage real_amount={this.props.real_amount}></HomePage> :
        <AdminPage users={this.props.users} 
        user_count={this.props.user_count} 
        system_available_amount={this.props.system_available_amount}
        system_real_amount={this.props.system_real_amount}/>
        }
      </Header>
    );
  }
}

function mapStateToProps(state) {
    const { wallet_address, real_amount , role} = state.get_info;
    const { users, user_count, system_real_amount, system_available_amount} = state.admin; 
    return {
        wallet_address,
        real_amount,
        role,
        users,
        user_count,
        system_real_amount,
        system_available_amount
    };
}

const connectedHomeContainer = connect(mapStateToProps)(HomeContainer);
export { connectedHomeContainer as HomeContainer };
