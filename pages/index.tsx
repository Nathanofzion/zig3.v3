import { useSorobanReact } from '@soroban-react/core';
import { SwapComponent } from 'components/Swap/SwapComponent';
import PlaygroundPage from '@/app/playground/page';
import { xlmTokenList } from 'constants/xlmToken';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Field } from 'state/swap/actions';
import { SwapState } from 'state/swap/reducer';
import SEO from '../src/components/SEO';

const TAG_ID = process.env.NEXT_PUBLIC_TAG_ID;
if (TAG_ID && TAG_ID != ''){
  ReactGA.initialize(TAG_ID);
}

export default function Home() {
  const { activeChain } = useSorobanReact();
  const [xlmToken, setXlmToken] = useState<string | null>(null);
  const [prefilledState, setPrefilledState] = useState<Partial<SwapState>>({
    [Field.INPUT]: { currencyId: null },
    [Field.OUTPUT]: { currencyId: null },
  });

  useEffect(() => {
    const newXlmToken =
      xlmTokenList.find((tList) => tList.network === activeChain?.id)?.assets[0].contract ?? null;
    setXlmToken(newXlmToken);

    const newPrefilledState = {
      [Field.INPUT]: { currencyId: newXlmToken },
      [Field.OUTPUT]: { currencyId: null },
    };
    setPrefilledState(newPrefilledState);
  }, [activeChain, xlmToken]);

  return (
    <>
      <SEO title="Zig3 V3" description="Zig3-Soroswap Index" data-testid="SEO" />
      {xlmToken && <PlaygroundPage />}
    </>
  );
}
