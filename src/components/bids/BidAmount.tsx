 interface BidAmountProps {
   amount: number;
   askingPrice?: number;
   size?: "sm" | "md" | "lg";
   showAskingPrice?: boolean;
 }
 
 const BidAmount = ({ 
   amount, 
   askingPrice, 
   size = "md", 
   showAskingPrice = true 
 }: BidAmountProps) => {
   const sizeClasses = {
     sm: "text-lg",
     md: "text-xl",
     lg: "text-2xl"
   };
 
   return (
     <div className="text-right">
       <p className={`font-display ${sizeClasses[size]} font-semibold text-champagne`}>
         ${amount.toLocaleString()}
       </p>
       {showAskingPrice && askingPrice && (
         <p className="text-xs text-muted-foreground">
           Ask: ${askingPrice.toLocaleString()}
         </p>
       )}
     </div>
   );
 };
 
 export default BidAmount;