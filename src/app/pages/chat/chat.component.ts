import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MessageService } from '../../cores/services/message.service';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../cores/services/account.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [MessageService]
})
export class ChatComponent {
    @Input() username: string ='';//information of chat box; username nhan message
    messageContent: string = '';
    @Input() right: number = 0;
    @Output() removeChatBox = new EventEmitter();
    //@Output() miniChatBox = new EventEmitter();
    @ViewChild('messageForm') messageForm!: NgForm;

    @ViewChild('scrollMe', {static: true}) myScrollContainer!: ElementRef;
    currentUser!: string;
    totalPage!: number;
    pageNumber = 1;
    // faClose = faClose
    // faMinus = faMinus
    
    constructor(public accountService: AccountService, 
      public messageService: MessageService){
      this.currentUser = accountService.getUsername();
    }
  
    ngOnDestroy(): void {
      this.messageService.stopHubConnection();
    }
  
    ngOnInit(): void {
      this.messageService.createHubConnection(this.accountService.CurrentUser, this.username);
    }
    
    ngAfterViewChecked() {
      this.scrollToBottom()        
    }
  
    scrollToBottom() {     
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      return this.myScrollContainer.nativeElement.scrollTop !== 0;
    }
  
    ngAfterViewInit() {
      var chatBox = document.getElementById(this.username);
      chatBox!.style.right = this.right + "px";
    }
  
    sendMessage() {
      this.messageService.sendMessage(this.username, this.messageContent).then(() => {
        this.messageForm.reset();
        this.scrollToBottom();
      })
    }
  
    closeBoxChat() {
        this.removeChatBox.emit(this.username);
    }
  
    // minimumBoxChat() {
    //   this.closeBoxChat();
    //   this.miniChatBox.emit(this.username);
    // }
  
    loading!: boolean;
    onScrollUp() {
      if (this.pageNumber < this.totalPage) {
        this.loading = true;
        this.pageNumber++;
        this.messageService.getMessageThread(this.pageNumber, 10, this.username).subscribe(res => {
          this.loading = false;
        })
      }
    }
}
