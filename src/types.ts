export interface Troupe {
  id: string;
  name: string;
  artForm: string;
  leadContact: string;
  contactPhone: string;
  district: string;
  bio?: string;
  instruments?: string[];
  equipment?: string[];
  performancePhotos?: string[];
  videoLinks?: string[];
  ownerId: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: 'artist' | 'manager' | 'admin';
  photoURL?: string;
}
