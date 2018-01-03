import * as React from 'react';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { walletActions } from '../../actions';

interface WalletFormProps {
  sender_id: string,
  handleSuccess(): void,
  handleSubmit() :void,
  handleChange() :void
}

export class WalletForm extends React.Component<WalletFormProps, {}> {
  constructor(props: WalletFormProps) {
    super(props);
  }

  render() {
    return (
      <Form className="wallet-form" onSubmit={this.props.handleSubmit}>
        <FormGroup>
          <Label for="recipient-id">To: </Label>
          <Input type="text" name="transaction[recipient_id]"
                 id="recipient-id" placeholder="Paste recipient wallet id"
                 onChange={this.props.handleChange}/>
        </FormGroup>

        <FormGroup>
          <Label for="amount">Amount: </Label>
          <InputGroup>
            <Input type="text" name="transaction[amount]"
                   id="amount" placeholder="0"
                   onChange={this.props.handleChange}/>
            <InputGroupAddon>KCOIN</InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for="description">Description: </Label>
          <Input type="textarea" name="transaction[description]"
                 id="description" onChange={this.props.handleChange}/>
        </FormGroup>
        <hr/>
        <Button type="submit" className="wallet-submit">CONTINUE</Button>
      </Form>
    );
  }
}
