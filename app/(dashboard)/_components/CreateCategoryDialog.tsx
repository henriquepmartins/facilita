"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schema/categoires";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { CircleOff, PlusSquareIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface Props {
  type: TransactionType;
}

function CreateCategoryDialog({ type }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
        >
          <PlusSquareIcon className="mr-2 h-4 w-4" /> Nova Categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Criar uma nova categoria de{" "}
            {type === "income" ? (
              <span className="text-emerald-500">proventos</span>
            ) : (
              <span className="text-red-500">despesas</span>
            )}
          </DialogTitle>
          <DialogDescription>
            Categorias são utilizadas para agrupar transações.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
                  </FormControl>
                  <FormDescription>
                    Descrição da transação (opcional)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="h-[100px] w-full"
                        >
                          {form.watch("icon") ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Clique para trocar o ícone
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOff
                                style={{ width: "48px", height: "48px" }}
                              />
                              <p className="text-xs text-muted-foreground">
                                Clique para selecionar
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) =>
                            field.onChange(emoji.native)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    É assim que sua categoria aparecerá na lista de categorias.
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              onClick={() => {
                form.reset();
              }}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
