import './postingData'
import { postingData } from './postingData'

export const mockUser = {
  id: 'user567',
  name: 'Mockuser SideBar',
  image:
    'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
  phoneNumber: '555-333-4444',
  email: 'ash.jones@example.com',
  age: '77',
  gender: 'Female',
  tenantInfo: {
    earlyBirdNightOut: 'Night out',
    financialSituation: 'Stable income, good credit',
  },
  landlordInfo: {
    posting: postingData,
  },
}
