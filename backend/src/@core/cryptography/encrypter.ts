import { JwtSignOptions } from '@nestjs/jwt'

export abstract class Encrypter {
  abstract encrypt(
    payload: Record<string, unknown>,
    options?: JwtSignOptions
  ): Promise<string>
  abstract decrypt(token: string): Promise<Record<string, unknown>>
}
