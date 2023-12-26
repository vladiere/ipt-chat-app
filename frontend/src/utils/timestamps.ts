// timeStamps.ts
import { formatDistanceToNow } from 'date-fns';

const generateTimeStamps = (baseDate?: Date): void => {
  const timeDifference = baseDate;

  return formatDistanceToNow(timeDifference, { addSuffix: true });
};

export default generateTimeStamps;

