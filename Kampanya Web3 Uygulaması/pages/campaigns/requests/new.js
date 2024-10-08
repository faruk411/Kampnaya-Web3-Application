import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component{

    state ={
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props){

        const { address } = props.query;

        return { address };

    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { value, description, recipient } = this.state;

        this.setState({loading: true, errorMessage:''});

        try{
            
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
                ).send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        }catch (err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }

    render(){
        return(
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a className="btn btn-outline-secondary ">Geri dön</a>
                </Link>
                <br/>
                <h3>İstek Oluştur</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Açıklama</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({description: event.target.value})}
                            className="card shadow-lg"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ether Miktarı</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                            className="card shadow-lg"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Alıcı</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={event => this.setState({recipient: event.target.value})}
                            className="card shadow-lg"
                        />
                    </Form.Field>
                    <Message error header="Hata!!!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Kaydet</Button>
                </Form>
            </Layout>
            
        );
    }
}

export default RequestNew;