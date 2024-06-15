import { z } from 'zod';

// Simplified representations for related entities
export const UserSimplifiedSchema = z.object({
  userId: z.string(),
});

export const communityGetOneSchema = z.object({
    id: z.string(),
    });

const DependantSimplifiedSchema = z.object({
  dependantId: z.string(),
});

const EssentialWalletSimplifiedSchema = z.object({
  walletId: z.string(),
});

// Get Schema
export const communityGetSchema = z.object({
  id: z.string(),
  communityId: z.string(),
  name: z.string(),
  about: z.string(),
  imageUrl: z.string().optional(),
  creator: UserSimplifiedSchema.optional(),
  creatorID: z.string(),
  donors: z.array(UserSimplifiedSchema),
  dependants: z.array(DependantSimplifiedSchema),
  public: z.boolean(),
  wallets: z.array(EssentialWalletSimplifiedSchema),
});

// Update Schema
export const communityUpdateSchema = z.object({
  name: z.string().optional(),
  about: z.string().optional(),
  imageUrl: z.string().optional(),
  public: z.boolean().optional(),
});