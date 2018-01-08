import * as React from 'react';
import { Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { alertActions } from '../../actions';
import { clear_alert } from '../../helpers';
import { Row, Col, Fade } from 'reactstrap';
 
interface SubHeaderProps {
  wallet_address: string,
  toggle() :void,
  toggleTFA(),
  used_tfa: boolean,
  dispatch: any
}

interface SubHeaderStates {
  is_show: boolean
}

export class SubHeader extends React.Component<SubHeaderProps, SubHeaderStates> {
  constructor(props: SubHeaderProps) {
    super(props);
    this.state = {
      is_show: false
    }
  }

  handleShow() {
    this.setState({
      is_show: true
    })
  }

  handleHide() {
    this.setState({
      is_show: false
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col md="6">
            <h3 className="wallet-header">BE YOUR OWN BANK.
              <span className="wallet-copyright">®</span>
            </h3>
          </Col>
          <Col md="6">
            <h3 className="wallet-header text-right">WALLET INFORMATION</h3>
          </Col>
        </Row>
        <Button className="btn-wallet" onClick={this.props.toggle}>
          <i className="send-icon fa fa-paper-plane"></i>
          Send KCOIN
        </Button>
        {!this.props.used_tfa ? <Button className="btn-wallet" onClick={this.props.toggleTFA}>
          <i className="send-icon fa fa-toggle-off"></i>
          Turn on TFA mode
        </Button> : ""}
        <CopyToClipboard text={this.props.wallet_address}
          onCopy={() => {
            this.props.dispatch(alertActions.success("Your address has been copied to clipboard"));
            clear_alert(this.props.dispatch);
          }}>
          <Button className="btn-wallet wallet-id">
            <i className="send-icon fa fa-clipboard"></i>
            Copy to clipboard
          </Button>
        </CopyToClipboard>
        { this.state.is_show ? 
          <Button className="btn-wallet wallet-id" onClick={this.handleHide.bind(this)}>
            <i className="send-icon fa fa-eye-slash"></i>
            Hide
          </Button>
          :
          <Button className="btn-wallet wallet-id" onClick={this.handleShow.bind(this)}>
            <i className="send-icon fa fa-eye"></i>
            Show
          </Button>
         }
         <Fade in={this.state.is_show} tag="span" className="wallet-id text-id">
           {this.props.wallet_address}
         </Fade>
        <hr/>
      </div>
    );
  }
}
