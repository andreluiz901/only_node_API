import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile("db.json", JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];
    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  async update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      await Object.keys(data).reduce((acc, curr) => {
        if (data[curr]) {
          this.#database[table][rowIndex] = {
            ...this.#database[table][rowIndex],
            [curr]: data[curr],
          };
        }
        console.log(this.#database[table][rowIndex]);
      }, {});

      this.#persist();
    }
  }

  async patch(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      if (this.#database[table][rowIndex].completed_at) {
        this.#database[table][rowIndex] = {
          ...this.#database[table][rowIndex],
          completed_at: null,
        };
      } else {
        this.#database[table][rowIndex] = {
          ...this.#database[table][rowIndex],
          completed_at: new Date(),
        };
      }

      this.#persist();
    }
  }
}
