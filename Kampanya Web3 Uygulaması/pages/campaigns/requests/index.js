import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {

    static async getInitialProps(props) {

        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );
        

        return { address, requests, requestCount, approversCount };
    }
    
    
    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow 
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }

    render() {
        //const { Header, Row, HeaderCell, Body, Cell } = Table;

        return (
            <Layout>
                <h3>İstekler</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a className="btn btn-primary">İstek Ekle</a>
                </Link>
                <hr/>
                <br/>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Açıklama</th>
                            <th>Para Değeri</th>
                            <th>Alıcı Adresi</th>
                            <th>Onay Sayısı</th>
                            <th>Onayla</th>
                            <th>Sonuçlandır</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>

                <div>
                    {this.props.requestCount.toString()} istek bulundu
                </div>

                {/* Semantic-ui tablo şeması örnek olarak dursun istedim , 
                ben Boostrapin tablosunu daha çok sevdiğim için onu seçtim */}
                
                {/* <Table>
                    <Header>
                        <Row>
                            <HeaderCell></HeaderCell>
                            <HeaderCell></HeaderCell>
                            <HeaderCell></HeaderCell>
                            <HeaderCell></HeaderCell>
                            <HeaderCell></HeaderCell>
                            <HeaderCell></HeaderCell>
                            <HeaderCell></HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        
                    </Body>
                </Table> */}
            </Layout>
        );
    }
}

export default RequestIndex;
