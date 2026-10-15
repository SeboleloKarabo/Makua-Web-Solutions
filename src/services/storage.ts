import { ClassItem, Instructor, Membership, Booking, FloorStaffSchedule } from '../types';
import {
  INITIAL_CLASSES,
  INITIAL_INSTRUCTORS,
  INITIAL_MEMBERSHIPS,
  FLOOR_STAFF_SCHEDULE
} from '../data/initialData';

const STORAGE_KEYS = {
  CLASSES: 'aura_classes_v1',
  INSTRUCTORS: 'aura_instructors_v1',
  MEMBERSHIPS: 'aura_memberships_v1',
  BOOKINGS: 'aura_bookings_v1',
  STAFF: 'aura_staff_v1',
};

const notifyChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('aura-db-updated'));
  }
};

export const getStoredClasses = (): ClassItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLASSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
      return INITIAL_CLASSES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CLASSES;
  }
};

export const saveClasses = (classes: ClassItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
    notifyChange();
  } catch (err) {
    console.error('Failed to save classes:', err);
  }
};

export const getStoredInstructors = (): Instructor[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INSTRUCTORS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(INITIAL_INSTRUCTORS));
      return INITIAL_INSTRUCTORS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INSTRUCTORS;
  }
};

export const getStoredMemberships = (): Membership[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMBERSHIPS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MEMBERSHIPS, JSON.stringify(INITIAL_MEMBERSHIPS));
      return INITIAL_MEMBERSHIPS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MEMBERSHIPS;
  }
};

export const getStoredBookings = (): Booking[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      const initialSampleBookings: Booking[] = [
        {
          id: 'bkg-demo-1',
          classId: 'cls-1',
          classTitle: 'Sculpt & Precision Reformer',
          discipline: 'Pilates',
          instructorName: 'Elena Rostova',
          day: 'Monday',
          startTime: '07:00',
          endTime: '07:55',
          room: 'The Reformer Vault',
          userName: 'You (Sample Member)',
          userEmail: 'member@aurastudio.com',
          status: 'confirmed',
          bookedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initialSampleBookings));
      return initialSampleBookings;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const getStoredStaff = (): FloorStaffSchedule[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STAFF);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(FLOOR_STAFF_SCHEDULE));
      return FLOOR_STAFF_SCHEDULE;
    }
    return JSON.parse(raw);
  } catch {
    return FLOOR_STAFF_SCHEDULE;
  }
};

export interface BookingResult {
  success: boolean;
  message: string;
  booking?: Booking;
}

export const bookClass = (classId: string, userName: string, userEmail: string): BookingResult => {
  const classes = getStoredClasses();
  const targetClass = classes.find((c) => c.id === classId);

  if (!targetClass) {
    return { success: false, message: 'Class session could not be found.' };
  }

  const spotsLeft = targetClass.capacity - targetClass.spotsTaken;
  if (spotsLeft <= 0) {
    return { success: false, message: 'This class has reached maximum capacity.' };
  }

  // Update class capacity
  const updatedClasses = classes.map((c) => {
    if (c.id === classId) {
      return { ...c, spotsTaken: c.spotsTaken + 1 };
    }
    return c;
  });
  saveClasses(updatedClasses);

  // Create booking record
  const newBooking: Booking = {
    id: `bkg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    classId: targetClass.id,
    classTitle: targetClass.title,
    discipline: targetClass.discipline,
    instructorName: targetClass.instructorName,
    day: targetClass.day,
    startTime: targetClass.startTime,
    endTime: targetClass.endTime,
    room: targetClass.room,
    userName: userName.trim(),
    userEmail: userEmail.trim().toLowerCase(),
    status: 'confirmed',
    bookedAt: new Date().toISOString(),
  };

  const existingBookings = getStoredBookings();
  const updatedBookings = [newBooking, ...existingBookings];
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
  notifyChange();

  return {
    success: true,
    message: `Reserved space for ${targetClass.title} on ${targetClass.day}!`,
    booking: newBooking
  };
};

export const cancelBooking = (bookingId: string): boolean => {
  const bookings = getStoredBookings();
  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) return false;

  // Restore spot in class
  const classes = getStoredClasses();
  const updatedClasses = classes.map((c) => {
    if (c.id === booking.classId && c.spotsTaken > 0) {
      return { ...c, spotsTaken: c.spotsTaken - 1 };
    }
    return c;
  });
  saveClasses(updatedClasses);

  // Update booking status
  const updatedBookings = bookings.map((b) => {
    if (b.id === bookingId) {
      return { ...b, status: 'cancelled' as const };
    }
    return b;
  });
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
  notifyChange();
  return true;
};

export const resetToDefaults = () => {
  localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
  localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(INITIAL_INSTRUCTORS));
  localStorage.setItem(STORAGE_KEYS.MEMBERSHIPS, JSON.stringify(INITIAL_MEMBERSHIPS));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  notifyChange();
};
