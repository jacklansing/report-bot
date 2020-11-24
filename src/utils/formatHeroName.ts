export default (heroName: string) =>
  heroName
    .split('_')
    .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
    .trim();
