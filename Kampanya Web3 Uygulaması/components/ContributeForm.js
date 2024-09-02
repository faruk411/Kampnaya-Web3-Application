import React, {Component} from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component{

    state={
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) =>{
        event.preventDefault();
        
        const campaign = Campaign(this.props.address);
        this.setState({loading: true, errorMessage:''});

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
        Router.replaceRoute(`/campaigns/${this.props.address}`)
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false, value: ''});
        
    };

    render(){
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <laber><h4>Katkı Miktarı</h4></laber>
                    <Input 
                        value= {this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label="ether" 
                        labelPosition="right" 
                        style={{boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'}}
                    />
                </Form.Field>
                <Message error header={"Hata!!!"}  content={this.state.errorMessage}/>
                <Button primary loading={this.state.loading} style={{borderRadius:'15px',boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'}}>
                    Kampanyaya destek ver
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;