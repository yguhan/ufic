import * as WavesAPI from 'waves-api';
import * as Constants from '../constants/constants';
const Waves = WavesAPI.create(WavesAPI.MAINNET_CONFIG);

export function getTxs(address) {
    // NOTE: limit 50
    // v1 json != v2 json   
    // SEE: https://github.com/wavesplatform/waves-api/tree/master/src/api/node
    return Waves.API.Node.v1.transactions.getList(address);
}

export function getBalance(address, assetId) {
    return Waves.API.Node.v1.assets.balance(address, assetId);
}

export function getAssetDistribution(assetId) {
    // Map
    return Waves.API.Node.v1.assets.distribution(assetId);
}
