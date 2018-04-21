import * as WavesAPI from 'waves-api';
import * as Constants from '../constants/constants';
import _ from 'lodash';
const Waves = WavesAPI.create(WavesAPI.MAINNET_CONFIG);

export function getTxs(address) {
    // SEE: https://github.com/wavesplatform/waves-api/blob/master/src/api/node/v2/addresses.ts
    return Waves.API.Node.v2.addresses.transactions(address);
}

export function getV1Txs(address) {
    // NOTE: In v2 error occurs: Access-Control-Allow-Origin multiple domain in orderbook type tx
    return Waves.API.Node.v1.transactions.getList(address);
}

export function getBalances(address) {
    return Waves.API.Node.v2.addresses.balances(address);
}

// NOTE: Waves.API.Node.v2.addresses.balance(address, assetId) always return 0 amount
export function getBalance(address, assetId=Constants.WAVES_ASSET_ID) {
    return Waves.API.Node.v2.addresses.balances(address).then((balances) => {
        return _.find(balances, (balance) => _.get(balance, 'asset.id') == assetId);
    })
}

export function getAssetDistribution(assetId) {
    // return type is Map
    return Waves.API.Node.v1.assets.distribution(assetId);
}
