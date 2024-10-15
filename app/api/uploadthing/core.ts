import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth as clerkAuth } from '@clerk/nextjs/server';  // Import Clerk's auth function and alias it to avoid name conflict

const f = createUploadthing();

const getUserIdFromAuth = async (req: Request) => {
  const { sessionClaims } = clerkAuth(); // You need to pass req if required by Clerk's `auth`
  const userId = sessionClaims?.userId as string;
  if (userId) {
    return { id: userId };
  }
  return null;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getUserIdFromAuth(req);  // Use the renamed auth function

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
