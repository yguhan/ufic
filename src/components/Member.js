import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import MemberInfoList from './MemberInfoList';
import TokenHolderList from './TokenHolderList';
import * as API from '../lib/api';
import moment from 'moment';
import { parseShortenString, getAssetAmountWithName } from '../lib/common';
import _ from 'lodash';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingMemberInfoList: true,
            fetchingTokenHolderMap: true,
            memberInfoList: [],
            tokenHolderMap: {},
        }   
    }

    componentDidMount() {
        this.setMemberInfoList();
        this.setTokenHolderMap();
    }

    setMemberInfoList = async() => {

        this.setState({
            fetchingMemberInfoList: true,
        });

        const txs = await API.getTxs(Constants.UFIC_REGISTER_ADDRESS);

        const memberInfoPromiseList = txs.map(async (tx) => {

            // NOTE: #register 0 Admin 2018-1
            // ['#register 0 Admin 2018-1', '0', 'Admin', ' 2018-1', '2018', '1']
            const matches = tx.attachment.match(/^#register (\d+) ([a-zA-Z가-힣]+)( (\d{4})-(\d))?/);
            if (!matches) return ; 
            
            // month(3) -> 2
            // 1~6(->0~5) -> 0 / 7~12(->6~11) -> 1
            let isActing = moment().year() == matches[4] && (parseInt(moment().month()/6) + 1).toString() == matches[5];
            isActing = isActing? '활동' : '비활동';

            const balance = await API.getBalance(tx.sender, Constants.UFIC_ASSET_ID);
            
            return {
                '기수': matches[1],
                '이름': matches[2],
                '주소': tx.sender,
                '보유량': getAssetAmountWithName(balance),
                '활동여부': isActing,
                tx: tx.id,
            }

        });

        let memberInfoList = await Promise.all(memberInfoPromiseList);
        
        memberInfoList = memberInfoList.filter((info) => info);
        // NOTE: Remove dupulicated info from same tx.sender
        memberInfoList = _.uniqBy(memberInfoList, '주소');
        memberInfoList.sort((prevMemberInfo, currentMemberInfo) => parseInt(_.get(prevMemberInfo, '기수')) < parseInt(_.get(currentMemberInfo, '기수')));

        // NOTE: Renew Case
        let renewMemberInfoPromiseList = txs.map(async (tx) => {

            // NOTE: #renew 2018-2
            // ['#renew 2018-2', '2018', '2']
            const matches = tx.attachment.match(/^#renew (\d{4})-(\d)/);
            if (!matches) return ; 
            
            // month(3) -> 2
            // 1~6(->0~5) -> 0 / 7~12(->6~11) -> 1
            let isActing = moment().year() == matches[1] && (parseInt(moment().month()/6) + 1).toString() == matches[2];
            isActing = isActing? '활동' : '비활동';
            
            return {
                '주소': tx.sender,
                '활동여부': isActing,
            }

        });

        let renewMemberInfoList = await Promise.all(renewMemberInfoPromiseList);
        renewMemberInfoList = renewMemberInfoList.filter((info) => _.get(info, '활동여부') === '활동');

        // Apply renew member info
        memberInfoList = memberInfoList.map((info) => {
            const matchingInfo = _.find(renewMemberInfoList, (renewMemberInfo) => _.get(renewMemberInfo, '주소') === _.get(info, '주소'));
            if (!matchingInfo) return info;

            info.활동여부 = '활동';
            return info;
        });

        this.setState({
            memberInfoList: memberInfoList,
            fetchingMemberInfoList: false,
        });

    }

    setTokenHolderMap = async() => {
        
        this.setState({
            fetchingTokenHolderMap: true,
        })

        const tokenHolderMap = await API.getAssetDistribution(Constants.UFIC_ASSET_ID);

        this.setState({
            tokenHolderMap: tokenHolderMap,
            fetchingTokenHolderMap: false,
        })
    }

    getMemberRankInfo = (memberInfoList) => {
        
        const getAmount = (memberInfo) => {
            
            const matches = _.get(memberInfo, '보유량').match(/^(\d+) UFIC$/);
            if (!matches) return 0;

            return matches[1];
        };

        const sortedMemberInfoList = _.sortBy(memberInfoList, [(memberInfo) => {
    
            return parseInt(getAmount(memberInfo));
    
        }])
        .reverse();

        let memberRankInfoList = sortedMemberInfoList.reduce((memberRankInfoList, memberInfo, i) => {

            let rank;

            if (!i) {
                rank = 1;
            } else {
                if (memberRankInfoList[i-1].보유량 == memberInfo.보유량) {
                    rank = memberRankInfoList[i-1].순위;
                } else {
                    rank = memberRankInfoList[i-1].순위 + 1;
                }
            }
             
            memberRankInfoList.push(_.assign({
                '순위': rank,
            }, _.pick(memberInfo, ['기수', '이름', '주소', '보유량'])));

            return memberRankInfoList;
            
        }, []);

        // Decoration
        memberRankInfoList = memberRankInfoList.map((memberInfo) => {
            if (memberInfo.순위 > 3) return memberInfo;

            memberInfo.순위 += ' ' + '★'.repeat(4 -memberInfo.순위);
        
            return memberInfo;
        })
        
        return memberRankInfoList;

    }

    render() {
        const { memberInfoList, fetchingMemberInfoList, tokenHolderMap, fetchingTokenHolderMap } = this.state;
        const actingMemberInfoList = memberInfoList.filter((member) => member['활동여부'] == '활동');
        const memberRankInfoList = this.getMemberRankInfo(actingMemberInfoList);

        return (
        <div className="container">
            <div><h1></h1></div>
            <div>
                <ul className="nav nav-tabs">
                    <li className="active">
                        <a data-toggle="tab" href="#total_member">전체 멤버</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#acting_member">활동 멤버</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#member_rank">랭킹</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#token_holder">토큰 홀더</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#register_process">등록 방법</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#renew_process">갱신 방법</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <h5>@등록 지갑 주소: <a href={`https://wavesexplorer.com/address/${Constants.UFIC_REGISTER_ADDRESS}`}>{Constants.UFIC_REGISTER_ADDRESS}</a></h5>
                    <div id="total_member" className="tab-pane fade in active">
                        {!fetchingMemberInfoList &&
                            <MemberInfoList memberInfoList={memberInfoList} />
                        }
                    </div>
                    <div id="acting_member" className="tab-pane fade">
                        {!fetchingMemberInfoList &&
                            <MemberInfoList memberInfoList={actingMemberInfoList} />
                        }
                    </div>
                    <div id="member_rank" className="tab-pane fade">
                        {!fetchingMemberInfoList &&
                            <MemberInfoList memberInfoList={memberRankInfoList} />
                        }
                    </div>
                    <div id="token_holder" className="tab-pane fade">
                        {!fetchingTokenHolderMap &&
                            <TokenHolderList tokenHolderMap={tokenHolderMap} />
                        }
                    </div>
                    <div id="register_process" className="tab-pane fade">
                        <div className="alert alert-success" role="alert">                            
                            <p>등록 지갑 주소에 아래 메시지와 함께 1 UFIC을 전송</p>
                            <p>#register [기수] [이름] [년도-학기]</p>
                            <br/>
                            <p>예시)</p>
                            <p>활동 멤버: #register 10 홍길동 2018-1</p>
                            <p>비활동 멤버: #register 5 홍길순</p>
                            <br/>
                            <p>* 1학기 1월~6월 /2학기 7월~12월</p>
                        </div>
                    </div>
                    <div id="renew_process" className="tab-pane fade">
                        <div className="alert alert-success" role="alert">
                            <p>기존 기수 멤버가 다음 학기 활동을 계속할 경우</p>                            
                            <p>등록 지갑 주소에 아래 메시지와 함께 1 UFIC을 전송</p>
                            <p>#renew [년도-학기]</p>
                            <br/>
                            <p>예시)</p>
                            <p>#renew 2018-2</p>
                            <br/>
                            <p>* 1학기 1월~6월 /2학기 7월~12월</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      );
    }   
}

export default Member;
