export type Discipline = 'Yoga' | 'HIIT' | 'Pilates' | 'Strength' | 'Barre' | 'Cycling';

export type Intensity = 'Low' | 'Medium' | 'High';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface ClassItem {
  id: string;
  title: string;
  discipline: Discipline;
  intensity: Intensity;
  description: string;
  requirements?: string;
  instructorId: string;
  instructorName: string;
  instructorRole?: string;
  day: DayOfWeek;
  startTime: string; // e.g. "07:00"
  endTime: string;   // e.g. "08:00"
  capacity: number;
  spotsTaken: number;
  room: string;
  image?: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  philosophy: string;
  specialties: Discipline[];
  certifications: string[];
  photo: string;
  experienceYears: number;
  floorDutySchedule: string;
}

export interface Membership {
  id: string;
  name: string;
  price: number;
  billingCycle: 'month' | 'quarter' | 'year';
  classesPerMonth: number | 'Unlimited';
  features: string[];
  featured: boolean;
  sortOrder: number;
  badge?: string;
}

export interface ClassPackage {
  id: string;
  name: string;
  sessions: number;
  price: number;
  perSessionPrice: number;
  validityMonths: number;
  popular?: boolean;
}

export interface Booking {
  id: string;
  classId: string;
  classTitle: string;
  discipline: Discipline;
  instructorName: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  userName: string;
  userEmail: string;
  status: 'confirmed' | 'cancelled' | 'waitlisted';
  bookedAt: string;
}

export interface FloorStaffSchedule {
  id: string;
  instructorId: string;
  instructorName: string;
  day: DayOfWeek;
  shiftHours: string;
  floorZone: string;
  onDutyNow: boolean;
}
