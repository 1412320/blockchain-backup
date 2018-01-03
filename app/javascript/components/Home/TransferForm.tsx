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

  handleChange(e) {
    e.preventDefault();
    if (e.target.name == 'transcription[recipient_id]')
      this.setState({
        recipient_id: e.target.value
      });
    if (e.target.name == 'transcription[amount]')
      this.setState({
        amount: e.target.value
      });
    if (e.target.name == 'transcription[description]')
      this.setState({
        description: e.target.value
      });
  }

  render() {
    return (
      <Form className="wallet-form" onSubmit={this.props.handleSubmit}>
        <FormGroup>
          <Label for="recipient-id">To: </Label>
          <Input type="text" name="transcription[recipient_id]"
                 id="recipient-id" placeholder="Paste recipient wallet id"
                 onChange={this.props.handleChange}/>
        </FormGroup>

        <FormGroup>
          <Label for="amount">Amount: </Label>
          <InputGroup>
            <Input type="text" name="transcription[amount]"
                   id="amount" placeholder="0"
                   onChange={this.props.handleChange}/>
            <InputGroupAddon>BTC</InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for="description">Description: </Label>
          <Input type="textarea" name="transcription[description]"
                 id="description" onChange={this.props.handleChange}/>
        </FormGroup>
        <hr/>
        <Button className="wallet-submit">CONTINUE</Button>
      </Form>
    );
  }
}
