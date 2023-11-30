import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  messages = [
    {
      text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      reply: false,
      date: new Date(),
      name: 'Amy',
      count: 0,
    },
    {
      text: 'Hello, how are you? This should be a very long message so that we can test how it fit into the screen.',
      reply: true,
      date: new Date(),
      name: 'Ari',
      count: 1,
    },
    {
      text: 'Hello, how are you?',
      reply: false,
      date: new Date(),
      name: 'Amy',
      count: 2,
    },
    {
      text: 'Hey looks at that pic I just found!',
      reply: true,
      date: new Date(),
      name: 'Ari',
      count: 3,
    },
    {
      text: 'What do you mean by that?',
      reply: false,
      date: new Date(),
      name: 'Amy',
      count: 4,
    },
    {
      text: 'Attached is an archive I mentioned',
      reply: false,
      date: new Date(),
      name: 'Amy',
      count: 5,
    },
    {
      text: 'Meet me there',
      reply: true,
      date: new Date(),
      name: 'Ari',
      count: 6,
    },
  ];

  loadMessages() {
    return this.messages;
  }

  getCount() {
    return this.messages[this.messages.length - 1].count;
  }
}