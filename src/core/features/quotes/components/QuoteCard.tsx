import { AnimatedCard } from '@/core/components/ui/Card';

const QuoteCard = () => {
  return (
    <AnimatedCard className="relative w-85 p-8 min-h-140 rounded-3xl flex-center">
      <div className="flex flex-col">
        {/* Quote */}
        <div className="text-3xl text-accent font-extrabold trans-c">
          Potentissimus est qui se habet in potestate
        </div>

        {/* Author */}
        <div className="mt-3 text-muted trans-c">— Lucius Annaeus Seneca</div>

        {/* Author */}
        <div className="mt-8 text-muted trans-c">
          He is most powerful who has control over himself
        </div>
      </div>
    </AnimatedCard>
  );
};

export default QuoteCard;
