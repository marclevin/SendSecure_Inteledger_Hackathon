import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "$/src/server/api/trpc";
  import {
    essentialWalletGetbyIDSchema,
    essentialWalletAddDependantSchema,
    essentialWalletGetbyWalletIDSchema,
  } from "$/src/server/api/schemas/essentialWallets";
  import { type Response } from "$/src/utils/types";
  
  export const essentialWalletRouter = createTRPCRouter({
    //get all campaigns by creator id
    get: publicProcedure
      .input(essentialWalletGetbyIDSchema)
      .query(async ({ input, ctx }) => {
        const response: Response = {
          success: true,
          message: "Dependants Get",
          data: {},
        };
  
        const wallets = await ctx.db.essentialWallet.findMany({
            where: {
                communityId: input.communityId,
            },
            });
        return { ...response, ...{ data: wallets } };
      }),

      // Add dependant to wallet
      addDependant: publicProcedure
      .input(essentialWalletAddDependantSchema)
      .mutation(async ({ input, ctx }) => {
        const response: Response = {
          success: true,
          message: "Dependants Get",
          data: {},
        };
  
        const wallet = await ctx.db.essentialWallet.update({
            data: {
                dependants: {
                    connect: {
                        id: input.dependantId
                    }
                }
            },
            where: {
                id: input.id
            }
            });
        return { ...response, ...{ data: wallet } };
      }),

      getOne: publicProcedure
      .input(essentialWalletGetbyWalletIDSchema)
      .query(async ({ input, ctx }) => {
        const response: Response = {
          success: true,
          message: "Dependants Get",
          data: {},
        };
  
        const wallet = await ctx.db.essentialWallet.findUnique({
            where: {
                id: input.id
            }
            });
        return { ...response, ...{ data: wallet } };
      }),
      




      // Get community by ID
    // getOne: publicProcedure
    // .input(communityGetOneSchema)
    // .query(async ({ input, ctx }) => {
    //   const response: Response = {
    //     success: true,
    //     message: "Community Get",
    //     data: {},
    //   };

    //   const community = await ctx.db.community.findUnique({
    //     where: {
    //       id: input.id,
    //     },
    //   });
    //   return { ...response, ...{ data: community } };
    // }),


  
    //get campaign by id
    // getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    //   return ctx.db.campaign.findUnique({
    //     where: idSchema.parse(input),
    //   });
    // }),
  
    // //delete campaign
    // deleteCampaign: protectedProcedure
    //   .input(idSchema)
    //   .mutation(({ input, ctx }) => {
    //     return ctx.db.campaign.delete({
    //       where: idSchema.parse(input),
    //     });
    //   }),
  });
  