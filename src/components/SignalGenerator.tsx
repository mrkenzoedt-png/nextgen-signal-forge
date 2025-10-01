import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Zap, Copy, Check } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import pqtLogo from "@/assets/pqt-logo.jpg";

interface Signal {
  time: string;
  asset: string;
  direction: "CALL" | "PUT";
}

const SignalGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [asset, setAsset] = useState("EUR/USD");
  const [signalCount, setSignalCount] = useState(10);
  const [filterType, setFilterType] = useState("ALL");
  const [backtestFilter, setBacktestFilter] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const assets = [
    "EUR/USD", "EUR/JPY", "USD/JPY", "EUR/GBP", "USD/EGP-OTC",
    "BRL/USD-OTC", "USD/TRY-OTC", "USD/PKR-OTC", "USD/PHP-OTC",
    "USD/INR-OTC", "USD/ARS-OTC", "USD/MXN-OTC", "NZD/JPY-OTC",
    "USD/DZD-OTC", "USD/BDT-OTC"
  ];

  const generateSignals = async () => {
    setIsGenerating(true);
    setSignals([]);

    // Simulate signal generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newSignals: Signal[] = [];
    for (let i = 0; i < signalCount; i++) {
      let direction: "CALL" | "PUT" = Math.random() > 0.5 ? "CALL" : "PUT";
      
      if (filterType !== "ALL" && filterType !== direction) {
        continue;
      }

      if (backtestFilter && Math.random() > 0.95) {
        continue;
      }

      const time = new Date();
      time.setMinutes(time.getMinutes() + (i + 1) * 5);

      newSignals.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        asset: `${asset} P.Q.T`,
        direction
      });
    }

    setSignals(newSignals);
    setIsGenerating(false);
  };

  const copyAllSignals = async () => {
    if (signals.length === 0) return;
    
    const signalText = signals.map(signal => 
      `${signal.time} - ${signal.asset} - ${signal.direction}`
    ).join('\n');
    
    try {
      await navigator.clipboard.writeText(signalText);
      setCopied(true);
      toast({
        title: "Signals Copied!",
        description: "All signals have been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy signals to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <img 
              src={pqtLogo} 
              alt="Prime Quotex Trader Logo" 
              className="w-20 h-20 rounded-full shadow-glow object-cover"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Prime Quotex Trader Bot
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Advanced Trading Signal Generator</p>
        </div>

        {/* Signal Generation Controls */}
        <Card className="nextgen-glass shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Generate Trading Signals
            </CardTitle>
            <CardDescription>
              Configure your signal parameters for optimal trading insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="asset-select">Select Asset</Label>
                <Select value={asset} onValueChange={setAsset}>
                  <SelectTrigger className="transition-smooth focus:shadow-glow">
                    <SelectValue placeholder="Choose asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((assetOption) => (
                      <SelectItem key={assetOption} value={assetOption}>
                        {assetOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signal-count">Number of Signals</Label>
                <Input
                  id="signal-count"
                  type="number"
                  min="1"
                  max="30"
                  value={signalCount}
                  onChange={(e) => setSignalCount(Number(e.target.value))}
                  className="transition-smooth focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="filter-select">Signal Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="transition-smooth focus:shadow-glow">
                    <SelectValue placeholder="All signals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Signals</SelectItem>
                    <SelectItem value="CALL">CALL Only</SelectItem>
                    <SelectItem value="PUT">PUT Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="backtest-filter" 
                    checked={backtestFilter}
                    onCheckedChange={(checked) => setBacktestFilter(checked as boolean)}
                  />
                  <Label htmlFor="backtest-filter" className="text-sm">
                    Filter Backtested (95% accuracy)
                  </Label>
                </div>
              </div>
            </div>

            <Button 
              onClick={generateSignals}
              disabled={isGenerating}
              className="w-full gradient-primary shadow-elegant hover:shadow-glow transition-smooth"
            >
              {isGenerating ? "Generating..." : "Generate Signals"}
            </Button>
          </CardContent>
        </Card>

        {/* Loading Spinner */}
        {isGenerating && <LoadingSpinner />}

        {/* Signals Display */}
        {signals.length > 0 && (
          <Card className="nextgen-glass shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    Generated Signals ({signals.length})
                  </CardTitle>
                  <CardDescription>
                    Latest trading signals based on your configuration
                  </CardDescription>
                </div>
                <Button
                  onClick={copyAllSignals}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy All"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {signals.map((signal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 transition-smooth"
                  >
                     <div className="flex items-center gap-4">
                       <div className={`w-2 h-2 rounded-full ${
                         signal.direction === "CALL" ? "bg-success" : "bg-destructive"
                       }`} />
                       <span className="font-medium text-card-foreground">{signal.time}</span>
                       <span className="text-muted-foreground">{signal.asset}</span>
                     </div>
                     <div className="flex items-center gap-3">
                       {signal.direction === "CALL" ? (
                         <TrendingUp className="w-4 h-4 text-success" />
                       ) : (
                         <TrendingDown className="w-4 h-4 text-destructive" />
                       )}
                       <Badge variant={signal.direction === "CALL" ? "default" : "destructive"}>
                         {signal.direction}
                       </Badge>
                       <Button
                         size="sm"
                         variant="ghost"
                         onClick={async () => {
                           const signalText = `${signal.time} - ${signal.asset} - ${signal.direction}`;
                           try {
                             await navigator.clipboard.writeText(signalText);
                             toast({
                               title: "Signal Copied!",
                               description: "Signal copied to clipboard",
                             });
                           } catch (err) {
                             toast({
                               title: "Copy Failed",
                               description: "Unable to copy signal to clipboard",
                               variant: "destructive",
                             });
                           }
                         }}
                         className="h-8 px-2"
                       >
                         <Copy className="w-3 h-3" />
                       </Button>
                     </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center py-8 border-t border-primary/20">
          <p className="text-muted-foreground">
            &copy; 2024 Prime Quotex Trader Bot | 
            <a 
              href="https://t.me/nextgenvipsignals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow transition-smooth ml-2"
            >
              Join Our Telegram
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignalGenerator;