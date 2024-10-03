export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: 'male' | 'female' | 'none'
  dateOfBirth: Date
  country: string
}

export const users: User[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '***',
    gender: 'male',
    dateOfBirth: new Date('1990-01-15'),
    country: 'us',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: '***',
    gender: 'female',
    dateOfBirth: new Date('1985-06-22'),
    country: 'ca',
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    password: '***',
    gender: 'male',
    dateOfBirth: new Date('1992-03-10'),
    country: 'gb',
  },
  {
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    password: '***',
    gender: 'female',
    dateOfBirth: new Date('1994-12-30'),
    country: 'au',
  },
  {
    firstName: 'William',
    lastName: 'Brown',
    email: 'william.brown@example.com',
    password: '***',
    gender: 'male',
    dateOfBirth: new Date('1988-11-05'),
    country: 'nz',
  },
  {
    firstName: 'Sophia',
    lastName: 'Wilson',
    email: 'sophia.wilson@example.com',
    password: '***',
    gender: 'female',
    dateOfBirth: new Date('1991-07-18'),
    country: 'de',
  },
  {
    firstName: 'James',
    lastName: 'Garcia',
    email: 'james.garcia@example.com',
    password: '***',
    gender: 'male',
    dateOfBirth: new Date('1993-04-12'),
    country: 'mx',
  },
  {
    firstName: 'Olivia',
    lastName: 'Martinez',
    email: 'olivia.martinez@example.com',
    password: '***',
    gender: 'female',
    dateOfBirth: new Date('1995-09-25'),
    country: 'es',
  },
  {
    firstName: 'Benjamin',
    lastName: 'Lopez',
    email: 'benjamin.lopez@example.com',
    password: '***',
    gender: 'male',
    dateOfBirth: new Date('1987-02-20'),
    country: 'fr',
  },
  {
    firstName: 'Isabella',
    lastName: 'Hernandez',
    email: 'isabella.hernandez@example.com',
    password: '***',
    gender: 'female',
    dateOfBirth: new Date('1990-05-14'),
    country: 'it',
  },
]
