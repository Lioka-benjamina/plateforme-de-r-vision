import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

//SADY MIANATRA IHANY : JwtAuthGuard — Faire passer ou bloquer la requête , Il dit simplement : « Utilise la stratégie jwt pour décider si on laisse passer la requête.