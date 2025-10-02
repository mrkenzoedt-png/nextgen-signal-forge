import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import nextgenLogo from "@/assets/nextgen-logo.jpg";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showTelegramDialog, setShowTelegramDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "NEXTGEN" && password === "NEXTGEN20") {
      setError("");
      setShowTelegramDialog(true);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleJoinTelegram = () => {
    window.open("https://t.me/nextgenpo_bot", "_blank");
    setShowTelegramDialog(false);
    onLogin();
  };

  const handleMaybeLater = () => {
    setShowTelegramDialog(false);
    onLogin();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md nextgen-glass shadow-elegant">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <img 
                src={nextgenLogo} 
                alt="NEXTGEN Logo" 
                className="w-24 h-24 rounded-full shadow-glow object-cover"
              />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              NEXTGEN
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

    <Dialog open={showTelegramDialog} onOpenChange={setShowTelegramDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Join Our Telegram
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground pt-2">
            Join Our Telegram To Get Free Bots
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button
            onClick={handleJoinTelegram}
            className="w-full gradient-primary shadow-elegant hover:shadow-glow transition-smooth flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Join Telegram Channel
          </Button>
          <Button
            onClick={handleMaybeLater}
            variant="outline"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default LoginForm;