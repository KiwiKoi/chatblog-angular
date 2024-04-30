import { User } from "./user.model";

export interface Message {
  id: string;
  body: string;
  created_at: Date;
  author: Partial<User>;
  userID: string;
}
