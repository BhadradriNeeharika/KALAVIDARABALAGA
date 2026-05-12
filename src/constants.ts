import { Troupe } from './types';

export const ART_FORMS = [
  'Dollu Kunitha',
  'Pooja Kunitha',
  'Goravara Kunitha',
  'Yakshagana',
  'Veeragase',
  'Kamsale',
  'Suggi Kunitha',
  'Karadi Majalu'
];

export const DISTRICTS = [
  'Bengaluru',
  'Mysuru',
  'Shivamogga',
  'Dharwad',
  'Belagavi',
  'Udupi',
  'Dakshina Kannada',
  'Tumakuru',
  'Chikkamagaluru',
  'Haveri',
  'Bagalkote'
];

export const FEATURED_TROUPES: Troupe[] = [
  {
    id: 'troupe-1',
    name: 'Janapada Siri Dollu Group',
    artForm: 'Dollu Kunitha',
    leadContact: 'Basavaraj M.',
    contactPhone: '+919876543210',
    district: 'Shivamogga',
    bio: 'A 20-member troupe with 15 years of experience in regional festivals. Known for their synchronized drum beats and energetic movements.',
    instruments: ['Large Drums (Dollu)', 'Cymbals (Tala)'],
    equipment: ['12 Traditional Drums', 'Matching Uniforms', 'Battery Sound System'],
    performancePhotos: [
      '/images/regenerated_image_1778595331006.png',
      'https://images.unsplash.com/photo-1549419163-cf9d84e27f00?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop'
    ],
    videoLinks: ['https://youtube.com/watch?v=example1'],
    ownerId: 'system'
  },
  {
    id: 'troupe-2',
    name: 'Sahyadri Pooja Kunitha Balaga',
    artForm: 'Pooja Kunitha',
    leadContact: 'Manjunatha K.',
    contactPhone: '+919988776655',
    district: 'Tumakuru',
    bio: 'Specializing in the traditional worship dance with colorful structures balanced on heads. Perfect for temple festivals and cultural weddings.',
    instruments: ['Harmonium', 'Nadaswaram', 'Thavil'],
    equipment: ['10 Ritual Structures', 'Traditional Costumes'],
    performancePhotos: [
      '/images/regenerated_image_1778595334999.png',
      'https://images.unsplash.com/photo-1605658658428-21d7b3225884?q=80&w=1200&auto=format&fit=crop'
    ],
    videoLinks: ['https://youtube.com/watch?v=example2'],
    ownerId: 'system'
  },
  {
    id: 'troupe-3',
    name: 'Malenadu Yakshagana Kendra',
    artForm: 'Yakshagana',
    leadContact: 'Ananth Hegde',
    contactPhone: '+919000011111',
    district: 'Udupi',
    bio: 'World-renowned dance drama group with intricate makeup and storytelling prowess from the coast of Karnataka.',
    instruments: ['Chande', 'Maddale', 'Shruti Box'],
    equipment: ['Extensive Background Sets', 'Historical Costumes', 'Full Stage Setup'],
    performancePhotos: [
      '/images/regenerated_image_1778595326721.png',
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1200&auto=format&fit=crop'
    ],
    videoLinks: ['https://youtube.com/watch?v=example3'],
    ownerId: 'system'
  }
];
