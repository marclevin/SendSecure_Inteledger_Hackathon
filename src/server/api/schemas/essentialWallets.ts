import { z } from 'zod';

// Simplified representation for the dependants relation
const DependantSimplifiedSchema = z.object({
  dependantId: z.string(),
});

export const essentialWalletGetbyWalletIDSchema = z.object({
    id : z.string(),
    });

export const essentialWalletGetbyIDSchema = z.object({
    communityId: z.string(),
    });

// Get Schema for EssentialWallet
export const essentialWalletGetSchema = z.object({
  id: z.string(),
  name: z.string(),
  walletAddress: z.string(),
  imageUrl: z.string().optional(),
  balance: z.number(),
  communityId: z.string(), // Assuming we only need the ID for simplicity
  dependants: z.array(DependantSimplifiedSchema),
});

// Update Schema for EssentialWallet
export const essentialWalletUpdateSchema = z.object({
  name: z.string().optional(),
  walletAddress: z.string().optional(),
  imageUrl: z.string().optional(),
  balance: z.number().optional(),
  // Not including communityId or dependants as they are likely managed separately
});

export const essentialWalletAddDependantSchema = z.object({
    id: z.string(),
    dependantId: z.string(),
    });