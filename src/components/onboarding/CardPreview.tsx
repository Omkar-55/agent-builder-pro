import { CardDetails } from '@/types/onboarding';

interface CardPreviewProps {
  cardDetails: CardDetails;
}

export function CardPreview({ cardDetails }: CardPreviewProps) {
  return (
    <div className="card-preview rounded-xl overflow-hidden animate-scale-in">
      {/* Card Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted overflow-hidden">
        {cardDetails.imageUrl ? (
          <img
            src={cardDetails.imageUrl}
            alt="Card background"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-dots flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image uploaded</span>
          </div>
        )}
        
        {/* Portal Button */}
        <div className="absolute top-4 right-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-glow-sm">
            {cardDetails.processName || 'Process'} Portal
          </button>
        </div>
        
        {/* Business Overview Link */}
        <div className="absolute top-4 right-48">
          <span className="text-foreground text-sm underline underline-offset-4">
            Business Overview
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Vertical Tag */}
        {cardDetails.vertical && (
          <span className="text-primary text-sm font-medium">
            {cardDetails.vertical}
          </span>
        )}

        {/* Process Name */}
        <h3 className="text-2xl font-bold text-foreground">
          {cardDetails.processName || 'Process Name'}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {cardDetails.description || 'One-line description of your agentic solution will appear here...'}
        </p>

        {/* Use Case Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {cardDetails.useCases.length > 0 ? (
            cardDetails.useCases.map((useCase) => (
              <span
                key={useCase}
                className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {useCase}
              </span>
            ))
          ) : (
            <>
              <span className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground">
                Use Case 1
              </span>
              <span className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground">
                Use Case 2
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
