import { z } from "zod"

export const formSchema = z
  .object({
    BuyerName: z
      .string({
        required_error: "A vevő nevének megadása kötelező.",
      })
      .min(2, {
        message: "A vevő neve legalább 2 karakter hosszú kell legyen.",
      }),
    BuyerBirthName: z
      .string({
        required_error: "A vevő születési nevének megadása kötelező.",
      })
      .min(2, {
        message:
          "A vevő születési neve legalább 2 karakter hosszú kell legyen.",
      }),
    BuyerBirthPlaceAndDate: z
      .string({
        required_error: "A vevő születési helye és ideje megadása kötelező.",
      })
      .min(6, {
        message:
          "A vevő születési helye legalább 6 karakter hosszú kell legyen.",
      }),
    BuyerMothersName: z
      .string({
        required_error: "A vevő anyja nevének megadása kötelező.",
      })
      .min(2, {
        message: "A vevő anyja neve legalább 2 karakter hosszú kell legyen.",
      }),
    BuyerAddress: z
      .string({
        required_error: "A vevő lakcímének megadása kötelező.",
      })
      .min(10, {
        message: "A vevő lakcíme legalább 10 karakter hosszú kell legyen.",
      }),
    BuyerPhone: z
      .string({
        required_error: "A vevő telefonszámának megadása kötelező.",
      })
      .min(9, {
        message: "A vevő telefonszáma legalább 9 karakter hosszú kell legyen.",
      }),
    BuyerEmail: z
      .string({
        required_error: "A vevő email címének megadása kötelező.",
      })
      .email({
        message: "A vevő email címe nem megfelelő.",
      }),
    SellerName: z
      .string({
        required_error: "Az eladó nevének megadása kötelező.",
      })
      .min(2, {
        message: "Az eladó neve legalább 2 karakter hosszú kell legyen.",
      }),
    REAddress: z
      .string({
        required_error: "Az ingatlan címének megadása kötelező.",
      })
      .min(10, {
        message: "Az ingatlan címe legalább 10 karakter hosszú kell legyen.",
      }),
    ReKnowsToplotNR: z.boolean(),
    REType: z.string({
      required_error: "Az ingatlan típusának megadása kötelező.",
    }),
    AdditionalREType: z.optional(z.string()),
    REToplotNR: z
      .string()
      .min(10, "Minimum 10 karakter hosszú kell legyen.")
      .optional()
      .or(z.literal("")),
    REAdditionalProp: z.boolean(),
    PurchasePrice: z.coerce
      .number({
        required_error: "A vételár megadása kötelező.",
        invalid_type_error: "A vételár csak szám lehet.",
      })
      .gte(1000000, {
        message: "A vételár legalább 1 millió forint legyen.",
      }),
    ConclusionDate: z.date({
      required_error:
        "A szerződés legkésőbbi megkötésének dátuma megadása kötelező.",
    }),
    PurchasePriceDueDate: z.date({
      required_error: "A vételár fizetési határidő dátuma megadása kötelező.",
    }),
  })
  .refine(
    (data) =>
      !data.ReKnowsToplotNR || (data.ReKnowsToplotNR && data.REToplotNR !== ""),
    {
      message: "A helyrajzi szám megadása kötelező.",
      path: ["REToplotNR"],
    }
  )
  .refine(
    (data) =>
      !data.ReKnowsToplotNR ||
      (data.ReKnowsToplotNR && data.REToplotNR?.includes("belterület")),
    {
      message:
        "A helyrajzi számnak tartalmaznia kell a 'belterület' kifejezést.",
      path: ["REToplotNR"],
    }
  )
