import React, {Component} from "react";
import Layout from "../../components/layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';


class CampaignNew extends Component{

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) =>{
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .creareCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.push('/');
        }catch(err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    };

    render() {
        return (
        <Layout>
            <br/>
            <div style={{boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',borderRadius: '15px'}} className="card shadow-lg bg-light">
                <div className="card-body">
                    <h3>Kampanya Oluştur</h3>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Minumum Katkı Payı</label>
                            <Input 
                                label="wei" 
                                labelPosition="right"
                                value = {this.state.minimumContribution}
                                onChange={event  => this.setState({minimumContribution: event.target.value})}
                                />
                        </Form.Field>
                        <Message error header= "Hata!!" content={this.state.errorMessage} />
                        <Button style={{borderRadius: '15px'}} type="submit" loading={this.state.loading} primary>Oluştur</Button>
                    </Form>
                </div>
             </div>
        </Layout>
        );
    }
}
 export default CampaignNew;