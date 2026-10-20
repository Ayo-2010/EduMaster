import { Controller, Post, Body, Get, Req } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Role } from '@prisma/client'

@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; role?: Role }) {
    const passwordHash = await bcrypt.hash(body.password, 10)
    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        passwordHash,
        role: body.role || 'STUDENT'
      }
    })
    return { user: { id: user.id, email: user.email, role: user.role } }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: body.email } })
    if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
      return { error: 'Invalid credentials' }
    }
    const token = this.jwt.sign({ sub: user.id, role: user.role })
    return { token, user: { id: user.id, email: user.email, role: user.role } }
  }
}