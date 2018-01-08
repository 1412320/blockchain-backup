import * as React from 'react';
import { Modal, ModalBody, ModalHeader, Input, Button, Label, FormGroup } from 'reactstrap';

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
          <i className="send-icon fa fa-shield"></i>
           Confirm Security Info
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="password">
              <i className="send-icon fa fa-unlock"></i>
              Password: 
            </Label>
            <Input type="password" name="password" placeholder="******" onChange={this.props.handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="tfa_code">
              <i className="send-icon fa fa-key"></i>
              Two-Factor code: 
            </Label>
            <Input type="text" name="tfa_code" placeholder="123456" onChange={this.props.handleChange}></Input>
          </FormGroup>
        <Button color="success" style={{width: "100%"}} onClick={this.props.handleSubmit}>CONFIRM</Button>
        </ModalBody>
      </Modal>
    );
  }
}
