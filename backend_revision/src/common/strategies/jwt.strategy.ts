//SASY MIANATRA IHANY : JWT Strategy — Identifier qui est connecté : JwtStrategy, c’est comme un douanier qui lit le passeport (token) et décide ce qu’il écrit sur la fiche de l’utilisateur (req.user).

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lire le token dans Authorization: Bearer <token>
      ignoreExpiration: false, // Le token expiré sera rejeté
      secretOrKey: configService.get<string>('JWT_SECRET'), // clé secrète dans .env
    });
  }

  async validate(payload: any) {
    // payload = contenu du token signé lors du login
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role, // on garde le rôle pour les guards
    };
  }

  //SADY MIANATRA IHANY : Ce return devient req.user dans toute la requête, après que le guard ait validé le token.
}
