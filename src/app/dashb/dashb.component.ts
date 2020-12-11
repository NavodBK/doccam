import { Component, OnInit, ViewChild, ViewChildren, ElementRef} from '@angular/core';
import Peer from 'peerjs';




// this.peer = new Peer({host:'peerjs-server.herokuapp.com',secure:true, port:443});
@Component({
  selector: 'app-dashb',
  templateUrl: './dashb.component.html',
  styleUrls: ['./dashb.component.css']
})
export class DashbComponent implements OnInit {

  peer;
  call;

  myPeerId;
  rPeerId;

  readyStat;
  vidEl;

  myStream;
  rStream;
 

  constrains={audio:true,video:true}
  constructor() {
  }
  
  ngAfterViewInit(){

  }
  ngOnInit() {
   
 

    this.peer = new Peer({host:'peerjs-server.herokuapp.com',secure:true, port:443, config: {'iceServers': [{ urls: 'stun:numb.viagenie.ca:3489',username:'navodbk@gmail.com', credential: 'Bday1998-' },
    { urls: 'turn:numb.viagenie.ca',username:'webrtc@live.com', credential: 'muazkh' },
    { urls: 'turn:numb.viagenie.ca:6156',username:'navodbk@gmail.com', credential: 'Bday1998-' }]} });
    // this.peer = new Peer()
    

    setTimeout(() => {
      this.myPeerId = this.peer.id;
      console.log(this.myPeerId)
      
    },3000);
    
    navigator.mediaDevices.getUserMedia(this.constrains).then(
      stream=>{
        this.myStream = stream
      });
   
       
  }

  ready(video){
    this.readyStat = true;
    this.vidEl = video;
    
    this.peer.on('call', function(call) {
  
      call.answer(this.myStream);

      call.on('stream', function(stream){
        this.vidEl = video;
        this.rStream = stream;
        this.vidEl.srcObject = stream;
        console.log("call answerd")
        console.log(this.vidEl)
        console.log(this.rStream)
      })
      },function(err) {
        console.log('Failed to get stream', err); 
      });

    console.log(this.vidEl)

  }
  callActive(video){
    Peer.call = this.peer.call(this.rPeerId,this.myStream)
    //  this.vidEl.srcObject = this.myStream
   
  }
  
    
  disconnect(){
      this.peer.disconnect()
  }
  
}
