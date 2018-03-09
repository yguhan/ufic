import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import _ from 'lodash';
import { parseShortenString, getAssetAmount } from '../lib/common';

class VoteInfoList extends Component {
    constructor(props) {
        super(props);
    }

    getSurveyText(attachment) {
        // #survey '저녁 메뉴' '삼겹살/치킨'
        const matches = attachment.match(/^#survey '(.+)' '(.+)'$/);
        if (!matches) return ;

        const question = matches[1];
        const choices = matches[2].split('/');
        const choiceText = _.reduce(choices, (choiceText, choice, i) => {
            return choiceText + `${i+1}. ${choice} `;
        }, '');
        
        const surveyText = `${question}?\n${choiceText}`;
        return surveyText;
    }

    getChoiceToVoteResultMap(votes) {
        // #vote A32m 2
        const choiceToVoteResultMap = _.reduce(votes, (map, vote) => {
  
            const matches = vote.attachment.match(/^#vote \w{4} (\d)$/);
            if (!matches) return map;

            const choice = matches[1];
            const amount = getAssetAmount(vote.amount);

            if (!map[choice]) {
                _.set(map, choice, {
                    'amount': amount,
                    'txList': [vote.id],
                });
            } else {
                map[choice].amount += amount;
                map[choice].txList.push(vote.id);
            }

            return map;
            
        }, {});

        return choiceToVoteResultMap;
        
    }

    render() {
        const { txToVoteMap } = this.props;

        return (
            <div>
                {_.keys(txToVoteMap).map((tx, i) => {

                    const choiceToVoteResultMap = this.getChoiceToVoteResultMap(txToVoteMap[tx].votes);

                    return (
                        <div className="alert alert-success" role="alert">
                            
                            <p>tx: <a href={`https://wavesexplorer.com/tx/${txToVoteMap[tx].survey.id}`}>{ parseShortenString(txToVoteMap[tx].survey.id) }</a></p>
                            <p>{this.getSurveyText(txToVoteMap[tx].survey.attachment)}</p>
                            <p>투표 방법: #vote {tx.slice(0,4)} 선택번호</p>
                            <br/>
                            <p>투표 결과: </p>
                            {_.keys(choiceToVoteResultMap).map((choice, i) => {
                                return (
                                <p>{choice}. {choiceToVoteResultMap[choice].amount}</p>
                                );
                            })}
                            
                        </div>
                    )
                })}

            </div>
        );
    }
}

export default VoteInfoList;
