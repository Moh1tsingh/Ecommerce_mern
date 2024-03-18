import { Schema, model } from "mongoose";

export interface IUSer {
  _id?: string;
  username: string;
  password: string;
  availableMoney: number;
  purchasedItems: string[];
}

const UserSchema = new Schema<IUSer>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availableMoney: { type: Number, default: 5000 },
  purchasedItems: [{ type: Schema.Types.ObjectId ,ref:"products" , default:[]}],
});

export const UserModel = model<IUSer>("user", UserSchema);
