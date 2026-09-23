export const families = [
  {
    id: 1,
    family: 'Familia Ramírez',
    parent: 'Carlos Ramírez',

    children: [
      {
        id: 101,
        name: 'Mateo Ramírez',
      },
      {
        id: 102,
        name: 'Valentina Ramírez',
      },
    ],

    phone: '300 456 7812',
    plan: '10 ingresos',
    total: 10,
    used: 4,
    available: 6,
    status: 'Activo',
  },

  {
    id: 2,
    family: 'Familia Gómez',
    parent: 'Laura Gómez',

    children: [
      {
        id: 201,
        name: 'Sofía Gómez',
      },
    ],

    phone: '315 782 1140',
    plan: '8 ingresos',
    total: 8,
    used: 5,
    available: 3,
    status: 'Activo',
  },

  {
    id: 3,
    family: 'Familia Torres',
    parent: 'Andrés Torres',

    children: [
      {
        id: 301,
        name: 'Samuel Torres',
      },
      {
        id: 302,
        name: 'Martín Torres',
      },
      {
        id: 303,
        name: 'Emma Torres',
      },
    ],

    phone: '310 889 4567',
    plan: '12 ingresos',
    total: 12,
    used: 3,
    available: 9,
    status: 'Activo',
  },
]