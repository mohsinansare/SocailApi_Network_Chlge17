import { Schema, Document, model, Types } from 'mongoose';

interface IUser extends Document {
  first: string;
  last: string;
  age: number;
  thoughts:Types.ObjectId[];
  friends:Types.ObjectId[];
  fullName: string;
 }

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    first: String,
    last: String,
    age: Number,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function (this: any) {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (this: any, v: any) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model<IUser>('user', userSchema);

export default User
