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
  async create(dto: CreateEventDto): Promise<Event | string> {
    
    let result;

    try {
      result = await this.prisma.client.event.create({dto});
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }
    return result;
  }

  async findAll(): Promise<Event[] | string> {

    let result;

    try {
      result = await this.prisma.client.event.findMany();
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }
    return result;
  }

  async findOne(event_id: number): Promise<Event | string> {

    let result;

    try {
      const result = await this.prisma.client.event.findUnique({where: {event_id: event_id}});
    } catch (e) {
      const result = this.errorHandlingService.handlePrisma(e);
    }
    return result;
  }

  async update(event_id: number, updateEventDto: UpdateEventDto): Promise<Event | string> {

    let result;

    try {
      const result = await this.prisma.client.event.update({where: {event_id: event_id}, data: updateEventDto});
    } catch (e) {
      const result = this.errorHandlingService.handlePrisma(e);
    }
    return result;
  }

  async remove(event_id: number): Promise<string> {
    try {
      const event = await this.prisma.client.event.delete({where: {event_id: event_id}});
    } catch (e) {
      const event = this.errorHandlingService.handlePrisma(e);
    }
    return `Event #${event_id} deleted sucessfully`;
  }
}
