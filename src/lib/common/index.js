// import * as WavesAPI from 'waves-api';
import * as Constants from '../../constants/constants';
import _ from 'underscore';
import Base58 from 'base-58';
import {TextDecoder} from 'text-encoding';

export function parseFormattedAssetNumber(assetId, number) {
    switch (assetId) {
        case Constants.WAVES_ASSET_ID: {
            return number / 10**8;
        }
        case Constants.UFIC_ASSET_ID: {
            return number / 10**6;
        }
        default: {
            return number;
        }
    }
}

export function parseShortenString(message, limit=4) {
    // NOTE: message should be String type
    if (!_.isString(message)) return message;
    return `${message.toString().slice(0, limit)} ...`;
}

export function decodeAttachment(encodedMessage) {
    // NOTE: WAVES encodes attachment message using base58 
    // Base58.decode(encodedMessage) -> Array Buffer
    if (!_.isString(encodedMessage)) return encodedMessage;

    return new TextDecoder().decode(Base58.decode(encodedMessage)); 
}