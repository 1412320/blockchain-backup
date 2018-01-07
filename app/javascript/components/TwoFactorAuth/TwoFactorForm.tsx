import * as React from 'react';
import { Modal, ModalBody, ModalHeader, Input, Button } from 'reactstrap';

interface TwoFactorFormProps {
  modal: boolean
  openModal(): void,
  closeModal() :void,
  handleSubmit(): void,
  handleChange(): void,
}

export class TwoFactorForm extends React.Component<TwoFactorFormProps, {}> {
  constructor(props: TwoFactorFormProps) {
    super(props);
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.closeModal}>
        <ModalHeader toggle={this.props.closeModal}>
          <i className="send-icon fa fa-paper-plane"></i>
          Enter 2-Factor-Authenticate Code
        </ModalHeader>
        <hr/>
        <ModalBody>
          <Input type="text" name="tfa_code" placeholder="123456" onChange={this.props.handleChange}></Input>
        </ModalBody>
        <Button color="success" onClick={this.props.handleSubmit}>CONFIRM</Button>
      </Modal>
    );
  }
}
