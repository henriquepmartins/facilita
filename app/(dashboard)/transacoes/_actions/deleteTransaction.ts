"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(id: string) {
  try {
    const user = await currentUser();
    if (!user) {
      redirect("/sign-in");
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        userId: user.id,
        id,
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // Delete the transaction
    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    await prisma.monthHistory.update({
      where: {
        userId_day_month_year: {
          userId: user.id,
          day: new Date(transaction.date).getUTCDate(),
          month: new Date(transaction.date).getUTCMonth(),
          year: new Date(transaction.date).getUTCFullYear(),
        },
      },
      data: {
        income: {
          decrement: transaction.type === "income" ? transaction.amount : 0,
        },
        expense: {
          decrement: transaction.type === "expense" ? transaction.amount : 0,
        },
      },
    });

    await prisma.yearHistory.update({
      where: {
        userId_month_year: {
          userId: user.id,
          month: new Date(transaction.date).getUTCMonth(),
          year: new Date(transaction.date).getUTCFullYear(),
        },
      },
      data: {
        income: {
          decrement: transaction.type === "income" ? transaction.amount : 0,
        },
        expense: {
          decrement: transaction.type === "expense" ? transaction.amount : 0,
        },
      },
    });

    return deletedTransaction;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}
