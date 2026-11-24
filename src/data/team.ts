// Equipo de NextStep (Equipo 3). Nombres y roles según los templates del TP.
// Las descripciones explican qué hace cada rol en la consultoría; se pueden ajustar libremente.
// La foto se busca en public/equipo/<slug>.jpg o .webp (ver public/equipo/LEEME.txt).
export interface TeamMember {
  name: string;
  slug: string;
  role: string;
  description: string;
}

export const team: TeamMember[] = [
  {
    name: 'Esteban de Nardo',
    slug: 'esteban-de-nardo',
    role: 'Technology Consultant',
    description: 'Traduce las necesidades del negocio en recomendaciones tecnológicas y acompaña la relación con el cliente.',
  },
  {
    name: 'Macarena Ignacio',
    slug: 'macarena-ignacio',
    role: 'Scrum Master',
    description: 'Organiza el trabajo del equipo por sprints, cuida los plazos de entrega y destraba los obstáculos.',
  },
  {
    name: 'Juan José Torres',
    slug: 'juan-jose-torres',
    role: 'UX/UI Designer',
    description: 'Diseña cómo se ven y se usan las soluciones, con foco en la experiencia de cada usuario.',
  },
  {
    name: 'Facundo Maggio',
    slug: 'facundo-maggio',
    role: 'Product Analyst',
    description: 'Releva requerimientos, prioriza las historias de usuario y define cómo medir el valor de la solución.',
  },
  {
    name: 'Tiago Nakasone',
    slug: 'tiago-nakasone',
    role: 'Tech Lead',
    description: 'Define la arquitectura técnica y evalúa las soluciones del mercado para asegurar que sean viables.',
  },
  {
    name: 'Santiago Martínez',
    slug: 'santiago-martinez',
    role: 'Tech Lead',
    description: 'Lidera las decisiones técnicas y la integración de la solución con los sistemas existentes.',
  },
];
