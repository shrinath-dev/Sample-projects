import {literal, z} from 'zod';



export const SignupDataSchema = z.object({
  fullname: z
      .string()
      .trim()
      .min(3, {
        error: "The name should be atleast 3 characters long.",
      })
      .max(50, {
        error: "The name should be only max 50 characters long.",
      })
      .refine(
        (value) =>{
          return value.length >= 1
        },
        {
          error:'Name is required.',
          abort: true,
        }
      )
      .refine(
        (value) => {
          let reg = /^[A-z a-z]+$/;
          return reg.test(value);
        },
        {
          error: "The name should only contain alphabets.",
        },
      ),

  username: z
  .string()
  .trim()
  .min(2 ,
    {
      error: "The username should be atleast 2 characters long."
    }
  )
  .refine(
        (value) =>{
          return value.length >= 1
        },
        {
          error:'Username is required.',
          abort: true,
        }
      )
  .refine(
    (value) =>{
      let rgx = /^[A-z0-9a-z_]+$/
      return rgx.test(value)
    },
    {
      error: "The username should contain only alphanumeric or ( _ ) "
    }
  ),

  email: z.email({error: "Enter a valid email."}),

  password: z
  .string()
  .min(8, {
    error: "Password length should be atleast 8 charactes"
  })
  .max(15, {
    error: "Password should be only max 15 characters long"
  }),

  confirm : z.string()
}).refine(
  (data) =>{
    data.password === data.confirm ,
    {
      message: 'Password do not match.',
      path: ["confirm"],

      when(payload: any) { 
      return SignupDataSchema 
        .pick({ password: true, confirm: true }) 
        .safeParse(payload.value).success; 
    },  
    }
  }
)