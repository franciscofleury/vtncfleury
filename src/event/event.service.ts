import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/services/prisma.service';
import { ErrorHandlingService } from 'src/services/error_handling.service';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandlingService: ErrorHandlingService
  ) {}
  create(dto: CreateEventDto) {
    
    let result;

    try {
      result = this.prisma.client.event.create({dto});
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }
    return result;
  }

  findAll() {

    let result;

    try {
      result = this.prisma.client.event.findMany();
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }
    return result;
  }

  findOne(event_id: number) {

    let result;

    try {
      const result = this.prisma.client.event.findUnique({where: {event_id: event_id}});
    } catch (e) {
      const result = this.errorHandlingService.handlePrisma(e);
    }
    return event;
  }

  update(event_id: number, updateEventDto: UpdateEventDto) {

    let result;

    try {
      const result = this.prisma.client.event.update({where: {event_id: event_id}, data: updateEventDto});
    } catch (e) {
      const result = this.errorHandlingService.handlePrisma(e);
    }
    return result;
  }

  remove(event_id: number) {
    try {
      const event = this.prisma.client.event.delete({where: {event_id: event_id}});
    } catch (e) {
      const event = this.errorHandlingService.handlePrisma(e);
    }
    return `Event #${event_id} deleted sucessfully`;
  }
}
