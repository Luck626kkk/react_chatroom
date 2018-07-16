import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import man from './man.png';
import fire from './fire' 

const database = fire.database();

class Message extends React.Component {
 
  render(){
    
    return  <div className="message">
      <img src={man}/>
      <div className="message-content">
        <h3></h3>
        <p className="message-text">lorem100</p>
      </div>
      <p className="message-time">下午 3:10</p>
    </div>;
  }

}
let message=[];
let messages=[];
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      someData:{}
    };
    console.log("constructor");
    
  }
  
  componentWillMount(){
    console.log("componentWillMount");
    messages.push(<Message name={"8787"}/>);
  }
  componentDidMount(){
    let messagesRef = database.ref('chatroom')
    .orderByKey()
    .limitToLast(100);
 
    messagesRef.on('child_added',async snapshot => {
      message = { text: snapshot.val(), id: snapshot.key };
      console.log(message); 
      console.log(snapshot.val().Name); 
      await messages.push(<Message name={snapshot.val().Name}/>);
      
    });
    
      
  }

 
  render(){
    return <div className="wrap">
        <div className="header">React chatroom with firebase</div>

        <div className="cotainer">
          <div className="name">
            <h2>Name: Luck</h2>
            <button>Reset Name</button>
          </div>

          <div className="room">
            <div className="top">
              <img src={man}/>
              <h2>My group room</h2>
            </div>
            
             <div className="room-body">{messages}</div>
              {/* <div className="message">
                <img src={man}/>
                <div className="message-content">
                  <h3>Luck</h3>
                  <p className="message-text">lorem100</p>
                </div>
                <p className="message-time">下午 3:10</p>
              </div>
             
              <div className="message myself">
                <p className="message-time">下午 3:10</p>
                <div className="message-content">
                  <p className="message-text">lorem100</p>
                </div>
                
              </div> */}
              

            <div className="room-bottom">
              <div className="block"></div>
              <textarea id="input" onKeyPress={this.onKeyPress.bind(this)}></textarea>
            </div>
          </div>
        </div> 
        
      </div>;
  }
  onKeyPress(e){
    let code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode 
      let txt = document.getElementById('input').value; //获取textarea的值
      alert(txt); 
     
    }
  }

}


export default App;
