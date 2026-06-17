// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     // ✅ Google Login
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     // ✅ Email / Password Login
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // 🔐 Hardcoded user
//         if (
//           credentials.email === "admin@skin.com" &&
//           credentials.password === "123456"
//         ) {
//           return {
//             id: "1",
//             name: " User",
//             email: "admin@skin.com",
//           };
//         }
//         return null; // login fail
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login", // custom login page
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials) {
//         // ১. ডাটাবেস কানেক্ট করা
//         await dbConnect(); 

//         const { email, password } = credentials;

//         // ইমেইল এবং পাসওয়ার্ড চেক করা (যাতে খালি ডাটা সাবমিট না হয়)
//         if (!email || !password) {
//           throw new Error("Please enter both email and password.");
//         }

//         // ২. চেক করা ইউজার আগে থেকে আছে কি না
//         let user = await User.findOne({ email: email.toLowerCase() });

//         if (!user) {
//           // ৩. ইউজার না থাকলে নতুন তৈরি (Auto Registration)
//           const hashedPassword = await bcrypt.hash(password, 12);
          
//           try {
//             user = await User.create({
//               email: email.toLowerCase(),
//               password: hashedPassword,
//               name: email.split("@")[0],
//             });
//             console.log("New User Created in MongoDB ✅");
//           } catch (err) {
//             console.error("Error creating user:", err);
//             throw new Error("Could not create user.");
//           }
//         } else {
//           // ৪. ইউজার থাকলে পাসওয়ার্ড চেক করা
//           const isMatch = await bcrypt.compare(password, user.password);
//           if (!isMatch) {
//             throw new Error("Incorrect Password! User already exists with this email.");
//           }
//         }

//         // ৫. সেশনের জন্য ডাটা রিটার্ন (ID টাকে string এ কনভার্ট করা ভালো)
//         return { 
//           id: user._id.toString(), 
//           email: user.email, 
//           name: user.name 
//         };
//       },
//     }),
//   ],
  
//   // ক্যালব্যাক ফাংশন যোগ করা সেশনে আইডি পাওয়ার জন্য (খুবই জরুরি)
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },

//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login", // আপনার কাস্টম লগইন পেজ
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials) {
//         await dbConnect(); 
//         const { email, password } = credentials;

//         if (!email || !password) {
//           throw new Error("Please enter both email and password.");
//         }

//         let user = await User.findOne({ email: email.toLowerCase() });

//         if (!user) {
//           const hashedPassword = await bcrypt.hash(password, 12);
//           try {
//             user = await User.create({
//               email: email.toLowerCase(),
//               password: hashedPassword,
//               name: email.split("@")[0],
//             });
//             console.log("New User Created in MongoDB ✅");
//           } catch (err) {
//             console.error("Error creating user:", err);
//             throw new Error("Could not create user.");
//           }
//         } else {
//           const isMatch = await bcrypt.compare(password, user.password);
//           if (!isMatch) {
//             throw new Error("Incorrect Password! User already exists with this email.");
//           }
//         }

//         return { 
//           id: user._id.toString(), 
//           email: user.email, 
//           name: user.name 
//         };
//       },
//     }),
//   ],
  
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },

//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials) {
//         try {
//           console.log("--- Login Attempt Started ---");
          
//           // ১. ডাটাবেস কানেক্ট করা
//           await dbConnect();
//           console.log("Database Connected Successfully ✅");

//           const { email, password } = credentials;
//           console.log("Email from Input:", email);

//           if (!email || !password) {
//             throw new Error("Please enter both email and password.");
//           }

//           // ২. ইউজার ডাটাবেসে আছে কি না চেক করা
//           let user = await User.findOne({ email: email.toLowerCase() });

//           if (!user) {
//             // ৩. ইউজার না থাকলে নতুন ইউজার তৈরি করা (Auto Registration)
//             console.log("User not found. Attempting Auto-Registration...");
//             const hashedPassword = await bcrypt.hash(password, 12);
            
//             user = await User.create({
//               email: email.toLowerCase(),
//               password: hashedPassword,
//               name: email.split("@")[0],
//             });
//             console.log("New User Created in MongoDB ✅");
//           } else {
//             // ৪. ইউজার থাকলে পাসওয়ার্ড চেক করা
//             console.log("User found in Database. Checking password...");
//             const isMatch = await bcrypt.compare(password, user.password);
            
//             if (!isMatch) {
//               console.log("Password Mismatch ❌");
//               throw new Error("Incorrect Password! This email is already registered.");
//             }
//             console.log("Password Matched ✅");
//           }

//           // ৫. সেশনের জন্য ডাটা রিটার্ন করা
//           return { 
//             id: user._id.toString(), 
//             email: user.email, 
//             name: user.name 
//           };

//         } catch (error) {
//           console.error("Login Error:", error.message);
//           // "bad auth" এরর আসলে বুঝতে হবে MONGODB_URI ভুল
//           throw new Error(error.message);
//         } finally {
//           console.log("--- Login Attempt Finished ---");
//         }
//       },
//     }),
//   ],
  
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },

//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login", 
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         await dbConnect();
//         const user = await User.findOne({ email: credentials.email });
        
//         if (!user) throw new Error("User not found!");
        
//         const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
//         if (!isPasswordCorrect) throw new Error("Invalid password!");

//         // Ekhane role shoho user object return korbe
//         return { id: user._id, name: user.name, email: user.email, role: user.role };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.role = user.role; // Database theke role nilam
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) session.user.role = token.role; // Client side-e role pass korlam
//       return session;
//     },
//   },
//   pages: { signIn: "/login" },
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) throw new Error("User not found!");
        
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error("Invalid password!");

        // লগইনের সময় এই ডাটাগুলো টোকেনে যাবে
        return { 
          id: user._id.toString(), 
          name: user.name, 
          email: user.email, 
          role: user.role 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // ১. প্রথমবার লগইন করার সময় ডাটা টোকেনে সেট করা
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }

      // ২. প্রোফাইল আপডেট ট্রিপার হলে (এটিই আপনার সমস্যার সমাধান)
      // যখন ক্লায়েন্ট থেকে update({ name, email }) কল করা হবে
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.name = token.name;   // টোকেন থেকে লেটেস্ট নাম পাঠানো
        session.user.email = token.email; // টোকেন থেকে লেটেস্ট ইমেইল পাঠানো
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };