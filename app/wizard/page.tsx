"use client";
import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect } from "react";

function WizardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="container flex max-w-2xl flex-col justify-between gap-4 px-4 sm:px-6 md:px-8">
      <div>
        <h1>Bem vindo {user.firstName}!👋</h1>
        <h2 className="mt-4 text-base text-muted-foreground">
          Vamos começar configurando sua moeda padrão.
        </h2>
        <h3 className="mt-2 text-sm text-muted-foreground">
          Você pode alterar isso a qualquer momento.
        </h3>
      </div>
      <Separator />
      <Card className="w  -full">
        <CardHeader>
          <CardTitle>Moeda</CardTitle>
          <CardDescription>Defina sua moeda padrão</CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href="/">Continuar para a próxima página</Link>
      </Button>
      <div className="mt-8 flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
}

export default WizardPage;
