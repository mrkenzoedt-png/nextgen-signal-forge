import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import pqtLogo from "@/assets/pqt-logo.jpg";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "NEXTGEN" && password === "NEXTGEN20") {
      setError("");
      onLogin();
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md nextgen-glass shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={pqtLogo} 
              alt="Prime Quotex Trader Logo" 
              className="w-24 h-24 rounded-full shadow-glow object-cover"
            />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Prime Quotex Trader Bot
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Advanced Trading Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="transition-smooth focus:shadow-glow"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-smooth focus:shadow-glow"
                required
              />
            </div>
            {error && (
              <div className="text-destructive text-sm text-center p-2 bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full gradient-primary shadow-elegant hover:shadow-glow transition-smooth">
              Access Platform
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;