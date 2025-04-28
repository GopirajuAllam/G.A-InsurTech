export interface CoverageOption {
  id: string;
  type: 'property' | 'liability';
  name: string;
  description: string;
  levels: {
    id: string;
    amount: number;
    deductible: number;
    price: number;
  }[];
}

export const propertyOptions: CoverageOption[] = [
  {
    id: 'dwelling',
    type: 'property',
    name: 'Dwelling Coverage',
    description: 'Covers damage to your home\'s structure, including the roof, walls, and foundation.',
    levels: [
      { id: 'dwelling-1', amount: 150000, deductible: 1000, price: 520 },
      { id: 'dwelling-2', amount: 250000, deductible: 1000, price: 780 },
      { id: 'dwelling-3', amount: 350000, deductible: 1000, price: 980 },
      { id: 'dwelling-4', amount: 500000, deductible: 1000, price: 1250 },
    ]
  },
  {
    id: 'personal-property',
    type: 'property',
    name: 'Personal Property',
    description: 'Covers your personal belongings inside your home like furniture, electronics, and clothing.',
    levels: [
      { id: 'personal-1', amount: 50000, deductible: 500, price: 180 },
      { id: 'personal-2', amount: 75000, deductible: 500, price: 250 },
      { id: 'personal-3', amount: 100000, deductible: 500, price: 320 },
      { id: 'personal-4', amount: 150000, deductible: 500, price: 420 },
    ]
  },
  {
    id: 'loss-of-use',
    type: 'property',
    name: 'Loss of Use',
    description: 'Covers additional living expenses if your home becomes uninhabitable due to a covered loss.',
    levels: [
      { id: 'loss-1', amount: 20000, deductible: 0, price: 80 },
      { id: 'loss-2', amount: 30000, deductible: 0, price: 120 },
      { id: 'loss-3', amount: 40000, deductible: 0, price: 150 },
      { id: 'loss-4', amount: 60000, deductible: 0, price: 200 },
    ]
  },
  {
    id: 'other-structures',
    type: 'property',
    name: 'Other Structures',
    description: 'Covers structures not attached to your home, such as garages, sheds, and fences.',
    levels: [
      { id: 'other-1', amount: 15000, deductible: 500, price: 60 },
      { id: 'other-2', amount: 25000, deductible: 500, price: 90 },
      { id: 'other-3', amount: 35000, deductible: 500, price: 120 },
      { id: 'other-4', amount: 50000, deductible: 500, price: 180 },
    ]
  },
];

export const liabilityOptions: CoverageOption[] = [
  {
    id: 'personal-liability',
    type: 'liability',
    name: 'Personal Liability',
    description: 'Protects you if someone is injured on your property or if you accidentally damage someone else\'s property.',
    levels: [
      { id: 'liability-1', amount: 100000, deductible: 0, price: 100 },
      { id: 'liability-2', amount: 300000, deductible: 0, price: 150 },
      { id: 'liability-3', amount: 500000, deductible: 0, price: 200 },
      { id: 'liability-4', amount: 1000000, deductible: 0, price: 300 },
    ]
  },
  {
    id: 'medical-payments',
    type: 'liability',
    name: 'Medical Payments',
    description: 'Covers medical expenses for people injured on your property, regardless of fault.',
    levels: [
      { id: 'medical-1', amount: 1000, deductible: 0, price: 20 },
      { id: 'medical-2', amount: 3000, deductible: 0, price: 40 },
      { id: 'medical-3', amount: 5000, deductible: 0, price: 60 },
      { id: 'medical-4', amount: 10000, deductible: 0, price: 100 },
    ]
  },
  {
    id: 'umbrella',
    type: 'liability',
    name: 'Umbrella Coverage',
    description: 'Additional liability coverage beyond the limits of your standard policy.',
    levels: [
      { id: 'umbrella-1', amount: 1000000, deductible: 0, price: 180 },
      { id: 'umbrella-2', amount: 2000000, deductible: 0, price: 300 },
      { id: 'umbrella-3', amount: 3000000, deductible: 0, price: 400 },
      { id: 'umbrella-4', amount: 5000000, deductible: 0, price: 600 },
    ]
  },
  {
    id: 'property-damage',
    type: 'liability',
    name: 'Property Damage Liability',
    description: 'Covers damage you cause to other people\'s property.',
    levels: [
      { id: 'damage-1', amount: 100000, deductible: 500, price: 120 },
      { id: 'damage-2', amount: 200000, deductible: 500, price: 180 },
      { id: 'damage-3', amount: 300000, deductible: 500, price: 240 },
      { id: 'damage-4', amount: 500000, deductible: 500, price: 320 },
    ]
  },
];

export const getAllCoverages = (): CoverageOption[] => {
  return [...propertyOptions, ...liabilityOptions];
};

export const getCoverageById = (id: string): CoverageOption | undefined => {
  return getAllCoverages().find(coverage => coverage.id === id);
};