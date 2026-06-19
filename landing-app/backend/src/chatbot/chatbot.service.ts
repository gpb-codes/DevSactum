import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  private readonly responses: Record<string, string> = {
    hola: 'Hola! Bienvenido a Dräkkar Labs. ¿En qué puedo ayudarte?',
    'que es devsactum': 'DevSactum es la red social para desarrolladores. Una sola plataforma que reúne feed de código, bolsa de empleo, comunidades, portafolio, chat y herramientas de IA.',
    'quienes somos': 'Somos Dräkkar Labs, una startup tecnológica de La Pintana, Santiago, Chile. Fundada por Gabriel Pedreros (CEO) y Pablo Cocío (CTO), ambos estudiantes de Informática.',
    beta: 'La beta de DevSactum se lanza el 30 de septiembre de 2026. Puedes unirte visitando drakkar-labs.pages.dev',
    stack: 'Frontend: Next.js 15 + React 19 + TypeScript + Tailwind CSS. Backend: NestJS (API REST) + Go (microservicios). DB: PostgreSQL. DevOps: Docker + Cloudflare Pages.',
    empleo: 'DevSactum tiene una bolsa de empleo integrada con herramientas de IA para matching laboral, análisis de CV y detección de brechas de habilidades.',
    redes: 'Nos encuentras en Instagram @drakkar_labs y en GitHub github.com/gpb-industries/DRAKKAR',
    instagram: 'Nuestro Instagram es @drakkar_labs: https://www.instagram.com/drakkar_labs/',
    github: 'Nuestro GitHub: https://github.com/gpb-industries/DRAKKAR',
    contacto: 'Puedes escribirnos a contacto@drakkar-labs.dev o visitarnos en La Pintana, Santiago, Chile.',
    equipo: 'El equipo está conformado por Gabriel Pedreros (CEO & Fundador) y Pablo Cocío (CTO & Co-fundador), ambos estudiantes de Informática.',
    mision: 'Nuestra misión es construir infraestructura inteligente y plataformas que permitan escalar tecnología con velocidad, fiabilidad y precisión.',
    valores: 'Nuestros valores son: Excelencia en Ingeniería, Pensamiento Visionario, Escala Global, Confianza y Seguridad, Innovación Incansable y Ecosistema Abierto.',
    competencia: 'DevSactum es la única plataforma que integra feed, empleo, comunidades, portafolio, chat, reputación e IA en un solo lugar.',
    next: 'Next.js 15 con React 19, App Router, Server Components, TypeScript 5.8 y Tailwind CSS 4.1.',
    go: 'Go con Gin se usa para microservicios de alto rendimiento: procesamiento de datos, jobs pesados y APIs internas.',
    nestjs: 'NestJS maneja la API REST principal con autenticación JWT, WebSockets para chat en tiempo real.',
    postgresql: 'PostgreSQL es nuestra base de datos relacional principal, conocida por su fiabilidad y escalabilidad.',
    docker: 'Usamos Docker para containerización y despliegue, con CI/CD automatizado.',
  };

  getResponse(message: string) {
    const lower = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const key = Object.keys(this.responses).find(k => lower.includes(k));
    const response = key ? this.responses[key] : 'No tengo esa información. Escríbenos a contacto@drakkar-labs.dev para más detalles.';
    return {
      response,
      timestamp: new Date().toISOString(),
    };
  }
}
