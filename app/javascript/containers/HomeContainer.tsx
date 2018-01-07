import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Header, SubHeader } from '../components/Commons';
import { AdminPage } from '../components/Home';
import { HomePage } from '../components/Home';
import { walletActions } from '../actions';
import { UserActions } from '../actions';
import { connect } from 'react-redux';
import { adminActions } from '../actions';

interface HomeContainerProps {
  dispatch: any,
  wallet_address: string,
  real_amount: number,
  role: number,
  users: Array<any> 
}

interface HomeContainerState {
  wallet_address: string,
  real_amount: number,
  role: number,
  users: Array<any>  
}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props);
    this.state = {
      wallet_address: this.props.wallet_address,
      real_amount: this.props.real_amount,
      role: this.props.role,
      users: this.props.users
    }
  }

  componentWillMount() {
    this.props.dispatch(walletActions.getInfo());
    this.props.dispatch(adminActions.getAllUsersInfo(1));   
    console.log(this.state.users)     
  }

  render() {
    return (
      <Header>
        <SubHeader wallet_address={this.props.wallet_address}></SubHeader>
        {this.state.role == 0 ? 
        <HomePage real_amount={this.props.real_amount}></HomePage> :
        <AdminPage users={this.state.users}/>
        }
      </Header>
    );
  }
}

function mapStateToProps(state) {
    const { wallet_address, real_amount , role} = state.get_info;
    const { users} = state.admin; 
    return {
        wallet_address,
        real_amount,
        role,
        users
    };
}

const connectedHomeContainer = connect(mapStateToProps)(HomeContainer);
export { connectedHomeContainer as HomeContainer };
