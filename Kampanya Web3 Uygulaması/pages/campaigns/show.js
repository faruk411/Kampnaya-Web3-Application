import React, {Component} from "react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Card, Grid } from "semantic-ui-react";
import { Link } from "../../routes";


class CampaignShow extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }
    renderCards(){
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
        } = this.props;

        const items = [
            {
                header: `${manager}`,  // String olarak kullanın
                meta: 'Yönetici adresi',
                description: 'Yönetici bu kampanyayı oluşturdu ve para çekme talepleri oluşturabilir',
                style: { overflowWrap: "break-word" },
            },
            {
                header: `${minimumContribution}`,  // String olarak kullanın
                meta: 'Minum Katkı Payı',
                description: 'Onaylayıcı olabilmek için en az bu kadar katkıda bulunmalısınız',
            },
            {
                header: `${requestsCount}`,  // String olarak kullanın
                meta: 'İstek sayısı',
                description: 'Talep sözleşmeden para çekme işlemi yapar. Kampanyaya katkıda bulunanlar tarafından onaylanması gerekir',
            },
            {
                header: `${approversCount}`,  // String olarak kullanın
                meta: 'Onaylayanların sayısı',
                description: 'Bu kampanyaya bağışta bulunan kişi sayısı',
            },
            {
                header: `${web3.utils.fromWei(balance, 'ether')}`,  // String olarak kullanın
                meta: 'Kampanya Bakiyesi (ether)',
                description: 'Bu bakiye kampanyanın harcayacağı tutardır',
            },
        ];
        
        //return <Card.Group items={items} />;

        return (
            <div className="row">
                {items.map((item, index) => (
                    <div key={index} className="col-md-6 mb-4">
                        <div className="card" style={{ backgroundColor: '#f0f0f0', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', borderRadius: '15px' }}>
                            <div className="card-body">
                                <h3>{item.header}</h3>
                                <p className="text-muted">{item.meta}</p>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
        
    }

    render(){
        return (
            <Layout>
                <h3>Kampanya Detayı</h3>
                
                    <Grid>
                        <Grid.Column width={10}> 
                            {this.renderCards()}
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a className="btn btn-success">İstekleri Görüntüle</a>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm  address={this.props.address}/>
                        </Grid.Column>
                    </Grid>

            </Layout>

        );
    }
}

export default CampaignShow;