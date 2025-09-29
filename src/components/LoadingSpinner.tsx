import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full gradient-primary shadow-glow animate-pulse"></div>
          <Loader2 className="w-8 h-8 text-primary-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Generating Signals...</h3>
          <p className="text-muted-foreground">Analyzing market data and trends</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;