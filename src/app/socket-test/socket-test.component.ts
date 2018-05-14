import { Component, OnInit } from '@angular/core';
import { SocketTestService } from '../socket-test.service';

@Component({
  selector: 'app-socket-test',
  templateUrl: './socket-test.component.html',
  styleUrls: ['./socket-test.component.css']
})
export class SocketTestComponent implements OnInit {
  message: string;
  messages: string[] = [];
  constructor(private socketTest: SocketTestService) { 
  }

  ngOnInit() {
    /*this.socketTest
      .getMessages()
      .subscribe((message: string) => {
        console.log(message);
        this.messages.push(message);
      });*/
      this.socketTest.getMessages();
  }
  public options = {
    position: ["top", "right"],
    animate: "fromRight"
  }
  sendMessage() {
    this.socketTest.sendMessage(this.message);
    this.message = '';
  }
}
