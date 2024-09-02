import Web3 from "web3";

let web3

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // tarayıcaki metamask çalıştığı yer
    web3 = new Web3(window.web3.currentProvider);    

}else{
    // sunucudayız veya kullanıcı metamask çalştırmıyor
    const provider = new Web3.providers.HttpProvider(
        'Kendi test ağı linkiniz Sepoila vb.'
    );
    web3 = new Web3(provider);
}

export default web3;