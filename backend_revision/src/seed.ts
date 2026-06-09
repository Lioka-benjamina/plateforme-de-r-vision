import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { UserRole, UserStatus } from './users/entities/user.entity';
import { MatiereService } from './matiere/matiere.service';
import { Niveau } from './matiere/entities/matiere.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const matiereService = app.get(MatiereService);

  const hashed = await bcrypt.hash('admin123', 10);

  const existing = await usersService.findByEmail('admin@revision.com');
  if (!existing) {
    await usersService.create({
      nom: 'Admin',
      prenom: 'Super',
      email: 'admin@revision.com',
      mot_de_pass: hashed,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  const matieres = [
    { nom: 'Mathématiques', niveau: Niveau.BEPC },
    { nom: 'Français', niveau: Niveau.BEPC },
    { nom: 'Histoire-Géographie', niveau: Niveau.BEPC },
    { nom: 'Sciences', niveau: Niveau.CEPE },
    { nom: 'Anglais', niveau: Niveau.BAC },
    { nom: 'Physique-Chimie', niveau: Niveau.BAC },
  ];

  for (const m of matieres) {
    const existingMatiere = await (
      await import('./matiere/matiere.service')
    ).MatiereService.prototype.findAll.bind(matiereService)();
  }

  for (const m of matieres) {
    await matiereService.createMatiere(m);
    console.log(`Matiere créée: ${m.nom}`);
  }

  await app.close();
  console.log('Seed completed');
}

seed().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
