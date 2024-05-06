import { z } from "zod";

export const smartphoneFormSchema = z.object({
  marca: z
    .string()
    .min(3, "Marca precisa ter pelo menos 3 letras")
    .max(20, "Marca pode ter até 20 letras"),
  modelo: z
    .string()
    .min(3, "Modelo precisa ter pelo menos 3 letras")
    .max(20, "Modelo pode ter até 20 letras"),
});
