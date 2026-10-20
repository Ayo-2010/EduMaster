import { Controller, Get, Param } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.user.findMany()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }
}