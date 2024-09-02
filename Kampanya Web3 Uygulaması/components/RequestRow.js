import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";


class RequestRow extends Component {

    onApprove = async () => {

        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });

    };
    onFinilize = async () => {

        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });

    };  

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        console.log("approversCount : ", approversCount);
        const readyToFinalize = request.approvalCount.toString() > approversCount.toString() /2;

        return (

            <tr className={request.complate ? 'row-disabled' : (readyToFinalize ? 'row-positive' : '')}>
                <td>{id}</td>
                <td>{request.description}</td>
                <td>{web3.utils.fromWei(request.value, "ether")} ether</td>
                <td>{request.recipient}</td>
                <td>{request.approvalCount.toString()}/{approversCount.toString()}</td>
                <td> {request.complate ? null: (
                        <a className="btn btn-outline-success" onClick={this.onApprove} disabled={request.complate}>Onayla</a>
                        ) 
                    }</td>
                <td> {request.complate ? null : (
                        <a className="btn btn-outline-info" onClick={this.onFinilize} disabled={request.complate}>Sonuçladır</a>
                        )
                    } </td>
            </tr>
            // <Row>
            //     <Cell></Cell>
            //     <Cell></Cell>
            //     <Cell></Cell>
            //     <Cell></Cell>
            //     <Cell></Cell>
            // </Row>
        );
    }
}

export default RequestRow;
