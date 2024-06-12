export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "user" | "admin";
}

export type TLogin = {
    email: string;
    password: string;
  };
  