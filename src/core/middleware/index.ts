import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const session = await getSession({ req });

  if (!session) {
    res
      .status(403)
      .json({ error: "You do not have permission to view or use this data" });
    return;
  }

  next();
};
