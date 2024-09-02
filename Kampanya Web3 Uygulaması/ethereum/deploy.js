const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
    'Metamask tarafından verilen 12 kurtarma kelimesi',
    'Kendi test ağı linkiniz Sepoila vb.'
);
const web3 = new Web3(provider);

const deploy = async()=>{

    const accounts = await web3.eth.getAccounts();

    console.log('hesaptan dağıtılıyor ', accounts[0]);
    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000' , from: accounts[0]});
    

    
    console.log('sözleşme şu adrese dağıtıldı => ',result.options.address);

    provider.engine.stop();



};
deploy();
