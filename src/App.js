import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Member from './components/Member';
import Account from './components/Account';
import Vote from './components/Vote';
import Introduction from './components/Introduction';

class App extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
        <div className="App">
            <div class="ufic_title_div">
                <span class="ufic_title_span">UFIC Explorer</span>
            </div>
            <div class="tabbable tabs-left" style={{width: '100%'}}>
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#dongari_member" data-toggle="tab">동아리원</a>
                    </li>
                    <li>
                        <a href="#dongari_account" data-toggle="tab">동아리 계좌</a>
                    </li>
                    <li>
                        <a href="#vote" data-toggle="tab">투표</a>
                    </li>
                    <li>
                        <a href="#introduction" data-toggle="tab">소개</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="dongari_member">
                        <Member />
                    </div>
                    <div class="tab-pane" id="dongari_account">
                        <Account />
                    </div>
                    <div class="tab-pane" id="vote">
                        <Vote />
                    </div>
                    <div class="tab-pane" id="introduction">
                        <Introduction />
                    </div>
                </div>
            </div>
      
          {/* <div class="modal fade" id="pleaseWaitDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
              <div class="modal-dialog">
                  <div class="modal-content">
                  <div class="modal-body">
                          <h4>Processing...</h4>
                      <div class="progress">
                          <div class="progress-bar progress-bar-striped active" role="progressbar"
                          aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                          </div>
                      </div>
                  </div>
                  </div>
              </div>
          </div>
          <div class="modal" id="show_detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                              <h4 class="modal-title">Posting Detail</h4>
                      </div>
                      <div class="modal-body">
                          <div id='show_detail_area'></div>
                      </div>
                  </div>
              </div>
          </div> */}
            <footer class="footer">
                <div class="container">
                    <span class="text-muted">UFIC Explorer | operated by <a href="http://cafe.naver.com/ufic">주식/암호화폐 연합 투자동아리 UFIC</a></span>
                </div>
            </footer>      
        </div>
    );
  }
}

export default App;
