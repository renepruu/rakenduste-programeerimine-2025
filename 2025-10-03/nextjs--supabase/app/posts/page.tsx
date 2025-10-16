"use client";

import { useState, useEffect } from "react";
import { Container, Title, Divider, Stack, Card, Text } from "@mantine/core";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=100"
        );
        if (!res.ok) throw new Error("Failed to fetch");

        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {}
    }

    fetchPosts();
  }, []);

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg">
        API Posts
      </Title>

      <Divider my="xl" />

      <Stack>
        {posts.map((post) => (
          <Card key={post.id} shadow="sm" withBorder>
            <Text fw={600}>id: {post.id}</Text>
            <br />
            <Text fw={600}> title: {post.title} </Text>
            <br />
            <Text fw={300}>body: {post.body} </Text>
            <br />
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
