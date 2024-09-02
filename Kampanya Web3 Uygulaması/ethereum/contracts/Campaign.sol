//SPDX-License-Identifier: MIT

pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function creareCampaign(uint minimum) public{
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request{
        string description; // bağışın ne için yapılacğıniçin açıklama verisini tutan değişken
        uint value; // gönderilen parayı tutan değer
        address recipient; // paranın gönderileceği adres
        bool complate; 
        uint approvalCount;
        mapping (address => bool) approvals;
        
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount; 

    function Campaign( uint minimum, address creator) public {
        manager =creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;

        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) 
            public restricted
    {
        
        Request memory newRequest = Request({

            description:description,
            value:value,
            recipient:recipient,
            complate:false,
            approvalCount:0
        });

        requests.push(newRequest);

    }
    function approveRequest(uint index) public {

        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    function finalizeRequest(uint index) public restricted{

        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complate);

        request.recipient.transfer(request.value);
        request.complate = true;
    }
    function getSummary() public view returns(uint,uint,uint,uint,address){
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }
    function getRequestCount() public view returns(uint) {
        return requests.length;
    }

}