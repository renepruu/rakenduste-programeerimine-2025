"use client";

import { Card, Text, Group, Stack, Button } from "@mantine/core";

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
  contacts: Contact[];
  onDelete: (id: number) => void;
};

export default function ContactsList({ contacts, onDelete }: Props) {
  if (contacts.length === 0) {
    return (
      <Text ta="center" mt="lg">
        Ühtegi kontakti ei ole veel lisatud.
      </Text>
    );
  }

  return (
    <Stack>
      {contacts.map((c) => (
        <Card key={c.id} withBorder shadow="sm">
          <Group>
            <div>
              <Text fw={600}>
                {c.name} {c.lastName}
              </Text>
              <Text>{c.email}</Text>
              <Text>{c.phone}</Text>
              <Text>{new Date(c.datetime).toLocaleString("et-EE")}</Text>
              {c.note && <Text>{c.note}</Text>}
            </div>
            <Button color="red" variant="light" onClick={() => onDelete(c.id)}>
              Kustuta
            </Button>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
