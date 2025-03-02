"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { generateHashFromEmail } from "../../menu/helpers/generateHashFromEmail";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "email inválido" }),
});

type formSchema = z.infer<typeof formSchema>;

const CustomerEmailForm = () => {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: formSchema) => {
    const customerHash = generateHashFromEmail(data.email);
    router.replace(`${pathname}?customer=${customerHash}`);
  };

  const handleCancel = () => router.back();

  return (
    <div>
      <Drawer open>
        <DrawerContent className="m-auto h-fit w-[420px]">
          <DrawerHeader>
            <DrawerTitle>Visualizar Pedidos</DrawerTitle>
            <DrawerDescription>
              Insira seu email abaixo para visualizar seus pedidos.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DrawerFooter>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full rounded-full"
                  >
                    Confirmar
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="secondary"
                      className="w-full rounded-full"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CustomerEmailForm;
