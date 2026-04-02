"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import z from "zod";
import { Field, FieldError } from "./ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initiateAPI } from "@/lib/eden";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Copy } from "lucide-react";

const formSchema = z.object({
  url: z.url(),
});

export const CreateLink: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createdLink, setCreatedLink] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleCreateLink = async (data: z.infer<typeof formSchema>) => {
    const createResponse = await initiateAPI(
      window.location.origin,
    ).v1.link.post({ url: data.url });

    const isStatusOk =
      createResponse.status === 201 || createResponse.status === 200;

    if (isStatusOk && createResponse.data) {
      form.reset();
      setCreatedLink(`${createResponse.data.shortUrl}`);
    }
  };

  return (
    <div className="flex flex-col">
      {createdLink ? (
        <>
          <p>Your link is ready</p>
          <Field>
            <InputGroup>
              <InputGroupInput ref={inputRef} value={createdLink} readOnly />
              <InputGroupAddon
                className="hover:cursor-pointer"
                align="inline-end"
                onClick={async () => {
                  if (inputRef) {
                    inputRef.current?.select();
                    await navigator.clipboard.writeText(createdLink);
                  }
                }}
              >
                <Copy />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </>
      ) : (
        <>
          <p>Make your link short</p>
          <form onSubmit={form.handleSubmit(handleCreateLink)}>
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    placeholder="https://example.com/"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button className="w-full" type="submit">
              Create
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
