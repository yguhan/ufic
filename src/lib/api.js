import * as WavesAPI from 'waves-api';
import * as Constants from '../constants/constants';
const Waves = WavesAPI.create(WavesAPI.MAINNET_CONFIG);

export function getTxs(address) {
    return Waves.API.Node.v1.transactions.getList(address);
}

export function getBalance(address, assetId) {
    return Waves.API.Node.v1.assets.balance(address, assetId);
}

export function getAssetDistribution(assetId) {
    // Map
    return Waves.API.Node.v1.assets.distribution(assetId);
}
