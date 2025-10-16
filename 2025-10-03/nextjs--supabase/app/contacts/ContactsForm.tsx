"use client";

import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Stack,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type Contact = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  datetime: number;
  note: string;
};

type Props = {
  onAdd: (contact: Contact) => void;
};

export default function ContactsForm({ onAdd }: Props) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      note: "",
    },
    validate: {
      name: (v) => (v.trim().length === 0 ? "Eesnimi on nõutud" : null),
      lastName: (v) =>
        v.trim().length === 0 ? "Perekonnanimi on nõutud" : null,
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : "Sisesta kehtiv e-mail"),
      phone: (v) =>
        v.trim().length >= 5 ? null : "Sisesta kehtiv telefoninumber",
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const contact: Contact = {
        id: Date.now(),
        name: values.name.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        datetime: Date.now(),
        note: values.note.trim(),
      };

      onAdd(contact);
      form.reset();
      setSuccessMsg("Kontakt edukalt lisatud");
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Tundmatu viga");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box maw={640} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {successMsg && (
            <Notification color="teal" onClose={() => setSuccessMsg(null)}>
              {successMsg}
            </Notification>
          )}
          {errorMsg && (
            <Notification color="red" onClose={() => setErrorMsg(null)}>
              {errorMsg}
            </Notification>
          )}

          <Group grow>
            <TextInput
              required
              label="Eesnimi"
              placeholder="Eesnimi"
              {...form.getInputProps("name")}
            />
            <TextInput
              required
              label="Perekonnanimi"
              placeholder="Perekonnanimi"
              {...form.getInputProps("lastName")}
            />
          </Group>

          <Group grow>
            <TextInput
              required
              label="E-mail"
              placeholder="email@example.com"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              label="Telefon"
              placeholder="+372 5123 4567"
              {...form.getInputProps("phone")}
            />
          </Group>

          <Textarea
            label="Tekst"
            placeholder="..."
            minRows={3}
            {...form.getInputProps("note")}
          />

          <Group mt="md">
            <Button type="submit" loading={loading}>
              Salvesta kontakt
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}
