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
    let numberOfCoins = parseInt(_.get(money, '_coins.c').join('')) / (10**_.get(money, 'asset.precision'));
    return `${numberOfCoins} ${_.get(money, 'asset.name')}`;
}