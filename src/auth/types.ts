export type User = {
  email:     string;
  firstName: string;
  lastName:  string;
}

export type UserWithId = User & { id: number };

export type UserWithPassword = User & { password: string };
