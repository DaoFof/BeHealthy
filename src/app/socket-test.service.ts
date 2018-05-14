import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'; 
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
@Injectable()
export class SocketTestService {
  private url = 'http://localhost:3000';
  private socket;
  constructor(private notificationService: NotificationsService) { 
    this.socket = io(this.url);
  }
  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }
  public getMessages = () => {
    this.socket.on('new-message', (message) => {
      console.log(message);
      this.notificationService.success(
        'Some Title',
        message,
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 10
        }
      )
    });
  }
}
