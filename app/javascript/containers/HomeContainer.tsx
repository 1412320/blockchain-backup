import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Header, SubHeader } from '../components/Commons';
import { HomePage } from '../components/Home';
import { walletActions } from '../actions';
import { UserActions } from '../actions';
import { connect } from 'react-redux';

interface HomeContainerProps {
  dispatch: any,
  wallet_address: string,
  real_amount: number,
  role: number  
}

interface HomeContainerState {
  wallet_address: string,
  real_amount: number,
  role: number    
}

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props);

    this.state = {
      wallet_address: this.props.wallet_address,
      real_amount: this.props.real_amount,
      role: this.props.role
    }
  }

  componentWillMount() {
    this.props.dispatch(walletActions.getInfo());
  }

  render() {
    return (
      <Header>
        <SubHeader wallet_address={this.props.wallet_address}></SubHeader>
        <HomePage real_amount={this.props.real_amount}></HomePage>
      </Header>
    );
  }
}

function mapStateToProps(state) {
    const { wallet_address, real_amount , role} = state.get_info;
    return {
        wallet_address,
        real_amount,
        role
    };
}

const connectedHomeContainer = connect(mapStateToProps)(HomeContainer);
export { connectedHomeContainer as HomeContainer };
