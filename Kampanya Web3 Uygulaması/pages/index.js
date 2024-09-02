import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/layout";
import styles from '../styles/CampaignIndex.module.css';
import { Link } from "../routes";



class CampaignIndex extends Component{

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            
                return {
                    
                    header: address,
                    description: (
                        <Link route={`/campaigns/${address}`}>
                            <a style={{color: '#0098f1'}}>Kampanyayı Görüntüle</a>
                        </Link>
                    ),
                    fluid: true,
                    className: styles.customCard
                    
                };
            
        });
        return (
            <Card.Group className={styles.customCardGroup}  items={items}/>         
            );
    }

    render(){

        return (
        <Layout>
            <div>
                <h3>Açık Kampanyalar</h3>
                <br/>
                <Link route="/campaigns/new">
                    <Button style = {{ marginLeft: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',borderRadius: '15px' }} 
                        floated="right" content="Kampanya oluştur" icon="add circle" primary />
                </Link>
                {this.renderCampaigns()}                
            </div>
        </Layout>
        );
    }

}

export default CampaignIndex;