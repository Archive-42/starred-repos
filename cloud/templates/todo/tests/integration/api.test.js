import { api } from "@serverless/cloud";

test("should post a todo", async () => {
  const { body } = await api.post("/todos/123?status=all").invoke({
    id: "123",
    name: "Something to do",
  });

  expect(body.items).toContainEqual(
    expect.objectContaining({
      id: "123",
      name: "Something to do",
      createdAt: expect.any(Number),
    })
  );
});

test("should get todos", async () => {
  const { body } = await api.get("/todos?status=all").invoke();

  expect(body.items).toContainEqual(
    expect.objectContaining({
      id: "123",
      name: "Something to do",
      createdAt: expect.any(Number),
    })
  );
});

test("should delete the todo", async () => {
  const { status } = await api.delete("/todos/123").invoke();
  expect(status).toEqual(200);
});

test("should get no todos", async () => {
  const { body } = await api.get("/todos?status=all").invoke();
  expect(body.items).not.toContainEqual({
    id: "123",
  });
});
