import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import fs from "node:fs/promises";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;
      const users = database.select(
        "tasks",
        search ? { title: search, description: search } : null
      );

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const created_at = new Date();

      const user = {
        id: randomUUID(),
        title,
        description,
        created_at,
        updated_at: null,
        completed_at: null,
      };

      database.insert("tasks", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      database.update("tasks", id, {
        title,
        description,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      database.patch("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks/multi"),
    handler: async (req, res) => {
      const file = await fs.readFile("./tasks.csv", "utf-8");

      const lines = file.split("\n");

      for (let i = 1; i < lines.length; i++) {
        const title = lines[i].split(",")[0];
        const description = lines[i].split(",")[1];

        const created_at = new Date();

        const user = {
          id: randomUUID(),
          title,
          description,
          created_at,
          updated_at: null,
          completed_at: null,
        };

        database.insert("tasks", user);
      }
      return res.writeHead(201).end();
    },
  },
];
