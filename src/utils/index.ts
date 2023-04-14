export function formatePercent(val: number): string {
  if (typeof val === 'number') {
    let str1 = (val * 100).toFixed(0);
    let str2 = (val * 100).toFixed(2);
    return (Number(str1) === Number(str2) ? str1 : str2) + '%';
  }
  return '0%';
}

export const handleKeyPress = (e: any) => {
  // 如果用户按下了空格或制表符，则防止它们被输入
  if (e.key === ' ' || e.key === 'Tab') {
    e.preventDefault();
  }
};
