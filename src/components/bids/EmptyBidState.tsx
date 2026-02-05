 import { Link } from "react-router-dom";
 import { Gavel } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 
 interface EmptyBidStateProps {
   context: "buyer" | "seller";
   filter?: string;
 }
 
 const EmptyBidState = ({ context, filter }: EmptyBidStateProps) => {
   const messages = {
     buyer: {
       title: "No bids found",
       description: filter && filter !== "all" 
         ? `No ${filter} bids found.`
         : "You haven't placed any bids yet.",
       cta: "Browse Marketplace",
       link: "/marketplace"
     },
     seller: {
       title: "No bids received",
       description: filter && filter !== "all"
         ? `No ${filter} bids found.`
         : "You haven't received any bids on your listings yet.",
       cta: "View My Listings",
       link: "/listings"
     }
   };
 
   const content = messages[context];
 
   return (
     <Card className="card-premium">
       <CardContent className="p-12 text-center">
         <Gavel className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
         <h3 className="font-display text-xl font-semibold text-primary mb-2">
           {content.title}
         </h3>
         <p className="text-muted-foreground mb-4">
           {content.description}
         </p>
         <Link to={content.link}>
           <Button className="btn-premium text-primary-foreground">
             {content.cta}
           </Button>
         </Link>
       </CardContent>
     </Card>
   );
 };
 
 export default EmptyBidState;