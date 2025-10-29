import { AnimatedCard } from '@/core/components/ui/Card';
import { ParsedQuote } from '@/core/features/quotes/types';

const QuoteCard = ({
  id,
  author,
  quote,
  transcription,
  translation,
}: ParsedQuote) => {
  return (
    <AnimatedCard
      className="relative w-80 md:w-110 lg:w-180 py-8 flex-center"
      key={id}
    >
      <div className="flex flex-col">
        {/* Quote */}
        <div className="font-pt text-4xl md:text-5xl lg:text-6xl text-accent font-bold">
          {quote}
        </div>

        {/* Author */}
        <div className="mt-3 md:mt-4 lg:mt-5 lg:text-xl text-muted">
          — {author || 'Unknown source'}
        </div>

        {/* Translation */}
        {translation && (
          <div className="mt-8 font-semibold md:text-lg lg:ml-6 lg:mt-12 lg:text-xl">
            {translation}
          </div>
        )}

        {/* Transcription */}
        {transcription && (
          <div className="mt-2 text-muted lg:mt-3 lg:ml-6 lg:text-lg">
            {transcription}
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default QuoteCard;
