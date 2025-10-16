"use client";

import { useState } from "react";
import ContactsForm from "./ContactsForm";
import ContactsList from "./ContactsList";
import { Title, Container } from "@mantine/core";

type Contact = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  datetime: number;
  note: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  function handleAdd(contact: Contact) {
    setContacts((prev) => [contact, ...prev]);
  }

  function handleDelete(id: number) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg" ta="center">
        Kontaktivorm
      </Title>

      <ContactsForm onAdd={handleAdd} />

      <ContactsList contacts={contacts} onDelete={handleDelete} />
    </Container>
  );
}
