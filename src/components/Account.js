import React, { Component } from 'react';
import * as Constants from '../constants/constants'
import TransactionList from './TransactionList';
import * as API from '../lib/api';
import _ from 'lodash';

class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {
        txList: [],
        fetching: true,
      }
    }

    componentDidMount() {
        this.getTxs();
    }

    getTxs = async() => {
        
        this.setState({
            fetching: true,
        });
        let txList = await API.getTxs(Constants.UFIC_WALLET_ADDRESS); 

        this.setState({
            txList: txList,
            fetching: false, // done
        });
    }

    render() {
        const {txList, fetching} = this.state;
        const depositTxList = txList.filter((tx) => tx.recipient === Constants.UFIC_WALLET_ADDRESS);
        const withdrawalTxList = txList.filter((tx) => tx.sender === Constants.UFIC_WALLET_ADDRESS);

        return (
            <div className="container">
                <div><h1></h1></div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="active">
                            <a data-toggle="tab" href="#total_tx">전체 거래 내역</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#deposit_tx">입금 내역</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#withdrawal_tx">출금 내역</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#buy_process">토큰 구매 절차</a>
                        </li>
                    </ul>
                    <div className="tab-content">

                        <h5>@동아리 지갑 주소: <a href={`https://wavesexplorer.com/address/${Constants.UFIC_WALLET_ADDRESS}`}>{Constants.UFIC_WALLET_ADDRESS}</a></h5>
                        <div id="total_tx" className="tab-pane fade in active">
                            { !fetching &&
                                <TransactionList txList={txList} />
                            }
                        </div>
                        <div id="deposit_tx" className="tab-pane fade">
                            { !fetching && 
                                <TransactionList txList={depositTxList} />
                            }
                        </div>
                        <div id="withdrawal_tx" className="tab-pane fade">
                            { !fetching && 
                                <TransactionList txList={withdrawalTxList} />
                            }
                        </div>
                        <div id="buy_process" className="tab-pane fade">
                            <div className="alert alert-success" role="alert">
                                <p>주식/암호화폐 연합 동아리 UFIC의 동아리 회비는 3만원 입니다.</p>
                                <p>동아리 회비는 Waves로 전환되어 블록체인 위에서 투명하게 관리되며, UFIC 토큰(1000개 내외)을 구입하는 방식으로 동아리비 회비 납부가 진행됩니다.</p>
                                <p>Waves를 직접 구매하여 UFIC 토큰을 구매하거나, 동아리 회장에게 입금해 일괄적으로 Waves를 정산받은 뒤에 UFIC 토큰을 구매하는 두 가지 방법 모두 가능합니다.</p>
                                <p>UFIC 토큰은 Waves DEX(탈중앙화 거래소)에 상장되어 있으며 UFIC/WAVES 페어로 구매할 수 있습니다.</p>
                                <br/>
                                <p>세부 절차는 다음과 같습니다.</p>
                                <p>1. 구글 플레이 스토어 또는 애플 앱스토어에서 Waves Wallet을 다운 받습니다.</p>
                                <p>2. CREATE NEW WALLET을 눌러 Waves 모바일 지갑을 새로 생성합니다.</p>
                                <p>3. 이때 발급받는 개인키(단어 15개)는 꼭 백업을 해야합니다. 분실하면 지갑에 있는 암호화폐를 되찾을 수 없습니다.</p>
                                <p>4. Waves Wallet에 접속해 DEX 탭을 선택하고, 우측 하단의 +버튼을 클릭하여 Markets으로 이동합니다.</p>
                                <p>5. Markets에서 우측 상단에 막대 모양 아이콘을 눌러 Add market을 선택합니다.</p>
                                <p>6. Amount Asset에는 UFIC의 Asset ID인 {Constants.UFIC_ASSET_ID}를 Price Asset에는 Waves의 Asset ID인 WAVES를 입력하고 ADD 버튼을 누릅니다.</p>
                                <p>7. DEX에 생성된 UFIC/WAVES 페어를 클릭합니다.</p>
                                <p>8. ORDERBOOK에서 판매되는 UFIC 토큰을 정해진 수량(1000개 내외로 3만원이 되도록 동아리 회장이 Sell Order를 미리 만들어 놓아야 합니다.)을 구입합니다.</p>
                                <p>9. 마지막으로 Transactions 탭을 눌러 UFIC 토큰이 들어왔는지 확인합니다.</p>
                                <br/>
                                <p>* 다소 복잡해 보일 수 있으나, 한번만 따라해보면 생각보다 어렵지 않습니다 ^^</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
