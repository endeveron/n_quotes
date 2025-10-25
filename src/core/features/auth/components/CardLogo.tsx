import { APP_NAME } from '@/core/constants';

const CardLogo = () => {
  return (
    <div className="relative w-full flex justify-center select-none">
      <div className="absolute -top-22 text-5xl text-muted/25 dark:text-muted/30 leading-0 font-black trans-c">
        {APP_NAME}
      </div>
    </div>
  );
};

export default CardLogo;
