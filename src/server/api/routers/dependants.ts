import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "$/src/server/api/trpc";
  import {
    dependantGetSchema,
    DependantSimplifiedSchema,
    EssentialWalletSimplifiedSchema,
  } from "$/src/server/api/schemas/dependants";
  import { type Response } from "$/src/utils/types";
  
  export const dependantRouter = createTRPCRouter({
    //get all campaigns by creator id
    get: publicProcedure
      .input(DependantSimplifiedSchema)
      .query(async ({ input, ctx }) => {
        const response: Response = {
          success: true,
          message: "Dependants Get",
          data: {},
        };
  
        const dependants = await ctx.db.dependant.findMany({
            where: {
                communityId: input.communityId,
            },
            });
        return { ...response, ...{ data: dependants } };
      }),

      getByWalletID: publicProcedure
        .input(EssentialWalletSimplifiedSchema)
        .query(async ({ input, ctx }) => {
          const response: Response = {
            success: true,
            message: "Dependants Get",
            data: {},
          };
    
          const dependants = await ctx.db.dependant.findMany({
                where: {
                    
                },
                });
          return { ...response, ...{ data: dependants } };
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
  