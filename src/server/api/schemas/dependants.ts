import { z } from 'zod';

// Simplified representation for the essentialWallet relation
export const EssentialWalletSimplifiedSchema = z.object({
  walletId: z.string(),
});

export const DependantSimplifiedSchema = z.object({
    communityId: z.string(),
});


// Get Schema for Dependant
export const dependantGetSchema = z.object({
  id: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  imageUrl: z.string().optional(),
  communityId: z.string(), // Assuming we only need the ID for simplicity
  essentialWallet: z.array(EssentialWalletSimplifiedSchema),
});

// Update Schema for Dependant
export const dependantUpdateSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  imageUrl: z.string().optional(),
  // Not including communityId or essentialWallet as they are likely managed separately
});