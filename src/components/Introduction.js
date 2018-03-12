import React, { Component } from 'react';
import * as Constants from '../constants/constants'

class Introduction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    
        return (
            <div className="container">
                <div><h1></h1></div>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="active">
                            <a data-toggle="tab" href="#ufic_explorer">UFIC Explorer</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#ufic_explorer_team">팀</a>
                        </li>
                        
                    </ul>
                    <div className="tab-content">
                        <div><h1></h1></div>
                        <div id="ufic_explorer" className="tab-pane fade in active">
                    
                            <div className="alert alert-success" role="alert">
                                <p>UFIC Explorer는 <a href="http://wavesplatform.com">Waves</a> 기반 토큰 UFIC의 탐색기입니다.</p>
                                <br/>
                                {/* TODO: inserting ufic logo */}
                                {/* <img class="ufic_logo" src={'ufic_logo_v1.png'} />
                                <br/>
                                <br/> */}
                                <p>UFIC 토큰은 주식/암호화폐 연합 동아리 <a href="http://cafe.naver.com/ufic">UFIC</a>에서 동아리 운영 지원을 목적으로 발행된 토큰입니다.</p>
                                <p>UFIC 토큰을 이용해 동아리원 명부, 동아리 계좌의 입출금 내역, 투표 등 다양한 활동을 Waves 블록체인 위에 기록할 수 있습니다.</p>
                                <p>UFIC 토큰에 대한 자세한 정보는 <a href="https://wavesexplorer.com/tx/E63d9G5CTmyABNL3ztM72zi5c7PcM1PRtnR3bL9LCTCX">이곳</a>에서 확인할 수 있습니다.</p>
                                <br/>
                                <p>UFIC 토큰과 블록체인을 이용해 얻고자 하는 효과는 다음과 같습니다.</p>
                                <p>1. 보존성 - 연합 동아리의 특성상 선배 기수에 대한 체계적인 연락처 관리가 어렵습니다. 기수별 동아리원 정보를 블록체인 위에 보존하면 UFIC 토큰을 통한 메시지 전송이 가능합니다.</p>
                                <p>2. 투명성 - 동아리 계좌의 입출금 내역이 블록체인 위에 모두 기록되어 동아리원 누구나 입출금 내역을 볼 수 있습니다. 입출금 시 함께 작성된 메모를 통해 동아리 회비의 사용 목적을 확인할 수 있습니다.</p>
                                <p>3. 참여도에 따른 보상 - 성실한 동아리 활동을 격려하기 위해 보상 차원으로 UFIC 토큰을 분배합니다. 지각, 결석 등에 대한 페널티로 UFIC 토큰을 회수하며 꾸준한 활동 및 우수한 성과에 대한 보상으로 UFIC 토큰을 지급합니다. UFIC 토큰 보유자에게는 투표, 동아리내 게임 활동, 수익금 분배에 있어 지분에 비례한 영향력을 행사할 수 있는 권리가 주어집니다.</p> 
                                <br/>
                                <p>UFIC Explorer는 <a href="https://github.com/yguhan/ufic-app">깃허브</a>에서 오픈 소스로 관리됩니다.</p>
                            </div>

                        </div>

                        <div id="ufic_explorer_team" className="tab-pane fade">
                        
                            <div className="alert alert-success" role="alert">
                                <p>개발</p>
                                <p>팀장: 8기 한윤구</p>
                                <br/>
                                
                                <p>기획</p>
                                <p>팀장: 9기 오영은</p>
                                <p>팀원: 7기 나혜림, 10기 문수인, 6기 오형석, 10기 김현지</p>
                                <br/>

                                <p>운영</p>
                                <p>팀장: 7기 이범희</p>
                                <p>팀원: 10기 전가영</p>
                                <br />
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        );

    }
}

export default Introduction;
