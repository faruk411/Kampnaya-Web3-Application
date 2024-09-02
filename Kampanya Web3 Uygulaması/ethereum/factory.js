import web3 from "./web3";
import CampaingnFactory from "./build/CampaignFactory.json";


const instance = new web3.eth.Contract(
    JSON.parse(CampaingnFactory.interface),
    'deploy edildikten sonra dağıtılan adres'
);

export default instance;