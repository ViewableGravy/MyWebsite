export const createTimeline = (stages: { event: () => void, delay: number }[]) => {
  return () => {
    const length = stages.length;
    let currentStage = 0;

    const next = () => {
      if (currentStage >= length) return;

      const { event, delay } = stages[currentStage];

      setTimeout(() => {
        event();
        next();
      }, delay);

      currentStage++;
    };

    next();
  };
}

export const timelineEvent = (event: () => void, delay: number) => ({
  event,
  delay
})
