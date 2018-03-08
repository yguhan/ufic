// import * as WavesAPI from 'waves-api';
import * as Constants from '../../constants/constants';
import _ from 'lodash';
import Base58 from 'base-58';
import {TextDecoder} from 'text-encoding';

export function parseShortenString(message, limit=4) {
    // NOTE: message should be String type
    if (!_.isString(message)) return message;
    return `${message.toString().slice(0, limit)} ...`;
}

export function decodeAttachment(encodedMessage) {
    // NOTE: WAVES encodes attachment message using base58 
    // Base58.decode(encodedMessage) -> Array Buffer
    // NOTE: No need to decode in v2 
    if (!_.isString(encodedMessage)) return encodedMessage;

    return new TextDecoder().decode(Base58.decode(encodedMessage)); 
}

export function getAssetAmount(money) {
    if (!money) return 0;

    // NOTE: used in v2
    // big number to int -> int num / precision
    const numberOfCoins = parseInt(_.get(money, '_coins.c').join('')) / (10**_.get(money, 'asset.precision'));
    return numberOfCoins;

}

export function getAssetAmountWithName(money) {
    if (!money) return 0;

    // NOTE: used in v2
    // big number to int -> int num / precision
    // let numberOfCoins = parseInt(_.get(money, '_coins.c').join('')) / (10**_.get(money, 'asset.precision'));
    const numberOfCoins = getAssetAmount(money);
    return `${numberOfCoins} ${_.get(money, 'asset.name')}`;
}

export function getAssetAmountWithNameById(amount, assetId) {
    if (!amount) return 0;
    
    switch (assetId) {
        case Constants.WAVES_ASSET_ID: {
            return `${amount / 10**Constants.WAVES_ASSET_DECIMALS} Waves`;
        }
        case Constants.UFIC_ASSET_ID: {
            return `${amount / 10**Constants.UFIC_ASSET_DECIMALS} UFIC`;
        }
        default: {
            return `${amount}? Unknown`;
        }
    }
}