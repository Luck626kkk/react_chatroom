import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import man from './man.png';
import fire from './fire' 

const database = fire.database();
let data=[];
let datas=[];
class Message extends React.Component {
  constructor(props){
    super(props);
    this.state={
        data:[]
    };
  }
  componentDidMount(){
    let messagesRef = database.ref('chatroom')
    .orderByKey()
    .limitToLast(100);
 
    messagesRef.on('child_added', async snapshot => {
      data = await {id: snapshot.key, name: snapshot.val().Name, message: snapshot.val().Message, time: snapshot.val().Time};
      await datas.push(data);
      this.setState({data:datas});

    });

  }
  render(){
    const messageElements = this.state.data.map((item) => {
      if(this.props.myName != item.name){
        return(
          <div className="message">
            <img src={man}/>
            <div className="message-content">
            <h3>{item.name}</h3>
              <p className="message-text">{item.message}</p>
            </div>
            <p className="message-time">{item.time}</p>
          </div>
        )
      }else{
        return(
          <div className="message myself">
            <p className="message-time">{item.time}</p>
            <div className="message-content">
              <p className="message-text">{item.message}</p>
            </div>
          </div>
        )
      }
      
     });

    if(this.state.data ==''){
      return <div>Loading</div>;
    }else{
      
      return <div className="room-body">{messageElements}</div>;
    }
    
  }

}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:""
    };
    console.log("constructor");
    
  }
  
  componentDidMount(){
    console.log("componentDidMount");
    let name = document.getElementById('name');
    name.focus();
    document.title = "React Chatroom";
   
  }
  

 
  render(){
    return <div className="wrap">
        <div className="header">React chatroom with firebase</div>

        <div className="cotainer">
          <div className="name">
            <h2>Name: {this.state.name}</h2>
          </div>

          <div className="room">
            <div className="top">
              <img src={man}/>
              <h2>My group room</h2>
            </div>
            <Message myName={this.state.name}/>
            <div className="room-bottom">
              <div className="block"></div>
              <textarea id="input" onKeyPress={this.onKeyPress.bind(this)}></textarea>
            </div>
          </div>
        </div>

        <div id="modal">
          <div className="modal-container">
            <div className="modal-header">
              <h1>請輸入暱稱</h1>
            </div>
            <div className="modal-body">
              <input type="text" id="name" />
            </div>
            <button id="setName" onClick={this.onClick.bind(this)}>確定</button>
          </div>
        </div> 
      </div>;
  }
  onKeyPress(e){
    let code = (e.keyCode ? e.keyCode : e.which);
    let txt = document.getElementById('input'); //获取textarea的值
  
    if (code == 13 && txt!='') { //Enter keycode 
      e.preventDefault();

      // 抓取現在時間
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const format = (hours >= 12) ? "下午" : "上午";
      console.log(format+ hours+":"+minutes);

      //找最後一筆id 並+1
      let lastId = parseInt(datas[datas.length-1].id)+1;
      console.log(lastId);

      database.ref('chatroom/'+lastId).set({
        Name:this.state.name,
        Message: txt.value,
        Time: (format+ hours+":"+minutes)
      });
     txt.value = '';
    }
  }
  async onClick(){
    let newName = document.getElementById('name').value;
    newName.trim();
    if(newName !=''){
      await this.setState({name: newName});
      console.log(this.state.name);
      const myElement = document.querySelector("#modal");  // 取得ID為homeTitle的元素 
      myElement.style.display = "none";           // 透過style.backgroundColor設定背景顏色
      
    }
    
  }
 

}
 



export default App;
