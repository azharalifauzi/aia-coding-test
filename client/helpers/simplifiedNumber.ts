export const simplifiedNumber = (num: number): string => {
  if (num >= 1000) {
    let newNumber = (num / 1000).toFixed(1);

    if (newNumber.endsWith('0')) newNumber = newNumber.split('.')[0];

    return `${newNumber}k`;
  }

  return `${num}`;
};
