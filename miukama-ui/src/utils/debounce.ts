import { useCallback, useState } from 'react';

// eslint-disable-next-line no-unused-vars
export const Debounce = (
  getFilterData: () => void,
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (value: boolean) => void,
) => {
  const [delayTimer, setDelayTimer] = useState<null | ReturnType<
    typeof setTimeout
  >>();
  const fetchData = useCallback(async () => {
    if (delayTimer) {
      setIsLoading(true);
      clearTimeout(delayTimer);
      setDelayTimer(null);
    }

    setDelayTimer(
      setTimeout(async () => {
        await getFilterData();
        setIsLoading(false);
      }, 500),
    );
  }, [getFilterData]);

  return fetchData;
};
