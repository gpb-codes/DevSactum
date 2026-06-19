import { Injectable } from '@nestjs/common';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

@Injectable()
export class ContactService {
  private messages: ContactMessage[] = [];
  private nextId = 1;

  create(dto: { name: string; email: string; subject: string; message: string }) {
    const message: ContactMessage = {
      id: this.nextId++,
      ...dto,
      createdAt: new Date().toISOString(),
      read: false,
    };
    this.messages.push(message);
    console.log(`[Contact] New message from ${dto.name} (${dto.email}): ${dto.subject}`);
    return {
      success: true,
      message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
      id: message.id,
    };
  }

  findAll() {
    return this.messages;
  }
}
