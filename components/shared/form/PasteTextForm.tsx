"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { uploadStudySet } from "@/lib/actions/studyset.action";
import { useRouter } from "next/navigation";

const textFormSchema = z.object({
  text: z.string(),
  //   numberOfTerms: z.number().optional(),
});

interface IPasteTextFormProps {
    userId: string;
}

const PasteTextForm = ({
    userId
}: IPasteTextFormProps) => {
    const router = useRouter();

  const form = useForm<z.infer<typeof textFormSchema>>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof textFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { text } = values;

    // TODO: Create field to adjust term number

    const studySetId = await uploadStudySet({
        notes: text,
        name: "Study Set Example",
        path: "/sets"
    });

    router.push(`/sets/${studySetId}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark-400">
                Paste your notes. Let AI do the rest.{" "}
                <span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Paste here" rows={20} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="numberOfTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark-400">
                Number of questions
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button
          variant={"outline"}
          className="mt-6 w-[300px] self-center border-2 border-black hover:border-primary-500"
          type="submit"
        >
          Generate study set
        </Button>
      </form>
    </Form>
  );
};

export default PasteTextForm;
